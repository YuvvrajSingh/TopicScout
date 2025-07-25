"use client"

import { useEffect, useState } from "react"

export function MeshBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Beautiful lavender base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-violet-100" />

      {/* Dreamy lavender layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/60 via-indigo-50/40 to-violet-100/60" />

      {/* Soft ambient lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-200/30 via-transparent to-indigo-100/40" />

      {/* Elegant floating gradients with purple tints */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-purple-300/25 via-indigo-200/15 to-transparent rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            top: `${-20 + mousePosition.y * 0.08}%`,
            left: `${-10 + mousePosition.x * 0.04}%`,
            transform: `scale(${1 + mousePosition.x * 0.0008})`,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-radial from-violet-300/20 via-purple-200/12 to-transparent rounded-full blur-3xl animate-float transition-transform duration-1000 ease-out"
          style={{
            top: `${10 - mousePosition.y * 0.04}%`,
            right: `${-5 + mousePosition.x * 0.03}%`,
          }}
        />
        <div
          className="absolute w-72 h-72 bg-gradient-radial from-indigo-300/22 via-purple-100/14 to-transparent rounded-full blur-3xl animate-drift"
          style={{
            bottom: `${20 + mousePosition.y * 0.05}%`,
            left: `${10 - mousePosition.x * 0.035}%`,
          }}
        />
        <div
          className="absolute w-88 h-88 bg-gradient-radial from-purple-200/18 via-violet-100/10 to-transparent rounded-full blur-3xl animate-float-reverse"
          style={{
            bottom: `${-10 - mousePosition.y * 0.045}%`,
            right: `${20 + mousePosition.x * 0.05}%`,
          }}
        />
        <div className="absolute top-[40%] left-[40%] w-64 h-64 bg-gradient-radial from-indigo-200/15 via-purple-50/8 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Dreamy rotating accents */}
      <div className="absolute inset-0">
        <div className="absolute top-[30%] right-[30%] w-56 h-56 bg-gradient-conic from-purple-200/12 via-indigo-100/8 to-violet-200/12 rounded-full blur-2xl animate-spin-slow" />
        <div className="absolute bottom-[40%] left-[60%] w-48 h-48 bg-gradient-conic from-violet-200/15 via-purple-100/8 to-indigo-200/12 rounded-full blur-2xl animate-spin-reverse" />
      </div>

      {/* Soft highlight overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-50/40 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-indigo-50/40 to-transparent" />
      </div>

      {/* Subtle texture for premium feel */}
      <div className="absolute inset-0 opacity-20 mix-blend-soft-light">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_50%)] bg-[length:140px_140px]" />
      </div>

      {/* Gentle vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-purple-100/20" />
    </div>
  )
}
