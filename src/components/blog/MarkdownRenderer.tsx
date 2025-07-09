'use client';

import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import Image from 'next/image';
import Link from 'next/link';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const processedContent = useMemo(() => {
    return content
      .replace(/\n/g, '  \n') // Ensure line breaks work properly
      .replace(/^\s*[\r\n]/gm, '\n'); // Clean up extra whitespace
  }, [content]);

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }]
        ]}
        components={{
          // Code blocks
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const isInline = !language && !node?.position;
            
            return !isInline && language ? (
              <CodeBlock
                language={language}
                className={className}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </CodeBlock>
            ) : (
              <code
                className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          
          // Images with Next.js optimization
          img({ src, alt, ...props }: any) {
            if (!src || typeof src !== 'string') return null;
            
            return (
              <div className="my-6">
                <Image
                  src={src}
                  alt={alt || ''}
                  width={800}
                  height={400}
                  className="rounded-lg shadow-lg mx-auto"
                  style={{ width: 'auto', height: 'auto' }}
                />
                {alt && (
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                    {alt}
                  </p>
                )}
              </div>
            );
          },
          
          // Links with proper handling
          a({ href, children, ...props }: any) {
            if (!href) return <span>{children}</span>;
            
            // External links
            if (href.startsWith('http') || href.startsWith('//')) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 transition-colors"
                  {...props}
                >
                  {children}
                </a>
              );
            }
            
            // Internal links
            return (
              <Link
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 transition-colors"
                {...props}
              >
                {children}
              </Link>
            );
          },
          
          // Blockquotes
          blockquote({ children, ...props }: any) {
            return (
              <blockquote
                className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 py-2 px-4 my-4 rounded-r-md"
                {...props}
              >
                <div className="text-gray-700 dark:text-gray-300 italic">
                  {children}
                </div>
              </blockquote>
            );
          },
          
          // Tables
          table({ children, ...props }: any) {
            return (
              <div className="overflow-x-auto my-6">
                <table
                  className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg"
                  {...props}
                >
                  {children}
                </table>
              </div>
            );
          },
          
          thead({ children, ...props }: any) {
            return (
              <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
                {children}
              </thead>
            );
          },
          
          th({ children, ...props }: any) {
            return (
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                {...props}
              >
                {children}
              </th>
            );
          },
          
          td({ children, ...props }: any) {
            return (
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700"
                {...props}
              >
                {children}
              </td>
            );
          },
          
          // Headings with proper styling
          h1({ children, ...props }: any) {
            return (
              <h1
                className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 first:mt-0"
                {...props}
              >
                {children}
              </h1>
            );
          },
          
          h2({ children, ...props }: any) {
            return (
              <h2
                className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 first:mt-0"
                {...props}
              >
                {children}
              </h2>
            );
          },
          
          h3({ children, ...props }: any) {
            return (
              <h3
                className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3"
                {...props}
              >
                {children}
              </h3>
            );
          },
          
          h4({ children, ...props }: any) {
            return (
              <h4
                className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3"
                {...props}
              >
                {children}
              </h4>
            );
          },
          
          // Paragraphs
          p({ children, ...props }: any) {
            return (
              <p
                className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                {...props}
              >
                {children}
              </p>
            );
          },
          
          // Lists
          ul({ children, ...props }: any) {
            return (
              <ul
                className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1"
                {...props}
              >
                {children}
              </ul>
            );
          },
          
          ol({ children, ...props }: any) {
            return (
              <ol
                className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1"
                {...props}
              >
                {children}
              </ol>
            );
          },
          
          li({ children, ...props }: any) {
            return (
              <li className="ml-4" {...props}>
                {children}
              </li>
            );
          },
          
          // Horizontal rule
          hr({ ...props }: any) {
            return (
              <hr
                className="my-8 border-t border-gray-200 dark:border-gray-700"
                {...props}
              />
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
