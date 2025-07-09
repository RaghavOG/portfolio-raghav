import { Metadata } from 'next';
import BlogEditor from '@/components/admin/BlogEditor';

export const metadata: Metadata = {
  title: 'Create New Blog Post | Admin Panel',
  description: 'Create a new blog post with rich content and media.',
};

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create New Blog Post
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Write and publish a new blog post
        </p>
      </div>

      <BlogEditor />
    </div>
  );
}
