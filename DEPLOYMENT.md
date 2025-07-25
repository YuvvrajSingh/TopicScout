# Vercel Deployment Guide

This guide will help you deploy TopicScout to Vercel successfully.

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YuvvrajSingh/TopicScout)

## Prerequisites

1. **GitHub Repository**: [https://github.com/YuvvrajSingh/TopicScout](https://github.com/YuvvrajSingh/TopicScout)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **API Keys**: Gather all required API credentials

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your repository has:
- ✅ All code committed and pushed to GitHub
- ✅ `.env.example` file with all required variables
- ✅ `vercel.json` configuration file
- ✅ Updated `package.json` with proper metadata

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your TopicScout repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

### 3. Environment Variables

Add these environment variables in Vercel:

**Required Variables:**
```
REDDIT_CLIENT_ID=your_reddit_client_id_here
REDDIT_CLIENT_SECRET=your_reddit_client_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
```

**Optional Variables (for email functionality):**
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**How to add environment variables:**
1. In your Vercel project dashboard
2. Go to "Settings" → "Environment Variables"
3. Add each variable with its value
4. Select "Production", "Preview", and "Development" for each

### 4. Deploy

1. Click "Deploy" button
2. Wait for build to complete (usually 2-3 minutes)
3. Your app will be available at `https://your-project-name.vercel.app`

### 5. Custom Domain (Optional)

1. In project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

## Post-Deployment Checklist

### Test Your Deployment

1. **Health Check**: Visit `/api/health` to verify all services are working
2. **Generate Newsletter**: Try generating a newsletter with a test keyword
3. **Email Functionality**: Test email sending if configured
4. **PDF Export**: Test PDF download functionality

### Monitor Performance

1. Check Vercel Analytics in your dashboard
2. Monitor function execution times
3. Watch for any runtime errors in function logs

## Troubleshooting Common Issues

### Build Failures

**Problem**: TypeScript or ESLint errors during build
**Solution**: The configuration already ignores build errors, but you can fix them for better code quality

**Problem**: Missing dependencies
**Solution**: Run `npm install` locally and push updated `package-lock.json`

### Runtime Errors

**Problem**: 500 errors on API routes
**Solution**: Check Vercel function logs and verify environment variables

**Problem**: Reddit API unauthorized
**Solution**: Verify Reddit client ID and secret are correctly set

**Problem**: Gemini AI quota exceeded
**Solution**: Check your Google AI Studio quota and billing

### Performance Issues

**Problem**: Slow function execution
**Solution**: Functions have a 10-second timeout on hobby plan. Consider upgrading for longer timeouts.

**Problem**: High memory usage
**Solution**: Optimize your code or upgrade to Pro plan for more memory

## Vercel Configuration Details

The `vercel.json` file includes:
- Function runtime configuration
- Environment variable references
- Build and output settings

## Continuous Deployment

Once connected to GitHub:
- Automatic deployments on `main` branch push
- Preview deployments for pull requests
- Branch deployments for feature branches

## Scaling Considerations

**Hobby Plan Limits:**
- 100GB bandwidth/month
- 100 serverless function executions/day
- 10-second function timeout

**Pro Plan Benefits:**
- Unlimited bandwidth
- Unlimited function executions
- 60-second function timeout
- Team collaboration features

## Security Best Practices

1. **Environment Variables**: Never commit API keys to your repository
2. **CORS**: API routes are protected by Next.js CORS defaults
3. **Rate Limiting**: Consider implementing rate limiting for production
4. **Input Validation**: All inputs are validated in API routes

## Support

If you encounter issues:
1. Check Vercel function logs in your dashboard
2. Monitor the health endpoint for service status
3. Review the GitHub repository for updates
4. Contact Vercel support for platform-specific issues

## Cost Optimization

1. **Free Tier Usage**: Monitor your usage in Vercel dashboard
2. **Efficient Caching**: Implement response caching where appropriate
3. **Optimize Bundle Size**: Use dynamic imports for large libraries
4. **Function Duration**: Optimize API response times

Your TopicScout application is now ready for production use on Vercel!
