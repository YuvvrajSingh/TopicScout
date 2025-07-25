# ❇️ TopicScout

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An AI-powered newsletter content generator that analyzes Reddit discussions and creates professional newsletters using Google Gemini AI. Transform trending topics and discussions into engaging newsletter content with beautiful glassmorphism UI.

## Features

- **Reddit Analysis**: Scrapes and analyzes Reddit discussions for trending topics
- **AI-Powered Content Generation**: Uses Google Gemini AI for intelligent content analysis and newsletter creation
- **Professional Newsletter Templates**: Generate well-structured newsletters with insights and statistics
- **PDF Export**: Download newsletters as professionally formatted PDF files
- **Email Integration**: Send newsletters directly via EmailJS integration
- **Responsive Design**: Beautiful glassmorphism UI that works across all devices
- **Real-time Progress Tracking**: Visual indicators for analysis progress
- **Health Monitoring**: Built-in API health checks for all services

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism components
- **UI Components**: Radix UI primitives with custom styling
- **AI Integration**: Google Gemini AI API
- **Data Source**: Reddit API
- **Email Service**: EmailJS
- **PDF Generation**: jsPDF with html2canvas
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- Reddit API credentials
- Google Gemini AI API key
- EmailJS account (optional, for email functionality)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/topicscout-glass.git
   cd topicscout-glass
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your API credentials in `.env.local`:

   ```env
   REDDIT_CLIENT_ID=your_reddit_client_id
   REDDIT_CLIENT_SECRET=your_reddit_client_secret
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Configuration

### Reddit API Setup

1. Visit [Reddit App Preferences](https://www.reddit.com/prefs/apps)
2. Create a new app with type "script"
3. Copy the client ID and secret to your environment variables

### Google Gemini AI Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add it to your environment variables

### EmailJS Setup (Optional)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Configure template variables: `to_email`, `to_name`, `subject`, `newsletter_content`, `keyword`, `generated_date`, `from_name`

## API Endpoints

### POST `/api/analyze`

Analyzes a keyword and generates newsletter content.

**Request:**

```json
{
  "keyword": "artificial intelligence",
  "limit": 50,
  "settings": {
    "creativity": [7],
    "includeStats": true,
    "targetAudience": "general"
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "keyword": "artificial intelligence",
    "posts": [...],
    "analysis": "...",
    "newsletter": "...",
    "insights": {...}
  }
}
```

### POST `/api/email`

Prepares email configuration for newsletter sending.

### GET `/api/health`

Health check endpoint for all configured services.

## Deployment on Vercel

### Automatic Deployment

1. **Connect to Vercel**

   - Import your repository on [Vercel](https://vercel.com)
   - Configure environment variables in Vercel dashboard
   - Deploy automatically

2. **Manual Deployment**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

### Environment Variables on Vercel

Add these environment variables in your Vercel project settings:

- `REDDIT_CLIENT_ID`
- `REDDIT_CLIENT_SECRET`
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── analyze/      # Main analysis endpoint
│   │   ├── email/        # Email configuration
│   │   └── health/       # Health checks
│   ├── generate/         # Newsletter generation page
│   ├── examples/         # Example newsletters
│   └── about/           # About page
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── glass-card.tsx  # Glassmorphism card component
│   └── ...
├── lib/                # Utility libraries
│   ├── reddit.ts       # Reddit API integration
│   ├── gemini.ts       # Gemini AI integration
│   └── ...
└── hooks/              # Custom React hooks
```

## Performance & Limits

### API Rate Limits

- **Reddit API**: 60 requests/minute
- **Gemini AI**: 15 requests/minute (free tier)
- **EmailJS**: 200 emails/month (free tier)

### Optimization Features

- Server-side rendering with Next.js
- Automatic code splitting
- Image optimization
- API response caching
- Efficient error handling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Check the [health endpoint](http://localhost:3000/api/health) to verify service configuration
- Review browser console for client-side errors
- Check Vercel function logs for server-side issues
- Open an issue on GitHub for bug reports

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Google Gemini](https://ai.google.dev/) for AI-powered content generation
- [Reddit API](https://www.reddit.com/dev/api/) for content analysis
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
