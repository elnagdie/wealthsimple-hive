export type PersonaType = 'priya' | 'marcus';

export interface Transaction {
  date: string;
  description: string;
  amount: number;
  category: string;
  confidence: 'high' | 'medium';
  suggestedCorrection?: string;
}

export interface Obligation {
  name: string;
  amount: number;
  date: string;
  isWarning?: boolean;
  warningNote?: string;
  tooltipText?: string;
}

export interface AccountCard {
  name: string;
  type: 'tfsa' | 'fhsa' | 'rrsp' | 'emergency';
  contributed: number;
  room: number;
  balance: number;
  progressPercent: number;
  status: 'active' | 'maxed' | 'inactive' | 'complete';
  detail: string;
  note?: string;
  highlight?: boolean;
}

export interface SpendingCategory {
  name: string;
  amount: number;
  percent: number;
  flag?: string;
}

export interface Allocation {
  icon: string;
  amount: number;
  account: string;
  reason: string;
}

export interface Scenario {
  title: string;
  newAmount: number;
  allocations: Allocation[];
  note: string;
  isPositive: boolean;
}

export interface PersonaData {
  name: string;
  shortName: string;
  age: number;
  title: string;
  location: string;
  province: string;
  incomeType: 'variable' | 'steady';
  incomeLabel: string;
  cadence: string;
  confidence: 'High' | 'Medium';
  confidenceDots: number;
  cardHeader: string;
  incomeVariance?: string;

  // Income
  incomeThisMonth: number;
  incomeDetail: string;
  incomeRange?: string;
  conservativeEstimate: number;
  conservativeLabel: string;
  incomeHistory: number[];

  // Obligations
  obligations: Obligation[];
  obligationTotal: number;
  obligationReserve?: number;
  obligationHorizon: string;

  // Recommendation
  safeToAllocate: number;
  allocateRange?: string;
  allocations: Allocation[];
  infoLines: string[];

  // Accounts
  accounts: AccountCard[];

  // Onboarding
  tfsaBalance: string;
  tfsaContributed: string;
  rrspBalance: string;
  hasFhsa: boolean;
  fhsaBalance?: string;
  tfsaRoom: string;
  rrspRoom: string;
  ownsHome: boolean;
  emergencyTarget: string;

  // Spending
  spending: SpendingCategory[];

  // Transactions
  transactions: Transaction[];

  // Scenarios
  scenarios: [Scenario, Scenario];

  // Reasoning
  calculationChain: string;
  cantSee: string[];

  // Trust
  categorizationAccuracy: string;
  incomePrediction: string;
  missedObligations: string;

  // Ask Hive
  askHiveChips: { question: string; response: string }[];
}

export const priyaData: PersonaData = {
  name: 'Priya S.',
  shortName: 'Priya S.',
  age: 28,
  title: 'UGC Creator',
  location: 'Toronto, Ontario',
  province: 'Ontario',
  incomeType: 'variable',
  incomeLabel: 'Variable Income',
  cadence: 'Weekly Check-In',
  confidence: 'Medium',
  confidenceDots: 2,
  cardHeader: 'Weekly Check-In — March 1, 2026',
  incomeVariance: '±38%',

  incomeThisMonth: 3200,
  incomeDetail: '1 brand deal ($2,500) + TikTok Creator Fund ($420) + Canva template sales ($280)',
  incomeRange: '$2,100 – $7,800',
  conservativeEstimate: 3800,
  conservativeLabel: '$3,800/mo (25th percentile)',
  incomeHistory: [2100, 5400, 3200, 7800, 4600, 3200],

  obligations: [
    { name: 'Rent', amount: 1650, date: 'Mar 5' },
    { name: 'Phone', amount: 85, date: 'Mar 10' },
    { name: 'Adobe Creative Cloud', amount: 73, date: 'Mar 12' },
    { name: 'Gym', amount: 55, date: 'Mar 15' },
    { name: 'Internet', amount: 65, date: 'Mar 18' },
    { name: 'Annual car insurance', amount: 1140, date: '~April', isWarning: true, warningNote: 'holding $380 in buffer — 1/3 of expected amount', tooltipText: 'Pattern detected: $1,140 paid to Intact Insurance in April 2024 and April 2025. Holding $380 buffer (⅓ of expected amount) to prepare.' },
  ],
  obligationTotal: 1928,
  obligationReserve: 380,
  obligationHorizon: 'next 30 days',

  safeToAllocate: 340,
  allocateRange: '$180 – $520 depending on remaining March income',
  allocations: [
    { icon: '💚', amount: 200, account: 'TFSA', reason: '$4,200 room remaining this year. At your income (~$62K), TFSA is preferred — you\'re mostly in the 14% federal bracket, so RRSP deduction saves less. TFSA gives tax-free flexibility for variable income.' },
    { icon: '🛡️', amount: 140, account: 'Emergency Fund', reason: '$5,400 of $12,600 target (43%). Building this buffer is critical for variable income — it protects your investments during lean creator months.' },
  ],
  infoLines: [
    'FHSA is maxed for 2026 ($8,000/$8,000). Next room available: January 1, 2027.',
    'Why not RRSP? At ~$62K, most income falls in the 14% bracket. RRSP deduction saves ~$98 per $700. TFSA flexibility is more valuable for unpredictable income.',
  ],

  accounts: [
    { name: 'TFSA', type: 'tfsa', contributed: 2800, room: 7000, balance: 28400, progressPercent: 40, status: 'active', detail: 'At current pace: Max by September' },
    { name: 'FHSA', type: 'fhsa', contributed: 8000, room: 8000, balance: 16800, progressPercent: 100, status: 'maxed', detail: 'Next room: January 1, 2027', note: 'Lifetime: $16,000 / $40,000' },
    { name: 'RRSP', type: 'rrsp', contributed: 2000, room: 8800, balance: 8200, progressPercent: 23, status: 'active', detail: 'Lower priority at your tax bracket', note: 'Room remaining: $6,800' },
    { name: 'Emergency Fund', type: 'emergency', contributed: 5400, room: 12600, balance: 5400, progressPercent: 43, status: 'active', detail: 'Target: 3 months', note: '= 1.3 months of expenses', highlight: true },
  ],

  tfsaBalance: '$28,400 balance, $2,800 contributed in 2026',
  tfsaContributed: '$2,800',
  rrspBalance: '$8,200 balance',
  hasFhsa: true,
  fhsaBalance: '$16,000 balance',
  tfsaRoom: '4200',
  rrspRoom: '8800',
  ownsHome: false,
  emergencyTarget: '12600',

  spending: [
    { name: 'Housing', amount: 1650, percent: 39 },
    { name: 'Food & Dining', amount: 620, percent: 15, flag: '↑18% vs 3-month avg' },
    { name: 'Creator Tools', amount: 340, percent: 8 },
    { name: 'Transportation', amount: 280, percent: 7 },
    { name: 'Shopping', amount: 250, percent: 6 },
    { name: 'Entertainment', amount: 180, percent: 4 },
    { name: 'Health & Fitness', amount: 155, percent: 4 },
    { name: 'Subscriptions', amount: 120, percent: 3 },
    { name: 'Other', amount: 605, percent: 14 },
  ],

  transactions: [
    { date: 'Mar 1', description: 'TikTok Creator Fund', amount: 420, category: 'Income', confidence: 'high' },
    { date: 'Feb 28', description: 'Uber Eats', amount: -38, category: 'Food & Dining', confidence: 'high' },
    { date: 'Feb 27', description: 'SHOPIFY*MISHMISH', amount: -145, category: 'Shopping?', confidence: 'medium', suggestedCorrection: 'Business Expense' },
    { date: 'Feb 26', description: 'Spotify', amount: -11, category: 'Subscriptions', confidence: 'high' },
    { date: 'Feb 25', description: 'Metro Grocery', amount: -87, category: 'Food & Dining', confidence: 'high' },
    { date: 'Feb 24', description: 'ETRNSFR FROM SARAH L', amount: 800, category: 'Income?', confidence: 'medium', suggestedCorrection: 'Transfer/Reimbursement' },
    { date: 'Feb 23', description: 'Adobe Inc', amount: -73, category: 'Creator Tools', confidence: 'high' },
    { date: 'Feb 22', description: 'TTC Presto', amount: -42, category: 'Transportation', confidence: 'high' },
    { date: 'Feb 21', description: 'Amazon.ca', amount: -156, category: 'Shopping', confidence: 'high' },
    { date: 'Feb 20', description: 'Brand Deal - Sephora', amount: 2500, category: 'Income', confidence: 'high' },
    { date: 'Feb 18', description: 'UBER', amount: -32, category: 'Transportation', confidence: 'high' },
    { date: 'Feb 17', description: 'GoodLife Fitness', amount: -55, category: 'Health', confidence: 'high' },
    { date: 'Feb 15', description: 'CanvaPro', amount: -17, category: 'Creator Tools', confidence: 'high' },
    { date: 'Feb 14', description: 'Rent - Landlord ETRNSFR', amount: -1650, category: 'Housing', confidence: 'high' },
    { date: 'Feb 12', description: 'Netflix', amount: -17, category: 'Subscriptions', confidence: 'high' },
  ],

  scenarios: [
    {
      title: 'Income drops 30%',
      newAmount: 120,
      allocations: [{ icon: '🛡️', amount: 120, account: 'Emergency Fund only', reason: '' }],
      note: 'At 30% lower income, I\'d recommend pausing TFSA contributions and focusing entirely on emergency fund. Your 1.3-month buffer becomes critical.',
      isPositive: false,
    },
    {
      title: 'Land the $4,500 Sephora brand deal',
      newAmount: 680,
      allocations: [
        { icon: '💚', amount: 400, account: 'TFSA', reason: 'on track to max by July!' },
        { icon: '🛡️', amount: 280, account: 'Emergency Fund', reason: '' },
      ],
      note: 'With this additional income, you\'d be ahead of pace on both TFSA and emergency fund goals.',
      isPositive: true,
    },
  ],

  calculationChain: `Income (conservative, 25th percentile):      $3,800
− Fixed obligations (next 30 days):          −$1,928
− Annual insurance reserve (⅓ of $1,140):    −$380
− Variable spending (3-month avg):           −$940
  (dining $620, transit $280, misc $40)
− Buffer (25% of variable spending):         −$235
  (high buffer because income varies ±38%)
─────────────────────────────────────────────
Safe to allocate (monthly):                   $317
Adjusted for week 1 (income already received): ~$340`,

  cantSee: [
    'Cash transactions not in your bank data',
    'Pending e-transfers not yet deposited',
    'Equipment or gear purchases you\'re planning',
    'Client invoices that might be late',
    'Life changes you haven\'t told me about',
  ],

  categorizationAccuracy: '94.2% accurate (18 corrections / 312 transactions)',
  incomePrediction: '±11% (predicted $3,800, actuals $3,200 – $4,600)',
  missedObligations: '0',

  askHiveChips: [
    {
      question: 'Can I afford new camera gear ($800)?',
      response: `Looking at your current position: you have $4,850 in chequing,
$340 safe to allocate this week, and rent ($1,650) is due in 4 days.

Short answer: yes, but with a trade-off.

If you buy the gear now, your safe-to-allocate drops to $0 for
the next 2 weeks, and I'd recommend pausing your TFSA contribution
this period. Your emergency fund stays untouched at $5,400.

Alternatively: split it — $400 now, $400 after your next income
deposit. This keeps your TFSA contribution on track.

This is based on your current balances and conservative income
estimate. Not financial advice.`,
    },
    {
      question: 'How much did I spend on food this month?',
      response: `In February, you spent $620 on Food & Dining — that's up 18%
from your 3-month average of $525.

Breakdown:
  Uber Eats: $186 (10 orders)
  Metro Grocery: $298 (4 trips)
  Restaurants: $136 (3 visits)

The Uber Eats spending is driving the increase. At your current
pace, you'd spend ~$680 in March. Cutting 3 Uber Eats orders
would save ~$55 and bring you back to your average.`,
    },
    {
      question: 'When should I start contributing to my RRSP?',
      response: `Right now, your TFSA is the better priority — and here's why.

At ~$62K income, most of your earnings fall in the 14% federal
bracket. RRSP contributions only save you 14 cents per dollar at
this rate. TFSA gives you tax-free growth AND tax-free withdrawals
with no income restriction.

When to switch: if your income crosses ~$58,523 consistently
(the 20.5% bracket threshold), RRSP starts to become more
valuable. Based on your 6-month trend, you're close — if your
brand deal income keeps growing, we might revisit this by Q3.

For now: max your TFSA ($4,200 room left), maintain your
emergency fund, then consider RRSP with any surplus.`,
    },
    {
      question: 'How much have I earned from brand deals this year?',
      response: `In 2026 so far (Jan 1 – Mar 1), your brand deal income totals
$8,400 across 4 deals:

  Sephora (Feb 20): $2,500
  Aritzia (Feb 3): $3,200
  Olay (Jan 18): $1,500
  Dyson (Jan 8): $1,200

Your TikTok Creator Fund added $2,100 and Canva template
sales added $840, bringing your total 2026 income to $11,340.

At this pace, you're trending toward ~$68K for the year —
which would push more of your income into the 20.5% bracket.
I'll flag if RRSP contributions become more advantageous.`,
    },
  ],
};

export const marcusData: PersonaData = {
  name: 'Marcus R.',
  shortName: 'Marcus R.',
  age: 34,
  title: 'Software Dev',
  location: 'Calgary, Alberta',
  province: 'Alberta',
  incomeType: 'steady',
  incomeLabel: 'Steady Income',
  cadence: 'Payday Recommendation',
  confidence: 'High',
  confidenceDots: 3,
  cardHeader: 'Payday Recommendation — March 1, 2026',

  incomeThisMonth: 3654,
  incomeDetail: 'Bi-weekly, after deductions',
  conservativeEstimate: 3654,
  conservativeLabel: '$3,654 bi-weekly (after deductions)',
  incomeHistory: [3654, 3654, 3654, 3654, 3654, 3654],

  obligations: [
    { name: 'Mortgage', amount: 1450, date: 'Mar 5' },
    { name: 'Condo fees', amount: 380, date: 'Mar 5' },
    { name: 'Phone', amount: 95, date: 'Mar 8' },
    { name: 'Car payment', amount: 420, date: 'Mar 10' },
    { name: 'Internet', amount: 75, date: 'Mar 12' },
  ],
  obligationTotal: 2420,
  obligationHorizon: 'next 14 days',

  safeToAllocate: 558,
  allocations: [
    { icon: '💚', amount: 350, account: 'RRSP', reason: 'At $95K income (20.5% federal + 10% Alberta), RRSP gives you ~$107 tax savings per $350 contributed. Strong benefit at your combined 30.5% marginal rate.' },
    { icon: '💚', amount: 208, account: 'TFSA', reason: '$3,500 room remaining. On track to max by June.' },
  ],
  infoLines: [
    'Emergency fund fully funded ($14,200 / $13,500)',
    'No FHSA — you own a home. Not eligible.',
    'At your income, RRSP has a slight edge over TFSA due to the combined 30.5% marginal rate. You save ~$305 in taxes per $1,000 contributed to RRSP.',
  ],

  accounts: [
    { name: 'TFSA', type: 'tfsa', contributed: 3500, room: 7000, balance: 52000, progressPercent: 50, status: 'active', detail: 'On track to max by June' },
    { name: 'FHSA', type: 'fhsa', contributed: 0, room: 0, balance: 0, progressPercent: 0, status: 'inactive', detail: 'Not eligible — homeowner' },
    { name: 'RRSP', type: 'rrsp', contributed: 4200, room: 17100, balance: 41000, progressPercent: 25, status: 'active', detail: 'Best account for you — 30.5% marginal tax benefit', highlight: true },
    { name: 'Emergency Fund', type: 'emergency', contributed: 14200, room: 13500, balance: 14200, progressPercent: 100, status: 'complete', detail: 'Fully funded. Excess can be redirected to investments.' },
  ],

  tfsaBalance: '$52,000 balance, $3,500 contributed in 2026',
  tfsaContributed: '$3,500',
  rrspBalance: '$41,000 balance',
  hasFhsa: false,
  tfsaRoom: '3500',
  rrspRoom: '17100',
  ownsHome: true,
  emergencyTarget: '13500',

  spending: [
    { name: 'Housing', amount: 1830, percent: 41 },
    { name: 'Food & Dining', amount: 580, percent: 13 },
    { name: 'Transportation', amount: 520, percent: 12 },
    { name: 'Shopping', amount: 320, percent: 7 },
    { name: 'Entertainment', amount: 280, percent: 6 },
    { name: 'Utilities', amount: 180, percent: 4 },
    { name: 'Subscriptions', amount: 95, percent: 2 },
    { name: 'Other', amount: 695, percent: 15 },
  ],

  transactions: [
    { date: 'Mar 1', description: 'Employer - TechCorp', amount: 3654, category: 'Income (Salary)', confidence: 'high' },
    { date: 'Feb 28', description: 'Shell Gas Station', amount: -62, category: 'Transportation', confidence: 'high' },
    { date: 'Feb 27', description: 'Amazon.ca', amount: -89, category: 'Shopping', confidence: 'high' },
    { date: 'Feb 26', description: 'Save-On-Foods', amount: -134, category: 'Food & Dining', confidence: 'high' },
    { date: 'Feb 25', description: 'Netflix', amount: -17, category: 'Subscriptions', confidence: 'high' },
    { date: 'Feb 24', description: 'ETRNSFR TO MOM', amount: -500, category: 'Transfer?', confidence: 'medium', suggestedCorrection: 'Transfer/Reimbursement' },
    { date: 'Feb 22', description: 'Telus', amount: -95, category: 'Phone', confidence: 'high' },
    { date: 'Feb 21', description: 'Canadian Tire', amount: -67, category: 'Shopping', confidence: 'high' },
    { date: 'Feb 20', description: 'Starbucks', amount: -8, category: 'Food & Dining', confidence: 'high' },
    { date: 'Feb 18', description: 'Employer - TechCorp', amount: 3654, category: 'Income (Salary)', confidence: 'high' },
    { date: 'Feb 17', description: 'Costco', amount: -215, category: 'Food & Dining', confidence: 'high' },
    { date: 'Feb 15', description: 'Spotify', amount: -11, category: 'Subscriptions', confidence: 'high' },
    { date: 'Feb 14', description: 'Mortgage - CIBC', amount: -1450, category: 'Housing', confidence: 'high' },
    { date: 'Feb 14', description: 'Condo Corp', amount: -380, category: 'Housing', confidence: 'high' },
    { date: 'Feb 12', description: 'Shaw Internet', amount: -75, category: 'Utilities', confidence: 'high' },
  ],

  scenarios: [
    {
      title: 'Unexpected $2,000 expense (car repair)',
      newAmount: 180,
      allocations: [{ icon: '🛡️', amount: 180, account: 'Reduced allocation', reason: '' }],
      note: 'After absorbing this expense, I\'d recommend reducing this pay period\'s allocation. Your emergency fund covers this — want to draw from it instead of reducing investment?',
      isPositive: false,
    },
    {
      title: 'Annual bonus arrives ($8,000 after tax)',
      newAmount: 4558,
      allocations: [
        { icon: '💚', amount: 3500, account: 'TFSA', reason: 'Maxes your TFSA for the year' },
        { icon: '💚', amount: 1058, account: 'RRSP', reason: 'Brings you to $5,258 / $17,100 room' },
      ],
      note: 'Big opportunity: $3,500 maxes your TFSA for the year. Remaining $1,058 to RRSP brings you to $5,258 / $17,100 room. Combined tax savings: ~$1,390.',
      isPositive: true,
    },
  ],

  calculationChain: `Paycheque (after deductions):                $3,654
− Fixed obligations (next 14 days):          −$2,420
  (mortgage, condo, phone, car, internet)
− Variable spending (bi-weekly avg):         −$580
  (dining, gas, shopping)
− Buffer (10% of variable spending):         −$58
  (low buffer — steady income is predictable)
─────────────────────────────────────────────
Safe to allocate:                             $596
Adjusted for recent spending patterns:        $558`,

  cantSee: [
    'Cash transactions not in your bank data',
    'Pending purchases on credit cards',
    'Upcoming irregular expenses',
    'Changes to your employment or salary',
    'Life changes you haven\'t told me about',
  ],

  categorizationAccuracy: '96.8% accurate (8 corrections / 250 transactions)',
  incomePrediction: '±2% (steady salary — minimal variance)',
  missedObligations: '0',

  askHiveChips: [
    {
      question: 'Am I on track to max my TFSA?',
      response: `Yes — you're in great shape.

You've contributed $3,500 of your $7,000 limit this year.
At your current rate of $208/payday (every 2 weeks), you'll
contribute another $5,408 by December — more than enough.

You're on track to max your TFSA by June. After that, I'll
automatically redirect recommendations to your RRSP, where
you have $12,900 of room remaining.`,
    },
    {
      question: 'Can I afford a $3,000 vacation in June?',
      response: `Yes, comfortably.

Between now and June (13 pay periods), your total safe-to-
allocate is projected at ~$7,254. After maintaining your current
RRSP ($350/pay) and TFSA ($208/pay) contributions, you'd have
approximately $0 surplus — because your allocation is optimized.

Two options:
1. Reduce TFSA to $100/pay for 6 periods → saves $648,
   then reduce RRSP to $250/pay for 6 periods → saves $600.
   Total: $1,248 saved. You'd need to cover $1,752 from
   your emergency fund surplus ($700 above target).

2. Better option: set a $3,000 vacation goal now. I'll
   adjust your allocation to save $231/pay over 13 periods.
   Your TFSA maxes in August instead of June. RRSP takes
   a small pause. No emergency fund impact.

Want me to set up Option 2?`,
    },
    {
      question: 'Should I increase my RRSP contributions?',
      response: `At your income ($95K), RRSP is already your top priority —
and you're doing well.

Currently contributing $350/payday to RRSP. At your combined
30.5% marginal rate (20.5% federal + 10% Alberta), every $100
extra saves you $30.50 in taxes.

You have $12,900 of RRSP room remaining. Increasing to $500/pay
would use an extra $3,900 by year-end and save ~$1,190 in taxes.

Trade-off: your TFSA would take longer to max (September vs June).
Since your emergency fund is fully funded, there's no downside
to shifting more toward RRSP — the tax savings are real.

My recommendation: increase RRSP to $450/pay after your TFSA
maxes in June. Best of both worlds.`,
    },
    {
      question: 'How much did I spend vs last month?',
      response: `February total spending: $4,500
January total spending: $4,180
Difference: +$320 (7.7% increase)

Biggest changes:
  Food & Dining: $580 → up from $490 (+18%)
  Shopping: $320 → up from $180 (+78%) — Amazon & Canadian Tire
  Entertainment: $280 → up from $200 (+40%)

Decreases:
  Transportation: $520 → down from $580 (-10%)
  Utilities: $180 → same

The shopping spike is the main driver. Two Amazon orders ($89 +
$156) and the Canadian Tire purchase ($67) account for most of it.
Your housing costs are stable as expected.`,
    },
  ],
};

export const CATEGORIES = [
  'Income', 'Housing', 'Food & Dining', 'Transportation', 'Creator Tools',
  'Subscriptions', 'Shopping', 'Health', 'Entertainment', 'Business Expense',
  'Transfer/Reimbursement', 'Utilities', 'Phone', 'Other',
];
