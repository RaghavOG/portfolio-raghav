import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimiter, getRateLimitHeaders } from '@/lib/rate-limit';
import { ContactSubmission } from '@/models/Contact';
import connectDB from '@/lib/mongodb';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    
    // Check rate limit
    const rateLimitResult = await rateLimiter.check(ip);
    const headers = getRateLimitHeaders(rateLimitResult.remaining, rateLimitResult.resetTime);
    
    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.resetTime);
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          resetTime: resetDate.toISOString()
        },
        { 
          status: 429,
          headers 
        }
      );
    }

    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400, headers }
      );
    }

    // Additional validation
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400, headers }
      );
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 1000 characters' },
        { status: 400, headers }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400, headers }
      );
    }

    // Basic spam detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'prize', 'winner', 'click here', 'buy now'];
    const messageContent = `${name} ${email} ${message}`.toLowerCase();
    if (spamKeywords.some(keyword => messageContent.includes(keyword))) {
      return NextResponse.json(
        { error: 'Message contains prohibited content' },
        { status: 400, headers }
      );
    }

    // Create contact submission record
    const contactSubmission = new ContactSubmission({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      ipAddress: ip,
      userAgent,
      status: 'pending',
      emailSent: false
    });

    // Save to database first
    await contactSubmission.save();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'info@raghavsingla.tech', // Replace with your verified domain
      to: ['04raghavsingla28@gmail.com'], // Your email where you want to receive messages
      subject: `New Portfolio Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <h3 style="color: #333; margin-bottom: 15px;">Contact Details:</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>IP Address:</strong> ${ip}</p>
            <p style="margin: 10px 0;"><strong>Submission ID:</strong> ${contactSubmission._id}</p>
          </div>
          
          <div style="margin: 20px 0; padding: 20px; background-color: #f0f0f0; border-radius: 8px;">
            <h3 style="color: #333; margin-bottom: 15px;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
            <p>This message was sent from your portfolio contact form and saved to the database.</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        IP Address: ${ip}
        Submission ID: ${contactSubmission._id}
        
        Message:
        ${message}
        
        This message was sent from your portfolio contact form and saved to the database.
      `,
    });

    // Update the contact submission with email status
    if (error) {
      console.error('Resend error:', error);
      contactSubmission.emailSent = false;
      contactSubmission.emailError = error.message || 'Failed to send email';
      await contactSubmission.save();
      
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500, headers }
      );
    } else {
      contactSubmission.emailSent = true;
      await contactSubmission.save();
    }

    return NextResponse.json(
      { 
        message: 'Message sent and saved successfully', 
        submissionId: contactSubmission._id 
      },
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
