# コーポレートサイト モノトーン刷新 — 進行状況・引き継ぎ（2026-07-07 時点）

> 途中から再開するための状態記録。作業ブランチ・完了範囲・保留中の判断・再開手順をまとめる。
> このファイルは作業引き継ぎ用。デザインの正本は novshi-hq `05_content/brand/novshi_design_system_v4.md`、文章の正本は novshi-hq `docs/operations/writing_style.md`。

## 現在地
- リポジトリ: `C:\novshi-website`（Astro 6 + Tailwind CSS 4 / SSG）。GitHub `okura-ops/novshi-website`。
- **作業ブランチ: `feat/monotone-refresh`**（`main` の先。**まだ main 未マージ＝本番 novshi.co.jp は旧v3のまま**）。
- 公開フロー: `main` に push = Vercel 自動デプロイ＝即本番。**feature ブランチ push = Vercel プレビュー**（Vercelログイン必須の保護つき）。
  - プレビューURL: `https://novshi-website-git-feat-monotone-refresh-okura-ops-projects.vercel.app`
- **大倉の承認後に `main` へマージ**して本番公開する運用。

## 完了した範囲（main..HEAD の主なコミット）
1. `9dce029` v4モノトーン基盤（黒#1A1A1A/グレー/白の3色、Montserrat＋Noto Sans JP、navy-*を純グレーへremap）
2. `5193317` お問い合わせフォームを **mailtoハイブリッド**化（Formspree撤去、送信で `mailto:okura@novshi.co.jp` に件名・本文差し込み）
3. `05487da` ヒーローを **ダーク・エディトリアル**（全面#1A1A1A・白文字・「志」ウォーターマーク）へ。本文のAI感排除
4. `edb75b4` 全ページのコピーを精緻化（独立レビュー反映）
5. `61d5f35` 反復動詞（引き受ける等）の解消＋**有料職業紹介 許可番号 40-ユ-301708** を掲載
6. `55a7a43` **正式ロゴ**（円相マーク＋novshiワードマーク）を設置＋**所在地**修正
7. `6496ca4` **事業内容の見せ方を刷新**（Claude.ai案を反映。トップ提供サービス＋サービスページを3事業構成に再構築）

## 主要な設計・実装メカニズム
- **カラー/トークン**: `src/styles/global.css`。`--color-accent:#1A1A1A` ほか。`navy-50..950` は純グレーに remap 済み（markupに旧クラス名が残っても青は出ない）。角丸=カード2px/ボタン4px、影は使わずホバーは枠線強調。
- **フォント**: `src/layouts/Layout.astro` で Montserrat / Noto Sans JP / Noto Serif JP を読込。数値は `.font-num`（Montserrat Bold）。Interは全廃。
- **ヘッダー/ロゴ**: `src/components/Header.astro`。固定ヘッダー。`[data-hero-dark]` を検知して**ダークヒーロー上は白ロゴ、スクロールで白背景＋黒ロゴ**に切替。ロゴ画像は `public/logo-black.png` / `public/logo-white.png`（名刺最終データ `novshi-hq/design/final/novshi_logo_clean_*.png` のクリーン版。旧 `logo-*-lg.png` は不使用）。
- **ヒーロー**: `src/components/Hero.astro`。非compact=トップの全面ダーク（負マージンで固定ヘッダー背後に敷く）。compact=下層ページのライト見出し帯。
- **お問い合わせ**: `src/components/ContactForm.astro`。mailto方式（サーバー不要）。
- **コピー台帳**: `docs/copy-todo.md`。各コピー直前に `{/* TODO:COPY <id> */}` マーカー。**最新の正はソースのマーカー直後**（台帳の暫定文言は旧版を含む）。
- **文章制約**: AI感排除（ダッシュ演出/対句・三段/スローガン体言止め連発/抽象ぼかし/キメ動詞/格言調/評価定型句/接続詞多用の禁止。事実・数値・固有名詞で語る）。同じ動詞の連打を避ける（引き受ける等は3回まで）。
- **守り（出さない情報）**: 実績数値・出資・クライアント名/事例・空き家の戸数やIRR・生活保護等の制度名。空き家は「準備・実証フェーズ（1棟目）」として定性的に。※大倉個人の経歴（リクルート1,000社等）は可。

## ページ構成（現状）
- **トップ**: ダークヒーロー → ストーリー節 → 黒地Vision帯「1,000」 → 提供サービス（Recruiting/BPOの2カード＋空き家の実証段階ブロック＋AI注記） → 代表メッセージ → 採用バナー → 黒地CTA
- **サービス**: ヒーロー → Service 01 採用支援（リード＋実務6項目＋「運用する3つのチャネル」＋外国人採用4カード〈許可番号明記〉） → Service 02 BPO（リード＋4項目＋月額10万円〜） → Service 03 空き家再生×社宅（準備・実証フェーズ） → AI注記 → CTA。アンカー `#recruitment` `#bpo` `#akiya`
- **会社概要**: 基本情報（所在地=〒813-0017 福岡県福岡市東区香椎照葉6-2-51、許認可=40-ユ-301708）→ 代表プロフィール＋沿革 → MVV → Values
- **採用**: 「準備中」維持（トーンのみ他ページに統一）
- **お問い合わせ**: mailtoフォーム
- **プライバシー**: 節番号1〜7の並び順バグを修正済み

## 保留中の判断（次に大倉へ確認 → 反映）
1. **「※」脚注**: Claude.ai原稿でBPOカード・「定着支援」項目末尾にあった `※` は脚注本文が無く**削除済み**。注記を付けるなら文言待ち。
2. **「ふたつの事業」×「Service 01/02/03」**: ヒーロー見出しは「novshiのふたつの事業」だがサービス番号は3つ。数の不一致で戸惑う可能性 → 見出し変更案は保留。
3. **料金の公開**: 「月10万円から」をサイトに明記（従来は個別見積で非公開）。方針確認待ち。
4. **home で 1,000社 が2回**（サービスカード＋代表メッセージ）。統一するか保留。

## novshi-hq 側で手動対応が必要（ツールから書込不可のため）
- `.env.local` の `NOVSHI_HQ_ADDRESS` 末尾 `-501` を削除（正: `…香椎照葉6-2-51`。名刺と一致させる）
- `.env.local` に `NOVSHI_JOB_PLACEMENT_LICENSE=40-ユ-301708` を追記（書類生成で参照するため）
- 電話番号はサイト未掲載（個人携帯の可能性のため。掲載は要判断）

## 再開手順
```bash
cd C:\novshi-website
git checkout feat/monotone-refresh
npm run dev            # localhost:4321 で確認
npm run build          # ビルド検証
# 変更 → コミット → git push origin feat/monotone-refresh（Vercelプレビュー更新）
# 承認後: main へマージ = 本番公開
```
- ヒーローのデザイン検討モック（3案）は Claude Design プロジェクト「モノトーン刷新・ビジュアル方向検討」に残置。
- 事業内容の見せ方の再依頼プロンプトは novshi-hq `05_content/brand/hp_services_rework_prompt_v1.md`。
