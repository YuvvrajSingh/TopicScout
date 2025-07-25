import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, name, subject, content, keyword } = await request.json();

    // Validate required fields
    if (!email || !content || !keyword) {
      return NextResponse.json(
        { error: 'Email, content, and keyword are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // This endpoint returns configuration for client-side email sending
    // since EmailJS works better from the client side
    const emailConfig = {
      to_email: email,
      to_name: name || 'Subscriber',
      subject: subject || `Newsletter Draft: ${keyword}`,
      content: content,
      keyword: keyword,
      generated_date: new Date().toLocaleDateString(),
      from_name: 'TopicScout'
    };

    return NextResponse.json({
      success: true,
      message: 'Email configuration prepared',
      config: emailConfig,
      instructions: 'Use client-side EmailJS to send the email'
    });

  } catch (error) {
    console.error('Email API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to prepare email configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'TopicScout Email API',
    version: '2.0',
    description: 'Prepares email configuration for client-side sending',
    usage: {
      method: 'POST',
      body: {
        email: 'string (required) - recipient email',
        name: 'string (optional) - recipient name',
        subject: 'string (optional) - email subject',
        content: 'string (required) - newsletter content',
        keyword: 'string (required) - original keyword'
      }
    },
    note: 'This API prepares configuration for client-side EmailJS sending'
  });
}
