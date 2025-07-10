import { Metadata } from 'next';
import AdminBlogList from '@/components/admin/AdminBlogList';

export const metadata: Metadata = {
  title: 'Blog Management | Admin Panel',
  description: 'Manage blog posts, create new articles, and monitor blog statistics.',
};

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl font-bold font-space-grotesk text-white">
          Blog Management
        </h1>
        <p className="text-white/70 font-inter mt-2">
          Create, edit, and manage your blog posts
        </p>
      </div>

      <AdminBlogList />
    </div>
  );
}
