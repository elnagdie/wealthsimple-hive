

# Add "Ask Hive" Conversational AI Bar

## What's New
The existing prototype is missing **Section 3: "Ask Hive"** -- a focused question interface positioned directly below the Recommendation Card. This is NOT a full chatbot; it's a pre-loaded Q&A bar with clickable chip suggestions and data-grounded responses.

## Component: `AskHive`

### Layout
- Clean input field with placeholder "Ask Hive anything about your money..." and a send arrow icon
- 4 clickable chip/pill suggestions in a horizontal row above or below the input
- Response card appears below with slide-in animation when a chip is clicked

### Chip Suggestions (per persona)

**Priya:**
1. "Can I afford new camera gear ($800)?"
2. "How much did I spend on food this month?"
3. "When should I start contributing to my RRSP?"
4. "How much have I earned from brand deals this year?"

**Marcus:**
1. "Am I on track to max my TFSA?"
2. "Can I afford a $3,000 vacation in June?"
3. "Should I increase my RRSP contributions?"
4. "How much did I spend vs last month?"

### Response Cards
- Pre-written, multi-paragraph responses referencing the persona's actual financial data
- Green left border (#04C400), slightly indented
- Small "Hive" label with hexagon icon at top-left
- Only one response visible at a time (clicking a new chip replaces the previous)
- Typing in the input and pressing Enter shows a toast: "In production, you can ask any question. This prototype demonstrates pre-loaded examples."

### Interaction Details
- Slide-in animation for response cards
- Chips highlight when their response is active
- Responses use monospace for number breakdowns where appropriate

## Changes Required

### 1. Update `PersonaData` type and data (`src/data/personas.ts`)
Add a new field `askHiveChips` containing an array of `{ question: string; response: string }` objects -- 4 per persona with the full pre-written responses from the spec.

### 2. Create `src/components/dashboard/AskHive.tsx`
New component that:
- Renders the input field (display-only, shows toast on Enter)
- Renders 4 chip buttons from `data.askHiveChips`
- Manages state for which chip is selected
- Renders the response card with animation
- Includes the Hive hexagon branding on responses

### 3. Update `src/pages/Dashboard.tsx`
Insert `<AskHive data={data} />` between `<RecommendationCard>` and `<ReasoningPanel>` in the dashboard layout.

