import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.ADMIN_SESSION_SECRET || 'fallback-secret-key';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export interface AdminSession {
  isAdmin: boolean;
  loginTime: number;
  expiresAt: number;
  sessionId: string;
  lastActivity: number;
  ipAddress?: string;
  userAgent?: string;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    // For simple comparison (you can hash the password in env if needed)
    return password === ADMIN_PASSWORD;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

export function generateAdminToken(ipAddress?: string, userAgent?: string): string {
  const sessionId = generateSessionId();
  const now = Date.now();
  
  const payload: AdminSession = {
    isAdmin: true,
    loginTime: now,
    lastActivity: now,
    expiresAt: now + (24 * 60 * 60 * 1000), // 24 hours
    sessionId,
    ipAddress,
    userAgent,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15) + 
         Date.now().toString(36);
}

export function verifyAdminToken(token: string, ipAddress?: string, userAgent?: string): AdminSession | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminSession;
    
    // Check if token is expired
    if (decoded.expiresAt < Date.now()) {
      return null;
    }

    // Check if session is too old (beyond max session time)
    const maxSessionTime = 7 * 24 * 60 * 60 * 1000; // 7 days
    if (Date.now() - decoded.loginTime > maxSessionTime) {
      return null;
    }

    // Check if session has been inactive for too long
    const maxInactivity = 4 * 60 * 60 * 1000; // 4 hours
    if (Date.now() - decoded.lastActivity > maxInactivity) {
      return null;
    }

    // Optional: Check IP and User Agent for additional security
    // This is disabled by default as it can cause issues with proxies/VPNs
    // if (ipAddress && decoded.ipAddress && decoded.ipAddress !== ipAddress) {
    //   console.warn('IP address mismatch in token verification');
    //   return null;
    // }
    
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export function refreshAdminToken(currentToken: string, ipAddress?: string, userAgent?: string): string | null {
  try {
    const session = verifyAdminToken(currentToken, ipAddress, userAgent);
    if (!session) {
      return null;
    }

    // Update last activity
    const updatedSession: AdminSession = {
      ...session,
      lastActivity: Date.now(),
    };

    return jwt.sign(updatedSession, JWT_SECRET, { expiresIn: '24h' });
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
