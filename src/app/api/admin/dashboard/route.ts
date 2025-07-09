import { NextRequest, NextResponse } from 'next/server';
import { ContactSubmission } from '@/models/Contact';
import { Blog, Newsletter } from '@/models/Blog';
import connectDB from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Contact Stats
    const totalSubmissions = await (ContactSubmission as any).countDocuments();
    const pendingSubmissions = await (ContactSubmission as any).countDocuments({ status: 'pending' });
    const readSubmissions = await (ContactSubmission as any).countDocuments({ status: 'read' });
    const repliedSubmissions = await (ContactSubmission as any).countDocuments({ status: 'replied' });

    // Blog Stats
    const totalBlogs = await (Blog as any).countDocuments();
    const publishedBlogs = await (Blog as any).countDocuments({ status: 'published' });
    const draftBlogs = await (Blog as any).countDocuments({ status: 'draft' });
    const totalViews = await (Blog as any).aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    // Newsletter Stats
    const totalSubscribers = await (Newsletter as any).countDocuments();
    const activeSubscribers = await (Newsletter as any).countDocuments({ isActive: true });

    // Recent submissions
    const recentSubmissions = await (ContactSubmission as any).find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email message status createdAt')
      .lean();

    // Recent blogs
    const recentBlogs = await (Blog as any).find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug status publishedAt views createdAt')
      .lean();

    return NextResponse.json({
      contacts: {
        total: totalSubmissions,
        pending: pendingSubmissions,
        read: readSubmissions,
        replied: repliedSubmissions,
        recent: recentSubmissions
      },
      blogs: {
        total: totalBlogs,
        published: publishedBlogs,
        draft: draftBlogs,
        totalViews: totalViews[0]?.total || 0,
        recent: recentBlogs
      },
      newsletter: {
        total: totalSubscribers,
        active: activeSubscribers,
        inactive: totalSubscribers - activeSubscribers
      }
    });

  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
