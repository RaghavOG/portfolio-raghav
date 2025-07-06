import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, generateAdminToken } from '@/lib/auth';
import { checkAdminRateLimit, recordAdminLoginAttempt } from '@/lib/admin-rate-limit';

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

export async function POST(request: NextRequest) {
  const ipAddress = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || '';
  
  try {
    // Check rate limiting first
    const rateLimitResult = await checkAdminRateLimit(ipAddress);
    
    if (!rateLimitResult.allowed) {
      const response = NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          blockedUntil: rateLimitResult.blockedUntil,
          remainingAttempts: 0
        },
        { status: 429 }
      );
      
      // Add security headers
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      
      return response;
    }

    const { password } = await request.json();

    if (!password) {
      await recordAdminLoginAttempt(ipAddress, false);
      return NextResponse.json(
        { 
          error: 'Password is required',
          remainingAttempts: rateLimitResult.remainingAttempts - 1 
        },
        { status: 400 }
      );
    }

    const isValidPassword = await verifyAdminPassword(password);

    if (!isValidPassword) {
      await recordAdminLoginAttempt(ipAddress, false);
      
      // Add a delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRateLimit = await checkAdminRateLimit(ipAddress);
      
      return NextResponse.json(
        { 
          error: 'Invalid password',
          remainingAttempts: Math.max(0, newRateLimit.remainingAttempts - 1),
          blockedUntil: newRateLimit.blockedUntil
        },
        { status: 401 }
      );
    }

    // Successful login
    await recordAdminLoginAttempt(ipAddress, true);
    
    const token = generateAdminToken(ipAddress, userAgent);

    // Set HTTP-only cookie for security
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    });

    // Add security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;

  } catch (error) {
    console.error('Admin login error:', error);
    await recordAdminLoginAttempt(ipAddress, false);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Logout endpoint
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  );

  response.cookies.delete('admin-token');
  return response;
}
