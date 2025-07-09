// Simple email utility for newsletter functionality
// This is a basic implementation - for production, consider using services like:
// - SendGrid
// - Mailgun
// - AWS SES
// - Resend
// - Nodemailer with your SMTP provider

interface NewsletterEmailData {
  to: string;
  name?: string;
  subject: string;
  content: string;
  isHtml?: boolean;
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

// Mock email sending function
// Replace this with your actual email service implementation
export async function sendNewsletterEmail(emailData: NewsletterEmailData): Promise<boolean> {
  // This is a mock implementation
  // In production, replace this with your email service
  
  console.log('📧 Newsletter Email (Mock Send):');
  console.log(`To: ${emailData.to}`);
  console.log(`Subject: ${emailData.subject}`);
  console.log(`Content Type: ${emailData.isHtml ? 'HTML' : 'Text'}`);
  console.log('Content:', emailData.content.substring(0, 200) + '...');
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Mock success (in production, handle actual email service response)
  return true;
}

// Send blog notification to all subscribers
export async function sendBlogNotification(blogData: BlogNotificationData): Promise<{
  success: boolean;
  sent: number;
  failed: number;
  errors: string[];
}> {
  try {
    // This would typically fetch subscribers from your database
    // For now, return a mock response
    console.log('📧 Blog notification would be sent for:', blogData.blogTitle);
    
    return {
      success: true,
      sent: 0, // In production, this would be the actual count
      failed: 0,
      errors: []
    };
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

// Email service configuration instructions
export const EMAIL_SERVICE_SETUP = {
  instructions: `
To enable email functionality, choose one of these services:

1. SENDGRID (Recommended)
   - Sign up at https://sendgrid.com/
   - Get your API key
   - Add SENDGRID_API_KEY to your environment variables
   - Install: npm install @sendgrid/mail

2. RESEND (Developer-friendly)
   - Sign up at https://resend.com/
   - Get your API key
   - Add RESEND_API_KEY to your environment variables
   - Install: npm install resend

3. NODEMAILER (SMTP)
   - Configure your SMTP settings
   - Add SMTP_* variables to environment
   - Install: npm install nodemailer

4. AWS SES (Enterprise)
   - Set up AWS SES
   - Configure AWS credentials
   - Install: npm install @aws-sdk/client-ses

Replace the mock functions in this file with your chosen service integration.
  `,
  envVariables: {
    sendgrid: 'SENDGRID_API_KEY=your_sendgrid_api_key',
    resend: 'RESEND_API_KEY=your_resend_api_key',
    smtp: `
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
    `,
    aws: `
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
    `
  }
};
