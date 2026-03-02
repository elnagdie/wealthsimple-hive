

# Wealthsimple Hive -- Brand Styling Overhaul

## Summary
Restyle the entire app to match Wealthsimple's actual design language: warm charcoal (#32302F), white backgrounds, sparse green (#04C400), warm amber (#F2A93B), Inter font, generous white space, and no blue anywhere.

## Changes

### 1. CSS Variables (`src/index.css`)
Replace the entire color system with Wealthsimple-accurate HSL values:
- **Background**: #FAFAF8 (warm off-white) for page, #FFFFFF for cards
- **Foreground**: #32302F (Dune -- warm charcoal)
- **Muted text**: #6B6B6B
- **Primary (green)**: #04C400 for CTAs, progress, positive states
- **Warning**: #F2A93B (warm amber)
- **Destructive**: #E5484D
- **Card border**: #E8E8E6
- **Surface/hover**: #F5F5F3
- **Border radius**: 12px (currently 0)
- **Shadows**: max `0 1px 3px rgba(50,48,47,0.08)` -- very subtle
- Remove the dark theme (Wealthsimple doesn't use one in-app)
- Remove DM Sans and Crimson Pro font imports, keep only Inter
- Remove info blue variables (no blue allowed)

### 2. Tailwind Config (`tailwind.config.ts`)
- Update `fontFamily.sans` to Inter-first
- Remove serif font family
- Update `fontFamily.mono` to `'SF Mono', 'Fira Code', monospace`
- Max-width changes from 1200px to 1080px in component usage

### 3. Header (`src/components/dashboard/HeaderBar.tsx`)
- Change wordmark to: `wealthsimple` (lowercase) + thin vertical divider + `Hive`
- Keep subtitle "Your AI financial co-pilot."
- Update persona toggle styling: active tab uses green (#04C400) instead of current dark primary
- Update page max-width from 1200px to 1080px

### 4. Dashboard Layout (`src/pages/Dashboard.tsx`)
- Change max-width from 1200px to 1080px
- Increase section spacing from `space-y-8` to `space-y-12` (48-64px)
- Background: use the warm off-white page background

### 5. Onboarding (`src/pages/Onboarding.tsx` + sub-components)
- All buttons: green (#04C400) background, white text, border-radius 10px
- Selected card: green border, green checkmark (not dark primary)
- Progress bar: green fill
- Info box in RegisteredAccounts: warm yellow background (#FFF9ED) with amber left border instead of blue
- Modal backdrop: `rgba(50,48,47,0.4)` with slight blur
- Secondary buttons: transparent with `1.5px solid #32302F` border

### 6. Recommendation Card (`src/components/dashboard/RecommendationCard.tsx`)
- Hero number "$340 safe to allocate": 36-42px, font-weight 600
- Green accent background on recommendation section: `rgba(4,196,0,0.1)`
- Buttons: primary green, secondary outline with charcoal border
- Income sparkline bars: green above conservative estimate, amber below
- Confidence dots: green filled, light gray unfilled (#E0E0DE)
- Card: white background, subtle border #E8E8E6, border-radius 12-16px

### 7. Ask Hive (`src/components/dashboard/AskHive.tsx`)
- Response card left border: green #04C400 (already has `border-l-primary`, just need primary to be green)
- Chips: #F5F5F3 background, #32302F text, fully rounded, amber border when flagged

### 8. Reasoning Panel (`src/components/dashboard/ReasoningPanel.tsx`)
- "What I can't see" box: #FFF9ED background, 3px left border in #F2A93B
- Monospace text: SF Mono / Fira Code at 13px
- Link color: #32302F with underline, hover green

### 9. Account Cards (`src/components/dashboard/AccountCards.tsx`)
- Progress bar track: #F0F0EE, fill: #04C400 green
- Emergency fund below target: amber fill
- Card border-radius: 12px, border: #E8E8E6
- White card backgrounds

### 10. Transaction Table (`src/components/dashboard/TransactionTable.tsx`)
- Category pills: #F5F5F3 background, #32302F text, fully rounded, 4px 12px padding
- Flagged items: 1.5px solid #F2A93B border on pill
- Confidence dots: 8px circles, green filled, #E0E0DE unfilled
- Positive amounts: green (#04C400)
- Yellow-flagged rows: very subtle warm highlight

### 11. Spending Breakdown (`src/components/dashboard/SpendingBreakdown.tsx`)
- Update color palette to use warm, Wealthsimple-compatible colors (no blue)
- Stacked bar border-radius: 8px

### 12. Scenario Explorer (`src/components/dashboard/ScenarioExplorer.tsx`)
- Toggle switch: green when active
- Active card border: green for positive, amber for negative
- Card border-radius: 12px

### 13. Trust Footer (`src/components/dashboard/TrustFooter.tsx`)
- Remove emoji from heading (use icon or plain text)
- Card styling consistent with new design

### 14. Loading Transition (`src/components/onboarding/LoadingTransition.tsx`)
- Spinner and checkmarks: green (#04C400)

## Technical Approach
The bulk of the change is updating CSS variables in `index.css` -- this propagates through all `hsl(var(--xxx))` references automatically. Component-specific inline classes (like `bg-primary/5`, `text-primary`) will automatically pick up the new green. A few components need direct class changes for things like border-radius, spacing, font sizing, and removing blue-tinted colors.

## Files Modified (15 files)
1. `src/index.css` -- complete variable overhaul
2. `tailwind.config.ts` -- font families, remove serif
3. `src/components/dashboard/HeaderBar.tsx` -- wordmark, max-width
4. `src/pages/Dashboard.tsx` -- max-width, spacing
5. `src/pages/Onboarding.tsx` -- max-width
6. `src/components/onboarding/IncomeSelection.tsx` -- button/card styling
7. `src/components/onboarding/ConnectAccounts.tsx` -- modal, button styling
8. `src/components/onboarding/RegisteredAccounts.tsx` -- info box color
9. `src/components/onboarding/LoadingTransition.tsx` -- green accents
10. `src/components/dashboard/RecommendationCard.tsx` -- hero number size, colors
11. `src/components/dashboard/AskHive.tsx` -- response styling
12. `src/components/dashboard/ReasoningPanel.tsx` -- warning box colors
13. `src/components/dashboard/AccountCards.tsx` -- progress bars
14. `src/components/dashboard/TransactionTable.tsx` -- pills, dots
15. `src/components/dashboard/SpendingBreakdown.tsx` -- chart colors
16. `src/components/dashboard/ScenarioExplorer.tsx` -- toggle colors
17. `src/components/dashboard/TrustFooter.tsx` -- remove emoji

