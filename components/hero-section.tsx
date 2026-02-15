import { MapPin, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 pb-16 pt-24 text-center md:pt-32 md:pb-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-neon-purple/10 blur-[100px]" />
        <div className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-neon-cyan/10 blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-neon-pink/8 blur-[90px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-neon-cyan" />
          <span>Vibe-based Travel Guide</span>
        </div>

        <h1 className="font-display text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Discover the{" "}
          <span className="text-glow-purple bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
            {"City's Soul"}
          </span>
        </h1>

        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Feel your way through travel. Find spots that match your vibe.
        </p>

        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-neon-amber" />
          <span>AI-powered atmosphere analysis to recommend your perfect spot</span>
        </div>
      </div>
    </section>
  )
}
