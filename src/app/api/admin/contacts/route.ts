import { NextRequest, NextResponse } from 'next/server';
import { ContactSubmission } from '@/models/Contact';
import connectDB from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Add authentication here in the future
    // For now, this is a basic endpoint for testing
    
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'all';

    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};
    if (status !== 'all') {
      filter.status = status;
    }

    // Get submissions with pagination
    const submissions = await ContactSubmission.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v') // Exclude version field
      .lean()
      .exec();

    // Get total count for pagination
    const total = await ContactSubmission.countDocuments(filter).exec();

    return NextResponse.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Failed to fetch contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
