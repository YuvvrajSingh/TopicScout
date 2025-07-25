# TopicScout Setup Instructions

## Prerequisites

Before running the application, you need to set up API keys for the various services used by TopicScout.

## Environment Variables Setup

Copy the `.env.local` file and fill in your API keys:

### 1. Reddit API Setup

1. Go to [Reddit App Preferences](https://www.reddit.com/prefs/apps)
2. Click "Create App" or "Create Another App"
3. Choose "script" as the app type
4. Fill in the required fields:
   - **Name**: TopicScout
   - **Description**: Newsletter content generator
   - **Redirect URI**: http://localhost:3000 (or your domain)
5. Copy the following values to your `.env.local`:
   ```
   REDDIT_CLIENT_ID=your_client_id_here
   REDDIT_CLIENT_SECRET=your_client_secret_here
   ```

### 2. Google Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key to your `.env.local`:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### 3. EmailJS Setup (for email functionality)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with the following template variables:
   - `{{to_email}}`
   - `{{to_name}}`
   - `{{subject}}`
   - `{{newsletter_content}}`
   - `{{keyword}}`
   - `{{generated_date}}`
   - `{{from_name}}`
4. Copy the following values to your `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## Installation and Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.local` and fill in your API keys as described above

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

The application provides the following API endpoints:

### `/api/analyze` (POST)
Analyzes a keyword and generates newsletter content.

**Request Body:**
```json
{
  "keyword": "your keyword",
  "limit": 50,
  "settings": {
    "creativity": [7],
    "includeStats": true,
    "targetAudience": "general"
  }
}
```

### `/api/email` (POST)
Prepares email configuration for client-side sending.

**Request Body:**
```json
{
  "email": "recipient@example.com",
  "name": "Recipient Name",
  "subject": "Newsletter Subject",
  "content": "Newsletter content",
  "keyword": "original keyword"
}
```

### `/api/health` (GET)
Checks the health status of all configured services.

## Features

1. **Reddit Analysis**: Scrapes and analyzes Reddit discussions
2. **AI-Powered Insights**: Uses Google Gemini for content analysis
3. **Newsletter Generation**: Creates professional newsletter drafts
4. **PDF Export**: Download newsletters as PDF files
5. **Email Integration**: Send newsletters via email
6. **Responsive Design**: Works on desktop and mobile devices

## Troubleshooting

### Common Issues

1. **Reddit API 401 Unauthorized**: Check your Reddit client ID and secret
2. **Gemini API errors**: Verify your Gemini API key is correct and has quota
3. **Email sending fails**: Ensure EmailJS is properly configured
4. **No posts found**: Try different keywords or check Reddit's availability

### Rate Limits

- **Reddit API**: 60 requests per minute
- **Gemini API**: 15 requests per minute (free tier)
- **EmailJS**: 200 emails per month (free tier)

## Free Tier Limitations

All services used have generous free tiers:

- **Gemini AI**: 15 requests/minute (21,600/day)
- **Reddit API**: 60 requests/minute
- **EmailJS**: 200 emails/month
- **Vercel Hosting**: 100GB bandwidth/month

These limits are sufficient for hundreds of newsletter generations per day.

## Architecture

```
Next.js Frontend → API Routes → Reddit API
                              ↓
                         Gemini AI → Newsletter Generation
                              ↓
                         EmailJS → Email Delivery
```

## Support

If you encounter issues:

1. Check the `/api/health` endpoint to verify all services are configured
2. Review the browser console for client-side errors
3. Check the Vercel function logs for server-side issues

## Production Deployment

For production deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

The application is optimized for serverless deployment and should scale automatically based on usage.
