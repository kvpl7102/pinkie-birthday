# Pinkie Birthday: Agent Planning & Architecture Artifacts (`docs/`)

This directory maintains persistent AI-Native SDLC artifacts, design system specifications, and environment setup instructions for the Pinkie Birthday multi-year web application, enabling agent sessions across different machines to seamlessly resume and track project progress.

---

## 1. Quick-Start Guide for Other Agent Sessions / Machines

When checking out or pulling this repository in a new environment, follow these steps to install the required tools, skills, and dependencies:

### A. Install Node Dependencies
```bash
# Windows (PowerShell / CMD)
npm.cmd install

# macOS / Linux
npm install
```

### B. Setup Playwright CLI & Browser Harness
Playwright CLI is configured in `devDependencies` (`@playwright/cli`). To set up browser binaries and agent skills:
```bash
# Windows (PowerShell / CMD)
npx.cmd playwright-cli install --skills

# macOS / Linux
npx playwright-cli install --skills
```
*Note: If no browser is installed, install Chromium via `npx playwright install chromium`.*

### C. Install Design & Anti-Slop Agent Skills
Install the required frontend design skills into `.agents/skills`:
```bash
# Windows (PowerShell / CMD)
npx.cmd skills add Leonxlnx/taste-skill -y
npx.cmd skills add pbakaus/impeccable -y

# macOS / Linux
npx skills add Leonxlnx/taste-skill -y
npx skills add pbakaus/impeccable -y
```
To verify the installed skills list:
```bash
# Windows
npx.cmd skills list

# macOS / Linux
npx skills list
```

### D. Run Baseline Verification Gate
Ensure zero TypeScript errors, clean linting, and successful Next.js build:
```bash
# Windows
npm.cmd run type-check
npm.cmd run lint
npm.cmd run build

# macOS / Linux
npm run type-check
npm run lint
npm run build
```

---

## 2. Artifact Index

| Artifact | File | Purpose | Status |
| :--- | :--- | :--- | :--- |
| **Intent** | [`intent.md`](./intent.md) | Problem statement, user requirements, aesthetic direction, confirmed architectural decisions, toolchain specs. | ✅ Locked |
| **Design System** | [`DESIGN.md`](./DESIGN.md) | Anti-slop rules, design dials (`variance: 8`, `motion: 7`, `density: 5`), color tokens, typography scale, component recipes. | ✅ Locked |
| **Specification** | [`spec.md`](./spec.md) | Route layout, component tree, invitation state machine, physics clamping formulas, API contracts. | ✅ Locked |
| **Implementation Plan** | [`plan.md`](./plan.md) | 7-phase step-by-step roadmap with risks, mitigations, and verification commands. | 🟡 Phase 1 Complete; Ready for Phase 2 |

---

## 3. High-Level Architectural Summary
- **Routing Structure**:
  - `/`: Serves the primary 2026 celebration experience (Editorial Memory Book theme).
  - `/2026`: Canonical route / alias for the 2026 celebration.
  - `/2025`: Isolated archive route preserving the complete original 2025 experience without regression.
  - Floating Year Switcher: Frosted glass pill allowing 1-tap switching between 2025 and 2026.
- **2026 Interactive Intro**:
  - Animated origami letter with seal click.
  - Runaway "No" button (random evasion physics) + dynamic scaling "Yes" button.
  - Post-Yes Date Planner: Day/time calendar picker, Google Maps Places search (with local fallback), food category filter chips, and pre-curated restaurant showcase.
- **Design Quality & Verification**:
  - Zero AI-slop: High design variance, spring motion dampening, editorial typography, subtle blush/champagne palette.
  - Continuously audited with Playwright CLI screenshots across mobile (`390x844`) and desktop (`1440x900`).

---

## 4. Current Milestone & Next Action
- **Completed**:
  - ✅ AI-Native SDLC planning chain locked (`intent.md`, `DESIGN.md`, `spec.md`, `plan.md`).
  - ✅ Phase 1: Environment & tooling setup (`@playwright/cli`, `taste-skill`, `impeccable`, ESLint flat config, verification baseline passed).
- **Next Milestone**: **Phase 2** in [`plan.md`](./plan.md) (Isolate original 2025 celebration into `/2025` route and verify zero regressions).
