import Link from "next/link"
import { ArrowLeft, ExternalLink, TrendingUp, Users, Zap } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { GlassButton } from "@/components/glass-button"
import { MeshBackground } from "@/components/mesh-background"

const examples = [
  {
    keyword: "Sustainable Living",
    category: "Lifestyle",
    topics: [
      "10 Zero-Waste Swaps That Actually Save Money",
      "The Psychology Behind Sustainable Choices",
      "Building an Eco-Friendly Home on Any Budget",
    ],
    metrics: { engagement: 92, trending: "High", audience: "Eco-conscious" },
  },
  {
    keyword: "Remote Work",
    category: "Business",
    topics: [
      "The Future of Hybrid Work: What Leaders Need to Know",
      "Building Company Culture in a Remote-First World",
      "Productivity Hacks for the Distributed Team",
    ],
    metrics: { engagement: 88, trending: "High", audience: "Professionals" },
  },
  {
    keyword: "Cryptocurrency",
    category: "Finance",
    topics: [
      "DeFi Explained: Beyond the Hype",
      "The Environmental Impact of Blockchain Technology",
      "Crypto Regulation: What's Coming in 2024",
    ],
    metrics: { engagement: 85, trending: "Medium", audience: "Investors" },
  },
  {
    keyword: "Mental Health",
    category: "Health",
    topics: [
      "The Science of Burnout: Recognition and Recovery",
      "Digital Detox: Reclaiming Your Mental Space",
      "Mindfulness in the Age of Information Overload",
    ],
    metrics: { engagement: 94, trending: "High", audience: "General" },
  },
  {
    keyword: "AI & Technology",
    category: "Technology",
    topics: [
      "The Ethics of AI in Content Creation",
      "How Machine Learning is Changing Healthcare",
      "The Future of Work in an AI-Driven World",
    ],
    metrics: { engagement: 90, trending: "Very High", audience: "Tech-savvy" },
  },
  {
    keyword: "Personal Finance",
    category: "Finance",
    topics: [
      "The 50/30/20 Rule: Does It Still Work in 2024?",
      "Investing for Beginners: Beyond the Stock Market",
      "The Hidden Costs of Subscription Services",
    ],
    metrics: { engagement: 87, trending: "Medium", audience: "Young Adults" },
  },
]

const categories = ["All", "Lifestyle", "Business", "Finance", "Health", "Technology"]

export default function ExamplesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <MeshBackground />

      {/* Premium Glass Navigation */}
      <nav className="backdrop-blur-[20px] bg-white/20 border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="flex items-center space-x-3 text-purple-600 hover:text-purple-800 transition-colors duration-400"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back</span>
              </Link>
              <div className="text-purple-400">•</div>
              <span className="text-lg font-medium text-purple-800 tracking-wide">Examples</span>
            </div>
            <GlassButton asChild>
              <Link href="/generate">Try It Yourself</Link>
            </GlassButton>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8 tracking-wide">
            Real Examples from Real Users
          </h1>
          <p className="text-xl text-purple-700 max-w-3xl mx-auto leading-relaxed">
            See how TopicScout transforms simple keywords into engaging newsletter topics across different industries
            and niches.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <GlassButton key={category} variant={category === "All" ? "default" : "secondary"} className="px-8">
              {category}
            </GlassButton>
          ))}
        </div>

        {/* Examples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {examples.map((example, index) => (
            <GlassCard key={index} className="p-8 hover:scale-105 transition-transform duration-500">
              <div className="flex items-center justify-between mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full text-purple-700 text-sm font-medium border border-purple-400/30">
                  {example.category}
                </span>
                <div className="flex items-center space-x-2 text-purple-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">{example.metrics.trending}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-purple-900 mb-4 tracking-wide">"{example.keyword}"</h3>

              <div className="space-y-4 mb-8">
                {example.topics.map((topic, topicIndex) => (
                  <div
                    key={topicIndex}
                    className="p-4 bg-white/15 rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-400"
                  >
                    <p className="text-purple-800 text-sm leading-relaxed font-medium">{topic}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-purple-600 mb-6">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span className="font-medium">{example.metrics.engagement}% engagement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{example.metrics.audience}</span>
                </div>
              </div>

              <GlassButton variant="secondary" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Use This Keyword
              </GlassButton>
            </GlassCard>
          ))}
        </div>

        {/* CTA Section */}
        <GlassCard className="p-16 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 tracking-wide">Ready to Create Your Own?</h2>
          <p className="text-xl text-purple-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of content creators who've transformed their newsletter strategy with AI-powered topic
            generation.
          </p>
          <GlassButton size="lg" asChild>
            <Link href="/generate">Start Generating Topics</Link>
          </GlassButton>
        </GlassCard>
      </div>
    </div>
  )
}
