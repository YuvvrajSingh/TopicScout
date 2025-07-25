import { TrendingUp, Users, Zap, Target } from "lucide-react"
import { GlassCard } from "./glass-card"

interface InsightsPanelProps {
  keyword: string
}

export function InsightsPanel({ keyword }: InsightsPanelProps) {
  const insights = {
    sentiment: "Positive",
    engagement: 92,
    trending: "High",
    audience: "Eco-conscious millennials",
    keywords: ["sustainability", "eco-friendly", "green living", "zero waste"],
    stats: {
      searchVolume: "12K/month",
      competition: "Medium",
      seasonality: "Year-round",
    },
  }

  return (
    <div className="space-y-8">
      <GlassCard className="p-8">
        <h3 className="text-xl font-semibold text-purple-900 mb-6 flex items-center tracking-wide">
          <Target className="mr-3 h-5 w-5 text-purple-600" />
          Keyword Insights
        </h3>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-purple-700 font-medium">Sentiment</span>
            <span className="px-4 py-2 bg-green-100/80 text-green-700 rounded-full text-sm font-medium border border-green-200/60">
              {insights.sentiment}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-purple-700 font-medium">Engagement Score</span>
            <span className="text-purple-900 font-semibold text-lg">{insights.engagement}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-purple-700 font-medium">Trending</span>
            <span className="px-4 py-2 bg-orange-100/80 text-orange-700 rounded-full text-sm font-medium border border-orange-200/60">
              {insights.trending}
            </span>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h3 className="text-xl font-semibold text-purple-900 mb-6 flex items-center tracking-wide">
          <Users className="mr-3 h-5 w-5 text-indigo-600" />
          Target Audience
        </h3>
        <p className="text-purple-700 text-lg font-medium">{insights.audience}</p>
      </GlassCard>

      <GlassCard className="p-8">
        <h3 className="text-xl font-semibold text-purple-900 mb-6 flex items-center tracking-wide">
          <TrendingUp className="mr-3 h-5 w-5 text-violet-600" />
          Related Keywords
        </h3>
        <div className="flex flex-wrap gap-3">
          {insights.keywords.map((kw, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-white/20 text-purple-700 rounded-full text-sm font-medium border border-white/25 hover:bg-white/25 transition-colors duration-400"
            >
              {kw}
            </span>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h3 className="text-xl font-semibold text-purple-900 mb-6 flex items-center tracking-wide">
          <Zap className="mr-3 h-5 w-5 text-purple-600" />
          Statistics
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-purple-700 font-medium">Search Volume</span>
            <span className="text-purple-800 font-semibold">{insights.stats.searchVolume}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-700 font-medium">Competition</span>
            <span className="text-purple-800 font-semibold">{insights.stats.competition}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-700 font-medium">Seasonality</span>
            <span className="text-purple-800 font-semibold">{insights.stats.seasonality}</span>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
