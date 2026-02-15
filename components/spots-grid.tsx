"use client"

import { Compass } from "lucide-react"
import { SpotCard } from "@/components/spot-card"
import { SpotSkeleton } from "@/components/spot-skeleton"
import { ErrorState } from "@/components/error-state"
import type { Spot } from "@/lib/types"

interface SpotsGridProps {
  spots: Spot[]
  loading: boolean
  error: string | null
  hasSearched: boolean
}

export function SpotsGrid({ spots, loading, error, hasSearched }: SpotsGridProps) {
  if (error) {
    return <ErrorState message={error} />
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      {hasSearched && (
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">
              Recommended Spots
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {loading ? "検索中..." : `${spots.length} spots found`}
            </p>
          </div>
          <div className="glass flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
            <Compass className="h-3.5 w-3.5 text-neon-purple" />
            <span>AI Analyzed</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SpotSkeleton key={i} />
          ))}
        </div>
      ) : spots.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      ) : hasSearched ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Compass className="mb-4 h-12 w-12 text-muted-foreground/30" />
          <p className="text-lg font-medium text-muted-foreground">
            マッチするスポットが見つかりませんでした
          </p>
          <p className="mt-1 text-sm text-muted-foreground/60">
            検索キーワードやVibeを変えてみてください
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Compass className="mb-4 h-12 w-12 text-muted-foreground/30 animate-pulse" />
          <p className="text-lg font-medium text-muted-foreground">
            Vibeを選んで、スポットを探そう
          </p>
          <p className="mt-1 text-sm text-muted-foreground/60">
            エリアを入力して「Explore」をクリック
          </p>
        </div>
      )}
    </section>
  )
}
