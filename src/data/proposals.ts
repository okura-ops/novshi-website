export const PROPOSAL_AS_OF = '2026年9月10日';

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

export interface ProposalData {
  slug: string;
  title: string;
  shortName: string;
  recipient: ProposalRecipient;
  lead: string;
  requiredNotices: string[];
  highlights: string[];
  facts: ProposalFactGroup[];
  fitItems: ProposalFitItem[];
  rent: {
    min: number;
    max: number;
    note: string;
  };
  moveInEstimate: string;
  upgrades: ProposalUpgradeOption[];
  questions: string[];
  sender: {
    company: string;
    person: string;
  };
}

export const PROPOSALS: ProposalData[] = [
  {
    // slugは推測されない文字列にする。認証を掛けないので、URLを知る人だけが開ける状態は
    // noindex・robots.txtのDisallow・この推測不能なslugの3つで担保する
    slug: 'junno-hiraya-k7q3md',
    title: '潤野の平屋',
    shortName: '潤野',
    recipient: {
      label: '飯塚市で戸建てをお探しのご家族へ',
      searchArea: '飯塚市',
      household: 'ご夫婦でのお住まい',
      pets: 'トイプードル2匹',
      vehicles: '軽自動車2台',
      rentBudget: '家賃5万円ほど',
      context:
        '以前ご覧になりたいとおっしゃっていた家は申込が入りました。次の候補として、同じ地区の平屋を見ています。',
    },
    lead:
      '飯塚市潤野に、平屋の4DKが候補に上がっています。まだ当社が買えると決まった家ではありませんが、ご希望に近いところが多いため、先に「買えたら住みたいと思われるか」を伺いたいです。',
    requiredNotices: [
      'この家はまだ当社の持ち物ではありません。いまから買えるかどうかを確かめる段階です。',
      '買えなかった場合はご案内できません。そのときは、ほかの家をお探しします。',
      'お家賃と入居できる日は、買えたあとに直して、そこで確定します。いまお伝えしているのは見込みです。',
    ],
    highlights: [
      '平屋の4DKなので、日々の生活は1階でまとまります。',
      '土地は64.6坪あり、犬と暮らす余白や駐車まわりを確認したい家です。',
      'スーパー・コンビニが近く、住宅街としては静かな場所です。',
      'トイレは汲み取りのため、浄化槽への切り替えを含めて検討します。',
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
    rent: {
      min: 50000,
      max: 55000,
      note: 'いまの状態のまま貸す場合の見込みです。浄化槽の工事が必要になると、上のほうに寄ります。',
    },
    moveInEstimate: '買えた場合で2027年1月ごろ',
    upgrades: [
      { label: '全室のクロス（壁紙）を張り替える', monthlyIncrease: 5000 },
      { label: '居間と1部屋の床を張り替える', monthlyIncrease: 3800 },
      { label: '給湯器を新品に交換する', monthlyIncrease: 3000 },
      { label: 'トイレを温水洗浄便座付きに交換する', monthlyIncrease: 2000 },
      { label: '洗面化粧台を交換する', monthlyIncrease: 2000 },
      { label: '犬用に床と壁を保護し、消臭処理をする', monthlyIncrease: 4000 },
    ],
    questions: [
      'この内容で、住んでみたいと思われますか',
      '気になるところがあれば、どこが引っかかるかを教えてください（次に探すときの手がかりになります）',
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
