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
        .blog-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .blog-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #2d3748;
        }
        .blog-excerpt {
            color: #4a5568;
            margin-bottom: 25px;
            line-height: 1.6;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            margin-bottom: 30px;
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
        .unsubscribe {
            color: #a0aec0;
            text-decoration: none;
            font-size: 12px;
        }
        @media (max-width: 600px) {
            body { padding: 10px; }
            .header, .content { padding: 20px 15px; }
            .blog-title { font-size: 20px; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📝 New Blog Post!</h1>
        ${data.name ? `<p>Hi ${data.name},</p>` : '<p>Hi there,</p>'}
        <p>I've just published a new blog post that I think you'll enjoy.</p>
    </div>
    
    <div class="content">
        ${data.blogFeaturedImage ? `<img src="${data.blogFeaturedImage}" alt="${data.blogTitle}" class="blog-image">` : ''}
        
        <h2 class="blog-title">${data.blogTitle}</h2>
        
        <p class="blog-excerpt">${data.blogExcerpt}</p>
        
        <a href="${data.blogUrl}" class="cta-button">Read Full Post →</a>
        
        <p style="color: #718096; font-size: 14px;">
            Thanks for being part of my newsletter community! I hope you find this post valuable.
        </p>
    </div>
    
    <div class="footer">
        <p>
            <strong>Raghav's Blog</strong><br>
            Personal insights on technology, development, and career growth
        </p>
        <p>
            <a href="UNSUBSCRIBE_URL" class="unsubscribe">Unsubscribe from these emails</a>
        </p>
    </div>
</body>
</html>
  `.trim();
}

// Generate plain text version
export function generateNewsletterText(data: BlogNotificationData & { name?: string }): string {
  return `
New Blog Post: ${data.blogTitle}

${data.name ? `Hi ${data.name},` : 'Hi there,'}

I've just published a new blog post that I think you'll enjoy.

${data.blogTitle}

${data.blogExcerpt}

Read the full post: ${data.blogUrl}

Thanks for being part of my newsletter community!

---
Raghav's Blog
Personal insights on technology, development, and career growth

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
    };

    if (emailData.isHtml) {
      emailOptions.html = emailData.content;
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
