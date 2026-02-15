import type { GooglePlaceResult, GooglePlacePhoto } from "./types"

const API_KEY = process.env.GOOGLE_PLACES_API_KEY!
const BASE_URL = "https://places.googleapis.com/v1"

/**
 * Google Places API (New) でテキスト検索を実行
 */
export async function searchPlaces(
    query: string,
    options?: {
        lat?: number
        lng?: number
        radius?: number
        includedTypes?: string[]
        maxResults?: number
        languageCode?: string
    }
): Promise<GooglePlaceResult[]> {
    const {
        lat,
        lng,
        radius = 5000,
        includedTypes,
        maxResults = 10,
        languageCode = "ja",
    } = options ?? {}

    const body: Record<string, unknown> = {
        textQuery: query,
        maxResultCount: maxResults,
        languageCode,
    }

    if (lat !== undefined && lng !== undefined) {
        body.locationBias = {
            circle: {
                center: { latitude: lat, longitude: lng },
                radius,
            },
        }
    }

    if (includedTypes && includedTypes.length > 0) {
        body.includedType = includedTypes[0] // Text Search は1つだけ
    }

    const fieldMask = [
        "places.id",
        "places.displayName",
        "places.formattedAddress",
        "places.location",
        "places.rating",
        "places.userRatingCount",
        "places.photos",
        "places.currentOpeningHours",
        "places.types",
        "places.editorialSummary",
        "places.priceLevel",
    ].join(",")

    const res = await fetch(`${BASE_URL}/places:searchText`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask": fieldMask,
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        const error = await res.text()
        console.error("Google Places API error:", error)
        throw new Error(`Google Places API error: ${res.status}`)
    }

    const data = await res.json()
    return (data.places ?? []) as GooglePlaceResult[]
}

/**
 * Place ID から詳細情報を取得
 */
export async function getPlaceDetails(
    placeId: string,
    languageCode = "ja"
): Promise<GooglePlaceResult> {
    const fieldMask = [
        "id",
        "displayName",
        "formattedAddress",
        "location",
        "rating",
        "userRatingCount",
        "photos",
        "currentOpeningHours",
        "reviews",
        "nationalPhoneNumber",
        "websiteUri",
        "priceLevel",
        "editorialSummary",
        "types",
    ].join(",")

    const res = await fetch(
        `${BASE_URL}/places/${placeId}?languageCode=${languageCode}`,
        {
            headers: {
                "X-Goog-Api-Key": API_KEY,
                "X-Goog-FieldMask": fieldMask,
            },
        }
    )

    if (!res.ok) {
        const error = await res.text()
        console.error("Google Places API detail error:", error)
        throw new Error(`Google Places API error: ${res.status}`)
    }

    return (await res.json()) as GooglePlaceResult
}

/**
 * 写真リファレンスからURLを生成
 */
export function getPhotoUrl(
    photo: GooglePlacePhoto,
    maxWidth = 800
): string {
    return `${BASE_URL}/${photo.name}/media?maxWidthPx=${maxWidth}&key=${API_KEY}`
}
