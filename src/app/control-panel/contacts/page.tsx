'use client'

import { useEffect, useState, useCallback } from 'react';
import { Search, Filter, Mail, Calendar, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  emailSent: boolean;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactsResponse {
  submissions: ContactSubmission[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        status: statusFilter
      });

      const response = await fetch(`/api/admin/contacts?${params}`);
      if (response.ok) {
        const data: ContactsResponse = await response.json();
        setContacts(data.submissions);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const updateContactStatus = async (contactId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh the contacts list
        fetchContacts();
      }
    } catch (error) {
      console.error('Failed to update contact status:', error);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
      case 'read':
        return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'replied':
        return 'bg-purple-400/10 text-purple-400 border-purple-400/20';
      default:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    }
  };

  if (loading) {
    return (
      <div className="text-white">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-64"></div>
          <div className="h-12 bg-gray-700 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
        <p className="text-gray-400">Manage and respond to portfolio inquiries</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div key={contact._id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-white text-lg">{contact.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                    {contact.emailSent && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20">
                        Email Sent
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(contact.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {contact.status === 'pending' && (
                    <Button
                      onClick={() => updateContactStatus(contact._id, 'read')}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Mark as Read
                    </Button>
                  )}
                  {contact.status === 'read' && (
                    <Button
                      onClick={() => updateContactStatus(contact._id, 'replied')}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Mark as Replied
                    </Button>
                  )}
                  <a
                    href={`mailto:${contact.email}?subject=Re: Portfolio Contact&body=Hi ${contact.name},%0A%0AThank you for reaching out!%0A%0A`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Reply
                  </a>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Message:</h4>
                <p className="text-white whitespace-pre-wrap leading-relaxed">{contact.message}</p>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p>IP: {contact.ipAddress} • User Agent: {contact.userAgent}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Mail className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No messages found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Previous
          </Button>
          <span className="px-4 py-2 text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
