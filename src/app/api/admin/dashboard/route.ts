import { NextRequest, NextResponse } from 'next/server';
import { ContactSubmission } from '@/models/Contact';
import connectDB from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get total counts by status
    const totalSubmissions = await ContactSubmission.countDocuments();
    const pendingSubmissions = await ContactSubmission.countDocuments({ status: 'pending' });
    const readSubmissions = await ContactSubmission.countDocuments({ status: 'read' });
    const repliedSubmissions = await ContactSubmission.countDocuments({ status: 'replied' });

    // Get recent submissions
    const recentSubmissions = await ContactSubmission.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name email message status createdAt')
      .lean();

    return NextResponse.json({
      totalSubmissions,
      pendingSubmissions,
      readSubmissions,
      repliedSubmissions,
      recentSubmissions
    });

  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
