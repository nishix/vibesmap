"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { VibeScore } from "@/components/vibe-score"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { Spot, VibeType } from "@/lib/types"

const vibeColorMap: Record<VibeType, string> = {
  cyberpunk: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30",
  "retro-showa": "bg-neon-amber/15 text-neon-amber border-neon-amber/30",
  "zen-minimal": "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
  ghibli: "bg-neon-pink/15 text-neon-pink border-neon-pink/30",
  "neon-night": "bg-neon-purple/15 text-neon-purple border-neon-purple/30",
}

const vibeLabelMap: Record<VibeType, string> = {
  cyberpunk: "Cyberpunk",
  "retro-showa": "Retro Showa",
  "zen-minimal": "Zen",
  ghibli: "Ghibli",
  "neon-night": "Neon Night",
}

interface SpotCardProps {
  spot: Spot
}

export function SpotCard({ spot }: SpotCardProps) {
  const [liked, setLiked] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <Link href={`/spots/${spot.id}`}>
      <article className="glass group relative flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:neon-glow-purple cursor-pointer">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {imgError ? (
            <div className="flex h-full items-center justify-center bg-secondary">
              <MapPin className="h-8 w-8 text-muted-foreground/30" />
            </div>
          ) : (
            <Image
              src={spot.image}
              alt={spot.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImgError(true)}
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

          {/* Vibe Score floating */}
          <div className="absolute right-3 top-3">
            <VibeScore score={spot.vibeScore} />
          </div>

          {/* Like button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setLiked(!liked)
            }}
            className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/50 backdrop-blur-sm transition-colors hover:bg-background/70"
            aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                liked ? "fill-neon-pink text-neon-pink" : "text-foreground/70"
              )}
            />
          </button>

          {/* Spot name overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-display text-lg font-bold leading-tight text-foreground drop-shadow-lg">
              {spot.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{spot.location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {spot.description}
          </p>

          {/* Vibe tags */}
          <div className="mt-auto flex flex-wrap gap-1.5">
            {spot.vibes.map((vibe) => (
              <Badge
                key={vibe}
                variant="outline"
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px] font-medium",
                  vibeColorMap[vibe]
                )}
              >
                {vibeLabelMap[vibe]}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
