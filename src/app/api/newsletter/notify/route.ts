import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';
import { sendNewsletterEmail, generateNewsletterHTML, generateNewsletterText } from '@/lib/email-utils';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { blogData, sendEmails = false } = await request.json();

    if (!blogData) {
      return NextResponse.json(
        { success: false, error: 'Blog data is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Get all active newsletter subscribers
    const subscribers = await (Newsletter as any).find({ 
      status: 'subscribed'
    }).select('email name subscribedAt');

    if (!sendEmails) {
      // Just return subscriber count without sending emails
      return NextResponse.json({
        success: true,
        subscriberCount: subscribers.length,
        message: 'Subscriber count retrieved successfully'
      });
    }

    // Prepare email data
    const emailSubject = `${blogData.blogTitle} - New Article from Raghav`;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const blogUrl = `${baseUrl}/blog/${blogData.slug}`;
    const unsubscribeBaseUrl = `${baseUrl}/api/newsletter/unsubscribe`;

    let sentCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    // Send emails to all subscribers with rate limiting to avoid spam filters
    for (let i = 0; i < subscribers.length; i++) {
      const subscriber = subscribers[i];
      try {
        // Add delay between emails to avoid rate limiting (only for batches > 10)
        if (i > 0 && subscribers.length > 10) {
          await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
        }
        const unsubscribeUrl = `${unsubscribeBaseUrl}?email=${encodeURIComponent(subscriber.email)}&token=${generateUnsubscribeToken(subscriber.email)}`;
        
        const emailData = {
          blogTitle: blogData.title,
          blogExcerpt: blogData.excerpt,
          blogUrl: blogUrl,
          blogFeaturedImage: blogData.featuredImage,
          name: subscriber.name
        };

        const htmlContent = generateNewsletterHTML(emailData).replace(
          'UNSUBSCRIBE_URL', 
          unsubscribeUrl
        );
        
        const textContent = generateNewsletterText(emailData).replace(
          'UNSUBSCRIBE_URL', 
          unsubscribeUrl
        );

        const emailSent = await sendNewsletterEmail({
          to: subscriber.email,
          subject: emailSubject,
          content: htmlContent,
          isHtml: true,
          emailType: 'blog'
        });

        if (emailSent) {
          sentCount++;
        } else {
          failedCount++;
          errors.push(`Failed to send to ${subscriber.email}`);
        }
      } catch (error) {
        failedCount++;
        errors.push(`Error sending to ${subscriber.email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return NextResponse.json({
      success: true,
      subscriberCount: subscribers.length,
      sentCount,
      failedCount,
      errors: errors.length > 0 ? errors : undefined,
      message: `Newsletter sent to ${sentCount} subscribers${failedCount > 0 ? `, ${failedCount} failed` : ''}`
    });

  } catch (error) {
    console.error('Newsletter notification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Simple token generation for unsubscribe links
// In production, use a more secure method
function generateUnsubscribeToken(email: string): string {
  const secret = process.env.NEXTAUTH_SECRET || 'fallback-secret';
  return crypto.createHmac('sha256', secret).update(email).digest('hex').substring(0, 16);
}

// GET endpoint to check subscriber count
export async function GET() {
  try {
    await connectDB();
    
    const subscriberCount = await (Newsletter as any).countDocuments({ 
      status: 'subscribed'
    });

    return NextResponse.json({
      success: true,
      subscriberCount
    });

  } catch (error) {
    console.error('Error getting subscriber count:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
