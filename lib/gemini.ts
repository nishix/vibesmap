import { GoogleGenAI } from "@google/genai"
import type { GooglePlaceResult, VibeType, Spot } from "./types"
import { VIBE_LABELS } from "./types"
import { getPhotoUrl } from "./google-places"

let _ai: GoogleGenAI | null = null

function getAI(): GoogleGenAI {
    if (!_ai) {
        _ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })
    }
    return _ai
}

const VIBE_DESCRIPTIONS: Record<VibeType, string> = {
    cyberpunk:
        "サイバーパンク的な近未来感、ネオンライト、テクノロジー、雨に濡れた路地、電子的な雰囲気",
    "retro-showa":
        "昭和レトロ、ノスタルジック、古き良き日本、純喫茶、商店街、温かみのある古さ",
    "zen-minimal":
        "禅、ミニマル、静寂、余白の美、和の空間、精神的な安らぎ、枯山水",
    ghibli:
        "ジブリ的な世界観、自然の中の幻想的な美しさ、木漏れ日、苔、清流、森の匂い",
    "neon-night":
        "ネオンナイト、夜の街の輝き、エネルギッシュ、華やか、都会の夜景、パルスを感じる",
}

/**
 * 場所データとVibeからエモーショナルな説明文とVibeスコアを生成
 */
export async function analyzeSpotVibes(
    place: GooglePlaceResult,
    selectedVibes: VibeType[]
): Promise<{
    description: string
    vibeScore: number
    matchedVibes: VibeType[]
}> {
    const vibeContext = selectedVibes
        .map((v) => `${VIBE_LABELS[v]}: ${VIBE_DESCRIPTIONS[v]}`)
        .join("\n")

    const placeInfo = [
        `場所名: ${place.displayName.text}`,
        `住所: ${place.formattedAddress}`,
        place.rating ? `Google評価: ${place.rating}/5` : null,
        place.editorialSummary?.text
            ? `概要: ${place.editorialSummary.text}`
            : null,
        place.types ? `カテゴリ: ${place.types.join(", ")}` : null,
    ]
        .filter(Boolean)
        .join("\n")

    const prompt = `あなたは場所の"空気感"や"雰囲気"を言語化するエキスパートです。
以下の場所について、指定されたVibeの観点から分析してください。

【場所情報】
${placeInfo}

【ユーザーが求めるVibe】
${vibeContext}

以下のJSON形式で回答してください。他のテキストは一切含めないでください:
{
  "description": "2-3文のエモーショナルな場所説明文。「評価が高い」「人気」のような表現は避け、五感に訴える詩的な表現で書いてください。",
  "vibeScore": "0-100のVibeマッチ度。選択されたVibeとの相性を数値化",
  "matchedVibes": ["マッチするVibeのID配列。選択肢: cyberpunk, retro-showa, zen-minimal, ghibli, neon-night"]
}`

    try {
        const response = await getAI().models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.8,
            },
        })

        const text = response.text ?? ""
        const parsed = JSON.parse(text)

        return {
            description: parsed.description ?? "",
            vibeScore: Math.min(100, Math.max(0, Number(parsed.vibeScore) || 50)),
            matchedVibes: (parsed.matchedVibes ?? []).filter(
                (v: string) =>
                    [
                        "cyberpunk",
                        "retro-showa",
                        "zen-minimal",
                        "ghibli",
                        "neon-night",
                    ].includes(v)
            ),
        }
    } catch (error) {
        console.error("Gemini analyzeSpotVibes error:", error)
        return {
            description: place.editorialSummary?.text ?? place.displayName.text,
            vibeScore: 50,
            matchedVibes: selectedVibes.slice(0, 1),
        }
    }
}

/**
 * 場所について「今、ここに行くべき理由」を生成
 */
export async function generateWhyNow(
    place: GooglePlaceResult
): Promise<string> {
    const now = new Date()
    const hour = now.getHours()
    const month = now.getMonth() + 1

    let timeContext = ""
    if (hour >= 5 && hour < 10) timeContext = "早朝〜朝の時間帯"
    else if (hour >= 10 && hour < 14) timeContext = "午前〜昼の時間帯"
    else if (hour >= 14 && hour < 17) timeContext = "午後の時間帯"
    else if (hour >= 17 && hour < 20) timeContext = "夕方〜日没の時間帯"
    else timeContext = "夜の時間帯"

    const placeInfo = [
        `場所名: ${place.displayName.text}`,
        `住所: ${place.formattedAddress}`,
        place.rating ? `Google評価: ${place.rating}/5` : null,
        place.editorialSummary?.text
            ? `概要: ${place.editorialSummary.text}`
            : null,
        place.types ? `カテゴリ: ${place.types.join(", ")}` : null,
        place.currentOpeningHours?.openNow !== undefined
            ? `営業中: ${place.currentOpeningHours.openNow ? "はい" : "いいえ"}`
            : null,
    ]
        .filter(Boolean)
        .join("\n")

    const prompt = `あなたは旅のナビゲーターです。場所の魅力を「今この瞬間」に結びつけて語ります。

【場所情報】
${placeInfo}

【現在の状況】
- 時間帯: ${timeContext}
- 月: ${month}月

この場所に「今、行くべき理由」を3〜4文で書いてください。
- 時間帯や季節を活かした具体的な理由を含めてください
- 五感に訴える詩的な表現で
- 「おすすめ」「人気」のような一般的な表現は避けてください
- 読んだ人が「今すぐ行きたい」と思える文章にしてください`

    try {
        const response = await getAI().models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
            config: {
                temperature: 0.9,
            },
        })

        return response.text ?? "この場所には、今しか出会えない空気がある。"
    } catch (error) {
        console.error("Gemini generateWhyNow error:", error)
        return "この場所には、今しか出会えない空気がある。"
    }
}

/**
 * Google Places の結果を Spot 型に変換
 */
export function placeToSpot(
    place: GooglePlaceResult,
    vibeAnalysis: {
        description: string
        vibeScore: number
        matchedVibes: VibeType[]
    }
): Spot {
    const image =
        place.photos && place.photos.length > 0
            ? getPhotoUrl(place.photos[0])
            : "/images/placeholder.jpg"

    return {
        id: place.id,
        name: place.displayName.text,
        nameJa: place.displayName.text,
        location: place.formattedAddress,
        image,
        vibeScore: vibeAnalysis.vibeScore,
        description: vibeAnalysis.description,
        vibes: vibeAnalysis.matchedVibes,
        placeId: place.id,
        lat: place.location.latitude,
        lng: place.location.longitude,
        rating: place.rating,
        userRatingsTotal: place.userRatingCount,
        openNow: place.currentOpeningHours?.openNow,
    }
}
