import Link from "next/link"
import { ArrowLeft, Mail, Twitter, Linkedin } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { GlassButton } from "@/components/glass-button"
import { MeshBackground } from "@/components/mesh-background"

export default function AboutPage() {
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
              <span className="text-lg font-medium text-purple-800 tracking-wide">About</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8 tracking-wide">About TopicScout</h1>
          <p className="text-xl text-purple-700 max-w-2xl mx-auto leading-relaxed">
            Empowering content creators with AI-driven newsletter topic generation
          </p>
        </div>

        {/* Problem Section */}
        <GlassCard className="p-10 mb-10 bg-gradient-to-r from-red-50/60 to-orange-50/60 border-red-200/40">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 tracking-wide">The Problem We Solve</h2>
          <div className="space-y-6 text-purple-700 text-lg leading-relaxed">
            <p>Content creators spend countless hours brainstorming newsletter topics, often struggling with:</p>
            <ul className="space-y-3 ml-8">
              <li>• Writer's block and creative burnout</li>
              <li>• Lack of audience insights and trending topics</li>
              <li>• Time-consuming research and ideation processes</li>
              <li>• Difficulty maintaining consistent content quality</li>
              <li>• Uncertainty about what resonates with their audience</li>
            </ul>
            <p>
              This leads to inconsistent publishing schedules, decreased engagement, and missed opportunities to connect
              with their audience.
            </p>
          </div>
        </GlassCard>

        {/* Solution Section */}
        <GlassCard className="p-10 mb-10 bg-gradient-to-r from-green-50/60 to-emerald-50/60 border-green-200/40">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 tracking-wide">Our Solution</h2>
          <div className="space-y-6 text-purple-700 text-lg leading-relaxed">
            <p>
              TopicScout transforms any keyword into a comprehensive set of engaging newsletter topics using advanced AI
              technology. Our platform provides:
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 tracking-wide mb-2">🚀 Instant Generation</h3>
                  <p>Generate 5-10 high-quality topics in under 10 seconds</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-900 tracking-wide mb-2">🎯 Audience Insights</h3>
                  <p>AI-powered sentiment analysis and engagement predictions</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 tracking-wide mb-2">📈 Trending Topics</h3>
                  <p>Real-time trend analysis to keep your content relevant</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-900 tracking-wide mb-2">✨ Quality Assurance</h3>
                  <p>Every topic is crafted for maximum engagement and shareability</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Mission Section */}
        <GlassCard className="p-10 mb-10">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 tracking-wide">Our Mission</h2>
          <div className="text-purple-700 text-lg leading-relaxed space-y-6">
            <p>
              We believe that great content should be accessible to everyone. Our mission is to democratize content
              creation by providing powerful AI tools that help creators focus on what they do best: connecting with
              their audience.
            </p>
            <p>
              Whether you're a solo entrepreneur, marketing professional, or established publisher, TopicScout empowers
              you to create compelling newsletter content that drives engagement and builds lasting relationships with
              your readers.
            </p>
          </div>
        </GlassCard>

        {/* Stats Section */}
        <GlassCard className="p-10 mb-10">
          <h2 className="text-3xl font-bold text-purple-900 mb-12 text-center tracking-wide">By the Numbers</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-5xl font-bold text-purple-600 mb-4">10,000+</div>
              <div className="text-purple-700 text-lg">Topics Generated</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-indigo-600 mb-4">2,500+</div>
              <div className="text-purple-700 text-lg">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-violet-600 mb-4">95%</div>
              <div className="text-purple-700 text-lg">Satisfaction Rate</div>
            </div>
          </div>
        </GlassCard>

        {/* Contact Section */}
        <GlassCard className="p-12 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 tracking-wide">Get in Touch</h2>
          <p className="text-purple-700 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Have questions, feedback, or just want to say hello? We'd love to hear from you.
          </p>

          <div className="flex justify-center space-x-8 mb-10">
            <GlassButton variant="secondary" className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </GlassButton>
            <GlassButton variant="secondary" className="flex items-center">
              <Twitter className="mr-2 h-5 w-5" />
              Twitter
            </GlassButton>
            <GlassButton variant="secondary" className="flex items-center">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </GlassButton>
          </div>

          <GlassButton size="lg" asChild>
            <Link href="/generate">Try TopicScout Today</Link>
          </GlassButton>
        </GlassCard>
      </div>
    </div>
  )
}
