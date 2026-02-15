"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
    ArrowLeft,
    MapPin,
    Clock,
    Phone,
    Globe,
    Star,
    Sparkles,
    Heart,
    ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { VibeScore } from "@/components/vibe-score"
import { cn } from "@/lib/utils"
import type { SpotDetail as SpotDetailType, VibeType } from "@/lib/types"

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

interface SpotDetailProps {
    spot: SpotDetailType
}

export function SpotDetail({ spot }: SpotDetailProps) {
    const [liked, setLiked] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState(0)

    return (
        <div className="mx-auto max-w-5xl px-4 py-8">
            {/* Back link */}
            <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to explore</span>
            </Link>

            {/* Hero image */}
            <div className="relative mb-8 overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/7]">
                    <Image
                        src={spot.photos[selectedPhoto] ?? spot.image}
                        alt={spot.name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                </div>

                {/* Floating info */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <div className="mb-2 flex flex-wrap gap-1.5">
                                {spot.vibes.map((vibe) => (
                                    <Badge
                                        key={vibe}
                                        variant="outline"
                                        className={cn(
                                            "rounded-md px-2 py-0.5 text-xs font-medium backdrop-blur-sm",
                                            vibeColorMap[vibe]
                                        )}
                                    >
                                        {vibeLabelMap[vibe]}
                                    </Badge>
                                ))}
                            </div>
                            <h1 className="font-display text-3xl font-bold text-foreground drop-shadow-lg md:text-4xl">
                                {spot.name}
                            </h1>
                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{spot.address}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <VibeScore score={spot.vibeScore} size="md" />
                            <button
                                onClick={() => setLiked(!liked)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/50 backdrop-blur-sm transition-colors hover:bg-background/70"
                            >
                                <Heart
                                    className={cn(
                                        "h-5 w-5 transition-colors",
                                        liked
                                            ? "fill-neon-pink text-neon-pink"
                                            : "text-foreground/70"
                                    )}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Photo gallery thumbnails */}
            {spot.photos.length > 1 && (
                <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                    {spot.photos.map((photo, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedPhoto(i)}
                            className={cn(
                                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all",
                                selectedPhoto === i
                                    ? "ring-2 ring-neon-purple ring-offset-2 ring-offset-background"
                                    : "opacity-60 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={photo}
                                alt={`${spot.name} photo ${i + 1}`}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Content Grid */}
            <div className="grid gap-8 md:grid-cols-3">
                {/* Main content - 2 cols */}
                <div className="space-y-8 md:col-span-2">
                    {/* Why Now Section */}
                    <section className="glass overflow-hidden rounded-xl p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-neon-amber" />
                            <h2 className="font-display text-lg font-semibold text-foreground">
                                今、ここに行くべき理由
                            </h2>
                        </div>
                        <p className="text-base leading-relaxed text-muted-foreground">
                            {spot.whyNow}
                        </p>
                    </section>

                    {/* Description */}
                    <section>
                        <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
                            Vibeの解説
                        </h2>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {spot.description}
                        </p>
                    </section>

                    {/* Reviews */}
                    {spot.reviews.length > 0 && (
                        <section>
                            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
                                レビュー
                            </h2>
                            <div className="space-y-4">
                                {spot.reviews.map((review, i) => (
                                    <div key={i} className="glass rounded-xl p-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm font-medium text-foreground">
                                                {review.author}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3.5 w-3.5 fill-neon-amber text-neon-amber" />
                                                <span className="text-sm text-muted-foreground">
                                                    {review.rating}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                                            {review.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar - 1 col */}
                <div className="space-y-6">
                    {/* Info card */}
                    <div className="glass rounded-xl p-5">
                        <h3 className="mb-4 font-display text-base font-semibold text-foreground">
                            詳細情報
                        </h3>
                        <div className="space-y-3">
                            {spot.rating && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Star className="h-4 w-4 shrink-0 text-neon-amber" />
                                    <span className="text-muted-foreground">
                                        {spot.rating} / 5.0
                                        {spot.userRatingsTotal && (
                                            <span className="text-muted-foreground/60">
                                                {` (${spot.userRatingsTotal}件)`}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            )}

                            {spot.openNow !== undefined && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Clock className="h-4 w-4 shrink-0 text-neon-cyan" />
                                    <span
                                        className={cn(
                                            spot.openNow ? "text-emerald-400" : "text-destructive"
                                        )}
                                    >
                                        {spot.openNow ? "営業中" : "営業時間外"}
                                    </span>
                                </div>
                            )}

                            {spot.phone && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 shrink-0 text-neon-purple" />
                                    <a
                                        href={`tel:${spot.phone}`}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        {spot.phone}
                                    </a>
                                </div>
                            )}

                            {spot.website && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Globe className="h-4 w-4 shrink-0 text-neon-pink" />
                                    <a
                                        href={spot.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 truncate text-muted-foreground hover:text-foreground"
                                    >
                                        <span className="truncate">Website</span>
                                        <ExternalLink className="h-3 w-3 shrink-0" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Opening hours */}
                    {spot.openingHours && spot.openingHours.length > 0 && (
                        <div className="glass rounded-xl p-5">
                            <h3 className="mb-3 font-display text-base font-semibold text-foreground">
                                営業時間
                            </h3>
                            <div className="space-y-1.5">
                                {spot.openingHours.map((line, i) => (
                                    <p
                                        key={i}
                                        className="text-xs leading-relaxed text-muted-foreground"
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Google Maps link */}
                    {spot.lat && spot.lng && (
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${spot.lat},${spot.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass flex items-center justify-center gap-2 rounded-xl p-4 text-sm font-medium text-foreground transition-all hover:neon-glow-cyan"
                        >
                            <MapPin className="h-4 w-4 text-neon-cyan" />
                            <span>Google Maps で開く</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
