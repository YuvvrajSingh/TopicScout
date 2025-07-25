import { NextRequest, NextResponse } from 'next/server';
import { RedditScraper } from '@/lib/reddit';
import { GeminiProcessor } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { keyword, limit = 50, settings } = await request.json();

    if (!keyword || typeof keyword !== 'string') {
      return NextResponse.json(
        { error: 'Keyword is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate keyword length
    if (keyword.length < 2 || keyword.length > 100) {
      return NextResponse.json(
        { error: 'Keyword must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    // Initialize services
    const redditScraper = new RedditScraper();
    const geminiProcessor = new GeminiProcessor();

    // Step 1: Scrape Reddit posts
    console.log(`Starting analysis for keyword: ${keyword}`);
    const searchResult = await redditScraper.searchPosts(keyword, limit);

    if (searchResult.posts.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No relevant posts found for this keyword',
        suggestion: 'Try a different keyword or check your spelling'
      }, { status: 404 });
    }

    console.log(`Found ${searchResult.posts.length} posts, analyzing with Gemini...`);

    // Step 2: Analyze with Gemini AI
    const analysis = await geminiProcessor.analyzeContent(searchResult.posts, keyword);

    // Step 3: Generate newsletter draft
    console.log('Generating newsletter draft...');
    const newsletterDraft = await geminiProcessor.generateNewsletterDraft(keyword, analysis);

    // Prepare response
    const response = {
      success: true,
      keyword: keyword,
      analysis: analysis,
      newsletter_draft: newsletterDraft,
      source_data: {
        total_posts: searchResult.posts.length,
        search_query: searchResult.search_query,
        posts_sample: searchResult.posts.slice(0, 5).map(post => ({
          title: post.title,
          score: post.score,
          subreddit: post.subreddit,
          url: post.url
        }))
      },
      generated_at: new Date().toISOString(),
      processing_time: Date.now()
    };

    console.log(`Analysis completed successfully for: ${keyword}`);
    return NextResponse.json(response);

  } catch (error) {
    console.error('Analysis API error:', error);
    
    // Determine error type and provide appropriate response
    if (error instanceof Error) {
      if (error.message.includes('GEMINI_API_KEY')) {
        return NextResponse.json({
          success: false,
          error: 'AI service configuration error',
          details: 'Gemini API key is not properly configured'
        }, { status: 500 });
      }
      
      if (error.message.includes('Reddit')) {
        return NextResponse.json({
          success: false,
          error: 'Data source error',
          details: 'Unable to fetch Reddit data. Please try again later.'
        }, { status: 503 });
      }

      if (error.message.includes('rate limit') || error.message.includes('quota')) {
        return NextResponse.json({
          success: false,
          error: 'Service temporarily unavailable',
          details: 'API rate limit reached. Please try again in a few minutes.',
          retry_after: 60
        }, { status: 429 });
      }
    }

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: 'An unexpected error occurred during analysis'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'TopicScout Analysis API',
    version: '2.0',
    endpoints: {
      analyze: 'POST /api/analyze',
      email: 'POST /api/email', 
      health: 'GET /api/health'
    },
    usage: {
      analyze: {
        method: 'POST',
        body: {
          keyword: 'string (required)',
          limit: 'number (optional, default: 50)',
          settings: 'object (optional)'
        }
      }
    }
  });
}
