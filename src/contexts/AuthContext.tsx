import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionInfo: SessionInfo | null;
  login: (password: string) => Promise<{ success: boolean; error?: string; remainingAttempts?: number; blockedUntil?: number }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

interface SessionInfo {
  expiresAt: number;
  isExpiringSoon: boolean;
  timeUntilExpiry: number;
  lastActivity: number;
  sessionId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setSessionInfo({
          expiresAt: data.expiresAt,
          isExpiringSoon: data.isExpiringSoon,
          timeUntilExpiry: data.timeUntilExpiry,
          lastActivity: data.lastActivity,
          sessionId: data.sessionId,
        });
        return true;
      } else {
        setIsAuthenticated(false);
        setSessionInfo(null);
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setSessionInfo(null);
      return false;
    }
  }, []);

  const login = async (password: string): Promise<{ success: boolean; error?: string; remainingAttempts?: number; blockedUntil?: number }> => {
    try {
      const response = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        // Refresh session info after successful login
        await checkAuth();
        return { success: true };
      } else {
        setIsAuthenticated(false);
        setSessionInfo(null);
        
        if (response.status === 429) {
          return {
            success: false,
            error: data.error || 'Too many attempts',
            remainingAttempts: data.remainingAttempts,
            blockedUntil: data.blockedUntil,
          };
        }
        
        return {
          success: false,
          error: data.error || 'Login failed',
          remainingAttempts: data.remainingAttempts,
        };
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      setSessionInfo(null);
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/admin', {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setSessionInfo(null);
      router.push('/control-panel/login');
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      // Skip auth check for login page
      if (pathname === '/control-panel/login') {
        setIsLoading(false);
        return;
      }

      // Check if we're on a protected route
      if (pathname?.startsWith('/control-panel')) {
        const isValid = await checkAuth();
        
        if (!isValid) {
          router.push('/control-panel/login');
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, [pathname, router, checkAuth]);

  // Auto-logout on token expiry and session monitoring (check every 2 minutes)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      const isValid = await checkAuth();
      if (!isValid && pathname?.startsWith('/control-panel') && pathname !== '/control-panel/login') {
        router.push('/control-panel/login');
      }
    }, 2 * 60 * 1000); // 2 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated, pathname, router, checkAuth]);

  // Session expiry warning
  useEffect(() => {
    if (!sessionInfo?.isExpiringSoon) return;

    const warningShown = sessionStorage.getItem(`session-warning-${sessionInfo.sessionId}`);
    if (!warningShown) {
      console.warn('Session will expire soon. Please save your work.');
      sessionStorage.setItem(`session-warning-${sessionInfo.sessionId}`, 'true');
    }
  }, [sessionInfo]);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      sessionInfo,
      login,
      logout,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
