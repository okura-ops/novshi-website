/**
 * 空き家事業ページの物件一覧。正本はNotion「取得物件管理」DB（ステージ）。
 * 掲載するのは「募集中」「稼働中」のみ（準備中・契約済の物件は非開示）。
 * ステータスが動いたらこのファイルを更新する（2026-08-03時点のNotion実値）。
 */
export type PropStatus = '募集中' | '稼働中';

export interface Property {
  /** 表示名（市町名＋大字。ジモティー掲載と同じ公開粒度） */
  name: string;
  status: PropStatus;
  /** 間取り等の一行情報（未確定なら省略） */
  spec?: string;
  /** public/images/site/ 配下のファイル名（拡張子なし）。稼働中は写真なし可 */
  img?: string;
  alt?: string;
}

export const PROPERTIES: Property[] = [
  { name: '遠賀町広渡', status: '募集中', spec: '戸建 4K（2階建）', img: 'prop-008', alt: '遠賀町広渡の戸建て外観' },
  { name: '飯塚市潤野', status: '募集中', spec: '戸建 4DK', img: 'prop-007', alt: '飯塚市潤野の戸建て外観' },
  { name: '宮若市宮田', status: '募集中', spec: '戸建 4K（平屋2棟連結）', img: 'prop-004', alt: '宮若市宮田の戸建て外観' },
  { name: '岡垣町東松原', status: '募集中', spec: '戸建 5DK（平屋）', img: 'prop-003', alt: '岡垣町東松原の戸建て外観' },
  { name: '宮若市宮田（2）', status: '募集中', spec: '戸建', img: 'prop-002', alt: '宮若市宮田の戸建て外観' },
  { name: '嘉麻市鴨生', status: '稼働中', spec: '戸建・入居中' },
];
