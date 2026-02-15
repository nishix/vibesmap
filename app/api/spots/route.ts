import { NextRequest, NextResponse } from "next/server"
import { searchPlaces } from "@/lib/google-places"
import { analyzeSpotVibes, placeToSpot } from "@/lib/gemini"
import type { VibeType, Spot } from "@/lib/types"
import { VIBE_PLACE_TYPES, VIBE_TYPES } from "@/lib/types"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get("q") || ""
        const vibesParam = searchParams.get("vibes") || ""
        const lat = searchParams.get("lat")
        const lng = searchParams.get("lng")

        // Vibe パラメータのパース
        const selectedVibes = vibesParam
            .split(",")
            .filter((v): v is VibeType =>
                VIBE_TYPES.includes(v as VibeType)
            )

        // 検索クエリの構築
        let searchQuery = query
        if (!searchQuery && selectedVibes.length > 0) {
            // Vibeに基づく自動検索クエリ
            const vibeKeywords: Record<VibeType, string> = {
                cyberpunk: "ネオン 夜景 モダン バー",
                "retro-showa": "レトロ 昭和 純喫茶 商店街",
                "zen-minimal": "禅 寺院 庭園 ミニマル",
                ghibli: "自然 森 公園 神秘的",
                "neon-night": "ナイトライフ イルミネーション 夜 バー",
            }
            searchQuery = selectedVibes.map((v) => vibeKeywords[v]).join(" ")
        }

        if (!searchQuery) {
            searchQuery = "おすすめ スポット 観光"
        }

        // Google Places API で検索
        const places = await searchPlaces(searchQuery, {
            lat: lat ? parseFloat(lat) : undefined,
            lng: lng ? parseFloat(lng) : undefined,
            maxResults: 12,
        })

        // Gemini で各場所のVibe分析（並列実行）
        const vibesToAnalyze =
            selectedVibes.length > 0
                ? selectedVibes
                : (["cyberpunk", "retro-showa", "zen-minimal", "ghibli", "neon-night"] as VibeType[])

        const spotsPromises = places.map(async (place) => {
            const analysis = await analyzeSpotVibes(place, vibesToAnalyze)
            return placeToSpot(place, analysis)
        })

        const spots = await Promise.all(spotsPromises)

        // Vibeスコアでソート
        spots.sort((a, b) => b.vibeScore - a.vibeScore)

        return NextResponse.json({
            spots,
            total: spots.length,
        })
    } catch (error) {
        console.error("API /api/spots error:", error)
        return NextResponse.json(
            { error: "スポットの検索中にエラーが発生しました" },
            { status: 500 }
        )
    }
}
