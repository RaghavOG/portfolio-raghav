'use client'

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Mail, BarChart3, Home, Clock, BookOpen, Users, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import SecurityMonitor from '@/components/SecurityMonitor';
import { useEffect, useState } from 'react';

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, isAuthenticated, checkAuth } = useAuth();
  const [sessionInfo, setSessionInfo] = useState<{
    timeUntilExpiry?: number;
    isExpiringSoon?: boolean;
  }>({});

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        if (response.ok) {
          const data = await response.json();
          setSessionInfo({
            timeUntilExpiry: data.timeUntilExpiry,
            isExpiringSoon: data.isExpiringSoon
          });
        }
      } catch (error) {
        console.error('Session check failed:', error);
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
  };

  // Don't show layout on login page
  if (pathname === '/control-panel/login') {
    return children;
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/control-panel',
      icon: BarChart3,
      current: pathname === '/control-panel'
    },
    {
      name: 'Contact Messages',
      href: '/control-panel/contacts',
      icon: Mail,
      current: pathname.startsWith('/control-panel/contacts')
    },
    {
      name: 'Blog Management',
      href: '/control-panel/blogs',
      icon: BookOpen,
      current: pathname.startsWith('/control-panel/blogs')
    },
    {
      name: 'Newsletter',
      href: '/control-panel/newsletter',
      icon: Users,
      current: pathname.startsWith('/control-panel/newsletter')
    }
  ];

  const formatTimeRemaining = (milliseconds?: number) => {
    if (!milliseconds) return '';
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black">
        {/* Session expiry warning */}
        {sessionInfo.isExpiringSoon && (
          <div className="bg-yellow-600 text-white px-4 py-2 text-center text-sm font-inter">
            <Clock className="inline h-4 w-4 mr-1" />
            Session expires in {formatTimeRemaining(sessionInfo.timeUntilExpiry)}. Save your work.
          </div>
        )}

        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-black border-r border-white/10">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <h1 className="text-xl font-bold text-white font-space-grotesk">Control Panel</h1>
              <p className="text-sm text-white/60 mt-1 font-inter">Portfolio Admin</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 font-inter ${
                      item.current
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-all duration-300 border border-transparent hover:border-white/10 font-inter"
              >
                <Home className="h-5 w-5" />
                View Portfolio
              </Link>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start gap-3 text-white/70 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10 font-inter"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-64">
          <main className="p-8 bg-black min-h-screen">
            {children}
          </main>
          
          {/* Security Monitor */}
          <SecurityMonitor />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
