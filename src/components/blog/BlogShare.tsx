'use client';

import { 
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton, 
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon
} from 'react-share';
import { Share, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface BlogShareProps {
  url: string;
  title: string;
  description: string;
}

export default function BlogShare({ url, title, description }: BlogShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Share className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Share this post
        </h3>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <TwitterShareButton
          url={url}
          title={title}
          className="hover:opacity-80 transition-opacity"
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        <LinkedinShareButton
          url={url}
          title={title}
          summary={description}
          className="hover:opacity-80 transition-opacity"
        >
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>

        <FacebookShareButton
          url={url}
          hashtag="#webdevelopment"
          className="hover:opacity-80 transition-opacity"
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <WhatsappShareButton
          url={url}
          title={title}
          className="hover:opacity-80 transition-opacity"
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        <EmailShareButton
          url={url}
          subject={title}
          body={description}
          className="hover:opacity-80 transition-opacity"
        >
          <EmailIcon size={40} round />
        </EmailShareButton>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
