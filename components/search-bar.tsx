"use client"

import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  loading?: boolean
}

export function SearchBar({ value, onChange, onSearch, loading }: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch()
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl px-4">
      <div className="glass-strong neon-glow-purple flex items-center gap-3 rounded-xl p-2">
        <div className="flex flex-1 items-center gap-3 pl-3">
          <Search className="h-5 w-5 shrink-0 text-neon-purple" />
          <Input
            type="text"
            placeholder="エリアや場所名を入力..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-10 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <Button
          onClick={onSearch}
          disabled={loading}
          className="shrink-0 rounded-lg bg-neon-purple px-6 text-primary-foreground hover:bg-neon-purple/90 disabled:opacity-50"
          aria-label="検索"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Explore"
          )}
        </Button>
      </div>
    </div>
  )
}
