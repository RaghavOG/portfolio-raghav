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
  
  // Giscus configuration for your repository
  const giscusConfig = {
    repo: "raghavog/portfolio-raghav-discussion", // Your GitHub repo
    repoId: "R_kgDOPKT0NA", // Repository ID from giscus.app
    category: "General", // The discussion category name
    categoryId: "DIC_kwDOPKT0NM4Csxvt", // Category ID from giscus.app
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "1", // Updated to match your script
    inputPosition: "bottom",
    lang: "en"
  };

  // Check if Giscus is configured
  const isConfigured = giscusConfig.repo !== "your-username/your-repo" && 
                      giscusConfig.repoId !== "your-repo-id" &&
                      giscusConfig.categoryId !== "your-category-id";

  useEffect(() => {
    if (!ref.current || !isConfigured) return;

    // Store current ref to avoid stale closure
    const currentRef = ref.current;

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
    script.setAttribute('data-theme', 'dark'); // Always use dark theme to match your site
    script.setAttribute('data-lang', giscusConfig.lang);
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    currentRef.appendChild(script);

    return () => {
      if (currentRef) {
        currentRef.innerHTML = '';
      }
    };
  }, [
    // Removed resolvedTheme dependency since we're always using dark
    isConfigured,
    giscusConfig.repo,
    giscusConfig.repoId,
    giscusConfig.category,
    giscusConfig.categoryId,
    giscusConfig.mapping,
    giscusConfig.strict,
    giscusConfig.reactionsEnabled,
    giscusConfig.emitMetadata,
    giscusConfig.inputPosition,
    giscusConfig.lang
  ]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm p-6">
      <h3 className="text-xl font-semibold font-space-grotesk text-white mb-6">
        Comments
      </h3>
      
      {isConfigured ? (
        /* Giscus Comments */
        <div ref={ref} />
      ) : (
        /* Configuration message */
        <div className="text-center py-8 text-white/60 border-2 border-dashed border-white/20 rounded-lg">
          <div className="text-4xl mb-4">💬</div>
          <p className="mb-2 font-medium font-inter">
            Comments are powered by GitHub Discussions
          </p>
          <p className="text-sm mb-4 font-inter">
            To enable comments, configure Giscus in the BlogComments component:
          </p>
          <div className="text-xs bg-white/5 p-3 rounded text-left max-w-md mx-auto font-inter">
            <p className="mb-2">1. Go to <span className="font-mono text-blue-300">https://giscus.app/</span></p>
            <p className="mb-2">2. Enter your repository URL</p>
            <p className="mb-2">3. Enable Discussions in your repo</p>
            <p>4. Copy the configuration values</p>
          </div>
        </div>
      )}
    </div>
  );
}
