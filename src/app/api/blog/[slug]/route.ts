import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import { processBlogContent, validateBlogData, generateSlug } from '@/lib/blog-utils';

interface Params {
  slug: string;
}

// GET /api/blog/[slug] - Get single blog by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectDB();

    const { slug } = params;

    const blog = await (Blog as any).findOne({ 
      slug, 
      status: 'published' 
    }).lean();

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await (Blog as any).findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    return NextResponse.json(blog);

  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[slug] - Update blog (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectDB();

    const { slug } = await params;
    const body = await request.json();
    const { title, excerpt, content, author, featuredImage, tags, category, status, publishedAt, seoTitle, seoDescription } = body;

    // Find existing blog
    const existingBlog = await (Blog as any).findOne({ slug });
    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    const validation = validateBlogData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Generate new slug if title changed
    let newSlug = slug;
    if (title !== existingBlog.title) {
      newSlug = generateSlug(title);
      
      // Check if new slug already exists
      const slugExists = await (Blog as any).findOne({ slug: newSlug, _id: { $ne: existingBlog._id } });
      if (slugExists) {
        return NextResponse.json(
          { error: 'A blog with this title already exists' },
          { status: 400 }
        );
      }
    }

    // Process content if it's markdown
    let processedContent = content;
    let readingTimeMinutes = existingBlog.readingTime;

    if (content && content !== existingBlog.content) {
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

    // Update blog
    const updateData: any = {
      title,
      slug: newSlug,
      excerpt,
      content: processedContent,
      author: author || existingBlog.author,
      featuredImage,
      tags: tags || [],
      category,
      status: status || existingBlog.status,
      readingTime: readingTimeMinutes,
      seoTitle,
      seoDescription
    };

    // Handle published status
    if (status === 'published' && existingBlog.status !== 'published') {
      updateData.publishedAt = publishedAt ? new Date(publishedAt) : new Date();
    } else if (status === 'published' && publishedAt) {
      updateData.publishedAt = new Date(publishedAt);
    }

    const updatedBlog = await (Blog as any).findByIdAndUpdate(
      existingBlog._id,
      updateData,
      { new: true }
    );

    return NextResponse.json(updatedBlog);

  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[slug] - Delete blog (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectDB();

    const { slug } = await params;

    const blog = await (Blog as any).findOne({ slug });
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    await (Blog as any).findByIdAndDelete(blog._id);

    return NextResponse.json({ message: 'Blog deleted successfully' });

  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
