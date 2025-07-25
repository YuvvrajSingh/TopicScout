import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        // Premium white glass with 20px blur and higher opacity
        "backdrop-blur-[20px] bg-white/25 border border-white/40 rounded-2xl",
        // Purple-tinted shadows for brand consistency
        "shadow-[0_8px_32px_rgba(139,92,246,0.15),0_2px_8px_rgba(139,92,246,0.08)]",
        // Soft inner highlight
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-white/10 before:pointer-events-none",
        // Elegant hover states with purple glow
        "hover:bg-white/30 hover:border-white/50 hover:shadow-[0_12px_40px_rgba(139,92,246,0.20),0_4px_12px_rgba(139,92,246,0.12)]",
        // Smooth 400ms animations
        "transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        // Generous spacing
        "relative overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  )
}
