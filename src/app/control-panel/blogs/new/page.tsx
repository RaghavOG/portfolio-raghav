import { Metadata } from 'next';
import BlogEditor from '@/components/admin/BlogEditor';

export const metadata: Metadata = {
  title: 'Create New Blog Post | Admin Panel',
  description: 'Create a new blog post with rich content and media.',
};

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl font-bold font-space-grotesk text-white">
          Create New Blog Post
        </h1>
        <p className="text-white/70 font-inter mt-2">
          Write and publish a new blog post
        </p>
      </div>

      <BlogEditor />
    </div>
  );
}
