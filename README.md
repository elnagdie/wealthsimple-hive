# Hive - AI Financial Co-Pilot

**Live Demo:** [wealthsimple-hive.lovable.app](https://wealthsimple-hive.lovable.app/)

This project is a submission for the [Wealthsimple AI Builder](https://www.wealthsimple.com/en-ca/careers/ai-builders) role.

---

## What is Hive?

Hive is an AI-powered financial co-pilot that answers the question every Canadian has: **"Can I afford to invest more right now?"**

It analyzes a user's complete financial picture — income patterns, recurring bills, spending habits, and account balances — then delivers specific, reasoned weekly recommendations on what's safe to spend, save, and invest.

### The Problem

59% of Canadians don't maintain a household budget. For the 29% of knowledge workers earning variable income (freelancers, gig workers, contract employees), traditional budgeting tools are fundamentally broken — they assume a steady paycheque.

Wealthsimple's existing "Automate Your Pay" feature lets users auto-invest a fixed amount each payday, but it has no awareness of whether the user can actually afford that transfer. It doesn't know about upcoming bills. It doesn't adjust for variable income.

### The Solution

Hive fills that gap. With Canada's Open Banking framework launching in 2026, Hive leverages cross-institution transaction data to:

- **Categorize transactions** automatically with AI, replacing manual spreadsheet work
- **Detect income patterns** — steady, variable, or seasonal — with confidence intervals
- **Surface upcoming obligations** including annual and quarterly payments users typically forget
- **Recommend weekly allocations** across spending, saving, and investing with transparent reasoning
- **Explore "what-if" scenarios** so users can see how different choices affect their financial trajectory

## Features

- **Smart Dashboard** — Account overview, spending breakdown, and AI-driven recommendations at a glance
- **Ask Hive** — Conversational AI interface for financial questions
- **Reasoning Panel** — Transparent explanations behind every recommendation
- **Scenario Explorer** — Model different financial decisions before committing
- **Guided Onboarding** — Connects accounts and learns financial context in minutes

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- Recharts (data visualization)
- Framer Motion (animations)

## Getting Started

Requires Node.js and npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
git clone <repo-url>
cd wealthsimple-hive
npm install
npm run dev
```

## Documentation

Detailed project docs are in the [`docs/`](./docs/) folder:

- **PRD_AI_Financial_CoPilot.md** — Full product requirements document
- **wealthsimple_ai_builder_research.md** — Research on Wealthsimple's current landscape and gaps
- **Lovable_Prompt_AI_CoPilot.md** — AI prompting strategy
- **Lovable_Styling_Prompt.md** — Design and styling guidelines

## Author

**Esraa Elnagdi**
