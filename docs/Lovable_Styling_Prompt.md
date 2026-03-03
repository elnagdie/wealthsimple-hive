# LOVABLE STYLING PROMPT — Wealthsimple Hive Branding
# Use this AFTER your initial build, or prepend it to your main prompt
# ─────────────────────────────────────────────────────────────────────

## APP NAME
The product is called **"Hive"** — it lives inside Wealthsimple's ecosystem.
- In the header, display: **"wealthsimple"** (lowercase, as they brand it) followed by a thin vertical divider, then **"Hive"** in the same weight.
- Example: `wealthsimple | Hive`
- Below the wordmark in the header or on the onboarding splash, add a small subtitle: "Your AI financial co-pilot"

## WEALTHSIMPLE'S DESIGN PHILOSOPHY
Wealthsimple's brand is deliberately NOT like traditional banks. No icy blues, no corporate greens, no stock photos of suits. Their design is: warm, minimal, human, premium. Think "the Apple of finance." Tons of white space. Every element earns its place.

## COLOR PALETTE

**Primary colors:**
- Background: `#FFFFFF` (White) — dominant, used everywhere
- Text primary: `#32302F` (Dune — Wealthsimple's signature dark, almost-black warm charcoal) — all headings and body text
- Text secondary: `#6B6B6B` — muted labels, helper text, timestamps

**Accent colors (use sparingly — Wealthsimple is restrained with color):**
- Positive/Growth/CTA: `#04C400` — Wealthsimple's green for positive returns, active states, primary buttons. Slightly more saturated than typical fintech green.
- Warning/Attention: `#F2A93B` — warm amber/gold for warnings, variable income indicators, flagged items. Fits Wealthsimple's warm palette (they use yellows and warm reds, NOT cold blues).
- Negative/Alert: `#E5484D` — for negative returns, errors, critical warnings. Used very sparingly.
- Info/Neutral: `#F5F5F3` — very light warm gray for card backgrounds, section dividers, subtle containers. NOT pure gray — slightly warm.

**Surface colors:**
- Card background: `#FFFFFF` with a very subtle border `#E8E8E6` or slight shadow (`box-shadow: 0 1px 3px rgba(50,48,47,0.08)`)
- Page background: `#FAFAF8` — the slightest warm off-white, barely distinguishable from white but gives depth
- Hover states: `#F5F5F3`
- Selected/active state: green `#04C400` with 10% opacity background (`rgba(4,196,0,0.1)`)

## TYPOGRAPHY

**Font: Use "Inter" as the web-safe substitute.**
Wealthsimple uses Futura for marketing/headlines and a custom system font in-app. Inter is the closest free match for their clean, geometric app typography.

**Type scale:**
- Page title / Hero number: 36-42px, font-weight 600 (semibold). The "$340 safe to allocate" number should be BIG and confident.
- Section headers: 20-24px, font-weight 600
- Card headers: 16-18px, font-weight 600
- Body text: 14-15px, font-weight 400 (regular)
- Helper text / labels: 12-13px, font-weight 400, color `#6B6B6B`
- Monospace for calculations: Use `"SF Mono", "Fira Code", monospace` at 13px for the reasoning breakdown numbers

**Key typography rules:**
- Wealthsimple uses lowercase for their brand name: "wealthsimple" — always
- Headlines can be sentence case, never ALL CAPS
- Numbers should use tabular (monospaced) figures so dollar amounts align cleanly
- Use generous line height (1.5-1.6 for body, 1.2-1.3 for headlines)

## SPACING & LAYOUT

**Wealthsimple is generous with white space. When in doubt, add more padding.**

- Page max-width: 1080px (not 1200 — slightly narrower feels more premium)
- Page horizontal padding: 24-32px
- Section vertical spacing: 48-64px between major sections
- Card internal padding: 24-32px
- Between card elements: 16-20px
- Border radius on cards: 12-16px (Wealthsimple uses soft, modern rounded corners)
- Border radius on buttons: 8-12px
- Border radius on pills/badges: 999px (fully rounded)

## COMPONENT STYLING

**Primary button (CTA — "Move $340 →"):**
- Background: `#04C400`
- Text: `#FFFFFF`, font-weight 600
- Padding: 12px 24px
- Border-radius: 10px
- Hover: slightly darker green `#03A800`
- No shadow on buttons (Wealthsimple keeps them flat)

**Secondary button ("Adjust amounts"):**
- Background: transparent
- Border: 1.5px solid `#32302F`
- Text: `#32302F`, font-weight 500
- Same padding and radius as primary

**Text link ("See full reasoning ↓"):**
- Color: `#32302F` with underline
- Hover: `#04C400`
- No bold — keep it light

**Progress bars (account room trackers):**
- Track: `#F0F0EE` (light warm gray)
- Fill: `#04C400` (green) for normal progress
- Fill: `#F2A93B` (amber) for warning state (emergency fund below target)
- Fill: `#04C400` at 100% with a subtle checkmark icon for maxed accounts
- Height: 8px, border-radius: 4px

**Category pills (transaction table):**
- Background: `#F5F5F3`
- Text: `#32302F`
- Border-radius: 999px
- Padding: 4px 12px
- Font-size: 12px
- For yellow-flagged items: border `1.5px solid #F2A93B`

**Confidence dots:**
- Filled: `#04C400` (green for high), `#F2A93B` (amber for medium)
- Unfilled: `#E0E0DE`
- Size: 8px circles with 4px gap

**Tooltips:**
- Background: `#32302F`
- Text: `#FFFFFF`
- Border-radius: 8px
- Padding: 12px 16px
- Max-width: 280px
- Small arrow/caret pointing to trigger element
- Font-size: 13px

**Modals (confirmation dialog):**
- Centered, with backdrop blur/dim (`rgba(50,48,47,0.4)`)
- White background, border-radius: 16px
- Padding: 32px
- Max-width: 480px
- Animate in with slight scale-up (0.95 → 1.0) + fade

**Info boxes (the "What I can't see" box, the CRA explanation):**
- Background: `#FFF9ED` (very pale warm yellow) for warnings/info
- Border-left: 3px solid `#F2A93B`
- Border-radius: 8px
- Padding: 16px 20px

## ANIMATIONS & MICRO-INTERACTIONS

Wealthsimple's app uses smooth, restrained animations. Nothing flashy.

- Page transitions: 300ms ease-out slide or fade
- Expand/collapse: 250ms ease-in-out height transition
- Number counter (for "What if" scenarios): 400ms ease-out, numbers tick up/down
- Toast notifications ("✓ Learned"): slide in from top-right, auto-dismiss after 3 seconds
- Progress step animation (loading screen): 300ms stagger between each step appearing
- Card hover: subtle 1px shadow increase, no scale change
- Button press: slight opacity reduction (0.9) on click, no bounce

## ICONS

Use Lucide icons (available in React via `lucide-react`) — they match Wealthsimple's clean, thin line-icon style.

Suggested icons:
- Calendar (for steady income)
- TrendingUp / Activity (for variable income)
- Shield (for emergency fund)
- Lock (for Open Banking consent)
- ChevronDown (for expandable sections)
- Pencil / Edit2 (for transaction correction)
- Check / CheckCircle (for confirmations)
- AlertTriangle (for warnings)
- Info (for info tooltips)
- ArrowRight (for CTAs)

## WHAT TO AVOID

- ❌ No gradients (Wealthsimple doesn't use them)
- ❌ No drop shadows heavier than `0 1px 3px rgba(50,48,47,0.08)`
- ❌ No blue anywhere (that's traditional bank territory — Wealthsimple deliberately avoids it)
- ❌ No stock photos or illustrations
- ❌ No ALL CAPS text
- ❌ No border-radius greater than 16px on cards (keep it modern but not bubbly)
- ❌ No bright/neon colors
- ❌ No dense layouts — if it feels cramped, add more padding
- ❌ No emoji in the actual UI (use icons instead). The 🟢🟡 dots in the spec are for implementation reference only — render them as styled CSS circles.

## OVERALL IMPRESSION

When someone looks at this prototype, they should think: "This looks like it could actually be a Wealthsimple feature." It should feel native to the ecosystem — not like a separate app bolted on. The warm charcoal + white + sparse green palette, generous spacing, and clean typography should make it feel premium, trustworthy, and simple.

The design should communicate: "Your money is in good hands. We've done the thinking so you don't have to."
