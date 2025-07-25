import axios from 'axios';

export interface RedditPost {
  id: string;
  title: string;
  content: string;
  url: string;
  score: number;
  num_comments: number;
  created_utc: number;
  author: string;
  subreddit: string;
}

export interface RedditSearchResult {
  posts: RedditPost[];
  total_results: number;
  search_query: string;
}

export class RedditScraper {
  private accessToken: string | null = null;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly userAgent: string;

  constructor() {
    this.clientId = process.env.REDDIT_CLIENT_ID!;
    this.clientSecret = process.env.REDDIT_CLIENT_SECRET!;
    this.userAgent = process.env.REDDIT_USER_AGENT!;
  }

  async authenticate(): Promise<void> {
    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      
      const response = await axios.post(
        'https://www.reddit.com/api/v1/access_token',
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'User-Agent': this.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.accessToken = response.data.access_token;
    } catch (error) {
      console.error('Reddit authentication failed:', error);
      throw new Error('Failed to authenticate with Reddit API');
    }
  }

  async searchPosts(keyword: string, limit: number = 50, sort: string = 'relevance'): Promise<RedditSearchResult> {
    if (!this.accessToken) {
      await this.authenticate();
    }

    try {
      // Search across multiple popular subreddits for better content diversity
      const subreddits = [
        'all', 'AskReddit', 'technology', 'news', 'worldnews', 
        'science', 'business', 'entrepreneur', 'marketing'
      ];

      const searchPromises = subreddits.slice(0, 3).map(async (subreddit) => {
        const response = await axios.get(
          `https://oauth.reddit.com/r/${subreddit}/search`,
          {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'User-Agent': this.userAgent,
            },
            params: {
              q: keyword,
              sort: sort,
              limit: Math.ceil(limit / 3),
              restrict_sr: subreddit !== 'all',
              type: 'link',
              t: 'month', // Last month for recent content
            },
          }
        );

        return response.data.data.children.map((child: any) => this.formatPost(child.data));
      });

      const results = await Promise.all(searchPromises);
      const allPosts = results.flat();

      // Sort by score and remove duplicates
      const uniquePosts = this.deduplicatePosts(allPosts)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

      return {
        posts: uniquePosts,
        total_results: uniquePosts.length,
        search_query: keyword,
      };
    } catch (error) {
      console.error('Reddit search failed:', error);
      // Fallback to public API if OAuth fails
      return this.searchPublicAPI(keyword, limit);
    }
  }

  private async searchPublicAPI(keyword: string, limit: number): Promise<RedditSearchResult> {
    try {
      const response = await axios.get(
        `https://www.reddit.com/search.json`,
        {
          params: {
            q: keyword,
            sort: 'relevance',
            limit: limit,
            t: 'month',
          },
          headers: {
            'User-Agent': this.userAgent,
          },
        }
      );

      const posts = response.data.data.children.map((child: any) => 
        this.formatPost(child.data)
      );

      return {
        posts: posts,
        total_results: posts.length,
        search_query: keyword,
      };
    } catch (error) {
      console.error('Public Reddit API search failed:', error);
      throw new Error('Failed to search Reddit posts');
    }
  }

  private formatPost(postData: any): RedditPost {
    return {
      id: postData.id,
      title: postData.title || '',
      content: postData.selftext || postData.url || '',
      url: postData.url || `https://reddit.com${postData.permalink}`,
      score: postData.score || 0,
      num_comments: postData.num_comments || 0,
      created_utc: postData.created_utc || 0,
      author: postData.author || 'unknown',
      subreddit: postData.subreddit || 'unknown',
    };
  }

  private deduplicatePosts(posts: RedditPost[]): RedditPost[] {
    const seen = new Set();
    return posts.filter(post => {
      const key = post.title.toLowerCase().trim();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  async getSubredditPosts(subreddit: string, keyword: string, limit: number = 25): Promise<RedditPost[]> {
    if (!this.accessToken) {
      await this.authenticate();
    }

    try {
      const response = await axios.get(
        `https://oauth.reddit.com/r/${subreddit}/search`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'User-Agent': this.userAgent,
          },
          params: {
            q: keyword,
            sort: 'relevance',
            limit: limit,
            restrict_sr: true,
            type: 'link',
            t: 'month',
          },
        }
      );

      return response.data.data.children.map((child: any) => 
        this.formatPost(child.data)
      );
    } catch (error) {
      console.error(`Failed to get posts from r/${subreddit}:`, error);
      return [];
    }
  }
}
