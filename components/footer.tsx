import { Radio } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background/50 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neon-purple/20">
            <Radio className="h-3 w-3 text-neon-purple" />
          </div>
          <span className="font-display text-sm font-semibold text-foreground">Local Vibes</span>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          AI-powered atmosphere analysis to make your travels more sensory. We find the perfect spot for your vibe, anywhere in the world.
        </p>
        <p className="text-[10px] text-muted-foreground/40">
          {"© 2026 Local Vibes. All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
