import mongoose, { Document, Schema } from 'mongoose';

// Interfaces
interface IContactSubmission extends Document {
  name: string;
  email: string;
  message: string;
  ipAddress: string;
  userAgent: string;
  status: 'pending' | 'read' | 'replied';
  emailSent: boolean;
  emailError?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IRateLimit extends Document {
  identifier: string;
  requests: Array<{ timestamp: Date }>;
  windowStart: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Contact Form Submission Schema
const contactSubmissionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'read', 'replied'],
    default: 'pending'
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  emailError: {
    type: String,
    default: null
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Rate Limit Schema
const rateLimitSchema = new Schema({
  identifier: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  requests: [{
    timestamp: {
      type: Date,
      required: true
    }
  }],
  windowStart: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Add TTL index to automatically delete old rate limit entries after 1 hour
rateLimitSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 3600 });

// Add indexes for better query performance
contactSubmissionSchema.index({ createdAt: -1 });
contactSubmissionSchema.index({ status: 1 });
contactSubmissionSchema.index({ ipAddress: 1, createdAt: -1 });

export const ContactSubmission = (mongoose.models.ContactSubmission as mongoose.Model<IContactSubmission>) || 
  mongoose.model<IContactSubmission>('ContactSubmission', contactSubmissionSchema);

export const RateLimit = (mongoose.models.RateLimit as mongoose.Model<IRateLimit>) || 
  mongoose.model<IRateLimit>('RateLimit', rateLimitSchema);
