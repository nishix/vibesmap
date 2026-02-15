"use client"

import { cn } from "@/lib/utils"

interface VibeScoreProps {
  score: number
  size?: "sm" | "md"
}

export function VibeScore({ score, size = "md" }: VibeScoreProps) {
  const circumference = 2 * Math.PI * 18
  const offset = circumference - (score / 100) * circumference

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: "stroke-neon-cyan", text: "text-neon-cyan" }
    if (s >= 60) return { stroke: "stroke-neon-purple", text: "text-neon-purple" }
    if (s >= 40) return { stroke: "stroke-neon-amber", text: "text-neon-amber" }
    return { stroke: "stroke-neon-pink", text: "text-neon-pink" }
  }

  const colors = getColor(score)
  const dimensions = size === "sm" ? "h-10 w-10" : "h-12 w-12"

  return (
    <div className={cn("relative", dimensions)}>
      <svg className="h-full w-full -rotate-90" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-secondary"
        />
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(colors.stroke, "transition-all duration-700")}
        />
      </svg>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center font-display font-bold",
          colors.text,
          size === "sm" ? "text-[10px]" : "text-xs"
        )}
      >
        {score}
      </span>
    </div>
  )
}
