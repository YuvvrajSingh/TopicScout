"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Sparkles, Download, Settings, Zap, Mail, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GlassCard } from "@/components/glass-card"
import { GlassButton } from "@/components/glass-button"
import { ProgressIndicator } from "@/components/progress-indicator"
import { MeshBackground } from "@/components/mesh-background"
import { AnalysisResults } from "@/components/analysis-results"
import { useAnalysis } from "@/hooks/use-analysis"
import { EmailService } from "@/lib/email"
import { PDFGenerator } from "@/lib/pdf"

export default function GeneratePage() {
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [emailDialog, setEmailDialog] = useState(false)
  const [emailData, setEmailData] = useState({ email: "", name: "" })
  const [settings, setSettings] = useState({
    creativity: [7],
    includeStats: true,
    targetAudience: "general",
  })

  // Handle URL parameters for pre-filled keywords
  useEffect(() => {
    const keywordParam = searchParams.get('keyword')
    if (keywordParam) {
      setKeyword(decodeURIComponent(keywordParam))
    }
  }, [searchParams])

  const {
    isLoading,
    error,
    analysis,
    newsletterDraft,
    sourceData,
    startAnalysis,
    clearError,
    getCurrentStepText,
    getProgress
  } = useAnalysis()

  const handleGenerate = async () => {
    if (!keyword.trim()) return
    
    await startAnalysis(keyword, {
      limit: 50,
      creativity: settings.creativity,
      includeStats: settings.includeStats,
      targetAudience: settings.targetAudience
    })
  }

  const handleDownloadPDF = async () => {
    if (!analysis || !newsletterDraft) return

    try {
      const pdfGenerator = new PDFGenerator()
      const pdfBlob = await pdfGenerator.generateNewsletterPDF(
        keyword,
        newsletterDraft,
        analysis,
        { includeAnalysis: settings.includeStats }
      )
      
      pdfGenerator.downloadPDF(pdfBlob, `${keyword}_newsletter.pdf`)
    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('Failed to generate PDF. Please try again.')
    }
  }

  const handleSendEmail = async () => {
    if (!emailData.email || !analysis || !newsletterDraft) return

    try {
      const emailService = new EmailService()
      
      if (!emailService.validateEmailAddress(emailData.email)) {
        alert('Please enter a valid email address')
        return
      }

      const result = await emailService.sendNewsletter({
        to_email: emailData.email,
        to_name: emailData.name,
        subject: `Newsletter Draft: ${keyword}`,
        content: newsletterDraft,
        keyword: keyword
      })

      if (result.success) {
        alert('Newsletter sent successfully!')
        setEmailDialog(false)
        setEmailData({ email: "", name: "" })
      } else {
        alert(`Failed to send email: ${result.message}`)
      }
    } catch (error) {
      console.error('Email sending failed:', error)
      alert('Failed to send email. Please try again.')
    }
  }

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
              <div className="flex items-center space-x-3">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <span className="text-lg font-medium text-purple-800 tracking-wide">Topic Generator</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 bg-red-50/80 border-red-200 backdrop-blur">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
            <button
              onClick={clearError}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </Alert>
        )}

        {!analysis ? (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Input Panel */}
            <div className="lg:col-span-2 space-y-8">
              <GlassCard className="p-10">
                <h1 className="text-3xl font-bold text-purple-900 mb-8 tracking-wide">Generate Newsletter Topics</h1>

                <div className="space-y-8">
                  <div>
                    <Label htmlFor="keyword" className="text-purple-800 text-lg font-medium mb-4 block tracking-wide">
                      Enter your keyword or topic
                    </Label>
                    <div className="relative">
                      <Input
                        id="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="e.g., sustainable living, cryptocurrency, productivity..."
                        className="text-lg p-5 bg-white/15 border border-white/25 text-purple-800 placeholder:text-purple-500 backdrop-blur-[20px] focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/30 rounded-xl"
                        onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                        disabled={isLoading}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500 text-sm">
                        {keyword.length}/100
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-6">
                    <GlassButton
                      onClick={handleGenerate}
                      disabled={!keyword.trim() || isLoading}
                      className="flex-1 h-14 text-lg"
                    >
                      {isLoading ? (
                        <>
                          <Zap className="h-5 w-5 mr-3 animate-spin" />
                          {getCurrentStepText()}
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-3" />
                          Generate Newsletter
                        </>
                      )}
                    </GlassButton>

                    <Dialog open={showSettings} onOpenChange={setShowSettings}>
                      <DialogTrigger asChild>
                        <GlassButton variant="secondary" size="lg" className="h-14">
                          <Settings className="h-5 w-5" />
                        </GlassButton>
                      </DialogTrigger>
                      <DialogContent className="bg-white/90 backdrop-blur-xl border-white/30">
                        <DialogHeader>
                          <DialogTitle className="text-purple-900">Generation Settings</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div>
                            <Label className="text-purple-800 font-medium">Creativity Level</Label>
                            <div className="mt-2">
                              <Slider
                                value={settings.creativity}
                                onValueChange={(value) => setSettings(prev => ({ ...prev, creativity: value }))}
                                max={10}
                                min={1}
                                step={1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-sm text-purple-600 mt-1">
                                <span>Conservative</span>
                                <span>Balanced</span>
                                <span>Creative</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <Label className="text-purple-800 font-medium">Include Statistics</Label>
                            <Switch
                              checked={settings.includeStats}
                              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeStats: checked }))}
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </GlassCard>

              {/* Progress Indicator */}
              {isLoading && (
                <ProgressIndicator 
                  currentStep={Math.floor(getProgress() / 25)} 
                />
              )}
            </div>

            {/* Settings Panel */}
            <div className="space-y-8">
              <GlassCard className="p-8">
                <h2 className="text-xl font-semibold text-purple-900 mb-6 tracking-wide">How it Works</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-800 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-purple-900">Analyze Discussions</h3>
                      <p className="text-purple-600 text-sm">We scan Reddit for relevant conversations about your topic</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-800 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-purple-900">Extract Insights</h3>
                      <p className="text-purple-600 text-sm">AI identifies key trends, sentiment, and discussion points</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-800 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-purple-900">Generate Newsletter</h3>
                      <p className="text-purple-600 text-sm">Creates engaging newsletter content ready to send</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-8">
                <h2 className="text-xl font-semibold text-purple-900 mb-4 tracking-wide">Tips for Better Results</h2>
                <ul className="space-y-3 text-purple-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-sm">Use specific keywords for focused analysis</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-sm">Try trending topics for more engagement</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-sm">Adjust creativity for different audiences</span>
                  </li>
                </ul>
              </GlassCard>
            </div>
          </div>
        ) : (
          /* Results View */
          <AnalysisResults
            keyword={keyword}
            analysis={analysis}
            newsletterDraft={newsletterDraft!}
            sourceData={sourceData}
            onDownloadPDF={handleDownloadPDF}
            onSendEmail={() => setEmailDialog(true)}
          />
        )}

        {/* Email Dialog */}
        <Dialog open={emailDialog} onOpenChange={setEmailDialog}>
          <DialogContent className="bg-white/90 backdrop-blur-xl border-white/30">
            <DialogHeader>
              <DialogTitle className="text-purple-900">Send Newsletter via Email</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="email" className="text-purple-800 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={emailData.email}
                  onChange={(e) => setEmailData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="name" className="text-purple-800 font-medium">Name (Optional)</Label>
                <Input
                  id="name"
                  value={emailData.name}
                  onChange={(e) => setEmailData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your Name"
                  className="mt-2"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <GlassButton
                  variant="secondary"
                  onClick={() => setEmailDialog(false)}
                >
                  Cancel
                </GlassButton>
                <GlassButton
                  onClick={handleSendEmail}
                  disabled={!emailData.email}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Newsletter
                </GlassButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
