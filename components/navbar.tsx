import { Radio } from "lucide-react"

export function Navbar() {
  return (
    <header className="glass-strong fixed left-0 right-0 top-0 z-50">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-purple/20">
            <Radio className="h-4 w-4 text-neon-purple" />
          </div>
          <span className="font-display text-base font-bold tracking-tight text-foreground">
            Local Vibes
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="hidden cursor-pointer transition-colors hover:text-foreground sm:inline">
            Spots
          </span>
          <span className="hidden cursor-pointer transition-colors hover:text-foreground sm:inline">
            Map
          </span>
          <span className="hidden cursor-pointer transition-colors hover:text-foreground sm:inline">
            About
          </span>
          <div className="h-4 w-px bg-border" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
            V
          </div>
        </div>
      </nav>
    </header>
  )
}
