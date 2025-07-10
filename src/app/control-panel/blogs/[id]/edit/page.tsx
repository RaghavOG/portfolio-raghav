import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Blog';

interface EditBlogPageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: 'Edit Blog Post | Admin Panel',
  description: 'Edit and update your blog post.',
};

async function getBlogPost(id: string) {
  try {
    await connectDB();
    const blog = await (Blog as any).findById(id).lean();
    
    if (!blog) {
      return null;
    }

    // Convert MongoDB document to plain object and serialize dates
    return {
      ...blog,
      _id: blog._id.toString(),
      publishedAt: blog.publishedAt ? blog.publishedAt.toISOString() : null,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const blog = await getBlogPost(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl font-bold font-space-grotesk text-white">
          Edit Blog Post
        </h1>
        <p className="text-white/70 font-inter mt-2">
          Update and modify your blog post
        </p>
      </div>

      <BlogEditor blogData={blog} />
    </div>
  );
}
