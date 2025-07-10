import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center px-4">
        <div className="mb-8">
          <FileText className="w-24 h-24 mx-auto text-white/20 mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk text-white mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold font-space-grotesk text-white/90 mb-4">
            Blog Post Not Found
          </h2>
          <p className="text-lg text-white/70 font-inter mb-8 max-w-md mx-auto">
            Sorry, the blog post you're looking for doesn't exist or has been removed.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium font-inter"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="text-sm text-white/50 font-inter">
            <Link 
              href="/" 
              className="hover:text-blue-300 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
