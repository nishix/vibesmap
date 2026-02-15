"use client"

import { cn } from "@/lib/utils"
import { Zap, Disc3, Leaf, CloudSun, Moon } from "lucide-react"
import type { ReactNode } from "react"

export type VibeType = "cyberpunk" | "retro-showa" | "zen-minimal" | "ghibli" | "neon-night"

interface Vibe {
  id: VibeType
  label: string
  icon: ReactNode
  color: string
  activeColor: string
  glowClass: string
}

const vibes: Vibe[] = [
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    icon: <Zap className="h-4 w-4" />,
    color: "text-neon-cyan",
    activeColor: "bg-neon-cyan/15 border-neon-cyan/40 text-neon-cyan",
    glowClass: "neon-glow-cyan",
  },
  {
    id: "retro-showa",
    label: "Retro Showa",
    icon: <Disc3 className="h-4 w-4" />,
    color: "text-neon-amber",
    activeColor: "bg-neon-amber/15 border-neon-amber/40 text-neon-amber",
    glowClass: "",
  },
  {
    id: "zen-minimal",
    label: "Zen & Minimal",
    icon: <Leaf className="h-4 w-4" />,
    color: "text-emerald-400",
    activeColor: "bg-emerald-400/15 border-emerald-400/40 text-emerald-400",
    glowClass: "",
  },
  {
    id: "ghibli",
    label: "Ghibli-esque",
    icon: <CloudSun className="h-4 w-4" />,
    color: "text-neon-pink",
    activeColor: "bg-neon-pink/15 border-neon-pink/40 text-neon-pink",
    glowClass: "neon-glow-pink",
  },
  {
    id: "neon-night",
    label: "Neon Night",
    icon: <Moon className="h-4 w-4" />,
    color: "text-neon-purple",
    activeColor: "bg-neon-purple/15 border-neon-purple/40 text-neon-purple",
    glowClass: "neon-glow-purple",
  },
]

interface VibeSelectorProps {
  selected: VibeType[]
  onToggle: (vibe: VibeType) => void
}

export function VibeSelector({ selected, onToggle }: VibeSelectorProps) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12">
      <div className="mb-6 text-center">
        <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">
          Choose your Vibe
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select vibes to filter recommended spots
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {vibes.map((vibe) => {
          const isActive = selected.includes(vibe.id)
          return (
            <button
              key={vibe.id}
              onClick={() => onToggle(vibe.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? `${vibe.activeColor} ${vibe.glowClass}`
                  : "border-border bg-secondary/50 text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
              )}
              aria-pressed={isActive}
            >
              {vibe.icon}
              <span>{vibe.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
