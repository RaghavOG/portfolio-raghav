import mongoose, { Document, Model } from 'mongoose';
import connectDB from './mongodb';

interface IAdminRateLimit extends Document {
  identifier: string;
  attempts: number;
  lastAttempt: Date;
  blockedUntil?: Date;
  createdAt: Date;
}

// Define the schema
const adminRateLimitSchema = new mongoose.Schema({
  identifier: { type: String, required: true, unique: true },
  attempts: { type: Number, default: 0 },
  lastAttempt: { type: Date, default: Date.now },
  blockedUntil: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

// Create the model with proper typing
let AdminRateLimitModel: Model<IAdminRateLimit>;
try {
  AdminRateLimitModel = mongoose.model<IAdminRateLimit>('AdminRateLimit');
} catch {
  AdminRateLimitModel = mongoose.model<IAdminRateLimit>('AdminRateLimit', adminRateLimitSchema);
}

const MAX_LOGIN_ATTEMPTS = 5;
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes
const RESET_WINDOW = 60 * 60 * 1000; // 1 hour

export async function checkAdminRateLimit(ipAddress: string): Promise<{
  allowed: boolean;
  remainingAttempts: number;
  resetTime?: number;
  blockedUntil?: number;
}> {
  try {
    await connectDB();
    
    const now = new Date();
    const identifier = `admin_login_${ipAddress}`;
    
    // Find existing rate limit record
    let record = await AdminRateLimitModel.findOne({ identifier });
    
    if (!record) {
      // Create new record
      record = new AdminRateLimitModel({
        identifier,
        attempts: 0,
        lastAttempt: now,
        createdAt: now,
      });
      await record.save();
    }
    
    // Check if currently blocked
    if (record.blockedUntil && now < record.blockedUntil) {
      return {
        allowed: false,
        remainingAttempts: 0,
        blockedUntil: record.blockedUntil.getTime(),
      };
    }
    
    // Reset attempts if window has passed
    const timeSinceLastAttempt = now.getTime() - record.lastAttempt.getTime();
    if (timeSinceLastAttempt > RESET_WINDOW) {
      record.attempts = 0;
      record.lastAttempt = now;
      record.blockedUntil = undefined;
      await record.save();
    }
    
    const remainingAttempts = MAX_LOGIN_ATTEMPTS - record.attempts;
    
    if (remainingAttempts <= 0) {
      // Block the IP
      const blockedUntil = new Date(now.getTime() + BLOCK_DURATION);
      record.blockedUntil = blockedUntil;
      record.lastAttempt = now;
      await record.save();
      
      return {
        allowed: false,
        remainingAttempts: 0,
        blockedUntil: blockedUntil.getTime(),
      };
    }
    
    return {
      allowed: true,
      remainingAttempts,
      resetTime: now.getTime() + RESET_WINDOW,
    };
    
  } catch (error) {
    console.error('Admin rate limit check error:', error);
    // Allow on error to prevent locking out legitimate users
    return {
      allowed: true,
      remainingAttempts: MAX_LOGIN_ATTEMPTS,
    };
  }
}

export async function recordAdminLoginAttempt(ipAddress: string, success: boolean): Promise<void> {
  try {
    await connectDB();
    
    const identifier = `admin_login_${ipAddress}`;
    const now = new Date();
    
    if (success) {
      // Reset on successful login
      await AdminRateLimitModel.findOneAndUpdate(
        { identifier },
        {
          $set: {
            attempts: 0,
            lastAttempt: now,
          },
          $unset: { blockedUntil: 1 },
        },
        { upsert: true }
      );
    } else {
      // Increment failed attempts
      await AdminRateLimitModel.findOneAndUpdate(
        { identifier },
        {
          $inc: { attempts: 1 },
          $set: { lastAttempt: now },
          $setOnInsert: { createdAt: now },
        },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error('Admin login attempt recording error:', error);
  }
}

export async function cleanupExpiredAdminRateLimits(): Promise<void> {
  try {
    await connectDB();
    
    const cutoff = new Date(Date.now() - (24 * 60 * 60 * 1000)); // 24 hours ago
    
    await AdminRateLimitModel.deleteMany({
      lastAttempt: { $lt: cutoff },
      $or: [
        { blockedUntil: { $exists: false } },
        { blockedUntil: { $lt: new Date() } }
      ]
    });
  } catch (error) {
    console.error('Admin rate limit cleanup error:', error);
  }
}
