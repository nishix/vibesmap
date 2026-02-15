"use client"

import { useState, useCallback, useRef } from "react"
import type { Spot, VibeType, SearchSpotsResponse } from "@/lib/types"

interface UseSpotsReturn {
    spots: Spot[]
    loading: boolean
    error: string | null
    searchSpots: (query: string, vibes: VibeType[]) => Promise<void>
}

export function useSpots(): UseSpotsReturn {
    const [spots, setSpots] = useState<Spot[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const abortControllerRef = useRef<AbortController | null>(null)

    const searchSpots = useCallback(
        async (query: string, vibes: VibeType[]) => {
            // 前のリクエストをキャンセル
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }

            const controller = new AbortController()
            abortControllerRef.current = controller

            setLoading(true)
            setError(null)

            try {
                const params = new URLSearchParams()
                if (query) params.set("q", query)
                if (vibes.length > 0) params.set("vibes", vibes.join(","))

                const res = await fetch(`/api/spots?${params.toString()}`, {
                    signal: controller.signal,
                })

                if (!res.ok) {
                    throw new Error("スポットの取得に失敗しました")
                }

                const data: SearchSpotsResponse = await res.json()
                setSpots(data.spots)
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") {
                    return // キャンセルされた場合は無視
                }
                setError(
                    err instanceof Error
                        ? err.message
                        : "予期しないエラーが発生しました"
                )
                setSpots([])
            } finally {
                setLoading(false)
            }
        },
        []
    )

    return { spots, loading, error, searchSpots }
}
