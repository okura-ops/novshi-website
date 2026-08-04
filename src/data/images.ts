/**
 * サイト全体の写真パス一元管理。差し替えはこのファイルの書き換えだけで完結させる。
 * 物件写真は装飾に使わない（2026-08-03大倉判定）。物件一覧は src/data/properties.ts が持つ。
 * ここに残すのは人物写真（代表撮り下ろし）のみ。トーン基準はWeb DS v1.0 §5-2。
 */
export interface SiteImage {
  webp: string;
  jpg: string;
  alt: string;
}

export const IMG: Record<string, SiteImage> = {
  ceoBench: {
    webp: '/images/site/ceo-bench.webp',
    jpg: '/images/site/ceo-bench.jpg',
    alt: '代表取締役・大倉佑介',
  },
  aboutPortrait: {
    webp: '/images/site/about-portrait.webp',
    jpg: '/images/site/about-portrait.jpg',
    alt: '代表取締役・大倉佑介の立ち姿',
  },
};
