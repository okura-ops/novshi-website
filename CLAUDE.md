# CLAUDE.md — novshi.co.jp（会社HP）

Astro + Tailwind の静的サイト。デザインの正本は novshi-hq の
`05_content/brand/novshi_web_design_system_v1_1.md`（墨・和紙・柿渋）。
文章は novshi-hq の `docs/operations/writing_style.md` と `anti-ai-writing` スキルを通す。

## 配信構成（2026-08-22にVercelから移行）

**本番は Cloudflare Workers（静的アセット配信）。`main` へのpushで自動デプロイされ、
数分で novshi.co.jp に反映される。**

- Workerプロジェクト名: `novshi-website`（Cloudflareアカウント Okura@novshi.co.jp）
- DNS: Cloudflare（NS＝ken/priscilla.ns.cloudflare.com。レジストラはさくら＝JPRS）
- 移行の経緯・検証記録: novshi-hq `07_admin/dns_migration/cloudflare_pages_migration_runbook_20260822.md`
- Vercelプロジェクトは残っているが**novshi.co.jpの配信はしていない**（切り戻し用に2週間程度残置。
  その後削除予定）。Vercelのプレビューを見て「本番を確認した」と判断しない

### 配信元の確認方法（キャッシュに騙されないこと）

ローカルやパブリックリゾルバの応答は**最大1日古い**。NSやIPを確認するときは権威サーバへ直接聞く。

```sh
nslookup -norecurse -type=NS novshi.co.jp a.dns.jp   # JPレジストリ＝唯一の正
curl -s -I https://novshi.co.jp/ | grep -i "^server\|^cf-ray"   # cloudflare + CF-RAY があればCloudflare配信
```

2026-08-22の切替直後、あるセッションが「apexはVercel、wwwはCloudflare」という混在を観測して
「NS未切替では」と報告したが、実際は切替済みで、apexのAレコード（TTL 3600）だけが
ローカルキャッシュに残っていた。**wwwだけ新しく見えたのは、wwwが新規解決だったため。**
権威サーバに聞けば一意に判定できる。

### 触ってはいけない/消してはいけないファイル

| ファイル | 役割 |
|:---|:---|
| `wrangler.jsonc` | Workers配信設定。`run_worker_first: true` は**wwwリダイレクトを発火させるために必須**（外すとwwwが素通りして重複コンテンツになる） |
| `worker/index.js` | `www.novshi.co.jp` → apex の301。ダッシュボードのRedirect Rulesではなくここが正本 |
| `vercel.json` | 移行期の保険（Vercelでも下層ページが404にならないようにする）。Vercel削除まで残す |

### URL設計（末尾スラッシュなしが正）

`astro.config.mjs` は `trailingSlash: 'never'` かつ `build.format: 'file'`。
つまりビルド出力は `dist/about.html`（`about/index.html` ではない）。

- 公開URLは `https://novshi.co.jp/about`。`/about/` は307で `/about` へ寄る
- `src/layouts/Layout.astro` の canonical / og:url は `index.html`・`.html`・末尾スラッシュを
  落として組み立てている。**この正規化を壊すとGSCが全ページを重複扱いする**
- 過去にリダイレクト設定の崩れでGSCが全ページを「リダイレクト」で除外した実績がある。
  URL・ルーティングに触れたら必ずGSCのカバレッジを追う

## 入居が決まった物件の扱い（成約済み表示）

`src/data/rentals.ts` の該当物件に `closed: { label: '入居中', since: '2026年9月' }` を足すだけでよい。ページと写真は残したまま、次が自動で切り替わる。

- 一覧（`/rent`・`/services`）: 末尾へ回り、バッジが柿渋の「入居中」に、賃料表示が入居時期に変わる。写真に `SoldStamp.astro`（柿渋 #B5502A の朱印風スタンプ）が重なる
- 詳細ページ: 見出し下に成約の告知が出て、メイン写真にスタンプ、入居申込フォームとジモティーへのリンクが消えて「募集中の物件を見る」へ変わる。title/description も成約済みの文言になる
- `services` の「いま募集している自社保有の戸建」は `AVAILABLE.length`（＝closedを除いた数）を見るので自動で減る

**物件を消さないこと。** ページを削除するとURLが404になり、外部に貼られたリンクと検索結果が死ぬ。募集を再開するときは `closed` を消す。

HP以外にやることが2つある。①ジモティー掲載の取り下げ ②Notion「取得物件管理」DBの入居日を入れて公開ステータスを「募集終了」にする。3つが揃って初めて問い合わせが止まる。

## 非公開ページ（`/partners/`）の作法

再販協力業者向けの収益物件シートを `/partners/inventory/` に置いている。生成と価格の正本は
novshi-hq の `.claude/skills/resale-partner-sheet/` と `docs/operations/resale_pricing_rule.md`。
ここには**このリポジトリ側で守ること**だけを書く。

- `src/data/resale.ts` は自動生成物。手で編集しない
- URLを短く切られたときの受け口として `src/pages/partners/index.astro` を置いている
- 検索避けは3点セットで維持する。`Layout` の `noindex`、`robots.txt` の `Disallow: /partners/`、`astro.config.mjs` のsitemap `filter` のどれか1つが欠けると漏れる。filterは `/partners/` ではなく `/partners` で判定すること（受け口ページのパスに末尾スラッシュが無く、一度素通りした）
- サイト共通のヘッダー・フッターは出さず、`Layout` に `bare={true}` を渡して `PartnerHeader` / `PartnerFooter` を使う。共通ナビがあると業者がサービス紹介や採用情報へ迷い込み、非公開URLなので戻れなくなる
- PDFはページと同時に差し替える。`/partners/pdf/{slug}.pdf` は詳細ページのDLボタンが指す先で、novshi-hq の `resale_page_pdf.py --publish` が置く。画面だけ更新してPDFを置き忘れると、業者が買主へ古い価格の資料を送ることになるので、置いたあとに `npm run build` をもう一度回す

## OGP画像は本文と別管理

`public/og-image.png` はコピーを**焼き付けた画像**なので、サイト本文のMVVやキャッチを直しても
勝手には直らない。2026-09-10まで旧コピー「豊かさを、描きなおす。」が残ったままで、
リンクのプレビューだけ古いことを言い続けていた。

MVV・キャッチを改訂したら novshi-hq の `scripts/print/build_og_image.py` を回して差し替える。
差し替え後、X・Facebook・Slackはカードをキャッシュするので、各社のデバッガで再取得させる。

## Astroの実装で踏む落とし穴（2026-09-10に全部踏んだ）

いずれもエラーメッセージが原因を指さないので、先に知っておかないと時間を溶かす。

| 症状 | 原因 | 対処 |
|:---|:---|:---|
| `Unexpected "export"` でビルドが落ちる。指されている行は正常 | **フロントマターに入れ子のテンプレートリテラル**を書いた（`` `${a ?? `/x/${b}`}` ``） | 文字列連結にするか、`src/lib/` のヘルパーへ出す |
| コンポーネントに渡したpropが `undefined` になる、または挙動が壊れる | **`slot` はAstroの予約属性**。prop名に使えない | prop名を変えるか、コンポーネントを分ける |
| 暗い背景の上で見出しだけ見えない | `global.css` の `@layer base` が `h1〜h6` に `color` を固定している。親の `text-white` は継承されない | 見出しに `text-white` を明示する。`<p>` は継承するので不要 |

## 変更後に必ず確認すること

```sh
npm run build
```

ビルド後、本番URLに対して主要ページを確認する（デプロイ反映まで2〜3分）:

```sh
curl -s -o /dev/null -w "%{http_code}\n" https://novshi.co.jp/about
curl -s -I https://www.novshi.co.jp/about | head -3   # 301 → apex になること
curl -s https://novshi.co.jp/about | grep canonical    # .html が付いていないこと
```

新しいページを追加したら、そのURLが末尾スラッシュなしで200を返すことまで見る。

## 並行セッションへの注意

このリポジトリは複数のClaude Codeセッションが同じ作業ツリーを共有する。
作業を始める前に `git status` と `git log --oneline -5` で他セッターの変更を確認し、
ファイルを丸ごと上書き（Write）する前に必ず現在の内容を読み直す。

**`git add -A src` のようなディレクトリ単位のaddを使わない。** 2026-09-10に、別セッションが編集中だった
`src/data/proposals.ts` を巻き込んでコミットした。触ったファイルをパスで列挙して add する。
