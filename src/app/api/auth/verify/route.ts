import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(request: NextRequest) {
  const ipAddress = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || '';
  
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const session = verifyAdminToken(token, ipAddress, userAgent);

    if (!session || !session.isAdmin) {
      const response = NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
      // Clear invalid token
      response.cookies.delete('admin-token');
      return response;
    }

    // Check if token is about to expire (less than 1 hour remaining)
    const timeUntilExpiry = session.expiresAt - Date.now();
    const isExpiringSoon = timeUntilExpiry < (60 * 60 * 1000); // 1 hour

    // Check if session needs refresh (inactive for more than 30 minutes)
    const timeSinceActivity = Date.now() - session.lastActivity;
    const needsRefresh = timeSinceActivity > (30 * 60 * 1000); // 30 minutes

    let newToken = null;
    if (needsRefresh || isExpiringSoon) {
      newToken = refreshAdminToken(token, ipAddress, userAgent);
    }

    const response = NextResponse.json(
      { 
        isValid: true, 
        expiresAt: session.expiresAt,
        isExpiringSoon,
        timeUntilExpiry,
        lastActivity: session.lastActivity,
        sessionId: session.sessionId,
        needsRefresh: needsRefresh || isExpiringSoon
      },
      { status: 200 }
    );

    // Set refreshed token if available
    if (newToken) {
      response.cookies.set('admin-token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/'
      });
    }

    // Add security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');

    return response;

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Token verification failed' },
      { status: 500 }
    );
  }
}
