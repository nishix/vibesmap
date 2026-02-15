"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SpotDetail } from "@/components/spot-detail"
import { ErrorState } from "@/components/error-state"
import type { SpotDetail as SpotDetailType } from "@/lib/types"
import { Loader2 } from "lucide-react"

export default function SpotDetailPage() {
    const params = useParams()
    const id = params.id as string
    const [spot, setSpot] = useState<SpotDetailType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchSpot() {
            try {
                setLoading(true)
                const res = await fetch(`/api/spots/${id}`)
                if (!res.ok) throw new Error("スポット情報の取得に失敗しました")
                const data = await res.json()
                setSpot(data.spot)
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "予期しないエラーが発生しました"
                )
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchSpot()
    }, [id])

    return (
        <div className="relative min-h-screen bg-background">
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />

            <Navbar />

            <main className="relative z-10 pt-14">
                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <Loader2 className="h-8 w-8 animate-spin text-neon-purple" />
                    </div>
                ) : error ? (
                    <ErrorState message={error} />
                ) : spot ? (
                    <SpotDetail spot={spot} />
                ) : null}
            </main>

            <Footer />
        </div>
    )
}
