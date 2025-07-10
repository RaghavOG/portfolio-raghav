import { NextRequest, NextResponse } from 'next/server';
import { sendNewsletterEmail, sendWelcomeEmail, sendBlogNotification, EMAIL_SERVICE_STATUS } from '@/lib/email-utils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const test = searchParams.get('test');

  if (!EMAIL_SERVICE_STATUS.configured) {
    return NextResponse.json({
      error: 'Email service not configured',
      status: EMAIL_SERVICE_STATUS
    }, { status: 500 });
  }

  try {
    switch (test) {
      case 'welcome':
        const welcomeResult = await sendWelcomeEmail('04raghavsingla28@gmail.com', 'Raghav');
        return NextResponse.json({
          message: 'Welcome email test sent to 04raghavsingla28@gmail.com',
          success: welcomeResult,
          service: EMAIL_SERVICE_STATUS
        });

      case 'newsletter':
        const newsletterResult = await sendNewsletterEmail({
          to: '04raghavsingla28@gmail.com',
          name: 'Raghav',
          subject: 'Test Newsletter Email - Portfolio System',
          content: '<h1>Test Newsletter</h1><p>This email is sent from <strong>newsletter@raghavsingla.tech</strong></p><p>This tests the newsletter functionality! 📧</p>',
          isHtml: true,
          emailType: 'newsletter'
        });
        return NextResponse.json({
          message: 'Newsletter email test sent to 04raghavsingla28@gmail.com',
          success: newsletterResult,
          service: EMAIL_SERVICE_STATUS
        });

      case 'blog-notification':
        const blogResult = await sendBlogNotification({
          blogTitle: 'Test Blog Post - Email System Working!',
          blogExcerpt: 'This is a test blog post to verify that email notifications work correctly. Your Resend integration is successfully configured and ready for production use.',
          blogUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/blog/test`,
          blogFeaturedImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'
        });
        return NextResponse.json({
          message: 'Blog notification test completed',
          result: blogResult,
          service: EMAIL_SERVICE_STATUS
        });

      default:
        return NextResponse.json({
          message: 'Email service status',
          service: EMAIL_SERVICE_STATUS,
          availableTests: [
            '/api/test-email?test=welcome',
            '/api/test-email?test=newsletter',
            '/api/test-email?test=blog-notification'
          ]
        });
    }
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json({
      error: 'Email test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      service: EMAIL_SERVICE_STATUS
    }, { status: 500 });
  }
}
