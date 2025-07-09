import { Metadata } from 'next';
import NewsletterList from '@/components/admin/NewsletterList';

export const metadata: Metadata = {
  title: 'Newsletter Management | Admin Panel',
  description: 'Manage newsletter subscribers and email campaigns.',
};

export default function AdminNewsletterPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Newsletter Management
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage newsletter subscribers and send email campaigns
        </p>
      </div>

      <NewsletterList />
    </div>
  );
}
