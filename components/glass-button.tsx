import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { forwardRef } from "react"

interface GlassButtonProps extends React.ComponentProps<typeof Button> {
  variant?: "default" | "secondary" | "ghost"
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default:
        "bg-purple-500/90 hover:bg-purple-600/95 text-white border border-purple-400/50 hover:border-purple-300/60 backdrop-blur-[20px] shadow-[0_4px_16px_rgba(139,92,246,0.25)] hover:shadow-[0_8px_24px_rgba(139,92,246,0.35)] hover:glow-purple",
      secondary:
        "bg-white/20 hover:bg-white/30 text-purple-700 hover:text-purple-800 border border-white/30 hover:border-white/40 backdrop-blur-[20px] shadow-[0_2px_12px_rgba(139,92,246,0.12)]",
      ghost:
        "bg-transparent hover:bg-white/15 text-purple-600 hover:text-purple-700 border border-transparent hover:border-white/20 backdrop-blur-[20px]",
    }

    return (
      <Button
        ref={ref}
        className={cn(
          // Smooth 400ms animations with elegant curves
          "transition-all duration-500 ease-out font-medium tracking-wide",
          // Generous spacing (20px base unit)
          "px-6 py-3 text-base",
          // Elegant micro-interactions
          "hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-1",
          variants[variant],
          className,
        )}
        {...props}
      />
    )
  },
)

GlassButton.displayName = "GlassButton"
