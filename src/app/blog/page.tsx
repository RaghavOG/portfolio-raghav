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
  const resolvedSearchParams = await searchParams;
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 md:px-12 py-20 max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            Blog
          </h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-inter max-w-3xl">
            Explore my thoughts on web development, programming, AI, and technology. 
            Get insights, tutorials, and industry updates.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <BlogSearch initialSearch={resolvedSearchParams.search} />
          <BlogCategories selectedCategory={resolvedSearchParams.category} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog List */}
          <div className="lg:col-span-3">
            <Suspense fallback={<LoadingSpinner />}>
              <BlogList searchParams={resolvedSearchParams} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <NewsletterSignup />
            
            {/* Popular Tags */}
            <div className="bg-white/5 rounded-lg border border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-4 text-white font-space-grotesk">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'AI', 'Web Dev', 'Tutorial'].map((tag) => (
                  <a
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
                    className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-sm hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20 font-inter"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white/5 rounded-lg border border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-4 text-white font-space-grotesk">Recent Posts</h3>
              <div className="space-y-4">
                <Suspense fallback={<div className="animate-pulse space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                      <div className="h-3 bg-white/10 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>}>
                  {/* This would be populated with actual recent posts */}
                  <div className="text-white/50 text-sm font-inter">
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
