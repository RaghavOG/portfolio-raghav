import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';
import { sendWelcomeEmail } from '@/lib/email-utils';

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await (Newsletter as any).findOne({ email });
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { error: 'Email is already subscribed' },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = new Date();
        existingSubscriber.unsubscribedAt = undefined;
        if (name) existingSubscriber.name = name;
        
        await existingSubscriber.save();
        
        return NextResponse.json({ 
          message: 'Successfully reactivated subscription!' 
        });
      }
    }

    // Create new subscriber
    const subscriber = new (Newsletter as any)({
      email,
      name,
      status: 'subscribed'
    });

    await subscriber.save();

    // Send welcome email
    try {
      const emailSent = await sendWelcomeEmail(email, name);
      if (emailSent) {
        console.log(`✅ Welcome email sent to: ${email}`);
      } else {
        console.warn(`⚠️ Failed to send welcome email to: ${email}`);
      }
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({ 
      message: 'Successfully subscribed to newsletter!' 
    }, { status: 201 });

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

// GET /api/newsletter - Get newsletter subscribers (admin only)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const active = searchParams.get('active');

    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    if (active !== null) {
      query.isActive = active === 'true';
    }

    // Get subscribers
    const subscribers = await (Newsletter as any).find(query)
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await (Newsletter as any).countDocuments(query);
    const activeCount = await (Newsletter as any).countDocuments({ isActive: true });

    return NextResponse.json({
      subscribers,
      stats: {
        total,
        active: activeCount,
        inactive: total - activeCount
      },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
