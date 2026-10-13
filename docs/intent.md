# Intent: Pinkie Birthday Multi-Year Evolution (2026 Redesign & Architecture)

## 1. Problem Statement
The current pinkie-birthday website was built for the 2025 birthday celebration as a single landing page (`/`). With the 2026 birthday approaching:
- The 2025 celebration website assets, photo galleries, eras, and letters must be cleanly preserved without regression by archiving them into `/2025`.
- The root page `/` will directly host the new 2026 celebration experience, accompanied by a subtle persistent header/drawer year switcher providing seamless navigation to `/2025` (and future years). `/2026` can also alias or route to the 2026 experience.
- The 2026 design will feature an **Editorial Memory Book** aesthetic: magazine/storybook typography, high-contrast editorial photo grids, warm delicate pink accents, and refined spring transitions.
- The frontend will actively eliminate generic "AI slop" by integrating design systems and methodologies from `pbakaus/impeccable`, `Leonxlnx/taste-skill`, and `VoltAgent/awesome-design-md`, verified continuously in the browser using Microsoft `@playwright/cli`.

## 2. Design Elevation & Tooling Integration
Across all SDLC phases (Intent ➔ Spec ➔ Plan ➔ Build ➔ Verify), we integrate four specific tools and repositories:

### A. `pbakaus/impeccable` (Design Discipline & Anti-Patterns)
- **Repo-level `DESIGN.md` & `PRODUCT.md`**: Persist intentional design tokens, typography rules, and user empathy so the agent maintains visual consistency.
- **Anti-Pattern Guard**: Enforce rules against generic AI styling (avoid uniform border radiuses, arbitrary padding, clashing drop-shadows, and unstyled form controls).

### B. `Leonxlnx/taste-skill` (Aesthetic Dial Tuning)
- **Design Variance (Level 8/10)**: Break away from generic symmetrical card-in-card containers. Introduce editorial asymmetry, overlapping layers, tactile textures, and bespoke layout rhythms.
- **Motion Intensity (Level 7/10)**: Physics-based spring animations via Framer Motion for organic tactile feel (e.g., dodging button physics, unfolding letter origami, gentle parallax).
- **Visual Density (Level 5/10 - Editorial Breathing Room)**: Generous whitespace, elegant serif headlines paired with modern geometric sans body text.

### C. `VoltAgent/awesome-design-md` (Standardized System Specifications)
- Structure design tokens into formal sections: *Visual Theme & Atmosphere*, *Color Palette & Semantic Roles*, *Typography Hierarchy*, *Component Recipes*, and *Animation Timings*.

### D. `microsoft/playwright-cli` (Live In-Browser Verification & Debugging)
- Used by the agent to launch, inspect, interact with, and screenshot UI components directly in browser viewports (mobile 390px + desktop 1440px).
- Verify interactive behaviors: runaway "No" button dodging physics, date picker accessibility, Google Maps location search UX, and responsiveness.

## 3. Confirmed Architecture & Flow Decisions
1. **Routing Architecture**:
   - `/`: Direct 2026 birthday celebration experience.
   - `/2026`: Canonical alias route.
   - `/2025`: Isolated archive route with 100% visual and functional fidelity to original 2025 experience.
   - Global Navigation: Floating Year Switcher pill linking 2025 and 2026.
2. **2026 Introduction & Interactive Birthday Date Invitation**:
   - **Step A: Animated Letter**: Origami envelope opening with typewriter reveal inviting her out for her birthday.
   - **Step B: Playful Decision Game**:
     - "Yes" and "No" choices.
     - "No" button actively dodges/flees randomly on hover or touch contact across viewport safe boundaries.
     - "Yes" button dynamically swells in size with each evasion to capture delight and focus.
   - **Step C: Post-Yes Celebration & Date Planner**:
     - Heartfelt "Thank you!" affirmation animation.
     - Calendar & Day picker UI for selecting date and time.
     - Location Selection Suite:
       - Searchable Google Maps Places API input for custom destinations.
       - Food category tags (e.g. Japanese, French, Dessert, Candlelight).
       - Pre-curated restaurant showcase with high-res imagery, vibe tags, and 1-tap select.
   - **Step D: Section Unlocking / Transition Bridge**:
     - Once confirmed, seamlessly unfolds the next chapter (Editorial Photo Gallery & Memories).
3. **Asset Pipeline**:
   - Preserve 2025 assets under `public/img/{childhood,ams,ftu,uk}/`.
   - Scaffold 2026 structure under `public/img/2026/` with multi-year photo generator script.

## 4. Verification & Constraints
- Zero regressions on archived 2025 site.
- Verification Gates: `npm.cmd run type-check`, `npm.cmd run lint`, `npm.cmd run build`.
- In-browser verification with `@playwright/cli` screenshots and interaction loops.
