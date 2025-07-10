'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, Upload, X, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { BLOG_CATEGORIES } from '@/lib/blog-utils';
import LoadingSpinner from '@/components/ui/loading-spinner';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';

interface BlogData {
  _id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  author: string;
  featuredImage?: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface BlogEditorProps {
  blogData?: BlogData;
}

export default function BlogEditor({ blogData }: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [sendNewsletterNotification, setSendNewsletterNotification] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showNewsletterPreview, setShowNewsletterPreview] = useState(false);

  const [formData, setFormData] = useState<BlogData>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Raghav',
    featuredImage: '',
    tags: [],
    category: 'Technology',
    status: 'draft',
    publishedAt: '',
    seoTitle: '',
    seoDescription: '',
    ...blogData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (blogData) {
      setFormData(blogData);
    }
  }, [blogData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const renderNewsletterPreview = () => {
    if (!showNewsletterPreview) return null;

    const previewData = {
      blogTitle: formData.title || 'Your Blog Title',
      blogExcerpt: formData.excerpt || 'Your blog excerpt will appear here...',
      blogUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${formData.slug || 'blog-slug'}`,
      blogFeaturedImage: formData.featuredImage
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Newsletter Preview
              </h3>
              <button
                onClick={() => setShowNewsletterPreview(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Email Preview */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  New Blog Post Published!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We thought you'd be interested in our latest post
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
                {previewData.blogFeaturedImage && (
                  <img
                    src={previewData.blogFeaturedImage}
                    alt={previewData.blogTitle}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {previewData.blogTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {previewData.blogExcerpt}
                </p>
                <a
                  href={previewData.blogUrl}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Read Full Article
                </a>
              </div>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>Thank you for subscribing to our newsletter!</p>
                <p className="mt-2">
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Unsubscribe
                  </a> | 
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline ml-2">
                    Update Preferences
                  </a>
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowNewsletterPreview(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowNewsletterPreview(false);
                  handleSave('published');
                }}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {saving ? 'Publishing...' : 'Publish & Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (status?: 'draft' | 'published' | 'archived') => {
    const finalStatus = status || formData.status;
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const url = blogData?._id ? `/api/blog/${blogData.slug || blogData._id}` : '/api/blog';
      const method = blogData?._id ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        status: finalStatus,
        publishedAt: finalStatus === 'published' && !formData.publishedAt 
          ? new Date().toISOString() 
          : formData.publishedAt
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save blog post');
      }

      const savedBlog = await response.json();
      
      // Send newsletter notification if publishing and option is checked
      if (finalStatus === 'published' && sendNewsletterNotification) {
        setNotificationStatus('Sending newsletter...');
        try {
          const notificationResponse = await fetch('/api/newsletter/notify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              blogData: {
                blogTitle: savedBlog.title,
                blogExcerpt: savedBlog.excerpt,
                blogUrl: `${window.location.origin}/blog/${savedBlog.slug}`,
                blogFeaturedImage: savedBlog.featuredImage
              },
              sendEmails: true
            }),
          });

          if (notificationResponse.ok) {
            const notificationResult = await notificationResponse.json();
            setNotificationStatus(`Newsletter sent to ${notificationResult.result?.sent || 0} subscribers!`);
            setShowSuccessMessage(true);
            setTimeout(() => {
              setNotificationStatus('');
              setShowSuccessMessage(false);
            }, 5000);
          } else {
            setNotificationStatus('Newsletter sending failed');
            setTimeout(() => setNotificationStatus(''), 3000);
          }
        } catch (notificationError) {
          console.error('Newsletter notification error:', notificationError);
          setNotificationStatus('Newsletter sending failed');
          setTimeout(() => setNotificationStatus(''), 3000);
        }
      } else {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
      
      // Only redirect if we're not sending newsletter (to show status)
      if (!(finalStatus === 'published' && sendNewsletterNotification)) {
        setTimeout(() => {
          router.push('/control-panel/blogs');
        }, 1500);
      } else {
        // Redirect after showing newsletter status
        setTimeout(() => {
          router.push('/control-panel/blogs');
        }, 3000);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert(error instanceof Error ? error.message : 'Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  const renderPreview = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
              {formData.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {formData.title || 'Untitled Post'}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 italic border-l-4 border-blue-500 pl-6">
            {formData.excerpt || 'No excerpt provided'}
          </p>
          
          {formData.featuredImage && (
            <div className="mb-8">
              <img
                src={formData.featuredImage}
                alt={formData.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <MarkdownRenderer 
            content={formData.content || 'No content yet...'}
            className="max-w-none"
          />
          
          {formData.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Preview</h2>
          <button
            onClick={() => setPreviewMode(false)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
            Close Preview
          </button>
        </div>
        {renderPreview()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success and Status Messages */}
      {showSuccessMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                Blog post saved successfully!
              </h3>
              {notificationStatus && (
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  {notificationStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {notificationStatus && !showSuccessMessage && (
        <div className={`border rounded-lg p-4 ${
          notificationStatus.includes('failed') 
            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
        }`}>
          <div className="flex items-center">
            {notificationStatus.includes('failed') ? (
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
            ) : (
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
            )}
            <p className={`text-sm ${
              notificationStatus.includes('failed')
                ? 'text-red-800 dark:text-red-200'
                : 'text-blue-800 dark:text-blue-200'
            }`}>
              {notificationStatus}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          
          <button
            onClick={() => {
              if (sendNewsletterNotification && !saving) {
                setShowNewsletterPreview(true);
              } else {
                handleSave('published');
              }
            }}
            disabled={saving}
            className={`inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors ${
              sendNewsletterNotification ? 'bg-blue-600 ring-2 ring-blue-300 dark:ring-blue-500' : 'bg-blue-600'
            }`}
          >
            {sendNewsletterNotification ? (
              <Mail className="w-4 h-4" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {saving ? (
              notificationStatus.includes('Sending') ? 'Sending Newsletter...' : 'Publishing...'
            ) : (
              sendNewsletterNotification ? 'Preview & Publish' : 'Publish'
            )}
          </button>
          
          <button
            onClick={() => setPreviewMode(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Status: <span className="font-medium capitalize">{formData.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog post title..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.title ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief description of the blog post..."
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical ${
                    errors.excerpt ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700`}
                />
                {errors.excerpt && (
                  <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your blog post content here... You can use Markdown syntax."
                  rows={20}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical font-mono text-sm ${
                    errors.content ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } dark:bg-gray-700`}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Supports Markdown syntax for formatting, code blocks, and more.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publication Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">Publication</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700 ${
                    errors.category ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {BLOG_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700"
                />
              </div>

              {formData.status === 'published' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    name="publishedAt"
                    value={formData.publishedAt ? new Date(formData.publishedAt).toISOString().slice(0, 16) : ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700"
                  />
                </div>
              )}

              {/* Newsletter Notification Option */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="sendNewsletter"
                      checked={sendNewsletterNotification}
                      onChange={(e) => setSendNewsletterNotification(e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <label htmlFor="sendNewsletter" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Send newsletter notification
                        </div>
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Notify all newsletter subscribers when this post is published
                      </p>
                    </div>
                  </div>
                  
                  {sendNewsletterNotification && (
                    <div className="ml-7">
                      <button
                        type="button"
                        onClick={() => setShowNewsletterPreview(true)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        Preview Email
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">Featured Image</h3>
            <div>
              <input
                type="url"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleInputChange}
                placeholder="Image URL..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700"
              />
              {formData.featuredImage && (
                <div className="mt-4">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700 text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Add
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleInputChange}
                  placeholder="SEO optimized title (max 60 chars)"
                  maxLength={60}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700 text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.seoTitle.length}/60 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  SEO Description
                </label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleInputChange}
                  placeholder="SEO meta description (max 160 chars)"
                  maxLength={160}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700 text-sm resize-vertical"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.seoDescription.length}/160 characters
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Preview Modal */}
      {renderNewsletterPreview()}
    </div>
  );
}
