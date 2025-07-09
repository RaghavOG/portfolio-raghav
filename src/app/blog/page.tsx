import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogList from '@/components/blog/BlogList';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogCategories from '@/components/blog/BlogCategories';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import LoadingSpinner from '@/components/ui/loading-spinner';

export const metadata: Metadata = {
  title: 'Blog | Raghav - Tech Insights & Tutorials',
  description: 'Explore my thoughts on web development, programming, AI, and technology. Get insights, tutorials, and industry updates.',
  keywords: 'blog, web development, programming, tutorials, technology, AI, machine learning',
  openGraph: {
    title: 'Blog | Raghav - Tech Insights & Tutorials',
    description: 'Explore my thoughts on web development, programming, AI, and technology.',
    type: 'website',
    images: ['/og-blog.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Raghav - Tech Insights & Tutorials',
    description: 'Explore my thoughts on web development, programming, AI, and technology.',
    images: ['/og-blog.jpg'],
  }
};

interface SearchParams {
  page?: string;
  category?: string;
  tag?: string;
  search?: string;
}

interface BlogPageProps {
  searchParams: SearchParams;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my thoughts on web development, programming, AI, and technology. 
            Get insights, tutorials, and industry updates.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <BlogSearch initialSearch={searchParams.search} />
          <BlogCategories selectedCategory={searchParams.category} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog List */}
          <div className="lg:col-span-3">
            <Suspense fallback={<LoadingSpinner />}>
              <BlogList searchParams={searchParams} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <NewsletterSignup />
            
            {/* Popular Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'AI', 'Web Dev', 'Tutorial'].map((tag) => (
                  <a
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
              <div className="space-y-4">
                <Suspense fallback={<div className="animate-pulse space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>}>
                  {/* This would be populated with actual recent posts */}
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    Recent posts will appear here...
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
