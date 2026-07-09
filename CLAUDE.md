# novshi-website — CLAUDE.md

株式会社novshiコーポレートサイト（novshi.co.jp）のリポジトリ。

> 全リポジトリ共通ルール（文章スタイル・ブランド・機密管理等）は `~/.claude/CLAUDE.md`（グローバル）を参照。経営業務・事業コンテキストの正本は `C:\novshi-hq\CLAUDE.md`。

## 技術構成

- Astro 6 + Tailwind CSS 4（SSG）。GitHub `okura-ops/novshi-website`
- ローカル開発: `npm run dev`／ビルド: `npm run build`

## デプロイフロー

- **`main` に push = Vercel 自動デプロイ＝即本番公開**。mainへのマージは大倉の承認後のみ
- featureブランチ push = Vercelプレビュー（Vercelログイン保護つき）
- 進行中の作業状態・引き継ぎは `docs/REFRESH_STATUS.md` を必ず先に読む（現在: `feat/monotone-refresh` ブランチでv4モノトーン刷新が進行中。main未マージ＝本番は旧v3）

## デザイン・文章の正本

- デザイン: novshi-hq `05_content/brand/novshi_design_system_v4.md`（モノトーン3色。青系・Teal・Rosewood凍結）
- 文章: novshi-hq `docs/operations/writing_style.md`（AI感の排除。公開前セルフチェック必須）
- お問い合わせはmailtoハイブリッド方式（外部フォームサービス不使用）

## 注意

- 本番公開＝会社の顔。コピー変更・ページ追加は必ずプレビューURLで大倉レビューを経る
- 有料職業紹介 許可番号（40-ユ-301708）等の法定表記を削除・変更しない
