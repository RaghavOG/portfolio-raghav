'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  Eye, 
  Edit, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  FileText
} from 'lucide-react';

export default function ControlPanelPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-space-grotesk tracking-tight">
            Dashboard
          </h1>
          <p className="text-xl text-white/70 font-inter">
            Manage your portfolio content and settings
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/60 font-inter">
                  Total Blogs
                </p>
                <p className="text-3xl font-bold text-white font-space-grotesk">
                  1
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/60 font-inter">
                  Newsletter Subscribers
                </p>
                <p className="text-3xl font-bold text-white font-space-grotesk">
                  0
                </p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/60 font-inter">
                  Total Views
                </p>
                <p className="text-3xl font-bold text-white font-space-grotesk">
                  0
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/60 font-inter">
                  Contact Messages
                </p>
                <p className="text-3xl font-bold text-white font-space-grotesk">
                  0
                </p>
              </div>
              <Mail className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blog Management */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-400 mr-3" />
              <h3 className="text-lg font-semibold text-white font-space-grotesk">
                Blog Management
              </h3>
            </div>
            <p className="text-white/60 mb-4 text-sm font-inter">
              Create, edit, and manage your blog posts
            </p>
            <div className="space-y-2">
              <Link
                href="/control-panel/blogs"
                className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium font-inter transition-colors duration-300"
              >
                <Eye className="h-4 w-4 mr-2" />
                View All Blogs
              </Link>
              <Link
                href="/control-panel/blogs/new"
                className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium font-inter transition-colors duration-300"
              >
                <Edit className="h-4 w-4 mr-2" />
                Create New Blog
              </Link>
            </div>
          </div>

          {/* Newsletter Management */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-green-400 mr-3" />
              <h3 className="text-lg font-semibold text-white font-space-grotesk">
                Newsletter
              </h3>
            </div>
            <p className="text-white/60 mb-4 text-sm font-inter">
              Manage newsletter subscribers and campaigns
            </p>
            <div className="space-y-2">
              <Link
                href="/control-panel/newsletter"
                className="flex items-center text-green-400 hover:text-green-300 text-sm font-medium font-inter transition-colors duration-300"
              >
                <Users className="h-4 w-4 mr-2" />
                View Subscribers
              </Link>
            </div>
          </div>

          {/* Contact Management */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Mail className="h-6 w-6 text-orange-400 mr-3" />
              <h3 className="text-lg font-semibold text-white font-space-grotesk">
                Contact Messages
              </h3>
            </div>
            <p className="text-white/60 mb-4 text-sm font-inter">
              Review and respond to contact messages
            </p>
            <div className="space-y-2">
              <Link
                href="/control-panel/contacts"
                className="flex items-center text-orange-400 hover:text-orange-300 text-sm font-medium font-inter transition-colors duration-300"
              >
                <Mail className="h-4 w-4 mr-2" />
                View Messages
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 font-space-grotesk">
              Recent Activity
            </h3>
            <div className="text-center py-8 text-white/50">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-inter">No recent activity to display</p>
              <p className="text-sm font-inter">Create your first blog post to get started!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
