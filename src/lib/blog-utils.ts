import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface BlogMatter {
  title: string;
  excerpt: string;
  author?: string;
  featuredImage?: string;
  tags?: string[];
  category: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProcessedBlog {
  matter: BlogMatter;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  slug: string;
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Simple markdown processing - content will be processed by MarkdownRenderer component
export async function processMarkdown(content: string): Promise<string> {
  // Return content as-is since we're using react-markdown for client-side processing
  return content;
}

// Process blog content from markdown
export async function processBlogContent(markdownContent: string): Promise<ProcessedBlog> {
  const { data, content } = matter(markdownContent);
  const processedContent = await processMarkdown(content);
  const readingTimeResult = readingTime(content);
  
  const slug = generateSlug(data.title || 'untitled');

  return {
    matter: data as BlogMatter,
    content: processedContent,
    readingTime: readingTimeResult,
    slug
  };
}

// Validate blog data
export function validateBlogData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!data.excerpt || data.excerpt.trim().length === 0) {
    errors.push('Excerpt is required');
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.push('Content is required');
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.push('Category is required');
  }

  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }

  if (data.excerpt && data.excerpt.length > 300) {
    errors.push('Excerpt must be less than 300 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Extract excerpt from content if not provided
export function extractExcerpt(content: string, maxLength: number = 200): string {
  const text = content.replace(/[#*`]/g, '').trim();
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Get blog categories
export const BLOG_CATEGORIES = [
  'Technology',
  'Web Development',
  'Programming',
  'AI & Machine Learning',
  'Career',
  'Tutorials',
  'Personal',
  'Industry News'
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];
