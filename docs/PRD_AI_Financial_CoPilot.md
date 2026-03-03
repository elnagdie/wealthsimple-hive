# Product Requirements Document
## AI Financial Co-Pilot: Intelligent Allocation Engine for Variable Income Canadians

**Author:** Esraa Elnagdi
**Date:** March 1, 2026
**Status:** Prototype / AI Builder Application Submission
**Version:** 1.0

---

## 1. Problem Statement

### The Legacy Workflow

Today, a Canadian who wants to answer "how much can I safely invest this month?" must complete a 7-step manual process:

1. Log into 2-4 separate bank apps (chequing, credit cards, savings, investment accounts)
2. Download monthly statements as CSVs
3. Paste transaction data into a spreadsheet
4. Manually categorize hundreds of transactions (is "UBER" transportation or food delivery?)
5. Identify recurring obligations and upcoming bills
6. Calculate disposable income after obligations
7. Guess what's safe to move to investments — then manually initiate the transfer

Most Canadians skip steps 2-6. According to Wealthsimple's own research (November 2024), **59% of Canadians don't maintain a household budget**. Among those who do, the median time investment is 2-4 hours per month, with abandonment rates highest in weeks 2-4.

For the 29% of knowledge workers earning variable income (freelancers, gig workers, contract employees), this process is fundamentally broken. Standard budgeting templates assume a steady bi-weekly paycheque. When income fluctuates between $2,000 and $8,000 month-to-month, "set a fixed budget" is useless advice.

### The Consequence

Canadians are leaving money on the table. They under-invest because they're uncertain what's safe. They over-invest because they forgot about an upcoming insurance payment. Or they don't invest at all because the cognitive load of figuring out the right number is too high.

Wealthsimple's existing "Automate Your Pay" feature allows users to auto-invest a fixed amount each payday — but it has no intelligence about whether the user can actually afford that transfer this pay period. It doesn't know about upcoming bills. It doesn't adjust for variable income. It's a dumb pipe.

### The Opportunity

Canada's Open Banking framework (Consumer-Driven Banking Act) launches read-access in 2026, enabling consumers to securely share account data from any financial institution with accredited providers via API — replacing the current screen-scraping approach used by ~9 million Canadians. This creates a new data layer: for the first time, a platform like Wealthsimple could see a user's complete financial picture across all institutions.

The question is not whether this data will be available. It's whether anyone will build the intelligence layer on top of it.

---

## 2. Solution Overview

### What We're Building

An AI-powered financial co-pilot that ingests a user's complete transaction history, understands their income patterns, detects upcoming obligations, and delivers a specific, reasoned weekly allocation recommendation — telling the user exactly what's safe to spend, save, and invest right now.

### What the Human Can Now Do That They Couldn't Before

A freelancer earning variable income can open the app on Monday morning and see: *"This week, you have $340 safe to allocate beyond your obligations. Based on your goals, I recommend $200 to your TFSA (you have $4,200 contribution room remaining) and $140 to your emergency fund. Here's my reasoning: your rent ($1,800) is due in 12 days, you have a $1,200 insurance payment pattern from December — I'm holding $300 in buffer for that. Your income has been variable (±35% over 6 months), so I'm using your conservative estimate, not your average."*

This is the cognitive work of a financial advisor — delivered at the speed and cost of software.

### One-Line Description

**AI that answers the question every Canadian has: "Can I afford to invest more right now?" — with specific, reasoned recommendations based on their complete financial picture.**

---

## 3. User Personas

### Primary: Variable Income Earner ("Priya")
- Freelance UX designer, 28, Toronto
- Income: $3,000-$8,000/month depending on contracts
- Has Wealthsimple chequing + TFSA + trading account
- Also has TD chequing (where some clients pay) and a CIBC Visa
- Currently "budgets" by checking her bank balance before large purchases
- Has attempted YNAB twice, quit both times (too much manual work)
- Knows she should invest more but is terrified of over-committing during a lean month

### Secondary: Steady Income, Budget-Avoidant ("Marcus")
- Software developer, 34, Calgary
- Salary: $95,000/year, paid bi-weekly
- Has Wealthsimple chequing + managed portfolio
- Also has Scotiabank savings and an Amex
- Has never maintained a budget for more than one month
- Uses Wealthsimple's auto-invest at $200/payday but suspects he could invest more
- Doesn't know his actual monthly spending breakdown

### Tertiary: Dual Income Household ("Sam & Jordan")
- Combined household income: $140,000
- Multiple accounts across 3 institutions
- Want to maximize TFSA contributions for both partners
- Currently use a shared Google Sheet that Jordan updates monthly (Sam never looks at it)
- Disagree about how much they can afford to invest vs. keep as buffer

---

## 4. AI Responsibility Matrix

This is the core of the system design. Every function is explicitly assigned to either the AI or the human, with clear reasoning.

### AI Is Responsible For:

| Function | What the AI Does | Why AI Is Better Than Human |
|---|---|---|
| Transaction categorization | Ingests raw transactions, learns user patterns, auto-categorizes with 90%+ accuracy | Humans miscategorize, skip entries, and quit after 2 weeks. AI improves over time. |
| Income pattern detection | Analyzes 6+ months of deposits, classifies as steady/variable/seasonal, calculates confidence intervals | Humans use gut feel or simple averages. AI models variance and seasonal patterns. |
| Recurring obligation identification | Pattern-matches transaction history to surface recurring bills (rent, subscriptions, insurance, loan payments) | Humans forget annual/quarterly payments. AI surfaces the $1,200 insurance payment due in 6 weeks. |
| "Safe to allocate" calculation | Combines income forecast + known obligations + buffer for variable income + stated goals → specific number | This is 30+ minutes of spreadsheet work. AI does it in seconds, every week, with transparent reasoning. |
| Allocation recommendation | Distributes safe-to-allocate across user's goals (TFSA, RRSP, emergency fund, debt payoff) with Canadian tax awareness | Requires knowledge of contribution room, tax brackets, and goal prioritization. AI can optimize across all dimensions simultaneously. |
| Anomaly and risk flagging | Detects unusual spending, potential overdrafts, approaching contribution limits | Humans notice problems after they happen. AI flags them before. |

### Human Must Decide:

| Decision | Why It Must Remain Human |
|---|---|
| **Actual money movement** (The Critical Decision) | Three reasons: (1) Life context the AI can't see — job changes, pregnancy, divorce fundamentally change priorities overnight. Only humans know their full life context. (2) Risk tolerance is deeply personal — two people with identical finances may have different comfort levels. (3) Regulatory reality — Open Banking Phase 1 is read-only. Payment initiation requires explicit consent per transaction under the CDBA. |
| Goal setting and prioritization | "Save for a house" vs "pay off student loans" vs "travel fund" reflects personal values. AI can optimize toward goals but shouldn't set them. |
| Category corrections | When the AI miscategorizes (e.g., an e-transfer to a landlord coded as "personal transfer" instead of "rent"), the human corrects it. This correction trains the model. |
| Overriding recommendations | The AI might say "invest $300" but the human knows their car is making a concerning noise. Overrides should be easy and consequence-free. |
| Accepting financial trade-offs | "You're on track for your TFSA but behind on your emergency fund. Do you want to rebalance?" The AI surfaces the trade-off; the human chooses. |

---

## 5. System Architecture

### Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                     DATA INGESTION                       │
│                                                          │
│  Phase 1 (Prototype):  CSV upload of bank statements     │
│  Phase 2 (2026):       Open Banking read-access API      │
│  Phase 3 (2027):       Open Banking write-access          │
│                         (AI-initiated transfers           │
│                          with human consent per txn)      │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   AI PROCESSING LAYER                    │
│                                                          │
│  1. Transaction Parser                                   │
│     - Normalize formats across institutions              │
│     - Deduplicate (same transaction on credit + debit)   │
│                                                          │
│  2. Categorization Engine                                │
│     - ML model trained on Canadian merchant data         │
│     - User correction feedback loop                      │
│     - Confidence scoring per categorization              │
│                                                          │
│  3. Pattern Detection                                    │
│     - Income classification (steady/variable/seasonal)   │
│     - Recurring obligation identification                │
│     - Spending trend analysis                            │
│                                                          │
│  4. Allocation Engine                                    │
│     - Income forecast (with confidence intervals)        │
│     - Obligation calendar (next 30/60/90 days)           │
│     - Buffer calculation (scaled to income variability)  │
│     - Goal-aware distribution                            │
│     - Canadian tax optimization (TFSA vs RRSP logic)     │
│                                                          │
│  5. Reasoning Generator                                  │
│     - Natural language explanation of recommendation     │
│     - Transparent assumptions and confidence levels      │
│     - "What would change if..." sensitivity analysis     │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   HUMAN INTERFACE LAYER                   │
│                                                          │
│  Weekly Dashboard:                                       │
│  ┌─────────────────────────────────────────────────┐     │
│  │  "This week, you have $340 safe to allocate"    │     │
│  │                                                  │     │
│  │  Recommended:                                    │     │
│  │    → $200 to TFSA ($4,200 room remaining)       │     │
│  │    → $140 to Emergency Fund                     │     │
│  │                                                  │     │
│  │  [See reasoning] [Adjust] [Act on this]         │     │
│  └─────────────────────────────────────────────────┘     │
│                                                          │
│  Supporting Views:                                       │
│  - Spending breakdown (needs/wants/savings)              │
│  - Income trend + variability indicator                  │
│  - Upcoming obligations calendar                         │
│  - Goal progress tracker                                 │
│  - Category corrections interface                        │
│                                                          │
│  Human Actions:                                          │
│  - Review and accept/modify recommendation               │
│  - Correct miscategorized transactions                   │
│  - Set/adjust financial goals                            │
│  - Initiate money movement (manual action)               │
└─────────────────────────────────────────────────────────┘
```

### Tech Stack (Prototype)

| Component | Technology | Rationale |
|---|---|---|
| Frontend | React (single-page app) | Fast to prototype, demonstrates interactivity |
| AI Engine | Claude API (claude-sonnet-4-5) | Strong reasoning, transparent explanations, handles complex financial logic |
| Data Input | CSV file upload + pre-loaded sample data | Simulates Open Banking read-access without requiring bank credentials |
| Hosting | Static deployment or local | Prototype scope — not production |

### Tech Stack (Production Vision)

| Component | Technology | Rationale |
|---|---|---|
| Data Layer | Open Banking API (CDBA-compliant) | Secure, consented, real-time account data |
| AI Engine | Fine-tuned model for Canadian financial categorization + LLM for reasoning | Speed + accuracy for categorization; reasoning quality for recommendations |
| Integration | Wealthsimple internal APIs | Direct connection to chequing, TFSA, RRSP, trading accounts |
| Infrastructure | Wealthsimple's existing ML platform (NVIDIA Triton) | Proven 99.999% uptime for financial ML inference |

---

## 6. Functional Requirements

### P0 — Must Have (Prototype Scope)

**FR-1: Transaction Ingestion**
- System accepts CSV file upload containing bank transactions
- Parses date, description, amount, and balance fields
- Handles multiple CSV formats (major Canadian banks use different column layouts)
- Pre-loaded sample dataset available for demo (3 months of realistic Canadian transactions)

**FR-2: AI Categorization**
- Every transaction is assigned to a category (Housing, Food & Dining, Transportation, Utilities, Subscriptions, Income, Transfer, Entertainment, Shopping, Health, Other)
- AI uses merchant name + amount + pattern to categorize (not rigid keyword matching)
- Each categorization includes a confidence score
- Low-confidence categorizations are flagged for human review

**FR-3: Income Pattern Analysis**
- System identifies all income deposits
- Classifies income pattern: Steady (regular interval, consistent amount), Variable (irregular interval or amount), or Mixed
- For variable income: calculates mean, median, standard deviation, and a "conservative estimate" (25th percentile)
- Displays income variability indicator to user

**FR-4: Recurring Obligation Detection**
- System identifies transactions that repeat at regular intervals
- Surfaces obligations with next expected date and amount
- Distinguishes between fixed (rent: $1,800/month) and variable recurring (electricity: ~$80-120/month)
- Alerts user to detected obligations they might not be tracking

**FR-5: Safe-to-Allocate Calculation**
- Calculates: Income forecast (conservative) − Known obligations (next 30 days) − Variable spending estimate − Buffer (scaled to income variability) = Safe to allocate
- Buffer scales with income variability: steady income = 10% buffer, variable income = 20-30% buffer
- Displays calculation transparently (user can see every input)

**FR-6: Allocation Recommendation**
- Distributes safe-to-allocate amount across user's stated goals
- Prioritizes: obligations → emergency fund (if below 3-month target) → high-interest debt → TFSA → RRSP
- Includes reasoning for each allocation in natural language
- Accounts for TFSA contribution room awareness

**FR-7: Recommendation Explanation**
- Every recommendation includes a natural language explanation
- Explanation covers: what data the AI used, what assumptions it made, what it's uncertain about, and what would change the recommendation
- Users can drill into any part of the reasoning

### P1 — Should Have (Production Scope)

**FR-8: Human Correction Loop**
- User can recategorize any transaction with one click
- Corrections are fed back to improve future categorization
- System learns user-specific patterns (e.g., "JOHN SMITH E-TRF" = rent, not personal)

**FR-9: Goal Setting Interface**
- User sets financial goals (emergency fund target, TFSA contribution goal, debt payoff, custom savings goals)
- Goals include target amount and timeline
- System tracks progress and adjusts recommendations based on goal priority

**FR-10: Multi-Account Aggregation**
- Via Open Banking API, ingest data from all Canadian financial institutions
- Unified view across all accounts
- Deduplication of transfers between own accounts

**FR-11: Real-Time Updates**
- With Open Banking, data refreshes daily (or more frequently)
- Recommendations update automatically when new transactions appear
- Push notifications for significant changes ("Your safe-to-allocate dropped by $500 because of a $500 purchase at Best Buy")

### P2 — Nice to Have (Future Scope)

**FR-12: Smart Automation Integration**
- Replace Wealthsimple's fixed "Automate Your Pay" with dynamic automation
- Each payday, the AI calculates the optimal investment amount and pre-fills it
- User confirms with one tap (human-in-the-loop preserved)

**FR-13: Tax Optimization Engine**
- TFSA vs RRSP recommendation based on current income bracket
- "Contributing $X to RRSP now could save you $Y at tax time" calculations
- Integration with Wealthsimple Tax for year-round awareness

**FR-14: Household Mode**
- Shared financial view for couples/roommates
- Individual + combined spending breakdowns
- Shared goal tracking

**FR-15: Scenario Modeling**
- "What if I lose my biggest client?" → shows impact on runway and recommendations
- "What if I increase rent by $300?" → recalculates allocation
- "Can I afford a $5,000 vacation in 4 months?" → models savings path

---

## 7. Non-Functional Requirements

**Performance:**
- AI categorization of 500 transactions completes in <10 seconds
- Recommendation generation completes in <5 seconds
- Dashboard loads in <2 seconds

**Security (Production):**
- All data encrypted at rest and in transit
- Open Banking data accessed only with explicit user consent
- No storage of bank credentials (API-based access only)
- Compliant with CDBA accreditation requirements
- PIPEDA-compliant data handling

**Accuracy:**
- Transaction categorization: >90% accuracy after 50 user corrections
- Income pattern detection: correctly classifies steady vs variable in >95% of cases
- Obligation detection: identifies >85% of recurring transactions within 3 months of data

**Reliability:**
- Recommendations must be conservative by default (system should err on the side of "invest less" not "invest more")
- When data is stale (>7 days since last import), system clearly labels recommendations as potentially outdated
- When confidence is low, system says so explicitly rather than presenting uncertain recommendations as certain

---

## 8. What Would Break First at Scale

This section is critical. A system that works in a demo but fails in the real world isn't a system — it's a science project.

### Failure Mode 1: Categorization Errors That Compound
**The problem:** If the AI miscategorizes a $2,000 e-transfer to a landlord as "personal transfer" instead of "rent," the safe-to-allocate number becomes wildly inflated. User invests money they need for rent.

**Mitigation:**
- High-value transactions (>$500) require higher confidence thresholds before being auto-categorized
- Recurring high-value transactions get extra scrutiny (pattern: same amount, same recipient, monthly → likely rent)
- Human correction for any categorization the user flags creates a permanent override
- System sends a "does this look right?" prompt for the first occurrence of any new high-value pattern

### Failure Mode 2: Income Prediction for Truly Irregular Earners
**The problem:** A freelancer who landed 3 large contracts last quarter looks flush in the historical data, but those contracts were one-time engagements. The AI overpredicts future income.

**Mitigation:**
- System uses conservative estimate (25th percentile) as default, not average
- Income confidence is displayed prominently ("Your income has varied ±35% over 6 months — I'm using your lower estimate")
- User can manually set an income expectation that overrides the AI's prediction
- System flags when recommendations would change materially if income dropped 30%

### Failure Mode 3: Stale Data Leading to Outdated Recommendations
**The problem:** User uploaded their CSV last week. Since then, they made a $3,000 purchase. The AI's recommendation doesn't account for it.

**Mitigation:**
- Clear timestamp: "Last data update: March 1, 2026"
- Warning when data is >5 days old: "Your recommendation may not reflect recent transactions"
- In Open Banking era: real-time data eliminates this failure mode
- Prototype explicitly states this limitation

### Failure Mode 4: Tax Optimization Overreach
**The problem:** The AI recommends RRSP over TFSA for a user in a low tax bracket, resulting in suboptimal tax treatment. Or worse, recommends contributions that exceed room limits.

**Mitigation:**
- System does not auto-execute tax-optimized moves — it recommends and explains
- Clear disclaimer: "This is not tax advice. Consider consulting a tax professional for complex situations."
- TFSA/RRSP contribution room is tracked but user is responsible for confirming accuracy
- When income suggests a bracket change, system flags: "Your income this year may push you into a higher bracket — an RRSP contribution may be more valuable than usual"

### Failure Mode 5: Emotional/Behavioral Blindness
**The problem:** AI doesn't know the user is about to quit their job, is going through a divorce, or is expecting a baby. Life events change financial needs dramatically and immediately.

**Mitigation:**
- Override is always one tap away ("I know better right now")
- System never makes money movement automatic — human confirmation required
- Recommendations include "what would change if your income dropped 50%?" sensitivity
- Goal adjustment interface allows rapid reprioritization

---

## 9. Success Metrics

### For the Prototype
- Does the AI produce a specific, numbered allocation recommendation? (Not vague advice)
- Is the reasoning transparent and auditable?
- Does the system correctly identify income variability?
- Does the system detect recurring obligations?
- Is the human/AI boundary clear and well-reasoned?

### For Production (if built at Wealthsimple)

| Metric | Target | Why It Matters |
|---|---|---|
| Weekly active users of Co-Pilot | 500K within 12 months | Adoption = value |
| % of users who act on recommendations | >30% | Recommendations must be actionable, not just informative |
| Average investment increase per user | +$150/month | Core business impact — more AUA |
| Categorization accuracy (after corrections) | >92% | Trust requires accuracy |
| User-reported "financial confidence" (survey) | +20pts vs control | Mission alignment — "help everyone achieve financial freedom" |
| Net Promoter Score for Co-Pilot feature | >50 | Quality bar |

---

## 10. Competitive Landscape

| Competitor | What They Do | What They Don't Do |
|---|---|---|
| **Origin Financial** ($12.99 USD/mo) | AI budget builder, auto-categorization, AI chatbot ("Sidekick"), investment tracking, net worth, couples mode, CFP access. First SEC-regulated AI financial advisor. Forbes "Best Budgeting App" 2024. | US-only (no TFSA/RRSP/FHSA). Outputs static monthly budgets — tells user "income is inconsistent" but doesn't adapt the model for it. Standalone app — can show you should invest more but can't move the money. Backward-looking: tells you what happened, not what to do next. |
| YNAB ($160 CAD/year) | Zero-based budgeting methodology, manual categorization, bank sync | No AI intelligence, no investment recommendations, no Canadian tax awareness, subscription fatigue |
| Monarch Money ($99 USD/year) | Clean UI, auto-categorization, net worth tracking | No allocation recommendations, no variable income modeling, US-focused |
| Copilot Money (iOS only, $70 USD/year) | Beautiful design, basic spending insights | No Canadian support, no investment integration, no forward-looking recommendations |
| KOHO (Canadian) | Spending categorization, roundups, cashback | Pre-paid card model, no intelligence layer, no investment connection |
| Google Sheets (free) | Complete customization, no subscription, data ownership | Zero intelligence, requires hours of manual work, no automation, no investment bridge |
| Wealthsimple (current) | Investing + chequing + tax in one platform. Spend tab with balances, payday countdown, activity feed. | No budgeting, no spending categorization, no "safe to invest" intelligence, dumb automations |

### Our Differentiation

Apps like Origin and Monarch have made significant progress on AI-powered budgeting and spending insights. But they stop at telling you what happened with your money. Hive answers the harder question: **"What should you do with your money right now?"**

Three structural advantages no competitor can replicate:

**1. Embedded, not standalone.** Hive lives inside Wealthsimple — where the user's TFSA, RRSP, FHSA, and chequing already are. The recommendation and the action happen in the same place. Origin can tell you "invest more" but you have to leave the app to actually do it. Hive's "Move $340 →" button transfers money directly.

**2. Variable income as a first-class model, not an afterthought.** Origin's AI Budget Builder creates static monthly budgets even when it detects inconsistent income. Hive models income variability with confidence intervals, uses conservative estimates (25th percentile), scales buffers to volatility (25% for variable vs 12% for steady), and adjusts its cadence (weekly rolling for freelancers vs payday-synced for salaried). The entire intelligence model adapts — not just the numbers.

**3. Canada-native.** TFSA vs RRSP vs FHSA routing based on marginal tax rate, contribution room tracking with over-contribution prevention, Open Banking integration under the CDBA — none of this exists in any US-based competitor because the account types and regulatory framework don't exist there.

Hive is not a budgeting app. It's the intelligence layer between spending and investing — the missing brain inside Wealthsimple's platform.

---

## 11. Phased Rollout

### Phase 1: Prototype (This Submission)
- CSV upload of sample bank data
- AI categorization + income analysis + obligation detection
- Single "safe to allocate" recommendation with reasoning
- Static demo — no real bank connections

### Phase 2: Internal Pilot (Post-Hire, Months 1-3)
- Integration with Wealthsimple chequing transaction data
- Real user testing with Wealthsimple employees
- Categorization model training on Canadian merchant data
- Feedback loop for accuracy improvement

### Phase 3: Open Banking Integration (2026)
- Connect to external bank accounts via CDBA read-access API
- Full financial picture across all institutions
- Real-time data refresh
- Dynamic automation: replace fixed "Automate Your Pay" with intelligent allocation

### Phase 4: Write-Access Era (2027+)
- AI-recommended transfers executed with one-tap human confirmation
- "Smart pay" — obligations auto-scheduled, investments dynamically allocated per payday
- Cross-institution money movement (e.g., move excess from TD savings to Wealthsimple TFSA)

---

## 12. Open Questions and Assumptions

### Assumptions Made Explicit
1. Open Banking Phase 1 launches in 2026 as planned (risk: regulatory delays)
2. Users are willing to share financial data with an AI system (evidence: 9M Canadians already share banking credentials via screen scraping)
3. Transaction categorization can achieve >90% accuracy with Canadian merchant data (evidence: Plaid and similar services achieve this in US/UK markets)
4. Conservative recommendations are better than aggressive ones (assumption: users trust a system that occasionally under-invests more than one that occasionally over-invests)

### Open Questions
1. **Liability:** If a user follows the AI's recommendation and it turns out to be wrong (e.g., missed an obligation, over-invested), what is Wealthsimple's liability? Legal review required.
2. **Regulatory classification:** Does this constitute "financial advice" under Canadian securities law? If so, different compliance requirements apply.
3. **Data retention:** How long should transaction history be retained? Longer = better predictions. But PIPEDA and CDBA impose constraints.
4. **Couples/household:** How do joint finances work? Shared accounts + individual accounts = complex permission model.
5. **Edge cases:** What happens with cash-heavy users whose spending is invisible? What about crypto income? What about employer stock options?

---

## 13. Persona-Specific Copilot Behavior: Steady vs Variable Income

The copilot must fundamentally adapt its intelligence model, cadence, confidence levels, and recommendations based on the user's income pattern. A salaried employee and a freelancer using the same app should have meaningfully different experiences.

### 13.1 Steady Paycheque Employee ("Marcus Mode")

**Income Detection:**
The AI detects a consistent deposit pattern: same amount (±$50 for minor tax/benefit fluctuations), same source, regular interval (bi-weekly or semi-monthly). After 3+ consistent deposits, system classifies as "Steady Income" with high confidence.

**Copilot Cadence:** Payday-synced (bi-weekly or semi-monthly)
- Recommendation generated the day after each paycheque lands
- One primary recommendation per pay period: "Your paycheque of $3,200 arrived yesterday. After your obligations ($1,800 rent due in 5 days, $120 phone bill, $85 insurance), you have $620 safe to allocate."

**Confidence Level:** High (85-95%)
- Steady income means narrower confidence intervals
- Buffer: 10-15% of discretionary amount held back
- Language reflects confidence: "You have $620 safe to allocate" (not "approximately" or "estimated")

**Primary Value Proposition:** Optimization
- Marcus already has a rough sense of what he can afford. The copilot's job is to make it precise and actionable.
- "You've been auto-investing $200/payday. Based on your actual spending, you could safely invest $310 — that's an extra $2,860/year in your TFSA."
- The system catches the money he's leaving on the table without knowing it.

**Typical Recommendation Card:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PAYDAY RECOMMENDATION — March 1
  Income: $3,200 (bi-weekly salary)
  Confidence: ● HIGH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Obligations next 14 days:
  ├── Rent ..................... $1,800 (Mar 5)
  ├── Phone ................... $120   (Mar 8)
  └── Insurance ............... $85    (Mar 12)

  Estimated variable spending:    $575
  Buffer (10%):                   $62
  ─────────────────────────────────
  SAFE TO ALLOCATE:               $558

  Recommended:
  → $350 to TFSA  ($4,200 room left this year)
  → $208 to Emergency Fund  ($1,800 / $9,600 goal)

  [See reasoning]  [Adjust]  [Do this →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Automation Opportunity:**
Because Marcus's income is predictable, the copilot can suggest upgrading from manual action to "smart auto-invest": "Your safe allocation has been between $480-$620 for the last 6 pay periods. Want me to auto-invest $450 each payday and hold the variable portion for your review?" This preserves human control while reducing friction for the predictable portion.

---

### 13.2 Variable Income Freelancer ("Priya Mode")

**Income Detection:**
The AI detects irregular deposits: varying amounts, multiple sources (different clients), unpredictable timing. Standard deviation of monthly income >20% triggers "Variable Income" classification. System looks for seasonal patterns (e.g., Q4 always higher for marketing freelancers) but doesn't assume them until 12+ months of data confirms.

**Copilot Cadence:** Weekly rolling
- Recommendations update every Monday morning regardless of whether income arrived
- This is the key difference: Priya can't wait for "payday" because there is no predictable payday
- Additional trigger: any deposit >$500 generates a real-time "income arrival" recommendation

**Confidence Level:** Medium (60-80%), displayed prominently
- Wider confidence intervals: "Between $200 and $480 is safe to allocate"
- Buffer: 20-30% of discretionary amount
- Language reflects uncertainty honestly: "Based on your conservative income estimate, approximately $340 is safe to allocate. If your expected invoice from Client X ($2,400) arrives this week, this increases to $680."

**Primary Value Proposition:** Safety + Permission
- Priya's problem isn't optimization — it's paralysis. She's afraid to invest because she might need the money in a lean month.
- The copilot gives her permission to invest by doing the math she's afraid to do.
- "Even using your lowest-income month as baseline, you have $200 safe to invest right now. This accounts for 6 weeks of expenses as buffer."

**Typical Recommendation Card:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WEEKLY CHECK-IN — March 1
  Income this month (so far): $2,400
  Income pattern: ● VARIABLE (±35%)
  Confidence: ●● MEDIUM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Obligations next 30 days:
  ├── Rent ..................... $1,800  (Mar 5)
  ├── Phone ................... $120    (Mar 8)
  ├── Insurance ............... $85     (Mar 12)
  └── ⚠️ Car insurance ........ $1,200  (pattern: annually in April)

  Using conservative income estimate:  $4,200/mo
  (Your range: $3,000 - $8,000 over 6 months)

  Estimated variable spending:    $850
  Buffer (25%):                   $212
  ─────────────────────────────────
  SAFE TO ALLOCATE:               $340
  (Range: $200 - $480 depending on income)

  Recommended:
  → $200 to TFSA  ($4,200 room left this year)
  → $140 to Emergency Fund  ($3,200 / $12,600 goal)

  ⓘ  Why is my buffer higher?
     Your income varied ±35% over 6 months.
     I'm holding extra buffer because your
     annual car insurance ($1,200) is due
     next month based on your pattern.

  [See full reasoning]  [Adjust]  [Do this →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Income Arrival Notification:**
When a large deposit hits:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  💰 $4,800 deposit from Client X detected

  Updated safe to allocate: $340 → $680

  Additional $340 available because:
  - This brings March income to $7,200
  - Above your 6-month average ($5,100)
  - All known obligations are covered

  → Quick action: Move $340 to TFSA?
  → Or: Hold and review Monday
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 13.3 Behavioral Differences Summary

| Dimension | Steady Employee | Variable Freelancer |
|---|---|---|
| Recommendation cadence | Payday-synced (bi-weekly) | Weekly rolling + income-triggered |
| Confidence display | High, stated directly | Medium, range shown prominently |
| Buffer percentage | 10-15% | 20-30% |
| Income model | Last 3 paycheques averaged | 25th percentile of last 6 months |
| Primary anxiety | "Am I investing enough?" | "Can I afford to invest at all?" |
| Copilot tone | Optimizing, nudging upward | Reassuring, giving permission |
| Automation potential | High (smart auto-invest) | Low (manual confirmation preferred) |
| Obligation horizon | 14 days (next pay period) | 30-90 days (longer uncertainty) |
| Seasonal patterns | Bonus detection (annual/quarterly) | Client contract cycles, seasonal demand |

---

## 14. Human Intervention Design: When and How Humans Override the AI

### 14.1 Intervention Taxonomy

Not all human interventions are equal. The system must distinguish between four types:

**Type 1: Routine Confirmation (Every Recommendation)**
- Human reviews the weekly/payday recommendation
- Accepts, modifies amount, or skips entirely
- No friction needed — one tap to accept, easy slider to adjust
- This is the default human-in-the-loop for every money movement

**Type 2: Correction (AI Got Something Wrong)**
- Human recategorizes a transaction
- Human marks a detected obligation as incorrect ("That $1,200 wasn't insurance — it was a one-time purchase")
- Human adjusts income expectation ("I lost a client, expect $2,000 less next month")
- System must make corrections effortless and consequence-free. See Section 15 on transparency.

**Type 3: Life Event Override (AI Can't Know This)**
- Human changes goals ("We're saving for a house now — pause RRSP, maximize FHSA")
- Human signals a major life change ("I'm about to go on parental leave — switch to preservation mode")
- Human adjusts risk tolerance ("I need more buffer right now, even if it means investing less")
- System provides structured "life event" triggers (not just a free-form override)

**Type 4: Emergency Stop (Something Went Wrong)**
- Human pauses all recommendations ("Stop suggesting investments for now")
- Human flags a security concern ("I don't recognize these transactions")
- Immediate, one-tap pause with no data loss
- System resumes recommendations only when human explicitly re-enables

### 14.2 When the System Should Proactively Ask for Human Input

The AI shouldn't just wait passively. There are moments where it should actively seek human judgment:

**"Does this look right?" prompts:**
- First time a new high-value transaction appears (>$500): "I categorized a $2,000 e-transfer to 'John Smith' as 'Personal Transfer.' Is this rent, a loan repayment, or something else?"
- When a recurring pattern changes: "Your electricity bill has been ~$100/month for 6 months but was $180 this month. Is this a one-time spike or a new normal?"
- When income doesn't match the predicted pattern: "You typically receive a deposit from Client X around the 15th. It's the 20th and I haven't seen it. Want me to adjust this month's recommendation to exclude it?"

**Decision-required prompts:**
- When goals conflict: "You want to maximize your TFSA and build your emergency fund, but this month you can only fully fund one. Which takes priority?"
- When a large purchase creates a trade-off: "That $800 purchase means your safe-to-invest amount dropped to $50 this period. Want to skip investing this period, or reduce your emergency fund contribution to maintain some investment?"
- When tax optimization has a choice: "You're near the top of the 20.5% bracket. A $2,000 RRSP contribution now would save you ~$410 in taxes. But your TFSA still has room. Which do you prefer?"

---

## 15. Trust, Transparency & Fact-Checking: Designing for Human Hesitation

### 15.1 The Core Hesitation Problem

Based on user research (Reddit analysis + fintech behavioral patterns), humans hesitate to act on financial AI recommendations for three reasons:

1. **"How do I know this number is right?"** — Accuracy anxiety
2. **"What if it's missing something I know about?"** — Completeness anxiety
3. **"What if I can't undo this?"** — Reversibility anxiety

The system must proactively address all three.

### 15.2 Addressing Accuracy Anxiety: "Show Your Work"

Every recommendation includes a full reasoning chain that the user can expand:

**Level 1 (Default view):** The recommendation + one-line rationale
> "You have $340 safe to allocate — based on your conservative income estimate minus 30-day obligations and 25% buffer."

**Level 2 (Tap "See reasoning"):** The full calculation breakdown
> Income estimate: $4,200 (25th percentile of last 6 months)
> Known obligations (next 30 days): −$2,005
> Average variable spending: −$850
> Buffer (25% of variable spending): −$212
> Upcoming irregular obligation (car insurance, April): −$300 reserved
> ───────────────
> Safe to allocate: $340 (remaining: $493 in chequing as baseline buffer)

**Level 3 (Tap any line item):** Source data
> "Average variable spending: $850" → shows the actual transactions categorized as variable spending over the last 3 months with monthly breakdown

**Why this matters:** Users who can trace the number back to their own transactions trust it. Users who see a magic number don't.

### 15.3 Addressing Completeness Anxiety: "What Am I Missing?"

The system proactively tells the user what it *doesn't* know:

**Data freshness indicator:**
- Green: "Data updated today" (Open Banking era)
- Yellow: "Last update 3 days ago — recent transactions may not be reflected"
- Red: "Last update 7+ days ago — recommendation may be inaccurate"

**Known blind spots panel** (always visible):
```
ⓘ  What I can't see:
   • Cash transactions (not in bank data)
   • Pending credit card charges (until posted)
   • Shared expenses others will reimburse you for
   • Life changes you haven't told me about
   [Update my situation →]
```

**Confidence indicator on every recommendation:**
- Not just "high/medium/low" but specific: "I'm 85% confident this number is within ±$50" or "Your income variability means this could be off by ±$200"

### 15.4 Addressing Reversibility Anxiety: "What If I Regret This?"

**No-consequence exploration:**
- "What if I invest $500 instead of $340?" → instantly shows impact on buffer, goal timeline, risk level
- "What if I skip investing this month?" → shows impact on annual TFSA goal, compound growth difference
- No action is taken until explicit confirmation. Exploring scenarios never triggers transfers.

**Undo-friendly actions:**
- Within Wealthsimple's ecosystem, TFSA/RRSP contributions can be adjusted
- The system reminds users: "Moving money to your TFSA is easily reversible — you can withdraw any time, and the room is restored next year"
- For irreversible actions (RRSP contributions have tax implications on withdrawal), the system adds a caution flag: "RRSP contributions are tax-deductible now but taxable on withdrawal. This is harder to reverse than a TFSA contribution."

### 15.5 Fact-Checking and Correction Interface

The user must be able to challenge and change anything the AI decided. Design principle: **corrections should be easier than the original manual process, not harder.**

**Transaction Correction:**
- Swipe any transaction to recategorize (category picker with smart suggestions)
- "Always categorize [merchant] as [category]" toggle creates a permanent rule
- Batch correction: "Show me all transactions you're less than 80% confident about" → user can rapid-fire fix multiple in one session
- Correction counter: "You've corrected 12 of 847 transactions (98.6% auto-accuracy)" — builds confidence over time

**Income Correction:**
- Manual income override: "I expect to earn approximately $X next month" (overrides the statistical model)
- Client/contract tracking (freelancers): "Add expected income: $2,400 from Client X, expected March 15"
- The AI's statistical model runs in parallel and shows how it compares: "Your estimate: $5,000. My model predicts: $4,200 (conservative) to $6,100 (optimistic)."

**Obligation Correction:**
- Mark any detected obligation as: Correct / Wrong / Changed / One-time
- Add obligations the AI missed: "Add: $500/month student loan payment"
- Calendar integration (future): detect obligations from calendar events

**Goal Correction:**
- Drag-and-drop priority reordering of goals
- Quick toggles: "Pause this goal" / "Boost this goal" / "I hit this goal"
- "What changes if I adjust this goal?" preview before committing

---

## 16. Registered Account Intelligence: TFSA, FHSA, RRSP Awareness

### 16.1 What the Copilot Knows About Your Accounts

For Wealthsimple account holders, the platform already has:

| Data Point | Source | Availability |
|---|---|---|
| TFSA current balance | Wealthsimple account data | Real-time |
| TFSA contributions this year | Wealthsimple transaction records | Real-time |
| RRSP current balance | Wealthsimple account data | Real-time |
| RRSP contributions this year | Wealthsimple transaction records | Real-time |
| FHSA current balance | Wealthsimple account data | Real-time |
| FHSA contributions this year | Wealthsimple transaction records | Real-time |
| Investment holdings per account | Wealthsimple portfolio data | Real-time |
| Tax bracket (estimated) | Income pattern detection from deposits | Estimated (user can confirm) |

**What the copilot must ask the user for (cannot be auto-detected):**

| Data Point | Why It's Needed | How We Get It |
|---|---|---|
| Total TFSA contribution room | CRA tracks lifetime room; Wealthsimple only sees its own accounts | User enters from CRA My Account, or manual calculation helper |
| Total RRSP contribution room | Based on previous year's NOA (Notice of Assessment) | User enters from NOA or CRA My Account |
| FHSA lifetime contribution history | May have contributions at other institutions | User confirms or enters amount |
| Accounts at other institutions | Contributions to TFSAs/RRSPs at TD, RBC, etc. reduce room | Open Banking (2026) or manual entry |
| Provincial tax jurisdiction | Ontario vs Alberta vs BC changes optimal RRSP vs TFSA math | User selects province (often inferable from address) |

### 16.2 Contribution Room Tracking

**2026 Limits (Built into system):**

| Account | Annual Limit | Lifetime Limit | Key Rules |
|---|---|---|---|
| TFSA | $7,000 | $109,000 (cumulative since 2009) | Withdrawals restore room next Jan 1. Over-contribution = 1%/month penalty. |
| RRSP | Lesser of 18% of 2025 income or $33,810 | Carries forward indefinitely | Tax-deductible. Taxable on withdrawal (except HBP). Deadline: March 1 for prior year. |
| FHSA | $8,000 | $40,000 | Carry forward up to $8,000 unused (max $16,000/year). Tax-deductible. Tax-free withdrawal for first home. |

**Room Tracking Dashboard:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  YOUR REGISTERED ACCOUNTS — March 1, 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  TFSA
  ████████████░░░░░░░░  $2,800 / $7,000 contributed this year
  Room remaining: $4,200
  Current balance: $34,500 (invested)
  At current pace: On track to max by October

  RRSP
  ██░░░░░░░░░░░░░░░░░░  $2,000 / $12,400 room available
  Room remaining: $10,400
  Current balance: $18,200 (invested)
  ⚠️ Deadline: March 1, 2027 for 2026 tax year deduction

  FHSA
  ████████████████████  $8,000 / $8,000 — MAXED ✓
  Lifetime: $16,000 / $40,000
  Current balance: $16,800 (invested)
  Next room available: January 1, 2027

  Non-registered
  Current balance: $5,300 (invested)
  Note: Investment income here is taxable
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 16.3 Smart Account Routing: Which Account Gets the Money?

This is where the copilot adds real intelligence. When the user has $340 safe to allocate, the copilot doesn't just say "invest $340" — it says *where*, with reasoning.

**Decision Logic (Priority Waterfall):**

```
Step 1: Emergency Fund Check
  → If emergency fund < 3 months expenses: prioritize this first
  → Recommendation: "Build emergency fund to $X before investing"

Step 2: High-Interest Debt Check
  → If credit card balance > $0: recommend paying this before investing
  → "Your credit card charges ~20% interest. Paying $340 here saves
     more than any investment return."

Step 3: FHSA (if eligible — first-time homebuyer)
  → If FHSA has room AND user has home purchase goal:
  → "FHSA gives you both a tax deduction AND tax-free growth.
     $340 to FHSA saves you ~$70 in taxes at your bracket."

Step 4: RRSP vs TFSA Decision (the key intelligence)
  → This depends on the user's tax bracket:

     Income ≤ $58,523 (14% bracket):
     → TFSA preferred. "At your income level, TFSA is generally
        better — you're paying low taxes now, so the RRSP deduction
        saves you less. TFSA lets you withdraw tax-free anytime."

     Income $58,523 – $117,045 (20.5% bracket):
     → Depends on user's situation. Copilot presents the trade-off:
       "RRSP: $340 contribution saves ~$70 in taxes this year,
        but you'll pay tax when you withdraw in retirement.
        TFSA: No tax break now, but growth and withdrawals are
        completely tax-free forever.
        If you expect to earn less in retirement → RRSP may be better.
        If you might need this money before retirement → TFSA."

     Income $117,045+ (26%+ bracket):
     → RRSP strongly preferred (if room available).
       "$340 to RRSP saves ~$88 in taxes at your marginal rate.
        That's like getting a 26% instant return."

Step 5: Non-Registered (only after registered accounts are maxed)
  → "Your TFSA and RRSP are maxed for the year. $340 goes to your
     non-registered account. Note: investment income here will be
     taxable."
```

**Specific Recommendation Format:**
```
  Recommended allocation of $340:

  1. $200 → TFSA
     Why: You have $4,200 room remaining. At your income ($72,000),
     TFSA is slightly preferred over RRSP because you're in the
     20.5% bracket and may earn more later. Tax-free flexibility.

  2. $140 → Emergency Fund (HISA)
     Why: Your emergency fund is at $3,200 of your $12,600 target
     (3 months expenses). Building this buffer reduces financial
     stress and protects your investments from forced withdrawals.

  ⓘ  Why not RRSP?
     At $72,000 income (20.5% federal bracket), RRSP and TFSA
     are close in value. I'm prioritizing TFSA because:
     - You still have $4,200 TFSA room (use it or lose it in 2026)
     - TFSA withdrawals are tax-free if you need funds
     - Your RRSP room carries forward (no urgency)

     Want to split between TFSA and RRSP instead? [Adjust →]
```

### 16.4 Contribution Room Warnings and Alerts

**Approaching Limit Alerts:**

```
  ⚠️ TFSA ROOM ALERT
  You've contributed $6,500 of your $7,000 limit.
  Only $500 of room remaining for 2026.

  If you continue your current pace ($350/month),
  you'll max out in ~6 weeks.

  After that, I'll route recommendations to your RRSP
  ($10,400 room available) unless you change your preference.
```

**Over-Contribution Prevention (Critical Safety Feature):**

```
  🛑 CONTRIBUTION LIMIT REACHED
  Your TFSA is maxed for 2026 ($7,000 / $7,000).

  I've automatically redirected this recommendation to RRSP.
  Over-contributing to TFSA triggers a 1% monthly penalty.

  Your room resets January 1, 2027
  (plus any 2026 withdrawals restored as room).
```

**Multi-Account Status Warning:**
```
  ⚠️ I can only see your Wealthsimple accounts.
  If you have TFSAs or RRSPs at other banks,
  your actual remaining room may be lower.

  You told me: $3,000 in TFSA at TD
  Adjusted room: $7,000 - $2,800 (here) - $3,000 (TD) = $1,200

  [Update external accounts →]
  [Connect via Open Banking → coming 2026]
```

### 16.5 Year-End Optimization Nudges

The copilot gets smarter as December approaches:

**November Alert:**
```
  📊 YEAR-END TAX PLANNING
  You have $4,200 TFSA room and $10,400 RRSP room remaining.

  At your income ($72,000), an RRSP contribution before
  March 1, 2027 could reduce your 2026 tax bill by up to
  $2,132 (20.5% × $10,400).

  Want me to increase RRSP allocation in upcoming
  recommendations?

  [Yes, prioritize RRSP]  [Keep current split]  [Tell me more]
```

**FHSA Deadline Nudge (if applicable):**
```
  📊 FHSA REMINDER
  You have $2,000 FHSA room remaining for 2026.
  Unused room carries forward (up to $8,000 max per year).

  But contributing now means more time for tax-free growth.
  At 7% annual return, $2,000 invested now vs January could
  mean ~$140 more by the time you buy.

  [Add to next recommendation]  [Skip for now]
```

---

## 17. Charitable Donation Intelligence

### 17.1 Why Include Donations?

Charitable giving is a financial decision with tax implications. Many Canadians don't realize the tax credit structure, and the copilot can surface this intelligently.

**Canadian Donation Tax Credit (2026):**
- First $200 of annual donations: 15% federal credit
- Amounts above $200: 29% federal credit (33% if income >$258,482)
- Provincial credits stack on top (varies by province)
- For someone in Ontario earning $72,000: effective combined credit on amounts >$200 is approximately 40%+

### 17.2 How Donations Appear in Recommendations

Donations are never a default recommendation — they're opt-in. The user must have a "charitable giving" goal set.

**If the user has a donation goal:**
```
  Recommended allocation of $500:

  1. $300 → TFSA
  2. $140 → Emergency Fund
  3. $60  → Charitable Giving Pool
     You've donated $180 this year. Your next $20 crosses the $200
     threshold — after that, your federal tax credit jumps from
     15% to 29%.

     Suggested: donate $80 next month to maximize the higher credit
     rate on a meaningful amount.
```

**Tax receipt tracking:**
- "You've donated $450 this year. Estimated tax credit at filing: ~$163"
- End-of-year nudge: "Donating an additional $50 before Dec 31 would increase your tax credit by ~$23. Effectively costs you $27."

---

## 18. Proactive Hesitation Reduction: Designing for Action, Not Just Information

### 18.1 The "But What If..." Framework

Every financial recommendation triggers internal "but what if" objections. The copilot preemptively addresses the top three:

**Built into every recommendation card (collapsible):**

```
  🤔 Common concerns about this recommendation:

  "What if I need this money unexpectedly?"
  → Your emergency fund covers 1.5 months of expenses.
  → TFSA funds can be withdrawn any time, tax-free.
  → Today's recommendation keeps $493 in your chequing as baseline.

  "What if my income drops next month?"
  → I'm using your conservative estimate ($4,200), not your average.
  → Even if income drops 30%, your obligations are covered.
  → Skipping one recommendation has minimal long-term impact.

  "What if the market drops right after I invest?"
  → Your Wealthsimple managed portfolio is diversified.
  → Average market recovery from 10% drops: ~4 months historically.
  → Consistent investing through dips (dollar-cost averaging) has
    historically outperformed trying to time the market.
```

### 18.2 Progressive Trust Building

The system earns trust over time through accuracy tracking:

**Month 1:** Conservative recommendations + frequent "does this look right?" check-ins
**Month 3:** Show accuracy scorecard — "My categorization has been 94% accurate. You corrected 18 of 312 transactions."
**Month 6:** Offer increased automation — "My recommendations have been within 5% of what you actually allocated for 4 months. Want to try smart auto-invest for the predictable portion?"

**Trust dashboard (always accessible):**
```
  📊 How accurate have I been?

  Categorization accuracy:     94.2%  (12 corrections this month)
  Income prediction accuracy:  ±8%    (predicted $4,200, actual $4,550)
  Obligation detection:        100%   (0 missed obligations in 90 days)
  Recommendation acceptance:   78%    (you acted on 7 of 9 recommendations)

  Biggest miss: Categorized your gym membership ($65/mo)
  as "Shopping" instead of "Health." Corrected and learned.
```

### 18.3 Social Proof and Benchmarking (Privacy-Preserving)

Without exposing individual data, the system can provide anonymous benchmarks:

- "Canadians in your income range typically invest 12-18% of take-home pay. You're at 14% — right in the healthy range."
- "85% of variable-income users who use the copilot weekly report feeling more confident about investing decisions."
- "On average, copilot users invest $180/month more than before — mostly money that was sitting idle in chequing accounts."

### 18.4 The "Start Small" Onramp

For users who've never invested or are nervous about acting on AI recommendations:

**Week 1:** "Try this: move just $50 to your TFSA this week. That's the price of two lunches out. See how it feels."
**Week 2:** "Last week you moved $50 and your buffer held fine. Want to try $100 this week?"
**Week 4:** "You've invested $300 over 4 weeks with zero issues. Ready for the full recommendation of $340/week?"

This graduated approach converts hesitant users into confident actors by proving the system works with low-stakes actions first.
