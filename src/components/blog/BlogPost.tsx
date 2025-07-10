'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Eye, User, ArrowLeft } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  featuredImage?: string;
  tags: string[];
  category: string;
  publishedAt: string;
  readingTime: number;
  views: number;
}

interface BlogPostProps {
  blog: Blog;
}

export default function BlogPost({ blog }: BlogPostProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-white/5 rounded w-3/4 mb-4"></div>
        <div className="h-64 bg-white/5 rounded mb-6"></div>
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 bg-white/5 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-none">
      {/* Back to Blog */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-inter"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-300 text-sm font-medium rounded-full border border-blue-400/20 font-inter">
            {blog.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space-grotesk text-white mb-6 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-white/60 font-inter">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{blog.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{blog.views} views</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="mb-8">
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Excerpt */}
      <div className="mb-8">
        <p className="text-lg md:text-xl text-white/80 leading-relaxed italic border-l-4 border-blue-400 pl-6 font-inter">
          {blog.excerpt}
        </p>
      </div>

      {/* Content */}
      <MarkdownRenderer 
        content={blog.content}
        className="max-w-none"
      />

      {/* Tags */}
      {blog.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold font-space-grotesk text-white mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 bg-white/5 text-white/80 rounded-full text-sm hover:bg-blue-500/20 border border-white/10 transition-colors font-inter"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
