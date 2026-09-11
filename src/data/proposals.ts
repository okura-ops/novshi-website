/**
 * 入居希望者へお送りする非公開の提案ページのデータ。
 *
 * **1ページ＝1人の受け手。**物件はその中に1〜3件並べる（`properties`）。
 * 1件ずつ別ページにして何本もURLを送ると、相手はどれを比べているのか分からなくなる。
 * 上限3件は `.claude/skills/tenant-lead-matching/references/matching-rules.md` の規定。
 *
 * 受け手に属するもの（slug・宛先・前置き・但し書き・オプション工事・質問・差出人）は
 * ここのトップレベルに置く。家ごとに変わるものは `ProposalProperty` に入れる。
 */

export type ProposalFitStatus = 'fit' | 'checking';

export interface ProposalRecipient {
  label: string;
  searchArea: string;
  household: string;
  pets: string;
  vehicles: string;
  rentBudget: string;
  context: string;
}

export interface ProposalFactGroup {
  title: string;
  items: string[];
}

export interface ProposalFitItem {
  label: string;
  status: ProposalFitStatus;
  summary: string;
}

export interface ProposalUpgradeOption {
  label: string;
  monthlyIncrease: number;
}

/** 「暮らしとして見たときのよさ」の1枚。アイコンは下のキーから選ぶ */
export type ProposalHighlightIcon = 'house' | 'pet' | 'car' | 'water' | 'land' | 'town';

export interface ProposalHighlight {
  icon: ProposalHighlightIcon;
  title: string;
  body: string;
}

/** 冒頭の比較で並べる小さな見出し（家賃は rent から自動で出すのでここには書かない） */
export interface ProposalChip {
  label: string;
  value: string;
}

/**
 * 物件の写真。
 *
 * **ここに置いてよいのは、当社に使用する権利がある写真だけ。**
 * 掲載サイト（ふれんず等）の写真をスクリーンショットで取り込むことはしない。
 * 掲載写真は仲介会社・撮影者の著作物で、複製して当社サイトで公衆送信すると
 * 著作権の侵害になる（ふれんず利用規約 第3条も同旨）。
 *
 * 入れてよいのは次の3つ。`source` に必ずどれかを記録する。
 *   - `broker-permitted` … 仲介会社から提供を受け、入居希望者への説明に使う許諾を得た写真
 *   - `own` … 当社が内覧時・取得後に自分で撮った写真
 *   - `owner-permitted` … 売主から提供を受け、使用許諾を得た写真
 *
 * `permissionNote` には、誰からいつ許諾を得たかを書く（口頭なら口頭と書く）。
 * 空のままの写真はページに出さない実装にしてある。
 */
export type ProposalPhotoSource = 'broker-permitted' | 'own' | 'owner-permitted';

export interface ProposalPhoto {
  /** public/images/proposal/{slug}/{property.key}/ 配下のパス */
  src: string;
  /** 何が写っているか。読み上げにも使うので具体的に書く */
  alt: string;
  caption?: string;
  source: ProposalPhotoSource;
  permissionNote: string;
}

/** 1軒ぶん。同じページに複数並ぶので、家ごとに変わるものは全部ここに入る */
export interface ProposalProperty {
  /** ページ内アンカー（#junno など）。LINEで「潤野のほう」と指せるようにする */
  key: string;
  title: string;
  shortName: string;
  /** 冒頭の一覧に出す一行。何が違う家なのかを1文で書く */
  tagline: string;
  /** 冒頭の一覧に出す小見出し。3つまで */
  chips: ProposalChip[];
  highlights: ProposalHighlight[];
  facts: ProposalFactGroup[];
  fitItems: ProposalFitItem[];
  /** 権利処理が済んだ写真だけ。空なら写真の節ごと出さない（上の ProposalPhoto の注記を読む） */
  photos?: ProposalPhoto[];
  /** 写真がまだ無い時に、その理由を相手へ伝える一文 */
  photoPending?: string;
  rent: {
    min: number;
    max: number;
    note: string;
  };
  moveInEstimate: string;
  /** 掲載を確認した日。家ごとに違うのでここに持つ */
  asOf: string;
}

export interface ProposalData {
  slug: string;
  recipient: ProposalRecipient;
  lead: string;
  requiredNotices: string[];
  /** 1〜3件。4件以上並べない（matching-rules.md）。相手が選べなくなる */
  properties: ProposalProperty[];
  upgrades: ProposalUpgradeOption[];
  questions: string[];
  sender: {
    company: string;
    person: string;
  };
}

/** どの家でも同じ工事内容と上乗せ額。受け手ごとに変える理由がないので定数で持つ */
const STANDARD_UPGRADES: ProposalUpgradeOption[] = [
  { label: '全室のクロス（壁紙）を張り替える', monthlyIncrease: 5000 },
  { label: '居間と1部屋の床を張り替える', monthlyIncrease: 3800 },
  { label: '給湯器を新品に交換する', monthlyIncrease: 3000 },
  { label: 'トイレを温水洗浄便座付きに交換する', monthlyIncrease: 2000 },
  { label: '洗面化粧台を交換する', monthlyIncrease: 2000 },
  { label: '犬用に床と壁を保護し、消臭処理をする', monthlyIncrease: 4000 },
];

export const PROPOSALS: ProposalData[] = [
  {
    // slugは推測されない文字列にする。認証を掛けないので、URLを知る人だけが開ける状態は
    // noindex・robots.txtのDisallow・この推測不能なslugの3つで担保する。
    // すでに公開済みのURLなので、物件が入れ替わってもこの文字列は変えない
    slug: 'junno-hiraya-k7q3md',
    recipient: {
      label: '飯塚市で戸建てをお探しのご家族へ',
      searchArea: '飯塚市',
      household: 'ご夫婦でのお住まい',
      pets: 'トイプードル2匹',
      vehicles: '軽自動車2台',
      rentBudget: '家賃5万円ほど',
      context:
        '以前ご覧になりたいとおっしゃっていた家は申込が入りました。次の候補として、飯塚市内の平屋を2軒見ています。',
    },
    lead:
      'どちらもまだ当社が買えると決まった家ではありません。買いにいくかどうかを決める前に、「買えたら住みたいと思われるか」を先に伺いたいです。合わなければ、そう言っていただくほうが助かります。',
    requiredNotices: [
      'この2軒はまだ当社の持ち物ではありません。いまから買えるかどうかを確かめる段階です。',
      '買えなかった場合はご案内できません。そのときは、ほかの家をお探しします。',
      'お家賃と入居できる日は、買えたあとに直して、そこで確定します。いまお伝えしているのは見込みです。',
    ],
    properties: [
      {
        key: 'junno',
        title: '潤野の平屋',
        shortName: '潤野',
        tagline: '部屋数が多い4DK。土地は64.6坪で、家賃の見込みはこちらのほうが低めです。',
        chips: [
          { label: '間取り', value: '平屋4DK' },
          { label: '土地', value: '64.6坪' },
          { label: '駐車', value: '台数を確認中' },
        ],
        highlights: [
          {
            icon: 'house',
            title: '平屋の4DK',
            body: '階段の上り下りがなく、部屋数にも余裕があります。',
          },
          {
            icon: 'pet',
            title: '犬と暮らす前提で考えられます',
            body: '当社が貸主になれば、飼育の可否はこちらで決められます。',
          },
          {
            icon: 'car',
            title: '駐車は確認中です',
            body: '軽自動車2台が停まるか、仲介会社に問い合わせています。',
          },
          {
            icon: 'water',
            title: '水回りは正直に確認します',
            body: '汲み取りのままにするか、浄化槽に切り替えるかを見ます。',
          },
        ],
        facts: [
          {
            title: '場所',
            items: ['飯塚市潤野', '潤野橋バス停まで徒歩6分', '新飯塚駅まで車で13分'],
          },
          {
            title: '建物',
            items: ['平屋の4DK', '70.31㎡（21.3坪）', '木造', '1977年（昭和52年）築・築48年'],
          },
          {
            title: '土地',
            items: ['213.54㎡（64.6坪）'],
          },
          {
            title: '駐車',
            items: ['敷地内にあります', '停められる台数は確認中です', '軽自動車2台が停まるか、仲介会社に問い合わせています'],
          },
          {
            title: '学校',
            items: ['飯塚鎮西校まで約1.5km'],
          },
          {
            title: '現況',
            items: ['空き家'],
          },
          {
            title: '水回り',
            items: [
              '上水道は引き込み済みです',
              'トイレは汲み取り（くみとり。下水につながっていないトイレです）です',
              '浄化槽（じょうかそう。敷地内で汚水を処理する設備）への切り替えを検討中です',
            ],
          },
          {
            title: '周辺',
            items: ['閑静な住宅街です', 'スーパー・コンビニが近くにあります'],
          },
        ],
        fitItems: [
          {
            label: 'エリア',
            status: 'fit',
            summary: '以前ご覧になりたいとおっしゃっていた家と同じ地区です。',
          },
          {
            label: '間取り',
            status: 'fit',
            summary: '平屋の4DK。段差が少なく、犬と暮らしやすい形です。',
          },
          {
            label: 'ペット',
            status: 'fit',
            summary: '当社が貸主なので、飼育の可否はこちらで決められます。',
          },
          {
            label: '駐車',
            status: 'checking',
            summary: '軽自動車2台が停まるか、仲介会社に確認しています。',
          },
          {
            label: '入居時期',
            status: 'checking',
            summary: '買えた場合で2027年1月ごろの見込みです。',
          },
        ],
        // 写真は仲介会社（おうち屋 飯塚店）へ提供と使用許諾を依頼中。
        // 許諾が取れたら public/images/proposal/junno-hiraya-k7q3md/junno/ に置いて photos に足す。
        photoPending:
          'お写真は、いま仲介会社にお願いしているところです。届きしだいこのページに追加します。実際に見に行かれる場合は、現地でご案内できるよう手配します。',
        rent: {
          min: 50000,
          max: 55000,
          note: 'いまの状態のまま貸す場合の見込みです。浄化槽の工事が必要になると、上のほうに寄ります。',
        },
        moveInEstimate: '買えた場合で2027年1月ごろ',
        asOf: '2026年9月10日',
      },
      {
        key: 'niho',
        title: '仁保の平屋',
        shortName: '仁保',
        tagline: '土地が74.6坪あり、庭があります。そのぶん家賃の見込みは潤野より少し上です。',
        chips: [
          { label: '間取り', value: '平屋3LDK' },
          { label: '土地', value: '74.6坪' },
          { label: '駐車', value: '台数を確認中' },
        ],
        highlights: [
          {
            icon: 'house',
            title: '平屋の3LDK',
            body: '和室2部屋と洋室1部屋。暮らしは1階でまとまります。',
          },
          {
            icon: 'land',
            title: '庭のある74.6坪',
            body: '潤野の家より土地が10坪ほど広く、犬の遊び場を取りやすい広さです。',
          },
          {
            icon: 'town',
            title: '周りに高い建物が建ちません',
            body: '第一種低層住居専用地域という区分で、まわりは低い住宅だけです。',
          },
          {
            icon: 'car',
            title: '駐車は確認中です',
            body: '掲載に台数の記載がなく、仲介会社に問い合わせています。',
          },
        ],
        facts: [
          {
            title: '場所',
            items: ['飯塚市仁保', '仁保バス停まで徒歩5分'],
          },
          {
            title: '建物',
            items: [
              '平屋の3LDK（和室2部屋・洋室1部屋）',
              '75.66㎡（22.8坪）',
              '木造',
              '1980年（昭和55年）築・築46年',
            ],
          },
          {
            title: '土地',
            items: ['246.72㎡（74.6坪）'],
          },
          {
            title: '駐車',
            items: ['掲載に台数の記載がありません', '何台停められるか、仲介会社に問い合わせています'],
          },
          {
            title: '現況',
            items: ['空き家', '引き渡しはすぐに可能とされています'],
          },
          {
            title: '水回り',
            items: [
              'トイレの排水（下水・浄化槽・汲み取りのどれか）が掲載に出ていません',
              'ガスの種別とあわせて、仲介会社に確認しています',
            ],
          },
          {
            title: '周辺',
            items: ['閑静な住宅街です', '北東と北西の二方向が道路に面しています', '庭と出窓があります'],
          },
        ],
        fitItems: [
          {
            label: 'エリア',
            status: 'fit',
            summary: '飯塚市内です。潤野とは別の地区になります。',
          },
          {
            label: '間取り',
            status: 'fit',
            summary: '平屋の3LDK。潤野より1部屋少ないぶん、土地が広い家です。',
          },
          {
            label: 'ペット',
            status: 'fit',
            summary: '当社が貸主なので、飼育の可否はこちらで決められます。',
          },
          {
            label: '庭',
            status: 'fit',
            summary: '74.6坪の敷地に庭があります。',
          },
          {
            label: '駐車',
            status: 'checking',
            summary: '掲載に台数の記載がなく、仲介会社に確認しています。',
          },
          {
            label: '家賃',
            status: 'checking',
            summary: 'ご希望の5万円より少し上がる見込みです。買う条件次第で動きます。',
          },
        ],
        photoPending:
          'お写真は、いま仲介会社にお願いしているところです。届きしだいこのページに追加します。',
        rent: {
          min: 55000,
          max: 60000,
          note: '潤野の家より少し高くなる見込みです。買うときの条件で下がる余地はありますが、いまは高めに見ておいてください。',
        },
        moveInEstimate: '買えた場合で2027年1月ごろ',
        asOf: '2026年9月11日',
      },
    ],
    upgrades: STANDARD_UPGRADES,
    questions: [
      'この2軒のうち、住んでみたいと思われる家はありますか（「どちらも」「どちらでもない」でも構いません）',
      '選ばなかったほうは、どこが引っかかりましたか（次に探すときの手がかりになります）',
      'ご友人にお伝えいただいている弁分・椿のあたりも並行して探しています。ご希望の部屋数や駐車の台数が分かれば教えてください',
    ],
    sender: {
      company: '株式会社novshi',
      person: '大倉佑介',
    },
  },
];

export function getProposalBySlug(slug: string): ProposalData | undefined {
  return PROPOSALS.find((proposal) => proposal.slug === slug);
}
