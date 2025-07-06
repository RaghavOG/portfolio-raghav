'use client'

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Mail, BarChart3, Home, Clock } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-900">
        {/* Session expiry warning */}
        {sessionInfo.isExpiringSoon && (
          <div className="bg-yellow-600 text-white px-4 py-2 text-center text-sm">
            <Clock className="inline h-4 w-4 mr-1" />
            Session expires in {formatTimeRemaining(sessionInfo.timeUntilExpiry)}. Save your work.
          </div>
        )}

        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-700">
              <h1 className="text-xl font-bold text-white">Control Panel</h1>
              <p className="text-sm text-gray-400 mt-1">Portfolio Admin</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      item.current
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
              >
                <Home className="h-5 w-5" />
                View Portfolio
              </Link>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-64">
          <main className="p-8">
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
