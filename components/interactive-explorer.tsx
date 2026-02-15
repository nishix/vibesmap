"use client"

import { useState, useCallback } from "react"
import { SearchBar } from "@/components/search-bar"
import { VibeSelector, type VibeType } from "@/components/vibe-selector"
import { SpotsGrid } from "@/components/spots-grid"
import { useSpots } from "@/hooks/use-spots"

export function InteractiveExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVibes, setSelectedVibes] = useState<VibeType[]>([])
  const { spots, loading, error, searchSpots } = useSpots()
  const [hasSearched, setHasSearched] = useState(false)

  const handleVibeToggle = (vibe: VibeType) => {
    setSelectedVibes((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe]
    )
  }

  const handleSearch = useCallback(async () => {
    setHasSearched(true)
    await searchSpots(searchQuery, selectedVibes)
  }, [searchQuery, selectedVibes, searchSpots])

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        loading={loading}
      />
      <VibeSelector selected={selectedVibes} onToggle={handleVibeToggle} />
      <SpotsGrid
        spots={spots}
        loading={loading}
        error={error}
        hasSearched={hasSearched}
      />
    </>
  )
}
