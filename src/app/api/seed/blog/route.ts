import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Blog';

export async function POST(request: NextRequest) {
  try {
    // Simple protection - only allow in development
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Seeding only allowed in development' },
        { status: 403 }
      );
    }

    await connectDB();

    const sampleBlog = {
      title: "Welcome to My Blog System",
      slug: "welcome-to-my-blog-system",
      excerpt: "Discover the features and capabilities of this modern blog system built with Next.js, featuring markdown support, syntax highlighting, and more.",
      content: `# Welcome to My Blog System

I'm excited to introduce the comprehensive blog system I've built for my portfolio. This system showcases modern web development practices and provides a rich content creation experience.

## 🚀 Key Features

This blog system includes several powerful features:

### Content Management
- **Rich Markdown Editor** with live preview
- **Syntax Highlighting** for code blocks
- **Image Support** with optimization
- **SEO Optimization** with meta tags and structured data

### Code Example

Here's a sample of how code blocks look with syntax highlighting:

\`\`\`javascript
function welcomeMessage(name) {
  console.log(\`Welcome to the blog, \${name}!\`);
  return {
    success: true,
    message: "Blog system initialized successfully"
  };
}

// Usage
welcomeMessage("Developer");
\`\`\`

### Interactive Features

The blog includes several interactive elements:

1. **Copy-to-clipboard** functionality for code blocks
2. **Social sharing** buttons for easy content distribution
3. **Newsletter subscription** for regular updates
4. **Comments system** powered by GitHub Discussions

### Technology Stack

This blog is built with:

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MongoDB** for data storage
- **React Markdown** for content rendering

## 📝 Content Creation

Creating content is straightforward with the admin panel:

> The markdown editor provides real-time preview, making it easy to see exactly how your content will appear to readers.

### Markdown Support

The system supports all standard markdown features:

- **Bold** and *italic* text
- [Links](https://example.com) to external resources
- Lists (like this one!)
- Tables for structured data
- Block quotes for highlighting important information

| Feature | Status | Description |
|---------|--------|-------------|
| Markdown | ✅ | Full GitHub Flavored Markdown |
| Syntax Highlighting | ✅ | Code blocks with language detection |
| Comments | ✅ | GitHub Discussions integration |
| Newsletter | ✅ | Email subscription system |

## 🎯 What's Next?

I'll be sharing more content about:

- Web development best practices
- Modern JavaScript frameworks
- Backend development with Node.js
- Database design and optimization
- DevOps and deployment strategies

Stay tuned for more exciting content!

---

*This is a sample blog post demonstrating the capabilities of the blog system. Feel free to explore the admin panel to create your own content.*`,
      author: "Raghav",
      featuredImage: "/about_me_hero_img.4b3c35cb.jpeg",
      tags: ["welcome", "blog", "nextjs", "typescript", "web-development"],
      category: "Technology",
      status: "published",
      publishedAt: new Date(),
      seoTitle: "Welcome to My Modern Blog System | Raghav Portfolio",
      seoDescription: "Explore my modern blog system built with Next.js, TypeScript, and modern web technologies. Features markdown support and more.",
      readingTime: 3,
      views: 0
    };

    // Check if sample blog already exists
    const existingBlog = await (Blog as any).findOne({ slug: sampleBlog.slug });
    if (existingBlog) {
      return NextResponse.json({
        success: true,
        message: "Sample blog already exists",
        blog: existingBlog
      });
    }

    // Create the sample blog
    const blog = new (Blog as any)(sampleBlog);
    await blog.save();

    return NextResponse.json({
      success: true,
      message: "Sample blog created successfully",
      blog
    });

  } catch (error) {
    console.error('Error seeding blog:', error);
    return NextResponse.json(
      { 
        error: 'Failed to seed blog data',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
