import { NextRequest, NextResponse } from 'next/server';
import connectDB  from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import { processBlogContent, validateBlogData, generateSlug } from '@/lib/blog-utils';

// GET /api/blog - Get all published blogs with pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build query
    const query: any = { status: 'published' };
    
    if (category) {
      query.category = category;
    }
    
    if (tag) {
      query.tags = { $in: [tag] };
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
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      blogs,
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
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, excerpt, content, author, featuredImage, tags, category, status, publishedAt, seoTitle, seoDescription } = body;

    // Validate required fields
    const validation = validateBlogData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = generateSlug(title);

    // Check if slug already exists
    const existingBlog = await (Blog as any).findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { error: 'A blog with this title already exists' },
        { status: 400 }
      );
    }

    // Process content if it's markdown
    let processedContent = content;
    let readingTimeMinutes = 0;

    if (content) {
      try {
        const processed = await processBlogContent(`---
title: ${title}
excerpt: ${excerpt}
category: ${category}
---
${content}`);
        processedContent = processed.content;
        readingTimeMinutes = Math.ceil(processed.readingTime.minutes);
      } catch (error) {
        console.error('Error processing markdown:', error);
        // Continue with original content if markdown processing fails
      }
    }

    // Create blog
    const blog = new (Blog as any)({
      title,
      slug,
      excerpt,
      content: processedContent,
      author: author || 'Raghav',
      featuredImage,
      tags: tags || [],
      category,
      status: status || 'draft',
      publishedAt: status === 'published' ? (publishedAt ? new Date(publishedAt) : new Date()) : undefined,
      readingTime: readingTimeMinutes,
      seoTitle,
      seoDescription
    });

    await blog.save();

    return NextResponse.json(blog, { status: 201 });

  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
