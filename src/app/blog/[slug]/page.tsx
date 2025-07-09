import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import BlogPost from '@/components/blog/BlogPost';
import BlogComments from '@/components/blog/BlogComments';
import BlogShare from '@/components/blog/BlogShare';
import RelatedPosts from '@/components/blog/RelatedPosts';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Function to fetch blog data
async function getBlogPost(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog/${slug}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch blog post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const blog = await getBlogPost(params.slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: blog.seoTitle || `${blog.title} | Raghav Blog`,
    description: blog.seoDescription || blog.excerpt,
    keywords: blog.tags?.join(', ') || '',
    authors: [{ name: blog.author || 'Raghav' }],
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [blog.author || 'Raghav'],
      images: blog.featuredImage ? [blog.featuredImage] : ['/og-blog.jpg'],
      tags: blog.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : ['/og-blog.jpg'],
    },
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  };
}

// Generate static params for published blogs
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog?limit=100`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.blogs.map((blog: any) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blog = await getBlogPost(params.slug);

  if (!blog) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage || '/og-blog.jpg',
    author: {
      '@type': 'Person',
      name: blog.author || 'Raghav',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Raghav Portfolio',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `/blog/${params.slug}`,
    },
    keywords: blog.tags?.join(', ') || '',
    wordCount: blog.content?.length || 0,
    timeRequired: `PT${blog.readingTime || 5}M`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Suspense fallback={<LoadingSpinner />}>
            <BlogPost blog={blog} />
          </Suspense>

          {/* Share Buttons */}
          <div className="my-8">
            <BlogShare 
              url={`${process.env.NEXT_PUBLIC_APP_URL}/blog/${params.slug}`}
              title={blog.title}
              description={blog.excerpt}
            />
          </div>

          {/* Comments Section */}
          <div className="my-12">
            <Suspense fallback={<LoadingSpinner />}>
              <BlogComments blogId={blog._id} blogSlug={params.slug} />
            </Suspense>
          </div>

          {/* Related Posts */}
          <div className="my-12">
            <Suspense fallback={<LoadingSpinner />}>
              <RelatedPosts 
                currentBlogId={blog._id} 
                category={blog.category} 
                tags={blog.tags} 
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
