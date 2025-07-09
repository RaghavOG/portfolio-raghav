'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface BlogCommentsProps {
  blogId: string;
  blogSlug: string;
}

export default function BlogComments({ blogId, blogSlug }: BlogCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  
  // You'll need to replace these with your actual Giscus configuration
  // To get these values:
  // 1. Go to https://giscus.app/
  // 2. Enter your repository URL (make sure it's public and has discussions enabled)
  // 3. Choose a category for discussions (or create one)
  // 4. Copy the generated values below
  const giscusConfig = {
    repo: "your-username/your-repo", // e.g., "raghav/portfolio-blog"
    repoId: "your-repo-id", // e.g., "R_kgDOH..."
    category: "General", // The discussion category name
    categoryId: "your-category-id", // e.g., "DIC_kwDOH..."
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "bottom",
    lang: "en"
  };

  // Check if Giscus is configured
  const isConfigured = giscusConfig.repo !== "your-username/your-repo" && 
                      giscusConfig.repoId !== "your-repo-id" &&
                      giscusConfig.categoryId !== "your-category-id";

  useEffect(() => {
    if (!ref.current || !isConfigured) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', giscusConfig.repo);
    script.setAttribute('data-repo-id', giscusConfig.repoId);
    script.setAttribute('data-category', giscusConfig.category);
    script.setAttribute('data-category-id', giscusConfig.categoryId);
    script.setAttribute('data-mapping', giscusConfig.mapping);
    script.setAttribute('data-strict', giscusConfig.strict);
    script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled);
    script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata);
    script.setAttribute('data-input-position', giscusConfig.inputPosition);
    script.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', giscusConfig.lang);
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    ref.current.appendChild(script);

    return () => {
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, [resolvedTheme, isConfigured]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Comments
      </h3>
      
      {isConfigured ? (
        /* Giscus Comments */
        <div ref={ref} />
      ) : (
        /* Configuration message */
        <div className="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <div className="text-4xl mb-4">💬</div>
          <p className="mb-2 font-medium">
            Comments are powered by GitHub Discussions
          </p>
          <p className="text-sm mb-4">
            To enable comments, configure Giscus in the BlogComments component:
          </p>
          <div className="text-xs bg-gray-50 dark:bg-gray-700 p-3 rounded text-left max-w-md mx-auto">
            <p className="mb-2">1. Go to <span className="font-mono text-blue-600">https://giscus.app/</span></p>
            <p className="mb-2">2. Enter your repository URL</p>
            <p className="mb-2">3. Enable Discussions in your repo</p>
            <p>4. Copy the configuration values</p>
          </div>
        </div>
      )}
    </div>
  );
}
