// ===== Vibe Types =====
export const VIBE_TYPES = [
    "cyberpunk",
    "retro-showa",
    "zen-minimal",
    "ghibli",
    "neon-night",
] as const

export type VibeType = (typeof VIBE_TYPES)[number]

export const VIBE_LABELS: Record<VibeType, string> = {
    cyberpunk: "Cyberpunk",
    "retro-showa": "Retro Showa",
    "zen-minimal": "Zen & Minimal",
    ghibli: "Ghibli-esque",
    "neon-night": "Neon Night",
}

// Google Places APIの場所タイプとVibeの対応
export const VIBE_PLACE_TYPES: Record<VibeType, string[]> = {
    cyberpunk: ["night_club", "bar", "electronics_store", "shopping_mall"],
    "retro-showa": ["cafe", "restaurant", "book_store", "market"],
    "zen-minimal": ["park", "spa", "art_gallery", "museum", "temple", "shrine"],
    ghibli: ["park", "botanical_garden", "natural_feature", "hiking_area"],
    "neon-night": ["night_club", "bar", "casino", "movie_theater"],
}

// ===== Spot Types =====
export interface Spot {
    id: string
    name: string
    nameJa: string
    location: string
    image: string
    vibeScore: number
    description: string
    vibes: VibeType[]
    placeId?: string
    lat?: number
    lng?: number
    rating?: number
    userRatingsTotal?: number
    openNow?: boolean
}

export interface SpotDetail extends Spot {
    whyNow: string
    photos: string[]
    reviews: PlaceReview[]
    address: string
    phone?: string
    website?: string
    openingHours?: string[]
    priceLevel?: number
}

export interface PlaceReview {
    author: string
    rating: number
    text: string
    time: string
}

// ===== API Types =====
export interface SearchSpotsParams {
    query?: string
    vibes?: VibeType[]
    lat?: number
    lng?: number
}

export interface SearchSpotsResponse {
    spots: Spot[]
    total: number
}

export interface SpotDetailResponse {
    spot: SpotDetail
}

// ===== Google Places API Types =====
export interface GooglePlaceResult {
    id: string
    displayName: {
        text: string
        languageCode: string
    }
    formattedAddress: string
    location: {
        latitude: number
        longitude: number
    }
    rating?: number
    userRatingCount?: number
    photos?: GooglePlacePhoto[]
    currentOpeningHours?: {
        openNow: boolean
        weekdayDescriptions: string[]
    }
    reviews?: GooglePlaceReview[]
    nationalPhoneNumber?: string
    websiteUri?: string
    priceLevel?: string
    editorialSummary?: {
        text: string
        languageCode: string
    }
    types?: string[]
}

export interface GooglePlacePhoto {
    name: string
    widthPx: number
    heightPx: number
    authorAttributions: {
        displayName: string
        uri: string
    }[]
}

export interface GooglePlaceReview {
    name: string
    rating: number
    text?: {
        text: string
        languageCode: string
    }
    authorAttribution: {
        displayName: string
    }
    publishTime: string
}
