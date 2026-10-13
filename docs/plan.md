# Implementation Plan (plan.md)
*Project: Pinkie Birthday Multi-Year Architecture & 2026 Editorial Redesign*

---

## 1. Overview & Execution Strategy
We execute in strict sequential phases with self-verification at each checkpoint. No breaking changes to existing 2025 code; zero AI-slop in 2026 implementation; validated end-to-end via Playwright CLI.

---

## 2. Phases & Tasks Breakdown

### Phase 1: Tooling, Skills & Design Environment Initialization (✅ Completed)
- **Files**: `package.json`, `.gitignore`, `.agents/skills/`, `docs/README.md`, `eslint.config.mjs`
- **Actions**:
  1. Install `@playwright/cli` as devDependency for terminal-driven browser inspection. (Done)
  2. Install design skills via `npx.cmd skills add Leonxlnx/taste-skill` and `npx.cmd skills add pbakaus/impeccable`. (Done)
  3. Install browser binaries and agent skills via `npx.cmd playwright-cli install --skills`. (Done)
  4. Ensure instructions for external agent sessions are up-to-date in `docs/README.md`. (Done)
  5. Verify initial baseline: `npm.cmd run type-check`, `npm.cmd run lint`, and `npm.cmd run build` pass cleanly. (Done)

### Phase 2: Route Archival for 2025 (`/2025`)
- **Files**:
  - `src/app/2025/page.tsx`
  - `src/app/data/photos.ts` (preserve)
- **Actions**:
  1. Create `src/app/2025/page.tsx` containing the complete 2025 celebration flow (`Introduction`, `StoryGallery`, `LetterSection`).
  2. Verify that `/2025` runs with exact visual and interactive fidelity.

### Phase 3: Global Navigation & Design System Grounding
- **Files**:
  - `src/app/components/navigation/YearSwitcher.tsx`
  - `src/app/layout.tsx`
  - `DESIGN.md` (reference tokens)
- **Actions**:
  1. Implement frosted glass `YearSwitcher` floating pill (`2025 Archive` <-> `2026 Celebrating`).
  2. Mount `YearSwitcher` in `layout.tsx` so both `/`, `/2025`, and `/2026` have seamless year switching.

### Phase 4: 2026 Data Scaffolding & Fallback Schemas
- **Files**:
  - `src/app/data/2026/restaurants.ts`
  - `src/app/data/2026/categories.ts`
  - `src/app/data/2026/memories.ts`
- **Actions**:
  1. Create mock curated romantic restaurant data (cuisine tags, high-quality Unsplash food imagery, ratings, coordinates).
  2. Create categories and mock memory cards.

### Phase 5: 2026 Interactive Introduction & Date Invitation
- **Files**:
  - `src/app/components/2026/HeroIntroduction.tsx`
  - `src/app/components/2026/AnimatedEnvelope.tsx`
  - `src/app/components/2026/PlayfulDecision.tsx`
  - `src/app/components/2026/DatePlannerModal.tsx`
  - `src/app/components/2026/CalendarPicker.tsx`
  - `src/app/components/2026/LocationSearch.tsx`
  - `src/app/components/2026/RestaurantShowcase.tsx`
- **Actions**:
  1. Build origami `AnimatedEnvelope` with seal click to reveal letter.
  2. Build `PlayfulDecision` with runaway "No" button (random coordinate dodge on hover/touch) and growing "Yes" button.
  3. Build `DatePlannerModal` with calendar day picker, Google Maps Places search (with graceful local fallback), category filter, and curated restaurant cards.
  4. Build smooth transition trigger upon plan confirmation.

### Phase 6: 2026 Root Experience & Canonical Route
- **Files**:
  - `src/app/page.tsx`
  - `src/app/2026/page.tsx`
  - `src/app/components/2026/EditorialGallery.tsx`
- **Actions**:
  1. Connect `HeroIntroduction` and `EditorialGallery` on `src/app/page.tsx`.
  2. Create canonical `src/app/2026/page.tsx` delegating to the 2026 experience.

### Phase 7: Verification & Playwright Browser Audit
- **Commands**:
  1. `npm.cmd run type-check` (0 errors)
  2. `npm.cmd run lint` (0 warnings/errors)
  3. `npm.cmd run build` (Clean build)
  4. Run browser audit via Playwright CLI:
     - Open `/` and `/2025`
     - Snapshot mobile (390px) and desktop (1440px)
     - Test "No" button dodging and "Yes" modal activation.

---

## 3. Risk Mitigation & Guardrails
- **Risk 1: Google Maps API key absent in dev**:
  - *Mitigation*: Graceful local search fallback with pre-populated spots, ensuring zero runtime crashes.
- **Risk 2: Runaway button flying out of mobile viewport**:
  - *Mitigation*: Mathematical clamp against dynamic container bounds with 20px padding margins.
- **Risk 3: 2025 regressions**:
  - *Mitigation*: 2025 route remains completely decoupled; validated before and after changes.
