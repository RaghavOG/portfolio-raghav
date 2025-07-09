import { Metadata } from 'next';
import AdminBlogList from '@/components/admin/AdminBlogList';

export const metadata: Metadata = {
  title: 'Blog Management | Admin Panel',
  description: 'Manage blog posts, create new articles, and monitor blog statistics.',
};

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Blog Management
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Create, edit, and manage your blog posts
        </p>
      </div>

      <AdminBlogList />
    </div>
  );
}
