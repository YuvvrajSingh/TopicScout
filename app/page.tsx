import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Target, Users } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { GlassButton } from "@/components/glass-button"
import { MeshBackground } from "@/components/mesh-background"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <MeshBackground />

      {/* Premium Glass Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-[20px] bg-white/20 border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-semibold text-purple-800 tracking-wide">TopicScout</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/examples" className="text-purple-600 hover:text-purple-800 transition-colors duration-400">
                Examples
              </Link>
              <Link href="/about" className="text-purple-600 hover:text-purple-800 transition-colors duration-400">
                About
              </Link>
              <GlassButton asChild>
                <Link href="/generate">Get Started</Link>
              </GlassButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Ripple-inspired Typography */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <GlassCard className="max-w-4xl mx-auto p-16 mb-12 relative overflow-hidden">
              {/* Soft inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-purple-50/30 pointer-events-none rounded-2xl"></div>

              <h1 className="relative text-5xl md:text-7xl font-bold text-purple-900 mb-8 leading-tight tracking-tight">
                Generate Newsletter Topics in{" "}
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Seconds
                </span>
              </h1>
              <p className="relative text-xl text-purple-700 mb-10 max-w-2xl mx-auto leading-relaxed font-medium tracking-wide">
                Transform any keyword into engaging newsletter content with AI-powered topic generation. Perfect for
                content creators, marketers, and newsletter publishers.
              </p>
              <div className="relative flex flex-col sm:flex-row gap-6 justify-center">
                <GlassButton size="lg" asChild>
                  <Link href="/generate" className="flex items-center">
                    Start Generating <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </GlassButton>
                <GlassButton variant="secondary" size="lg" asChild>
                  <Link href="/examples">View Examples</Link>
                </GlassButton>
              </div>
            </GlassCard>
          </div>

          {/* Feature Cards with Purple Accents */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <GlassCard className="p-10 text-center hover:scale-105 transition-transform duration-500">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-purple-500/25">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-purple-900 mb-6 tracking-wide">Lightning Fast</h3>
              <p className="text-purple-700 leading-relaxed text-lg">
                Generate comprehensive newsletter topics in under 10 seconds. No more writer's block or endless
                brainstorming sessions.
              </p>
            </GlassCard>

            <GlassCard className="p-10 text-center hover:scale-105 transition-transform duration-500">
              <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-violet-500/25">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-purple-900 mb-6 tracking-wide">Targeted Content</h3>
              <p className="text-purple-700 leading-relaxed text-lg">
                AI-powered insights ensure your topics resonate with your audience and drive engagement across all
                platforms.
              </p>
            </GlassCard>

            <GlassCard className="p-10 text-center hover:scale-105 transition-transform duration-500">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-indigo-500/25">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-purple-900 mb-6 tracking-wide">Audience Focused</h3>
              <p className="text-purple-700 leading-relaxed text-lg">
                Understand your audience better with sentiment analysis and trending topic recommendations.
              </p>
            </GlassCard>
          </div>

          {/* Demo Preview with Enhanced Glass */}
          <GlassCard className="p-10 mb-20">
            <h2 className="text-3xl font-bold text-purple-900 text-center mb-10 tracking-wide">See It In Action</h2>
            <div className="bg-gradient-to-r from-purple-50/80 to-indigo-50/80 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              </div>
              <div className="space-y-5">
                <div className="flex items-center space-x-4">
                  <span className="text-purple-600 font-mono">$</span>
                  <span className="text-purple-800 font-medium">Enter keyword: "sustainable living"</span>
                </div>
                <div className="text-purple-600 ml-8">✨ Generating topics...</div>
                <div className="ml-8 space-y-3">
                  <div className="text-purple-800 font-medium">📧 "10 Zero-Waste Swaps That Actually Save Money"</div>
                  <div className="text-purple-800 font-medium">🌱 "The Psychology Behind Sustainable Choices"</div>
                  <div className="text-purple-800 font-medium">🏠 "Building an Eco-Friendly Home on Any Budget"</div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Final CTA */}
          <GlassCard className="p-16 text-center">
            <h2 className="text-4xl font-bold text-purple-900 mb-8 tracking-wide">
              Ready to Transform Your Newsletter?
            </h2>
            <p className="text-xl text-purple-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of content creators who've discovered the power of AI-generated newsletter topics.
            </p>
            <GlassButton size="lg" asChild>
              <Link href="/generate" className="flex items-center justify-center">
                Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </GlassButton>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
