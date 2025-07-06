'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface DashboardStats {
  totalSubmissions: number;
  pendingSubmissions: number;
  readSubmissions: number;
  repliedSubmissions: number;
  recentSubmissions: Array<{
    _id: string;
    name: string;
    email: string;
    message: string;
    status: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-lg h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Messages',
      value: stats?.totalSubmissions || 0,
      icon: Mail,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      title: 'Pending',
      value: stats?.pendingSubmissions || 0,
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    {
      title: 'Read',
      value: stats?.readSubmissions || 0,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      title: 'Replied',
      value: stats?.repliedSubmissions || 0,
      icon: AlertCircle,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    }
  ];

  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your portfolio contact submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Submissions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recent Messages</h2>
            <Link
              href="/control-panel/contacts"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
        </div>
        
        <div className="p-6">
          {stats?.recentSubmissions && stats.recentSubmissions.length > 0 ? (
            <div className="space-y-4">
              {stats.recentSubmissions.slice(0, 5).map((submission) => (
                <div key={submission._id} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-white">{submission.name}</h3>
                      <p className="text-sm text-gray-400">{submission.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        submission.status === 'pending'
                          ? 'bg-yellow-400/10 text-yellow-400'
                          : submission.status === 'read'
                          ? 'bg-green-400/10 text-green-400'
                          : 'bg-purple-400/10 text-purple-400'
                      }`}>
                        {submission.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {submission.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No messages yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
