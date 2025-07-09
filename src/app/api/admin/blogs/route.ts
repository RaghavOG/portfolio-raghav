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

// GET /api/admin/blogs - Get all blogs (admin only)
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Get blogs
    const blogs = await (Blog as any).find(query)
      .select('-content') // Exclude content for list view
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Blog.countDocuments(query);
    
    // Get stats
    const stats = {
      total: await Blog.countDocuments(),
      published: await Blog.countDocuments({ status: 'published' }),
      draft: await Blog.countDocuments({ status: 'draft' }),
      archived: await Blog.countDocuments({ status: 'archived' })
    };

    return NextResponse.json({
      blogs,
      stats,
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
    console.error('Error fetching admin blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/blogs - Create new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const authResult = await verifyAdminFromRequest(request);
    if (!authResult.success) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const {
      title,
      excerpt,
      content,
      author,
      featuredImage,
      tags,
      category,
      status,
      publishedAt,
      seoTitle,
      seoDescription,
      sendNewsletter = false
    } = await request.json();

    // Validate required fields
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, excerpt, content, category' },
        { status: 400 }
      );
    }

    await connectDB();

    // Generate slug from title
    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    };

    const slug = generateSlug(title);

    // Check if slug already exists
    const existingBlog = await (Blog as any).findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { error: 'A blog with this title already exists' },
        { status: 400 }
      );
    }

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Create blog
    const blogData = {
      title,
      slug,
      excerpt,
      content,
      author: author || 'Raghav',
      featuredImage: featuredImage || null,
      tags: tags || [],
      category,
      status: status || 'draft',
      publishedAt: status === 'published' ? (publishedAt || new Date()) : null,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      readingTime,
      views: 0
    };

    const blog = new (Blog as any)(blogData);
    await blog.save();

    // Send newsletter if requested and blog is published
    let newsletterResult = null;
    if (sendNewsletter && status === 'published') {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const notifyResponse = await fetch(`${baseUrl}/api/newsletter/notify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            blogData: {
              title: blog.title,
              excerpt: blog.excerpt,
              slug: blog.slug,
              featuredImage: blog.featuredImage
            },
            sendEmails: true
          })
        });

        if (notifyResponse.ok) {
          newsletterResult = await notifyResponse.json();
        }
      } catch (error) {
        console.error('Newsletter notification error:', error);
        // Don't fail the blog creation if newsletter fails
      }
    }

    return NextResponse.json({
      success: true,
      blog,
      newsletter: newsletterResult
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
