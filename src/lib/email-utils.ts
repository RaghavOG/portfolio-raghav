// Email utility using Resend for newsletter functionality
import { Resend } from 'resend';
import connectDB from './mongodb';
import Newsletter from '@/models/Newsletter';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

interface NewsletterEmailData {
  to: string;
  name?: string;
  subject: string;
  content: string;
  isHtml?: boolean;
  emailType?: 'newsletter' | 'welcome' | 'blog' | 'contact';
}

interface BlogNotificationData {
  blogTitle: string;
  blogExcerpt: string;
  blogUrl: string;
  blogFeaturedImage?: string;
}

// Generate newsletter email HTML template
export function generateNewsletterHTML(data: BlogNotificationData & { name?: string }): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Blog Post - ${data.blogTitle}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: 600;
        }
        .header p {
            margin: 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px 20px;
        }
        .blog-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #e9ecef;
        }
        .blog-title {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 15px 0;
            color: #2d3748;
            line-height: 1.3;
        }
        .blog-excerpt {
            color: #4a5568;
            margin: 0 0 25px 0;
            line-height: 1.6;
            font-size: 16px;
        }
        .cta-container {
            text-align: center;
            margin: 30px 0;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white !important;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }
        .cta-button:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        }
        .personal-note {
            background-color: #f7fafc;
            border-left: 4px solid #667eea;
            padding: 16px 20px;
            margin: 25px 0;
            border-radius: 0 4px 4px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 25px 20px;
            text-align: center;
            font-size: 14px;
            color: #6c757d;
            border-top: 1px solid #e9ecef;
        }
        .footer-brand {
            font-weight: 600;
            color: #495057;
            margin-bottom: 8px;
        }
        .footer-description {
            margin-bottom: 16px;
            color: #6c757d;
        }
        .unsubscribe-section {
            margin-top: 20px;
            padding-top: 16px;
            border-top: 1px solid #e9ecef;
        }
        .unsubscribe {
            color: #868e96;
            text-decoration: none;
            font-size: 12px;
        }
        .unsubscribe:hover {
            color: #495057;
            text-decoration: underline;
        }
        @media (max-width: 600px) {
            body { padding: 10px; }
            .header, .content { padding: 20px 15px; }
            .blog-title { font-size: 20px; }
            .cta-button { padding: 12px 24px; font-size: 14px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Blog Post Published</h1>
            ${data.name ? `<p>Hi ${data.name},</p>` : '<p>Hi there,</p>'}
            <p>I've just published a new article I think you'll find interesting.</p>
        </div>
        
        <div class="content">
            ${data.blogFeaturedImage ? `<img src="${data.blogFeaturedImage}" alt="${data.blogTitle}" class="blog-image">` : ''}
            
            <h2 class="blog-title">${data.blogTitle}</h2>
            
            <p class="blog-excerpt">${data.blogExcerpt}</p>
            
            <div class="cta-container">
                <a href="${data.blogUrl}" class="cta-button">Read Full Article</a>
            </div>
            
            <div class="personal-note">
                <p style="margin: 0; color: #4a5568; font-size: 14px;">
                    <strong>Personal note:</strong> Thank you for being part of my newsletter community. I share insights about technology, development, and career growth that I hope you'll find valuable.
                </p>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-brand">Raghav Singla</div>
            <div class="footer-description">Full-stack Developer & AI Enthusiast</div>
            <p style="margin: 0; font-size: 13px;">
                You're receiving this because you subscribed to my newsletter at raghavsingla.tech
            </p>
            
            <div class="unsubscribe-section">
                <a href="UNSUBSCRIBE_URL" class="unsubscribe">Unsubscribe from future emails</a>
                <br>
                <span style="font-size: 11px; color: #adb5bd;">
                    Raghav Singla • raghavsingla.tech
                </span>
            </div>
        </div>
    </div>
</body>
</html>
  `.trim();
}

// Generate plain text version
export function generateNewsletterText(data: BlogNotificationData & { name?: string }): string {
  return `
${data.blogTitle}

${data.name ? `Hi ${data.name},` : 'Hi there,'}

I've just published a new article I think you'll find interesting.

${data.blogExcerpt}

Read the full article here: ${data.blogUrl}

---

Personal note: Thank you for being part of my newsletter community. I share insights about technology, development, and career growth that I hope you'll find valuable.

Best regards,
Raghav Singla
Full-stack Developer & AI Enthusiast

You're receiving this because you subscribed to my newsletter at raghavsingla.tech

Unsubscribe: UNSUBSCRIBE_URL
  `.trim();
}

// Send newsletter email using Resend
export async function sendNewsletterEmail(emailData: NewsletterEmailData & { emailType?: 'newsletter' | 'welcome' | 'blog' | 'contact' }): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return false;
    }

    // Use different sender addresses for different email types
    let fromAddress: string;
    switch (emailData.emailType) {
      case 'newsletter':
        fromAddress = 'Raghav Newsletter <newsletter@raghavsingla.tech>';
        break;
      case 'blog':
        fromAddress = 'Raghav Blog <blog@raghavsingla.tech>';
        break;
      case 'welcome':
        fromAddress = 'Raghav <hello@raghavsingla.tech>';
        break;
      case 'contact':
        fromAddress = 'Raghav Portfolio <contact@raghavsingla.tech>';
        break;
      default:
        fromAddress = 'Raghav <info@raghavsingla.tech>';
    }

    const emailOptions: any = {
      from: fromAddress,
      to: emailData.to,
      subject: emailData.subject,
      // Add headers to improve deliverability
      headers: {
        'List-Unsubscribe': '<mailto:unsubscribe@raghavsingla.tech>',
        'List-Id': 'Raghav Singla Newsletter <newsletter.raghavsingla.tech>',
        'Precedence': 'bulk',
        'X-Auto-Response-Suppress': 'OOF, DR, NDR, RN, NRN',
        'X-Entity-Ref-ID': 'raghav-newsletter'
      },
      // Add tags for better tracking and reputation
      tags: [
        {
          name: 'category',
          value: emailData.emailType || 'newsletter'
        }
      ]
    };

    if (emailData.isHtml) {
      emailOptions.html = emailData.content;
      // Always include a text version to improve deliverability
      emailOptions.text = emailData.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    } else {
      emailOptions.text = emailData.content;
    }

    const response = await resend.emails.send(emailOptions);
    
    if (response.error) {
      console.error('Resend error:', response.error);
      return false;
    }

    console.log('✅ Email sent successfully:', response.data?.id);
    return true;
  } catch (error) {
    console.error('Error sending email with Resend:', error);
    return false;
  }
}

// Send blog notification to all active subscribers
export async function sendBlogNotification(blogData: BlogNotificationData): Promise<{
  success: boolean;
  sent: number;
  failed: number;
  errors: string[];
}> {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    await connectDB();
    
    // Get all active subscribers
    const subscribers = await (Newsletter as any).find({ 
      status: 'subscribed' 
    }).lean();

    if (subscribers.length === 0) {
      console.log('No active subscribers found');
      return {
        success: true,
        sent: 0,
        failed: 0,
        errors: []
      };
    }

    const results = {
      success: true,
      sent: 0,
      failed: 0,
      errors: [] as string[]
    };

    // Send emails in batches to avoid rate limiting
    const batchSize = 10;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (subscriber: any) => {
          try {
            const htmlContent = generateNewsletterHTML({
              ...blogData,
              name: subscriber.name
            });
            
            const textContent = generateNewsletterText({
              ...blogData,
              name: subscriber.name
            });

            // Generate unsubscribe URL
            const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;
            
            const finalHtmlContent = htmlContent.replace('UNSUBSCRIBE_URL', unsubscribeUrl);
            const finalTextContent = textContent.replace('UNSUBSCRIBE_URL', unsubscribeUrl);

            const emailSent = await sendNewsletterEmail({
              to: subscriber.email,
              name: subscriber.name,
              subject: `New Blog Post: ${blogData.blogTitle}`,
              content: finalHtmlContent,
              isHtml: true,
              emailType: 'blog'
            });

            if (emailSent) {
              results.sent++;
              console.log(`✅ Email sent to: ${subscriber.email}`);
            } else {
              results.failed++;
              results.errors.push(`Failed to send to ${subscriber.email}`);
            }
          } catch (error) {
            results.failed++;
            const errorMsg = `Error sending to ${subscriber.email}: ${error instanceof Error ? error.message : 'Unknown error'}`;
            results.errors.push(errorMsg);
            console.error(errorMsg);
          }
        })
      );

      // Add delay between batches to respect rate limits
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (results.failed > 0) {
      results.success = false;
    }

    console.log(`📧 Blog notification complete: ${results.sent} sent, ${results.failed} failed`);
    return results;

  } catch (error) {
    console.error('Error sending blog notifications:', error);
    return {
      success: false,
      sent: 0,
      failed: 0,
      errors: [error instanceof Error ? error.message : 'Unknown error']
    };
  }
}

// Send welcome email to new subscribers
export async function sendWelcomeEmail(email: string, name?: string): Promise<boolean> {
  try {
    const welcomeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Raghav's Newsletter!</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #ffffff;
            padding: 30px 20px;
            border: 1px solid #e1e5e9;
        }
        .footer {
            background: #f7fafc;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #718096;
            border-radius: 0 0 10px 10px;
            border: 1px solid #e1e5e9;
            border-top: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Welcome to the Newsletter!</h1>
        ${name ? `<p>Hi ${name},</p>` : '<p>Hi there,</p>'}
    </div>
    
    <div class="content">
        <p>Thank you for subscribing to my newsletter! I'm excited to have you on board.</p>
        
        <p>Here's what you can expect:</p>
        <ul>
            <li>📝 New blog posts about web development, programming, and technology</li>
            <li>💡 Personal insights and lessons learned</li>
            <li>🚀 Updates on my latest projects and experiments</li>
            <li>📚 Curated resources and tools I find valuable</li>
        </ul>
        
        <p>I promise to only send you valuable content and never spam your inbox. You can unsubscribe at any time.</p>
        
        <p>Feel free to reply to this email if you have any questions or just want to say hi!</p>
        
        <p>Best regards,<br>Raghav</p>
    </div>
    
    <div class="footer">
        <p>
            <strong>Raghav's Blog</strong><br>
            Personal insights on technology, development, and career growth
        </p>
    </div>
</body>
</html>
    `;

    const welcomeText = `
Welcome to Raghav's Newsletter!

${name ? `Hi ${name},` : 'Hi there,'}

Thank you for subscribing to my newsletter! I'm excited to have you on board.

Here's what you can expect:
- New blog posts about web development, programming, and technology
- Personal insights and lessons learned
- Updates on my latest projects and experiments
- Curated resources and tools I find valuable

I promise to only send you valuable content and never spam your inbox. You can unsubscribe at any time.

Feel free to reply to this email if you have any questions or just want to say hi!

Best regards,
Raghav

---
Raghav's Blog
Personal insights on technology, development, and career growth
    `;

    return await sendNewsletterEmail({
      to: email,
      name,
      subject: 'Welcome to Raghav\'s Newsletter! 🎉',
      content: welcomeHtml,
      isHtml: true,
      emailType: 'welcome'
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}

// Email service status and configuration
export const EMAIL_SERVICE_STATUS = {
  provider: 'Resend',
  configured: !!process.env.RESEND_API_KEY,
  features: {
    newsletter: true,
    blogNotifications: true,
    welcomeEmails: true,
    unsubscribe: true
  }
};
