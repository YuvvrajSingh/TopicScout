import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RedditPost } from './reddit';

export interface KeywordInsight {
  keyword: string;
  relevance_score: number;
  mentions: number;
  context: string[];
}

export interface SentimentAnalysis {
  overall_sentiment: 'positive' | 'negative' | 'neutral';
  polarity_score: number;
  confidence: number;
  emotional_tone: string;
}

export interface TrendingTopic {
  topic: string;
  trend_score: number;
  discussion_points: string[];
  relevance: string;
}

export interface AnalysisResult {
  top_keywords: KeywordInsight[];
  sentiment: SentimentAnalysis;
  trending_topics: TrendingTopic[];
  key_insights: string[];
  content_themes: string[];
  engagement_metrics: {
    avg_score: number;
    total_comments: number;
    engagement_rate: number;
  };
  newsletter_angles: string[];
}

export class GeminiProcessor {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 4096,
      },
    });
  }

  async analyzeContent(posts: RedditPost[], keyword: string): Promise<AnalysisResult> {
    if (!posts.length) {
      throw new Error('No posts provided for analysis');
    }

    try {
      const postsText = posts.slice(0, 30).map((post, index) => 
        `POST ${index + 1}:
Title: ${post.title}
Content: ${post.content.slice(0, 500)}
Score: ${post.score}
Comments: ${post.num_comments}
Subreddit: r/${post.subreddit}
---`
      ).join('\n\n');

      const prompt = `
You are an expert content analyst specializing in newsletter content generation. Analyze these Reddit posts about "${keyword}" and provide comprehensive insights for newsletter creation.

REDDIT POSTS DATA:
${postsText}

ANALYSIS REQUIREMENTS:
Analyze the content and return a JSON response with the following structure (ensure it's valid JSON):

{
  "top_keywords": [
    {
      "keyword": "string",
      "relevance_score": number (0-100),
      "mentions": number,
      "context": ["context example 1", "context example 2"]
    }
  ],
  "sentiment": {
    "overall_sentiment": "positive|negative|neutral",
    "polarity_score": number (-1 to 1),
    "confidence": number (0-1),
    "emotional_tone": "descriptive tone"
  },
  "trending_topics": [
    {
      "topic": "string",
      "trend_score": number (0-100),
      "discussion_points": ["point 1", "point 2"],
      "relevance": "why this is trending"
    }
  ],
  "key_insights": ["insight 1", "insight 2", "insight 3"],
  "content_themes": ["theme 1", "theme 2", "theme 3"],
  "engagement_metrics": {
    "avg_score": number,
    "total_comments": number,
    "engagement_rate": number
  },
  "newsletter_angles": ["angle 1", "angle 2", "angle 3"]
}

SPECIFIC INSTRUCTIONS:
1. Extract the top 10-15 most relevant keywords beyond the search term
2. Provide accurate sentiment analysis with confidence scores
3. Identify 5-8 trending discussion topics
4. Generate 4-6 actionable insights for newsletter writers
5. Identify main content themes (3-5 themes)
6. Calculate engagement metrics from the post data
7. Suggest 3-5 unique newsletter angles/hooks

Focus on insights that would be valuable for content creators and newsletter writers. Make the analysis newsletter-ready and actionable.
`;

      const result = await this.model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Clean and parse JSON response
      const cleanedResponse = this.cleanJsonResponse(responseText);
      const analysis = JSON.parse(cleanedResponse);
      
      // Validate and enhance the response
      return this.validateAndEnhanceAnalysis(analysis, posts);
      
    } catch (error) {
      console.error('Gemini analysis failed:', error);
      
      // Fallback to basic analysis if Gemini fails
      return this.generateFallbackAnalysis(posts, keyword);
    }
  }

  async generateNewsletterDraft(keyword: string, analysis: AnalysisResult): Promise<string> {
    try {
      const prompt = `
Create a professional newsletter draft about "${keyword}" using this analysis data:

ANALYSIS DATA:
- Top Keywords: ${analysis.top_keywords.slice(0, 8).map(k => k.keyword).join(', ')}
- Overall Sentiment: ${analysis.sentiment.overall_sentiment} (${analysis.sentiment.polarity_score.toFixed(2)})
- Key Trends: ${analysis.trending_topics.slice(0, 5).map(t => t.topic).join(', ')}
- Main Insights: ${analysis.key_insights.join(' • ')}
- Content Themes: ${analysis.content_themes.join(', ')}
- Newsletter Angles: ${analysis.newsletter_angles.join(' • ')}

NEWSLETTER REQUIREMENTS:
- Length: 400-500 words
- Professional, engaging tone
- Newsletter-ready format with clear sections
- Include actionable insights
- Hook readers with compelling introduction
- End with clear call-to-action

FORMAT THE NEWSLETTER WITH:
1. **Compelling Headline** (attention-grabbing)
2. **Hook Introduction** (2-3 sentences that draw readers in)
3. **Key Insights Section** (3-4 bullet points with main findings)
4. **Trending Discussions** (what people are talking about)
5. **Why This Matters** (relevance and implications)
6. **What's Next** (future outlook or actionable steps)
7. **Call to Action** (engage your audience)

Make it newsletter-ready content that a content creator could send to their subscribers immediately. Use markdown formatting for better readability.
`;

      const result = await this.model.generateContent(prompt);
      return result.response.text().trim();
      
    } catch (error) {
      console.error('Newsletter generation failed:', error);
      return this.generateFallbackNewsletter(keyword, analysis);
    }
  }

  private cleanJsonResponse(response: string): string {
    // Remove markdown code blocks and extra text
    let cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Find the JSON object
    const startIndex = cleaned.indexOf('{');
    const endIndex = cleaned.lastIndexOf('}') + 1;
    
    if (startIndex !== -1 && endIndex > startIndex) {
      cleaned = cleaned.substring(startIndex, endIndex);
    }
    
    return cleaned.trim();
  }

  private validateAndEnhanceAnalysis(analysis: any, posts: RedditPost[]): AnalysisResult {
    // Calculate actual engagement metrics
    const totalScore = posts.reduce((sum, post) => sum + post.score, 0);
    const totalComments = posts.reduce((sum, post) => sum + post.num_comments, 0);
    
    return {
      top_keywords: Array.isArray(analysis.top_keywords) ? analysis.top_keywords.slice(0, 15) : [],
      sentiment: analysis.sentiment || {
        overall_sentiment: 'neutral',
        polarity_score: 0,
        confidence: 0.5,
        emotional_tone: 'mixed'
      },
      trending_topics: Array.isArray(analysis.trending_topics) ? analysis.trending_topics.slice(0, 8) : [],
      key_insights: Array.isArray(analysis.key_insights) ? analysis.key_insights.slice(0, 6) : [],
      content_themes: Array.isArray(analysis.content_themes) ? analysis.content_themes.slice(0, 5) : [],
      engagement_metrics: {
        avg_score: posts.length > 0 ? Math.round(totalScore / posts.length) : 0,
        total_comments: totalComments,
        engagement_rate: posts.length > 0 ? Math.round(((totalScore + totalComments) / posts.length) * 100) / 100 : 0
      },
      newsletter_angles: Array.isArray(analysis.newsletter_angles) ? analysis.newsletter_angles.slice(0, 5) : []
    };
  }

  private generateFallbackAnalysis(posts: RedditPost[], keyword: string): AnalysisResult {
    const totalScore = posts.reduce((sum, post) => sum + post.score, 0);
    const totalComments = posts.reduce((sum, post) => sum + post.num_comments, 0);
    
    return {
      top_keywords: [
        { keyword: keyword, relevance_score: 100, mentions: posts.length, context: ['Primary search term'] }
      ],
      sentiment: {
        overall_sentiment: 'neutral',
        polarity_score: 0,
        confidence: 0.7,
        emotional_tone: 'mixed discussion'
      },
      trending_topics: [
        { topic: `${keyword} discussions`, trend_score: 80, discussion_points: ['General interest'], relevance: 'Main topic' }
      ],
      key_insights: [
        `Found ${posts.length} relevant discussions about ${keyword}`,
        `Average engagement: ${Math.round(totalScore / posts.length)} upvotes per post`,
        'Community shows active interest in this topic'
      ],
      content_themes: ['General discussion', 'Community interest'],
      engagement_metrics: {
        avg_score: Math.round(totalScore / posts.length),
        total_comments: totalComments,
        engagement_rate: Math.round(((totalScore + totalComments) / posts.length) * 100) / 100
      },
      newsletter_angles: [
        `What Reddit thinks about ${keyword}`,
        `Community insights on ${keyword}`,
        `Latest ${keyword} discussions`
      ]
    };
  }

  private generateFallbackNewsletter(keyword: string, analysis: AnalysisResult): string {
    return `# What's Trending: ${keyword}

## The Community Speaks

Recent discussions about **${keyword}** show ${analysis.sentiment.overall_sentiment} sentiment across online communities, with ${analysis.engagement_metrics.total_comments} comments and significant engagement.

## Key Insights

${analysis.key_insights.map(insight => `• ${insight}`).join('\n')}

## What This Means

The conversation around ${keyword} reveals important trends worth watching. Community engagement metrics show ${analysis.engagement_metrics.avg_score} average upvotes per discussion, indicating strong interest in this topic.

## Looking Ahead

Stay tuned for more insights as this topic continues to evolve in the community discussions.

---

*Want more insights like this? Stay connected for the latest trends and analysis.*`;
  }
}
