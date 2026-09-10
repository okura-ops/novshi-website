/**
 * 再販協力業者向けシートの収支計算。
 *
 * 表示価格そのものは novshi-hq の `scripts/properties/build_resale_sheet.py` が決め、
 * `src/data/resale.ts` に入っている。ここで計算するのは「買主から見た数字」だけで、
 * 当社の仕入れ値・原価・成約下限は入力にも出力にも一切入らない。
 *
 * 前提の正本: novshi-hq `.claude/skills/property-sale-proposal/references/financial-logic.md`
 * 運営費は物件ごとの実額ではなく標準値で置いている。ページには必ず「想定」と書く。
 */

import type { ResaleProperty } from '../data/resale';

/** 運営費の標準前提（万円／年。賃料比のものは率） */
export const OPEX = {
  /** 管理委託料。賃料の5%＋消費税 */
  mgmtRate: 0.055,
  /** 修繕引当。賃料の5% */
  repairReserveRate: 0.05,
  /** 固定資産税・都市計画税（想定） */
  fixedTax: 5.0,
  /** 損害保険料（火災＋地震。延床75〜105㎡の実見積レンジ中央） */
  insurance: 3.3,
} as const;

/** 購入諸費用率。登記・不動産取得税・仲介手数料・火災保険の標準 */
export const ACQ_COST_RATE = 0.08;

/** 融資の仮置き条件 */
export const LOAN = { ltv: 0.7, rate: 0.025, years: 20 } as const;

export interface Economics {
  rentAnnual: number;
  opexBreakdown: { label: string; amount: number; note: string }[];
  opexTotal: number;
  noi: number;
  /** 表面利回り（%） */
  grossYield: number;
  /** NOI利回り＝NOI÷販売価格（%） */
  noiYield: number;
  /** 実質利回り＝NOI÷（販売価格×1.08）（%） */
  netYield: number;
  /** 購入諸費用込みの投資総額（万円） */
  totalInvestment: number;
  /** 年間元利返済額（万円） */
  ads: number;
  /** レバレッジ後の年間手取り（万円） */
  cashFlow: number;
  /** 自己資金（万円） */
  equity: number;
  /** 自己資金利回り（%） */
  cashOnCash: number;
  dscr: number;
  /** 空室が出た場合のNOI（1.2ヶ月／2.4ヶ月） */
  vacancy: { months: number; noi: number; noiYield: number }[];
  /** 金利が1%上がった場合の年間手取り */
  cashFlowRatePlus1: number;
}

function annualDebtService(principal: number, rate: number, years: number): number {
  const i = rate / 12;
  const n = years * 12;
  return (principal * i) / (1 - Math.pow(1 + i, -n)) * 12;
}

export function economics(p: ResaleProperty): Economics {
  const rentAnnual = p.rentAnnual;
  const mgmt = rentAnnual * OPEX.mgmtRate;
  const repair = rentAnnual * OPEX.repairReserveRate;

  const opexBreakdown = [
    { label: '管理委託料', amount: mgmt, note: '賃料の5%＋消費税。当社が売却後も継続して受託します' },
    { label: '固定資産税・都市計画税', amount: OPEX.fixedTax, note: '想定額。課税明細で確定します' },
    { label: '損害保険料', amount: OPEX.insurance, note: '火災＋地震＋賃貸建物所有者賠償の想定額' },
    { label: '修繕引当', amount: repair, note: '賃料の5%を積む想定。実支出ではありません' },
  ];
  const opexTotal = opexBreakdown.reduce((s, o) => s + o.amount, 0);
  const noi = rentAnnual - opexTotal;

  const totalInvestment = p.price * (1 + ACQ_COST_RATE);
  const principal = totalInvestment * LOAN.ltv;
  const equity = totalInvestment - principal;
  const ads = annualDebtService(principal, LOAN.rate, LOAN.years);
  const adsPlus1 = annualDebtService(principal, LOAN.rate + 0.01, LOAN.years);

  const vacancy = [1.2, 2.4].map((months) => {
    const lostRent = (rentAnnual / 12) * months;
    const v = noi - lostRent;
    return { months, noi: v, noiYield: (v / p.price) * 100 };
  });

  return {
    rentAnnual,
    opexBreakdown,
    opexTotal,
    noi,
    grossYield: (rentAnnual / p.price) * 100,
    noiYield: (noi / p.price) * 100,
    netYield: (noi / totalInvestment) * 100,
    totalInvestment,
    ads,
    cashFlow: noi - ads,
    equity,
    cashOnCash: ((noi - ads) / equity) * 100,
    dscr: noi / ads,
    vacancy,
    cashFlowRatePlus1: noi - adsPlus1,
  };
}

/** 万円の表示。小数第0位・3桁区切り */
export const man = (v: number) => Math.round(v).toLocaleString('ja-JP');
/** 万円の表示。小数第1位 */
export const man1 = (v: number) => v.toFixed(1);
/** %の表示。小数第1位 */
export const pct = (v: number) => v.toFixed(1);

/** 写真のURL。photoBase が無ければ入居者募集と同じ /images/rent/{slug} を見る。
 *  入れ子のテンプレートリテラルを .astro のフロントマターに書くとコンパイルが落ちるので、ここに置く。 */
export function photoUrl(p: ResaleProperty, file: string): string {
  const base = p.photoBase ?? '/images/rent/' + p.slug;
  return base + '/' + file + '.webp';
}

/** 座標から地図リンクを作る。住所文字列では作らない（枝番を地図が解決できない物件がある） */
export const mapUrl = (p: ResaleProperty) =>
  p.lat && p.lng ? `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}` : null;

/** 問い合わせ先 */
export const CONTACT = {
  company: '株式会社novshi',
  person: '代表取締役　大倉 佑介',
  mail: 'okura@novshi.co.jp',
  address: '福岡県福岡市東区香椎照葉6-2-51',
} as const;
