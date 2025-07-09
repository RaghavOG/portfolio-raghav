import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import { verifyAdminToken } from '@/lib/auth';

// Helper function to verify admin session from request
async function verifyAdminFromRequest(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '') || 
                request.cookies.get('admin-token')?.value;
  
  if (!token) {
    return { success: false, error: 'No token provided' };
  }

  const session = verifyAdminToken(token);
  if (!session) {
    return { success: false, error: 'Invalid or expired token' };
  }

  return { success: true, session };
}

interface Params {
  id: string;
}

// GET /api/admin/blogs/[id] - Get single blog for editing (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    // Verify admin token
    const authResult = await verifyAdminFromRequest(request);
    if (!authResult.success) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    const blog = await (Blog as any).findById(id).lean();

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);

  } catch (error) {
    console.error('Error fetching admin blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blogs/[id] - Delete blog (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    // Verify admin token
    const authResult = await verifyAdminFromRequest(request);
    if (!authResult.success) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    const blog = await (Blog as any).findById(id);
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    await (Blog as any).findByIdAndDelete(id);

    return NextResponse.json({ message: 'Blog deleted successfully' });

  } catch (error) {
    console.error('Error deleting admin blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
