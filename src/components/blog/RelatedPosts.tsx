'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt: string;
  readingTime: number;
  category: string;
}

interface RelatedPostsProps {
  currentBlogId: string;
  category: string;
  tags: string[];
}

export default function RelatedPosts({ currentBlogId, category, tags }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setLoading(true);
        
        // First try to get posts from the same category
        let response = await fetch(`/api/blog?category=${encodeURIComponent(category)}&limit=3`);
        let data = await response.json();
        
        // Filter out the current post
        let posts = data.blogs?.filter((post: RelatedPost) => post._id !== currentBlogId) || [];
        
        // If we don't have enough posts from the same category, get more posts
        if (posts.length < 3) {
          response = await fetch(`/api/blog?limit=6`);
          data = await response.json();
          const allPosts = data.blogs?.filter((post: RelatedPost) => post._id !== currentBlogId) || [];
          
          // Merge and deduplicate
          const existingIds = new Set(posts.map((p: RelatedPost) => p._id));
          const additionalPosts = allPosts.filter((post: RelatedPost) => !existingIds.has(post._id));
          posts = [...posts, ...additionalPosts].slice(0, 3);
        }
        
        setRelatedPosts(posts.slice(0, 3));
      } catch (error) {
        console.error('Error fetching related posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentBlogId, category, tags]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm p-6">
        <h3 className="text-xl font-semibold font-space-grotesk text-white mb-6">
          Related Posts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-white/5 rounded-lg mb-3"></div>
              <div className="h-4 bg-white/5 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-white/5 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm p-6">
      <h3 className="text-xl font-semibold font-space-grotesk text-white mb-6">
        Related Posts
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="h-full bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300">
              {post.featuredImage && (
                <div className="relative h-32 w-full">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 bg-blue-500/10 text-blue-300 text-xs font-medium rounded border border-blue-400/20 font-inter">
                    {post.category}
                  </span>
                </div>
                
                <h4 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors font-space-grotesk">
                  {post.title}
                </h4>
                
                <p className="text-xs text-white/70 mb-3 line-clamp-2 font-inter">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-white/50 font-inter">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readingTime} min</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
