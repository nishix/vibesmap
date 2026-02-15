import { NextRequest, NextResponse } from "next/server"
import { getPlaceDetails, getPhotoUrl } from "@/lib/google-places"
import { analyzeSpotVibes, generateWhyNow } from "@/lib/gemini"
import type { SpotDetail, VibeType } from "@/lib/types"
import { VIBE_TYPES } from "@/lib/types"

export const dynamic = "force-dynamic"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const { searchParams } = new URL(request.url)
        const vibesParam = searchParams.get("vibes") || ""

        const selectedVibes = vibesParam
            .split(",")
            .filter((v): v is VibeType =>
                VIBE_TYPES.includes(v as VibeType)
            )

        // Google Places API で詳細取得
        const place = await getPlaceDetails(id)

        // Gemini 分析（並列実行）
        const vibesToAnalyze =
            selectedVibes.length > 0
                ? selectedVibes
                : (["cyberpunk", "retro-showa", "zen-minimal", "ghibli", "neon-night"] as VibeType[])

        const [vibeAnalysis, whyNow] = await Promise.all([
            analyzeSpotVibes(place, vibesToAnalyze),
            generateWhyNow(place),
        ])

        // 写真URL一覧
        const photos = (place.photos ?? [])
            .slice(0, 6)
            .map((p) => getPhotoUrl(p))

        // レビュー整形
        const reviews = (place.reviews ?? []).map((r) => ({
            author: r.authorAttribution.displayName,
            rating: r.rating,
            text: r.text?.text ?? "",
            time: r.publishTime,
        }))

        const spot: SpotDetail = {
            id: place.id,
            name: place.displayName.text,
            nameJa: place.displayName.text,
            location: place.formattedAddress,
            image: photos[0] ?? "/images/placeholder.jpg",
            vibeScore: vibeAnalysis.vibeScore,
            description: vibeAnalysis.description,
            vibes: vibeAnalysis.matchedVibes,
            placeId: place.id,
            lat: place.location.latitude,
            lng: place.location.longitude,
            rating: place.rating,
            userRatingsTotal: place.userRatingCount,
            openNow: place.currentOpeningHours?.openNow,
            whyNow,
            photos,
            reviews,
            address: place.formattedAddress,
            phone: place.nationalPhoneNumber,
            website: place.websiteUri,
            openingHours: place.currentOpeningHours?.weekdayDescriptions,
            priceLevel: place.priceLevel
                ? ["FREE", "INEXPENSIVE", "MODERATE", "EXPENSIVE", "VERY_EXPENSIVE"].indexOf(
                    place.priceLevel
                )
                : undefined,
        }

        return NextResponse.json({ spot })
    } catch (error) {
        console.error("API /api/spots/[id] error:", error)
        return NextResponse.json(
            { error: "スポット情報の取得中にエラーが発生しました" },
            { status: 500 }
        )
    }
}
