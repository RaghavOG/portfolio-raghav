import mongoose from 'mongoose';

export interface INewsletter {
  email: string;
  name?: string;
  status: 'subscribed' | 'unsubscribed' | 'pending';
  subscribedAt: Date;
  unsubscribedAt?: Date;
  confirmedAt?: Date;
  source?: string;
}

const NewsletterSchema = new mongoose.Schema<INewsletter>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  name: {
    type: String,
    trim: true,
    maxlength: 100
  },
  status: {
    type: String,
    enum: ['subscribed', 'unsubscribed', 'pending'],
    default: 'subscribed'
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: {
    type: Date
  },
  confirmedAt: {
    type: Date
  },
  source: {
    type: String,
    default: 'website'
  }
}, {
  timestamps: true
});

// Create indexes (email index is automatically created by unique: true)
NewsletterSchema.index({ status: 1 });
NewsletterSchema.index({ subscribedAt: -1 });

const Newsletter = mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);

export default Newsletter;
