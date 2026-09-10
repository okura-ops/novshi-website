/**
 * 再販協力業者向け物件シート（/partners/inventory/）のデータ。
 * 自動生成物。手で編集しない。
 * 生成: novshi-hq scripts/properties/build_resale_sheet.py
 * 価格の正本: novshi-hq docs/operations/resale_pricing_rule.md
 * 物件データの正本: Notion「取得物件管理」DB
 *
 * 当社の仕入れ値・成約下限価格・原価フロアはこのファイルに入れない（生成時に構造で落としている）。
 */

export const AS_OF = '2026-09-10';

export interface ResaleProperty {
  code: string;
  slug: string;
  name: string;
  /** leased = 入居中・入居者確定（賃料は実績） / vacant = 未入居（賃料は想定） */
  status: 'leased' | 'vacant';
  rentMonthly: number;
  rentAnnual: number;
  /** 表示価格（万円） */
  price: number;
  /** 表示価格に対する表面利回り（%） */
  grossYield: number;
  area?: string;
  address?: string;
  layout?: string;
  structure?: string;
  bldgArea?: string;
  landArea?: string;
  built?: string;
  access?: string;
  parking?: string;
  infra?: string[];
  lead?: string;
  highlights?: string[];
  disclosures?: string[];
  tenantProfile?: string;
  leaseType?: string;
  guarantor?: string;
  leaseStart?: string;
  pmScope?: string;
  roadFrontage?: string;
  zoning?: string;
  buildingCoverage?: string;
  floorAreaRatio?: string;
  rebuildable?: string;
  lat?: number;
  lng?: number;
  photos?: { file: string; alt: string }[];
  publicPageUrl?: string;
}

export const RESALE: ResaleProperty[] = [
  {
    "code": "001",
    "slug": "001-kamou",
    "name": "001 鴨生",
    "status": "leased",
    "rentMonthly": 4.2,
    "rentAnnual": 50.4,
    "price": 390,
    "grossYield": 12.9,
    "area": "筑豊",
    "address": "嘉麻市鴨生",
    "bldgArea": "65.84㎡",
    "landArea": "307.91㎡（約93坪）",
    "access": "スーパー（フードウェイ稲築店）まで車3分・900m／JR後藤寺線 下鴨生駅まで車3分・1.5km",
    "tenantProfile": "個人・入居中",
    "lead": "当社が最初に取得し、賃貸付けまで終えた1棟です。土地が約93坪あり、庭と駐車スペースを広く取れます。",
    "lat": 33.6046818,
    "lng": 130.7316885
  },
  {
    "code": "006",
    "slug": "006-ikisu",
    "name": "006 伊岐須",
    "status": "leased",
    "rentMonthly": 6.3,
    "rentAnnual": 75.6,
    "price": 590,
    "grossYield": 12.8,
    "area": "筑豊",
    "address": "飯塚市伊岐須",
    "layout": "5DK",
    "structure": "木造スレート葺 2階建",
    "bldgArea": "76.18㎡（1階43.06／2階33.12）",
    "built": "1989年（平成元年）1月・築37年",
    "parking": "敷地内に2〜3台分",
    "access": "ハローデイ九工大前店まで約850m／JR新飯塚駅まで車11分・3.9km／九州工業大学 情報工学部まで約1.0km",
    "infra": [
      "上水道：公営",
      "トイレ：簡易水洗（洋式。便槽は汲取式）",
      "ガス：プロパン"
    ],
    "lead": "築37年・5DKの2階建てです。対面キッチンと2面採光の洋室があり、敷地内に車を2〜3台とめられます。九州工業大学 情報工学部まで約1kmで、単身・ファミリーどちらの需要も拾える立地です。",
    "highlights": [
      "部屋数（5DK）と駐車台数（2〜3台）が揃い、家族世帯・ルームシェア・社員寮のいずれにも振れる",
      "九州工業大学 情報工学部まで約1.0km、JR新飯塚駅まで車11分",
      "掲載から18日で入居者が決まった（2026年8月6日掲載・8月24日成約）"
    ],
    "disclosures": [
      "築37年の建物で、水回りの設備は新しくありません",
      "浴室はタイル貼りで、壁タイルにひびがあります",
      "トイレは見た目は洋式ですが簡易水洗で、便槽は汲取式です",
      "ガスはプロパンです"
    ],
    "leaseStart": "2026年9月",
    "lat": 33.652176,
    "lng": 130.665436,
    "photos": [
      {
        "file": "01",
        "alt": "飯塚市伊岐須の戸建て外観（玄関ポーチ）"
      },
      {
        "file": "02",
        "alt": "敷地と駐車スペース"
      },
      {
        "file": "03",
        "alt": "対面キッチン"
      },
      {
        "file": "04",
        "alt": "和室"
      },
      {
        "file": "05",
        "alt": "2階の洋室（2面採光）"
      },
      {
        "file": "06",
        "alt": "浴室"
      }
    ]
  },
  {
    "code": "007",
    "slug": "007-junono",
    "name": "007 潤野",
    "status": "leased",
    "rentMonthly": 5.0,
    "rentAnnual": 60.0,
    "price": 470,
    "grossYield": 12.8,
    "area": "筑豊",
    "address": "飯塚市潤野",
    "layout": "4DK（1階：和室の続き間・洋室・台所・洗面脱衣・浴室・トイレ／2階：和室）",
    "structure": "木造セメント瓦葺 2階建",
    "bldgArea": "78.32㎡（1階56.44／2階21.88）",
    "landArea": "130.19㎡（約39坪）",
    "built": "1984年（昭和59年）2月・築42年",
    "parking": "1台分（横幅2.2m）",
    "infra": [
      "上水道：公営（引込済）",
      "トイレ：洋式（汚水は汲取式）",
      "ガス：プロパン",
      "エアコン2台（2階和室）・浴室追焚・手すり2本・洗面台・洗濯機置場・台所の瞬間湯沸器"
    ],
    "lead": "築42年ですが、中はきれいに使われてきた家です。畳も障子もフローリングもそのまま使える状態で、エアコンは2階の2部屋に付いています。手を入れずに賃貸に回せる状態でした。",
    "highlights": [
      "4DK・2階建てで部屋数があり、家族世帯・ルームシェア・社員寮に振れる",
      "浴室に手すりがあり、1階だけでも生活が完結する間取り"
    ],
    "disclosures": [
      "トイレは洋式ですが、汚水は下水ではなく汲取式です（この地区に下水の本管が来ていません）",
      "ガスはプロパンです",
      "洪水ハザードマップの浸水想定区域に入っています",
      "過去に雨漏りの報告があります。現状で漏れているところは確認していません"
    ],
    "tenantProfile": "個人",
    "leaseStart": "2026年10月",
    "lat": 33.635185,
    "lng": 130.660812,
    "photos": [
      {
        "file": "01",
        "alt": "飯塚市潤野の戸建て外観（正面）"
      },
      {
        "file": "02",
        "alt": "和室の2間続き"
      },
      {
        "file": "03",
        "alt": "台所"
      },
      {
        "file": "04",
        "alt": "浴室（浴槽・手すり付き）"
      },
      {
        "file": "05",
        "alt": "洋式トイレ"
      },
      {
        "file": "06",
        "alt": "裏庭とテラス"
      }
    ]
  },
  {
    "code": "008",
    "slug": "008-hirowatari",
    "name": "008 広渡",
    "status": "leased",
    "rentMonthly": 4.5,
    "rentAnnual": 54.0,
    "price": 420,
    "grossYield": 12.9,
    "area": "遠賀・宗像",
    "address": "遠賀郡遠賀町広渡",
    "layout": "4K（和室の続き間・縁側・板張りの洋間）",
    "structure": "木造2階建",
    "bldgArea": "105.89㎡",
    "landArea": "270.6㎡（約82坪）",
    "built": "1977年（昭和52年）・築48年",
    "parking": "カーポート付き",
    "infra": [
      "トイレ：洋式水洗",
      "浴室：大理石調の浴槽・玉石の洗い場"
    ],
    "lead": "昔ながらの造りのいい和風住宅です。玄関を開けると丸太の梁と格天井、竹と白砂の坪庭があります。和室には欄間と雪見障子が入っていて、縁側から庭が見えます。この個性を評価する層に、掲載から29日で決まりました。",
    "highlights": [
      "延床105.89㎡・土地270.6㎡と、この賃料帯では大きい",
      "遠賀・宗像エリア（北九州市と福岡市の通勤圏の中間）",
      "掲載から29日で入居者が決まった（2026年8月2日掲載・8月31日成約）"
    ],
    "disclosures": [
      "台所が古く、そのままでは使いにくい状態です。天井の換気扇まわりが壊れていて、床も一部剥がれています",
      "洗面所も古いままです。トイレは洋式の水洗ですが、内装は当時のままです",
      "浴室は使えますが、玉石の洗い場で今の作りではありません",
      "築48年の建物です"
    ],
    "leaseStart": "2026年11月",
    "lat": 33.857693,
    "lng": 130.676102,
    "photos": [
      {
        "file": "01",
        "alt": "遠賀町広渡の和風戸建て外観（カーポート付き）"
      },
      {
        "file": "02",
        "alt": "玄関ホール（坪庭と丸太の梁）"
      },
      {
        "file": "03",
        "alt": "縁側付きの和室"
      },
      {
        "file": "04",
        "alt": "板張りの洋間"
      },
      {
        "file": "05",
        "alt": "台所（要DIY）"
      },
      {
        "file": "06",
        "alt": "2階からの眺望"
      }
    ]
  }
];

export const LEASED = RESALE.filter((p) => p.status === 'leased');
export const VACANT = RESALE.filter((p) => p.status === 'vacant');
/** 入居中を先に、未入居を後ろに */
export const RESALE_ORDERED = [...LEASED, ...VACANT];
