"use client"

import { useState } from 'react';
import { Download, Mail, Copy, Check, TrendingUp, MessageSquare, BarChart3 } from 'lucide-react';
import { GlassCard } from './glass-card';
import { GlassButton } from './glass-button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import type { AnalysisResult } from '@/lib/gemini';

interface AnalysisResultsProps {
  keyword: string;
  analysis: AnalysisResult;
  newsletterDraft: string;
  sourceData?: any;
  onDownloadPDF: () => void;
  onSendEmail: () => void;
}

export function AnalysisResults({
  keyword,
  analysis,
  newsletterDraft,
  sourceData,
  onDownloadPDF,
  onSendEmail
}: AnalysisResultsProps) {
  const [copiedContent, setCopiedContent] = useState<string | null>(null);

  const copyToClipboard = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedContent(type);
      setTimeout(() => setCopiedContent(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getSentimentBadgeVariant = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'default';
      case 'negative': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <GlassCard className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-2">
              Analysis Results for "{keyword}"
            </h2>
            <p className="text-purple-600">
              Generated from {sourceData?.total_posts || 0} Reddit discussions
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <GlassButton
              onClick={() => copyToClipboard(newsletterDraft, 'newsletter')}
              variant="secondary"
              size="sm"
            >
              {copiedContent === 'newsletter' ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Newsletter
                </>
              )}
            </GlassButton>
            <GlassButton onClick={onDownloadPDF} variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </GlassButton>
            <GlassButton onClick={onSendEmail} size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </GlassButton>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur">
            <div className="flex items-center justify-center mb-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {sourceData?.total_posts || 0}
            </div>
            <div className="text-sm text-purple-600">Discussions</div>
          </div>
          
          <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {analysis.engagement_metrics.avg_score}
            </div>
            <div className="text-sm text-purple-600">Avg Score</div>
          </div>
          
          <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {analysis.top_keywords.length}
            </div>
            <div className="text-sm text-purple-600">Keywords</div>
          </div>
          
          <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur">
            <Badge 
              variant={getSentimentBadgeVariant(analysis.sentiment.overall_sentiment)}
              className="text-lg px-4 py-2"
            >
              {analysis.sentiment.overall_sentiment}
            </Badge>
            <div className="text-sm text-purple-600 mt-2">
              {(analysis.sentiment.confidence * 100).toFixed(0)}% confidence
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Tabbed Content */}
      <Tabs defaultValue="newsletter" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/20 backdrop-blur">
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Newsletter Tab */}
        <TabsContent value="newsletter">
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-purple-900">Newsletter Draft</h3>
              <GlassButton
                onClick={() => copyToClipboard(newsletterDraft, 'newsletter')}
                variant="secondary"
                size="sm"
              >
                {copiedContent === 'newsletter' ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Text
                  </>
                )}
              </GlassButton>
            </div>
            <div className="prose prose-purple max-w-none">
              <div className="whitespace-pre-wrap text-purple-800 leading-relaxed">
                {newsletterDraft}
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Key Insights</h3>
              <ul className="space-y-3">
                {analysis.key_insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-purple-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Content Themes</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.content_themes.map((theme, index) => (
                  <Badge key={index} variant="secondary" className="text-purple-700">
                    {theme}
                  </Badge>
                ))}
              </div>
              
              <h4 className="text-md font-medium text-purple-900 mt-6 mb-3">Newsletter Angles</h4>
              <ul className="space-y-2">
                {analysis.newsletter_angles.map((angle, index) => (
                  <li key={index} className="text-purple-700 text-sm">
                    • {angle}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-purple-900">Top Keywords</h3>
              <GlassButton
                onClick={() => copyToClipboard(
                  analysis.top_keywords.map(k => `${k.keyword} (${k.relevance_score}%)`).join(', '),
                  'keywords'
                )}
                variant="secondary"
                size="sm"
              >
                {copiedContent === 'keywords' ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Keywords
                  </>
                )}
              </GlassButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.top_keywords.slice(0, 12).map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                  <div>
                    <span className="font-medium text-purple-900">{keyword.keyword}</span>
                    <div className="text-sm text-purple-600">
                      {keyword.mentions} mentions
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-purple-800">
                      {keyword.relevance_score}%
                    </div>
                    <Progress 
                      value={keyword.relevance_score} 
                      className="w-16 h-2 mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-6">Trending Topics</h3>
            <div className="space-y-4">
              {analysis.trending_topics.map((trend, index) => (
                <div key={index} className="p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-purple-900">{trend.topic}</h4>
                    <Badge variant="outline" className="text-purple-700">
                      {trend.trend_score}% trending
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-600 mb-3">{trend.relevance}</p>
                  <div className="space-y-1">
                    {trend.discussion_points.map((point, pointIndex) => (
                      <div key={pointIndex} className="text-sm text-purple-700">
                        • {point}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>

      {/* Source Data Summary */}
      {sourceData && (
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Source Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-purple-600">Search Query</div>
              <div className="font-medium text-purple-900">{sourceData.search_query}</div>
            </div>
            <div>
              <div className="text-sm text-purple-600">Total Posts Analyzed</div>
              <div className="font-medium text-purple-900">{sourceData.total_posts}</div>
            </div>
            <div>
              <div className="text-sm text-purple-600">Top Subreddits</div>
              <div className="font-medium text-purple-900">
                {sourceData.posts_sample?.map((post: any) => `r/${post.subreddit}`).join(', ').slice(0, 50)}...
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
