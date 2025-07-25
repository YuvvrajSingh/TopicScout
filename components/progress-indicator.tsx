import { GlassCard } from "./glass-card"

interface ProgressIndicatorProps {
  currentStep: number
}

const steps = ["Analyzing keyword", "Researching trends", "Generating topics", "Analyzing sentiment"]

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <GlassCard className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-purple-900 tracking-wide">Generating Topics</h3>
        <div className="text-purple-600 text-sm font-medium">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      <div className="space-y-6">
        {/* Premium Progress Bar */}
        <div className="w-full bg-white/15 rounded-full h-3 backdrop-blur-sm border border-white/20">
          <div
            className="bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500 h-3 rounded-full transition-all duration-700 ease-out shadow-lg shadow-purple-500/25"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Elegant Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-400 ${
                  index <= currentStep
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md shadow-purple-500/30"
                    : "bg-white/20 border border-white/30"
                }`}
              />
              <span
                className={`text-base transition-colors duration-400 tracking-wide ${
                  index === currentStep
                    ? "text-purple-900 font-semibold"
                    : index < currentStep
                      ? "text-purple-700 font-medium"
                      : "text-purple-500"
                }`}
              >
                {step}
                {index === currentStep && (
                  <span className="ml-3 inline-block">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 inline-block" />
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
