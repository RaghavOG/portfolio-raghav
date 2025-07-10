import { Metadata } from 'next';
import NewsletterList from '@/components/admin/NewsletterList';

export const metadata: Metadata = {
  title: 'Newsletter Management | Admin Panel',
  description: 'Manage newsletter subscribers and email campaigns.',
};

export default function AdminNewsletterPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl font-bold font-space-grotesk text-white">
          Newsletter Management
        </h1>
        <p className="text-white/70 font-inter mt-2">
          Manage newsletter subscribers and send email campaigns
        </p>
      </div>

      <NewsletterList />
    </div>
  );
}
