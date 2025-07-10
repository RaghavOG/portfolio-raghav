'use client'

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Eye, EyeOff, Shield, Clock, Activity } from 'lucide-react';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();

  const redirectTo = searchParams.get('redirect') || '/control-panel';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  // Handle blocked state countdown
  useEffect(() => {
    if (!blockedUntil) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = blockedUntil - now;

      if (remaining <= 0) {
        setBlockedUntil(null);
        setError('');
        setRemainingAttempts(null);
        return;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [blockedUntil]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (blockedUntil && Date.now() < blockedUntil) {
      setError(`Account temporarily locked. Try again in ${timeRemaining}.`);
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(password);
      
      if (result.success) {
        router.push(redirectTo);
      } else {
        setError(result.error || 'Login failed');
        setRemainingAttempts(result.remainingAttempts || null);
        
        if (result.blockedUntil) {
          setBlockedUntil(result.blockedUntil);
        }
        
        setPassword('');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isBlocked = blockedUntil && Date.now() < blockedUntil;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 shadow-xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-blue-400 mr-2" />
              <h1 className="text-3xl font-bold font-space-grotesk text-white">Control Panel</h1>
            </div>
            <p className="text-white/70 font-inter">Secure admin authentication required</p>
            {redirectTo !== '/control-panel' && (
              <p className="text-sm text-blue-300 mt-2 font-inter">
                You'll be redirected after login
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-400/30 text-red-300 p-3 rounded-lg text-sm flex items-center gap-2 font-inter">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {isBlocked && (
              <div className="bg-red-500/20 border border-red-400/40 text-red-200 p-4 rounded-lg text-sm font-inter">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold">Account Temporarily Locked</span>
                </div>
                <p>Too many failed attempts. Try again in: {timeRemaining}</p>
              </div>
            )}

            {remainingAttempts !== null && remainingAttempts < 3 && !isBlocked && (
              <div className="bg-yellow-500/10 border border-yellow-400/30 text-yellow-300 p-3 rounded-lg text-sm flex items-center gap-2 font-inter">
                <AlertCircle className="h-4 w-4" />
                Warning: {remainingAttempts} attempts remaining before lockout.
              </div>
            )}

            <div>
              <Label htmlFor="password" className="text-white font-medium mb-2 block font-inter">
                Admin Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  disabled={isLoading || isBlocked}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:bg-white/10 pr-10 font-inter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  disabled={isBlocked}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || isBlocked}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 disabled:opacity-50 disabled:cursor-not-allowed font-inter transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </>
              ) : isBlocked ? (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Locked ({timeRemaining})
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Secure Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-white/70 hover:text-white text-sm transition-colors font-inter"
            >
              ← Back to Portfolio
            </Link>
          </div>

          {/* Enhanced Security info */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-xs text-white/50 space-y-2 font-inter">
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3" />
                <span>Enhanced security with rate limiting</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>Session expires after 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3" />
                <span>Auto-logout on inactivity (4 hours)</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-3 w-3" />
                <span>All admin actions are logged</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white font-inter">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
