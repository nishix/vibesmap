# VibesMap 実装タスクリスト

## Phase 1: バックエンド基盤（API Routes）
- [ ] `.env.local` の作成（Google Places API Key / Gemini API Key）
- [ ] Google Places API 連携ユーティリティの作成
- [ ] Gemini API 連携ユーティリティの作成
- [ ] `/api/spots` API Route の実装（場所検索 + Vibe分析）
- [ ] `/api/spots/[id]` API Route の実装（詳細情報取得）

## Phase 2: フロントエンド改修（モック → 実データ連携）
- [ ] カスタムフック `useSpots` の作成（API呼び出し + 状態管理）
- [ ] `SearchBar` の改修（エリア・場所名での検索入力）
- [ ] `VibeSelector` の改修（選択 Vibe をAPI連携）
- [ ] `InteractiveExplorer` の改修（useSpots統合）
- [ ] `SpotsGrid` の改修（ダミーデータ → API結果表示）
- [ ] `SpotCard` の改修（Gemini生成テキスト対応）

## Phase 3: スポット詳細ページ
- [ ] `/spots/[id]` ページの作成
- [ ] スポット詳細コンポーネントの作成
- [ ] Gemini による「今、ここに行くべき理由」テキスト生成

## Phase 4: UX改善 / ポリッシュ
- [ ] ローディングUI（スケルトン）の追加
- [ ] エラーハンドリングUIの追加
- [ ] 位置情報（Geolocation API）対応

## Phase 5: 検証
- [ ] ブラウザでのE2Eテスト
- [ ] API動作確認
