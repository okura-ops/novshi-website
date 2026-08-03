/**
 * サイト全体の写真パス一元管理。
 * 差し替え（プロ撮影の後日発注分など）はこのファイルの書き換えだけで完結させる。
 * トーン基準: Web Design System v1.0 §5-2（S20-45% / 露出中央値45-60% / 白飛び2%未満）
 * 補正済み実測値は novshi-hq research/2026-08-03_hp_refresh_benchmark/impl_qa/tone_report.json
 */
export interface SiteImage {
  webp: string;
  jpg: string;
  alt: string;
  /** レスポンシブ variant（-{width}.webp） */
  widths?: number[];
}

export const IMG: Record<string, SiteImage> = {
  heroEngawa: {
    webp: '/images/site/hero-engawa.webp',
    jpg: '/images/site/hero-engawa.jpg',
    widths: [1920, 1280, 768],
    alt: '再生前の空き家の和室。障子越しの光が縁側に差し込む（遠賀町・保有物件）',
  },
  storyGaikan: {
    webp: '/images/site/story-gaikan.webp',
    jpg: '/images/site/story-gaikan.jpg',
    widths: [1920, 1280, 768],
    alt: '門構えのある平屋の空き家外観（遠賀町・保有物件）',
  },
  laneKojin: {
    webp: '/images/site/lane-kojin.webp',
    jpg: '/images/site/lane-kojin.jpg',
    alt: '庭に面した和室。掃き出し窓から庭の緑が見える',
  },
  laneHojin: {
    webp: '/images/site/lane-hojin.webp',
    jpg: '/images/site/lane-hojin.jpg',
    alt: '庭付き戸建て住宅の外観（宮若市・保有物件）',
  },
  laneHr: {
    webp: '/images/site/lane-hr.webp',
    jpg: '/images/site/lane-hr.jpg',
    alt: '代表・大倉佑介。福岡市内の公園にて',
  },
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
  aboutDog: {
    webp: '/images/site/about-dog.webp',
    jpg: '/images/site/about-dog.jpg',
    alt: 'ベンチに座る大倉と愛犬のボーダーコリー',
  },
  svGenkan: {
    webp: '/images/site/sv-genkan.webp',
    jpg: '/images/site/sv-genkan.jpg',
    alt: '坪庭のある玄関ホールと階段（遠賀町・保有物件）',
  },
  svCorridor: {
    webp: '/images/site/sv-corridor.webp',
    jpg: '/images/site/sv-corridor.jpg',
    alt: '木の廊下が続く玄関まわり（宮若市・保有物件）',
  },
  svExterior: {
    webp: '/images/site/sv-exterior.webp',
    jpg: '/images/site/sv-exterior.jpg',
    alt: '瓦屋根の空き家を側面から見る（遠賀町・保有物件）',
  },
  careersView: {
    webp: '/images/site/careers-view-1000.webp',
    jpg: '/images/site/careers-view.jpg',
    alt: '物件2階から見る福岡近郊の街並み',
  },
};
