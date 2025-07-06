import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminToken, refreshAdminToken } from '@/lib/auth';

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp.trim();
  }
  
  return 'unknown';
}

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/control-panel')) {
    // Skip auth check for login page
    if (request.nextUrl.pathname === '/control-panel/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get('admin-token')?.value;
    const ipAddress = getClientIp(request);
    const userAgent = request.headers.get('user-agent') || '';

    if (!token) {
      const response = NextResponse.redirect(new URL('/control-panel/login', request.url));
      // Add security headers
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      return response;
    }

    const session = verifyAdminToken(token, ipAddress, userAgent);

    if (!session) {
      // Clear invalid token and redirect
      const response = NextResponse.redirect(new URL('/control-panel/login', request.url));
      response.cookies.delete('admin-token');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      return response;
    }

    // Check if token needs refresh (last activity > 30 minutes ago)
    const needsRefresh = Date.now() - session.lastActivity > (30 * 60 * 1000);
    
    if (needsRefresh) {
      const newToken = refreshAdminToken(token, ipAddress, userAgent);
      
      if (newToken) {
        const response = NextResponse.next();
        response.cookies.set('admin-token', newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60, // 24 hours
          path: '/'
        });
        // Add security headers
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        return response;
      } else {
        // Token refresh failed, force re-login
        const response = NextResponse.redirect(new URL('/control-panel/login', request.url));
        response.cookies.delete('admin-token');
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        return response;
      }
    }

    // Add security headers to valid requests
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/control-panel/:path*'
};
