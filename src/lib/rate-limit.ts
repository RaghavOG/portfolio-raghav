import { RateLimit } from '@/models/Contact';
import connectDB from '@/lib/mongodb';

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

export class MongoRateLimit {
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 3) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  async check(identifier: string): Promise<RateLimitResult> {
    await connectDB();

    const now = new Date();
    const windowStart = new Date(now.getTime() - this.windowMs);

    try {
      // Find or create rate limit document for this identifier
      const rateLimitDoc = await RateLimit.findOne({ identifier });

      if (!rateLimitDoc) {
        // Create new rate limit document
        const newRateLimit = new RateLimit({
          identifier,
          requests: [{ timestamp: now }],
          windowStart: now
        });
        await newRateLimit.save();

        return {
          success: true,
          remaining: this.maxRequests - 1,
          resetTime: now.getTime() + this.windowMs
        };
      }

      // Filter out requests outside the current window
      const validRequests = rateLimitDoc.requests.filter(
        (req: any) => new Date(req.timestamp) > windowStart
      );

      // Check if we're over the limit
      if (validRequests.length >= this.maxRequests) {
        return {
          success: false,
          remaining: 0,
          resetTime: new Date(validRequests[0].timestamp).getTime() + this.windowMs
        };
      }

      // Add the current request
      validRequests.push({ timestamp: now });

      // Update the document
      await RateLimit.findByIdAndUpdate(rateLimitDoc._id, {
        requests: validRequests,
        windowStart: windowStart
      });

      return {
        success: true,
        remaining: this.maxRequests - validRequests.length,
        resetTime: now.getTime() + this.windowMs
      };

    } catch (error) {
      console.error('Rate limit check failed:', error);
      // Fail open - allow the request if rate limiting fails
      return {
        success: true,
        remaining: this.maxRequests - 1,
        resetTime: now.getTime() + this.windowMs
      };
    }
  }
}

// Create singleton instance
export const rateLimiter = new MongoRateLimit(15 * 60 * 1000, 3); // 3 requests per 15 minutes

export function getRateLimitHeaders(remaining: number, resetTime: number) {
  return {
    'X-RateLimit-Limit': '3',
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString(),
  };
}
