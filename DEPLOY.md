# Git Commands for Deployment

## Push to GitHub

```bash
# Add all files to git
git add .

# Commit changes
git commit -m "feat: prepare TopicScout for production deployment

- Clean up unnecessary files
- Update package.json with correct repository URL
- Fix Suspense boundary issues for Next.js 15
- Optimize Tailwind CSS classes
- Add comprehensive documentation
- Ready for Vercel deployment"

# Push to GitHub
git push origin main
```

## Deploy to Vercel

### Option 1: One-Click Deploy
Click this button to deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YuvvrajSingh/TopicScout)

### Option 2: Manual Import
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import from GitHub: `https://github.com/YuvvrajSingh/TopicScout`
3. Framework will auto-detect as Next.js
4. Click "Deploy"

### Environment Variables
Add these in Vercel dashboard after import:

```
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id (optional)
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id (optional)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key (optional)
```

## Post-Deployment
1. Visit your deployed URL
2. Test `/api/health` endpoint
3. Generate a test newsletter
4. Verify all functionality works

Your TopicScout app will be live at: `https://topicscout.vercel.app`
