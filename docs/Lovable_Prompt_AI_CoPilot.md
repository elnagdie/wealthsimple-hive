# LOVABLE PROMPT — AI Financial Co-Pilot Prototype
# Copy everything below this line into Lovable
# ─────────────────────────────────────────────

Build me a multi-screen React web app called "Wealthsimple AI Co-Pilot" — a prototype demonstrating an AI-powered financial allocation engine for Canadians. The app has a short onboarding flow (3 screens) that leads to a rich dashboard.

## IMPORTANT DESIGN CONSTRAINTS
- Use a clean, modern fintech aesthetic inspired by Wealthsimple's design language: lots of white space, dark text (#1A1A2E), subtle grays, and a green accent (#2DC96F) for positive actions. Secondary accent: warm yellow (#F5A623) for warnings. Error/alert: (#E74C3C).
- Use Inter or a clean sans-serif font.
- Desktop-only layout is fine (1200px max-width, centered).
- This is a PROTOTYPE with hardcoded sample data — no backend, no API calls. All data is pre-loaded in the app state.
- Make transitions smooth. Use subtle animations for expanding sections, page transitions, and number changes.
- The app has TWO phases: Onboarding (3 screens) → Dashboard (scrollable single page)

---

## PHASE 1: ONBOARDING FLOW (3 screens)

All onboarding screens should be centered, clean, with generous white space. Think Wealthsimple's sign-up flow: minimal, elegant, one question per screen. Include a subtle progress bar at the top (3 steps).

### Onboarding Screen 1: "How do you get paid?"

Header: "Let's understand your income"
Subheader: "This helps your Co-Pilot adapt to your financial rhythm."

Show two large selectable cards side by side:

**Card A: "Steady paycheque"**
- Icon: Calendar with recurring arrows (or a simple steady line chart icon)
- Description: "Salary, regular bi-weekly or monthly pay"
- Subtext: "I get paid the same amount on a predictable schedule"

**Card B: "Variable / freelance income"**
- Icon: Wavy line chart (showing peaks and valleys)
- Description: "Freelance, contract, creator, gig, or commission-based"
- Subtext: "My income changes month to month"

Selecting Card A loads Marcus's data throughout the app.
Selecting Card B loads Priya's data throughout the app.

The selected card gets a green border and checkmark. Then a "Continue →" button appears.

### Onboarding Screen 2: "Connect your accounts"

Header: "See your full financial picture"
Subheader: "The more accounts connected, the smarter your recommendations."

Show two connection methods stacked:

**Method A: Open Banking (Primary)**
A card with logos of 5 major Canadian banks in a row: TD, RBC, Scotiabank, CIBC, BMO (use text logos or simple styled text if images aren't available — "TD | RBC | Scotiabank | CIBC | BMO")
- Green "Connect securely →" button
- Below: "Read-only access. We never see your password."
- Small badge/tag: "🇨🇦 Consumer-Driven Banking Act — Launching 2026"
- When clicked: show a brief simulated modal:
  ```
  ┌─────────────────────────────────────────┐
  │  🔒 Authorize Wealthsimple              │
  │                                         │
  │  Allow read-only access to:             │
  │  ☑ Transaction history (24 months)      │
  │  ☑ Account balances                     │
  │  ☑ Recurring payment patterns           │
  │                                         │
  │  ☐ Payment initiation (coming 2027)     │
  │                                         │
  │  Your data is encrypted and you can     │
  │  revoke access at any time.             │
  │                                         │
  │  [Authorize]        [Cancel]            │
  └─────────────────────────────────────────┘
  ```
  After clicking "Authorize," show a green checkmark animation: "✓ 2 accounts connected (847 transactions imported)"

**Method B: Upload CSV (Fallback)**
Below the Open Banking card, show a smaller section:
- "Or upload bank statements manually"
- A dashed-border drop zone: "Drag CSV files here or browse"
- Subtext: "Supports TD, RBC, Scotiabank, CIBC, BMO statement formats"

Either method leads to the same result. Show a "Continue →" button after connection.

### Onboarding Screen 3: "Your registered accounts"

Header: "Help me track your contribution room"
Subheader: "I can see your Wealthsimple accounts automatically. For accounts at other banks, I need your help."

Show a form with the following fields, some pre-filled:

**Auto-detected (shown in green, read-only):**
- "✓ Wealthsimple TFSA — $28,400 balance, $2,800 contributed in 2026" (for Priya) or "$52,000 balance, $3,500 contributed" (for Marcus)
- "✓ Wealthsimple RRSP — $8,200 balance" (Priya) or "$41,000 balance" (Marcus)
- "✓ Wealthsimple FHSA — $16,000 balance" (Priya only; Marcus doesn't have one)

**User input needed (editable fields with helper text):**
- "Total TFSA contribution room remaining for 2026:" [text input, pre-filled: $4,200 for Priya / $3,500 for Marcus] — Helper: "Find this at CRA My Account → TFSA details"
- "Total RRSP contribution room for 2026:" [text input, pre-filled: $8,800 for Priya / $17,100 for Marcus] — Helper: "From your Notice of Assessment or CRA My Account"
- "Do you own a home?" [Toggle: Yes/No] — If No, show: "FHSA eligible ✓" / If Yes, show: "FHSA: Not eligible (homeowners)"
- "Province:" [Dropdown, pre-selected: Ontario for Priya / Alberta for Marcus]
- "Emergency fund target:" [Auto-calculated, editable: "$12,600 (3 months × your average expenses)" for Priya / "$13,500" for Marcus]

Small info box at bottom with light blue background:
"ⓘ Why do I need this? I can see your Wealthsimple accounts, but TFSA and RRSP room is tracked by CRA across ALL your institutions. If you have accounts at other banks, your total room may be different from what I detect here. Over-contributing triggers a 1%/month penalty — I want to protect you from that."

"Launch Co-Pilot →" button (green, prominent)

### Transition to Dashboard
After clicking "Launch Co-Pilot," show a brief loading screen (1.5 seconds):
- Centered text: "Analyzing 847 transactions..."
- Below: animated progress steps appearing one by one:
  ✓ Categorizing transactions
  ✓ Detecting income patterns
  ✓ Identifying recurring obligations
  ✓ Calculating safe allocation
  → Generating your recommendation...
Then smoothly transition to the dashboard.

---

## PHASE 2: DASHBOARD

The dashboard is a scrollable single page with the following sections.

### Section 1: Top Header Bar with Persona Switcher
- Left: "Wealthsimple" wordmark in dark text
- Center: A segmented control / toggle to switch between:
  - **"Priya S. — UGC Creator"**
  - **"Marcus R. — Software Dev"**
  The currently active persona's tab is filled green. When toggling, ALL dashboard data animates to the other persona's numbers. This is a key demo feature showing the copilot adapts.
- Right: The active persona name, small avatar circle, and a pill badge:
  - Priya: "Variable Income" (yellow background)
  - Marcus: "Steady Income" (green background)

---

## PRIYA'S DASHBOARD DATA (Default)

Priya is a 28-year-old UGC creator and freelance content producer in Toronto, Ontario. Income from brand deals, UGC contracts, TikTok Creator Fund, YouTube AdSense. Highly variable.

### Section 2: Weekly Recommendation Card (THE HERO)
A large, prominent card with subtle shadow and rounded corners. This is the centerpiece.

**Card Header:**
"Weekly Check-In — March 1, 2026"
"Income Pattern: Variable (±38%)" with a 🟡 yellow dot
"Confidence: Medium" with ●●○ (2 of 3 dots filled)

**Card Body — three stacked subsections:**

**A) Income Summary**
- "Income this month (so far): $3,200"
- Small detail: "1 brand deal ($2,500) + TikTok Creator Fund ($420) + Canva template sales ($280)"
- "6-month range: $2,100 – $7,800"
- "Conservative estimate used: $3,800/mo (25th percentile)"
- Show a small bar chart or sparkline of last 6 months of income: [$2,100, $5,400, $3,200, $7,800, $4,600, $3,200] — the bars should be visually uneven, making the variability obvious

**B) Obligations (next 30 days)**
Clean list with amounts right-aligned:
- Rent .......................... $1,650 — Mar 5
- Phone ......................... $85 — Mar 10
- Adobe Creative Cloud .......... $73 — Mar 12
- Gym ........................... $55 — Mar 15
- Internet ...................... $65 — Mar 18
- ⚠️ Annual car insurance ....... $1,140 — Pattern: due ~April
  (holding $380 in buffer — 1/3 of expected amount)

Subtotal line: "Total: $1,928 + $380 reserve = $2,308"

**C) The Recommendation**
Large green number, prominently styled: **"$340 safe to allocate this week"**
Below in smaller muted text: "Range: $180 – $520 depending on remaining March income"

Allocation breakdown (each line is a row with icon + account + amount + reasoning):

1. 💚 **$200 → TFSA** — "$4,200 room remaining this year. At your income (~$62K), TFSA is preferred — you're mostly in the 14% federal bracket, so RRSP deduction saves less. TFSA gives tax-free flexibility for variable income."

2. 🛡️ **$140 → Emergency Fund** — "$5,400 of $12,600 target (43%). Building this buffer is critical for variable income — it protects your investments during lean creator months."

Muted info lines below:
- "ⓘ FHSA is maxed for 2026 ($8,000/$8,000). Next room available: January 1, 2027."
- "ⓘ Why not RRSP? At ~$62K, most income falls in the 14% bracket. RRSP deduction saves ~$98 per $700. TFSA flexibility is more valuable for unpredictable income."

**Action Buttons:**
- Primary green button: "Move $340 →"
  On click: modal appears:
  "Confirm Transfer — This is where you decide."
  "The AI recommends this allocation, but you're in control. In production, this initiates the transfer to your accounts."
  "Reason: Moving money is a human decision. The AI can't see life events, changing plans, or how you feel about risk this week."
  Two buttons: "Confirm" (green) and "Not right now" (gray)
- Secondary outline button: "Adjust amounts"
- Text link: "See full reasoning ↓"

### Section 3: "Ask Hive" — Conversational AI Bar
Positioned directly below the recommendation card. This is NOT a full chatbot — it's a focused question interface.

**Design:** A clean input field with a subtle border, placeholder text "Ask Hive anything about your money...", and a send arrow icon. Above the input, show 4 clickable chip/pill suggestions in a horizontal row.

**Priya's suggested chips:**
- "Can I afford new camera gear ($800)?"
- "How much did I spend on food this month?"
- "When should I start contributing to my RRSP?"
- "How much have I earned from brand deals this year?"

**When a chip is clicked, a response card appears below the input field with a subtle slide-in animation. Responses are pre-written and data-grounded — they reference Priya's actual numbers.**

**Response for "Can I afford new camera gear ($800)?":**
```
Looking at your current position: you have $4,850 in chequing,
$340 safe to allocate this week, and rent ($1,650) is due in 4 days.

Short answer: yes, but with a trade-off.

If you buy the gear now, your safe-to-allocate drops to $0 for
the next 2 weeks, and I'd recommend pausing your TFSA contribution
this period. Your emergency fund stays untouched at $5,400.

Alternatively: split it — $400 now, $400 after your next income
deposit. This keeps your TFSA contribution on track.

This is based on your current balances and conservative income
estimate. Not financial advice.
```

**Response for "How much did I spend on food this month?":**
```
In February, you spent $620 on Food & Dining — that's up 18%
from your 3-month average of $525.

Breakdown:
  Uber Eats: $186 (10 orders)
  Metro Grocery: $298 (4 trips)
  Restaurants: $136 (3 visits)

The Uber Eats spending is driving the increase. At your current
pace, you'd spend ~$680 in March. Cutting 3 Uber Eats orders
would save ~$55 and bring you back to your average.
```

**Response for "When should I start contributing to my RRSP?":**
```
Right now, your TFSA is the better priority — and here's why.

At ~$62K income, most of your earnings fall in the 14% federal
bracket. RRSP contributions only save you 14 cents per dollar at
this rate. TFSA gives you tax-free growth AND tax-free withdrawals
with no income restriction.

When to switch: if your income crosses ~$58,523 consistently
(the 20.5% bracket threshold), RRSP starts to become more
valuable. Based on your 6-month trend, you're close — if your
brand deal income keeps growing, we might revisit this by Q3.

For now: max your TFSA ($4,200 room left), maintain your
emergency fund, then consider RRSP with any surplus.
```

**Response for "How much have I earned from brand deals this year?":**
```
In 2026 so far (Jan 1 – Mar 1), your brand deal income totals
$8,400 across 4 deals:

  Sephora (Feb 20): $2,500
  Aritzia (Feb 3): $3,200
  Olay (Jan 18): $1,500
  Dyson (Jan 8): $1,200

Your TikTok Creator Fund added $2,100 and Canva template
sales added $840, bringing your total 2026 income to $11,340.

At this pace, you're trending toward ~$68K for the year —
which would push more of your income into the 20.5% bracket.
I'll flag if RRSP contributions become more advantageous.
```

**Marcus's suggested chips (shown when Marcus is selected):**
- "Am I on track to max my TFSA?"
- "Can I afford a $3,000 vacation in June?"
- "Should I increase my RRSP contributions?"
- "How much did I spend vs last month?"

**Response for "Am I on track to max my TFSA?" (Marcus):**
```
Yes — you're in great shape.

You've contributed $3,500 of your $7,000 limit this year.
At your current rate of $208/payday (every 2 weeks), you'll
contribute another $5,408 by December — more than enough.

You're on track to max your TFSA by June. After that, I'll
automatically redirect recommendations to your RRSP, where
you have $12,900 of room remaining.
```

**Response for "Can I afford a $3,000 vacation in June?" (Marcus):**
```
Yes, comfortably.

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

Want me to set up Option 2?
```

**Interaction details for Ask Hive:**
- Only one response is visible at a time. Clicking a new chip replaces the previous response.
- The input field is for display only in the prototype — typing and pressing enter shows a small toast: "In production, you can ask any question. This prototype demonstrates pre-loaded examples."
- Response cards have a subtle left border in green (#04C400) and slightly indented to feel like a reply.
- Small "Hive" label with a hexagon icon at the top-left of each response.
Triggered by "See full reasoning ↓". Smooth expand animation.

**The Calculation Chain (shown in a monospace-style box):**
```
Income (conservative, 25th percentile):      $3,800
− Fixed obligations (next 30 days):          −$1,928
− Annual insurance reserve (⅓ of $1,140):    −$380
− Variable spending (3-month avg):           −$940
  (dining $620, transit $280, misc $40)
− Buffer (25% of variable spending):         −$235
  (high buffer because income varies ±38%)
─────────────────────────────────────────────
Safe to allocate (monthly):                   $317
Adjusted for week 1 (income already received): ~$340
```

**"What I can't see" box (light yellow background):**
- Cash transactions not in your bank data
- Pending e-transfers not yet deposited
- Equipment or gear purchases you're planning
- Client invoices that might be late
- Life changes you haven't told me about
[Update my situation →] button

### Section 5: Registered Accounts Dashboard
Four cards in a horizontal row, equal width:

**TFSA:**
- Green progress bar: 40% filled
- "$2,800 / $7,000 contributed in 2026"
- "Room remaining: $4,200"
- "Balance: $28,400 invested"
- "At current pace: Max by September"

**FHSA:**
- Green progress bar: 100% filled, checkmark ✓
- "$8,000 / $8,000 — MAXED ✓"
- "Lifetime: $16,000 / $40,000"
- "Balance: $16,800 invested"
- "Next room: January 1, 2027"

**RRSP:**
- Light gray progress bar: ~23% filled
- "$2,000 / $8,800 room"
- "Room remaining: $6,800"
- "Balance: $8,200 invested"
- "ⓘ Lower priority at your tax bracket"

**Emergency Fund:**
- Yellow/amber progress bar: 43% filled
- "$5,400 / $12,600"
- "= 1.3 months of expenses"
- "Target: 3 months"
- "⚠️ Critical for variable income"

### Section 6: Spending Breakdown
Horizontal stacked bar chart (or clean donut chart) of past month:

- Housing: $1,650 (39%)
- Food & Dining: $620 (15%) — small red tag: "↑18% vs 3-month avg"
- Creator Tools: $340 (8%) — Adobe, Canva Pro, CapCut Pro, music licensing
- Transportation: $280 (7%)
- Shopping: $250 (6%)
- Entertainment: $180 (4%)
- Health & Fitness: $155 (4%)
- Subscriptions: $120 (3%)
- Other: $605 (14%)

### Section 7: Recent Transactions with Correction Interface
A table of 15 transactions. Columns: Date | Description | Amount | Category (colored pill) | Confidence (dot) | Edit (pencil icon)

Data:
```
Mar 1  | TikTok Creator Fund      | +$420    | Income          | 🟢 |
Feb 28 | Uber Eats                | -$38     | Food & Dining   | 🟢 |
Feb 27 | SHOPIFY*MISHMISH         | -$145    | Shopping?       | 🟡 |
Feb 26 | Spotify                  | -$11     | Subscriptions   | 🟢 |
Feb 25 | Metro Grocery            | -$87     | Food & Dining   | 🟢 |
Feb 24 | ETRNSFR FROM SARAH L     | +$800    | Income?         | 🟡 |
Feb 23 | Adobe Inc                | -$73     | Creator Tools   | 🟢 |
Feb 22 | TTC Presto               | -$42     | Transportation  | 🟢 |
Feb 21 | Amazon.ca                | -$156    | Shopping        | 🟢 |
Feb 20 | Brand Deal - Sephora     | +$2,500  | Income          | 🟢 |
Feb 18 | UBER                     | -$32     | Transportation  | 🟢 |
Feb 17 | GoodLife Fitness         | -$55     | Health          | 🟢 |
Feb 15 | CanvaPro                 | -$17     | Creator Tools   | 🟢 |
Feb 14 | Rent - Landlord ETRNSFR  | -$1,650  | Housing         | 🟢 |
Feb 12 | Netflix                  | -$17     | Subscriptions   | 🟢 |
```

The 🟡 yellow dot transactions should have a subtle highlight/different row background.

**Correction interaction:**
When clicking the edit pencil on any yellow-dot row, show an inline dropdown:
- Category options: Income, Housing, Food & Dining, Transportation, Creator Tools, Subscriptions, Shopping, Health, Entertainment, Business Expense, Transfer/Reimbursement, Other
- A toggle: "Always categorize [this merchant] as [selected category]"
- When user selects a new category and confirms:
  - The category pill updates with a smooth animation
  - The confidence dot changes from 🟡 to 🟢
  - A small toast/badge appears: "✓ Learned — future transactions from this merchant will be categorized automatically"

Specifically for the demo:
- "SHOPIFY*MISHMISH" should be corrected to "Business Expense" (this is inventory for her side brand)
- "ETRNSFR FROM SARAH L" should be corrected to "Transfer/Reimbursement" (roommate's rent split — NOT income)
- When "ETRNSFR FROM SARAH L" is corrected from "Income" to "Transfer/Reimbursement," show a subtle update notification: "ⓘ Recalculating... This changes your income estimate and safe-to-allocate amount." (In a real product, the recommendation would recalculate. In the prototype, just show the notification.)

### Section 8: "What If" Scenario Explorer
Title: "Scenario Explorer — What changes if..."

Two toggle cards side by side:

**Card A: "Income drops 30%"**
Toggle switch. When activated:
- The hero recommendation card above smoothly animates numbers changing:
  - Safe to allocate: $340 → $120
  - Range disappears, replaced with: "At 30% reduced income, I recommend caution"
  - Allocation changes: "$120 → Emergency Fund only"
  - A warning note appears: "At 30% lower income, I'd recommend pausing TFSA contributions and focusing entirely on emergency fund. Your 1.3-month buffer becomes critical."
  - The TFSA account card dims slightly with text: "Paused — rebuild buffer first"

**Card B: "Land the $4,500 Sephora brand deal"**
Toggle switch. When activated:
- Hero card animates:
  - Safe to allocate: $340 → $680
  - Range: "$580 – $820"
  - Allocation: "$400 → TFSA (on track to max by July!) + $280 → Emergency Fund"
  - A positive note: "With this additional income, you'd be ahead of pace on both TFSA and emergency fund goals."

Only one toggle can be active at a time (or neither). Toggling one off returns to the baseline recommendation.

### Section 9: Trust & Accuracy Footer
Clean, minimal section:

**"📊 Co-Pilot Accuracy — Last 90 Days"**
Three inline stats:
- "Categorization: 94.2% accurate (18 corrections / 312 transactions)"
- "Income prediction: ±11% (predicted $3,800, actuals $3,200 – $4,600)"
- "Missed obligations: 0"

**Prototype disclaimer (subtle, small text):**
"This prototype demonstrates an AI financial co-pilot for Wealthsimple. In production, data flows via Open Banking APIs (Consumer-Driven Banking Act, 2026) and Wealthsimple's internal account data. AI categorization and recommendations are generated by a fine-tuned model. Human confirmation is required for all money movement. This is not financial advice."

---

## MARCUS'S DASHBOARD DATA (loaded when "Steady paycheque" is selected in onboarding or when toggling to Marcus in the header)

Marcus R., 34, software developer in Calgary, Alberta. Salary $95,000/year, paid bi-weekly ($3,654 per paycheque after deductions). Owns a condo.

### Marcus's Recommendation Card (replaces Section 2)

**Card Header:**
"Payday Recommendation — March 1, 2026" (NOTE: "Payday" not "Weekly Check-In")
"Income Pattern: Steady (bi-weekly)" with a 🟢 green dot
"Confidence: High" with ●●● (3 of 3 dots filled)

**A) Income Summary**
- "Paycheque received: $3,654 (bi-weekly, after deductions)"
- NO income range shown (it's steady — no need)
- NO sparkline variance (show flat consistent bars all the same height — visual contrast with Priya's jagged bars)

**B) Obligations (next 14 days — shorter horizon than Priya's 30 days because next paycheque is predictable)**
- Mortgage: $1,450 — Mar 5
- Condo fees: $380 — Mar 5
- Phone: $95 — Mar 8
- Car payment: $420 — Mar 10
- Internet: $75 — Mar 12
Total: $2,420

**C) Recommendation**
Confident single number (NOT a range): **"$558 safe to allocate"**
No range displayed — steady income = high confidence.

Allocation:
1. 💚 **$350 → RRSP** — "At $95K income (20.5% federal + 10% Alberta), RRSP gives you ~$107 tax savings per $350 contributed. Strong benefit at your combined 30.5% marginal rate."
2. 💚 **$208 → TFSA** — "$3,500 room remaining. On track to max by June."

Muted info lines:
- "✓ Emergency fund fully funded ($14,200 / $13,500)"
- "ⓘ No FHSA — you own a home. Not eligible."
- "ⓘ At your income, RRSP has a slight edge over TFSA due to the combined 30.5% marginal rate. You save ~$305 in taxes per $1,000 contributed to RRSP."

**Tone difference from Priya:** Marcus's card feels confident and optimizing. No ranges. No caution language. The message is "You're in great shape — here's how to maximize your accounts."

### Marcus's Registered Accounts (replaces Section 4)

**TFSA:**
- Green bar: 50% filled
- "$3,500 / $7,000 in 2026"
- "Room: $3,500"
- "Balance: $52,000"
- "On track to max by June"

**FHSA:**
- Grayed out card, no progress bar
- "Not eligible — homeowner"
- Muted styling to show it's inactive

**RRSP:**
- Green bar: ~25% filled
- "$4,200 / $17,100 room"
- "Room: $12,900"
- "Balance: $41,000"
- "⭐ Best account for you — 30.5% marginal tax benefit"

**Emergency Fund:**
- Green bar: 100% filled with ✓
- "$14,200 / $13,500 — COMPLETE ✓"
- "Fully funded. Excess can be redirected to investments."

### Marcus's Spending Breakdown (replaces Section 5)
- Housing (mortgage + condo): $1,830 (41%)
- Food & Dining: $580 (13%)
- Transportation (car + gas): $520 (12%)
- Shopping: $320 (7%)
- Entertainment: $280 (6%)
- Utilities: $180 (4%)
- Subscriptions: $95 (2%)
- Other: $695 (15%)

### Marcus's Transactions (replaces Section 6)
```
Mar 1  | Employer - TechCorp     | +$3,654  | Income (Salary)  | 🟢 |
Feb 28 | Shell Gas Station       | -$62     | Transportation   | 🟢 |
Feb 27 | Amazon.ca               | -$89     | Shopping         | 🟢 |
Feb 26 | Save-On-Foods           | -$134    | Food & Dining    | 🟢 |
Feb 25 | Netflix                 | -$17     | Subscriptions    | 🟢 |
Feb 24 | ETRNSFR TO MOM          | -$500    | Transfer?        | 🟡 |
Feb 22 | Telus                   | -$95     | Phone            | 🟢 |
Feb 21 | Canadian Tire           | -$67     | Shopping         | 🟢 |
Feb 20 | Starbucks               | -$8      | Food & Dining    | 🟢 |
Feb 18 | Employer - TechCorp     | +$3,654  | Income (Salary)  | 🟢 |
Feb 17 | Costco                  | -$215    | Food & Dining    | 🟢 |
Feb 15 | Spotify                 | -$11     | Subscriptions    | 🟢 |
Feb 14 | Mortgage - CIBC         | -$1,450  | Housing          | 🟢 |
Feb 14 | Condo Corp              | -$380    | Housing          | 🟢 |
Feb 12 | Shaw Internet           | -$75     | Utilities        | 🟢 |
```

One yellow-dot: "ETRNSFR TO MOM" — $500 — "Transfer?" — demonstrates correction for steady-income users too.

### Marcus's Scenario Explorer (replaces Section 7)
**Card A: "Unexpected $2,000 expense (car repair)"**
- Safe to allocate: $558 → $180
- "After absorbing this expense, I'd recommend reducing this pay period's allocation. Your emergency fund covers this — want to draw from it instead of reducing investment?"

**Card B: "Annual bonus arrives ($8,000 after tax)"**
- Safe to allocate: $558 → $4,558 (one-time boost)
- "Big opportunity: $3,500 maxes your TFSA for the year. Remaining $1,058 to RRSP brings you to $5,258 / $17,100 room. Combined tax savings: ~$1,390."

---

## INTERACTION DETAILS

1. Onboarding screens transition with a smooth slide-left animation.
2. The loading screen (analyzing transactions) should have the steps appear one at a time with ~300ms delay between each, with checkmarks animating in.
3. The persona switcher in the dashboard header should trigger a smooth crossfade of all content.
4. The "See full reasoning" section should be a smooth expand/collapse with a rotating chevron icon.
5. The "What if" scenario toggles should animate the recommendation card numbers (counter-style animation, numbers tick up/down).
6. Transaction correction should feel snappy — click edit, pick category, see it update with a "✓ Learned" micro-animation.
7. The "Move $340 →" confirmation modal should dim the background and animate in from center.
8. Tooltips on hover: the "⚠️ Annual car insurance" line should show: "Pattern detected: $1,140 paid to Intact Insurance in April 2024 and April 2025. Holding $380 buffer (⅓ of expected amount) to prepare."
9. Income sparkline bars should be color-coded: bars above the conservative estimate in green, below in yellow.

## OVERALL FEEL
This should feel like a real fintech product — not a student project or wireframe. Clean, professional, data-rich but not cluttered. The recommendation card is the clear visual hero. Everything else supports the user's ability to TRUST the number and ACT on it.

The two personas demonstrate the core product insight: this copilot isn't one-size-fits-all. A UGC creator with variable income and a salaried developer get fundamentally different experiences — different cadences, different confidence levels, different tones, different account routing logic.

The key message: "AI handles the cognitive load of financial analysis. Humans retain the decision to act."
