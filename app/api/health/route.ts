import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables
    const checks = {
      reddit_config: !!(process.env.REDDIT_CLIENT_ID && process.env.REDDIT_CLIENT_SECRET),
      gemini_config: !!process.env.GEMINI_API_KEY,
      emailjs_config: !!(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID && 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID && 
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      ),
      app_url: !!process.env.NEXT_PUBLIC_APP_URL
    };

    const allHealthy = Object.values(checks).every(check => check);

    return NextResponse.json({
      status: allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      version: '2.0',
      services: {
        reddit_api: checks.reddit_config ? 'configured' : 'missing_config',
        gemini_ai: checks.gemini_config ? 'configured' : 'missing_config',
        email_service: checks.emailjs_config ? 'configured' : 'missing_config',
        app_config: checks.app_url ? 'configured' : 'missing_config'
      },
      checks: checks,
      message: allHealthy 
        ? 'All services are properly configured' 
        : 'Some services need configuration'
    }, { 
      status: allHealthy ? 200 : 503 
    });

  } catch (error) {
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
