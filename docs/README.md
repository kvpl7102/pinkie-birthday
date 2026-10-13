# Pinkie Birthday: Agent Planning & Architecture Artifacts (`docs/`)

This directory maintains the persistent AI-Native SDLC artifacts and design systems for the Pinkie Birthday multi-year web application, enabling agent sessions across different environments to seamlessly resume and track project progress.

## Artifact Index

| Artifact | File | Purpose | Status |
| :--- | :--- | :--- | :--- |
| **Intent** | [`intent.md`](./intent.md) | Problem statement, user requirements, aesthetic direction, confirmed architectural decisions, toolchain specs. | ✅ Locked |
| **Design System** | [`DESIGN.md`](./DESIGN.md) | Anti-slop rules, design dials (`variance: 8`, `motion: 7`, `density: 5`), color tokens, typography scale, component recipes. | ✅ Locked |
| **Specification** | [`spec.md`](./spec.md) | Route layout, component tree, invitation state machine, physics clamping formulas, API contracts. | ✅ Locked |
| **Implementation Plan** | [`plan.md`](./plan.md) | 7-phase step-by-step roadmap with risks, mitigations, and verification commands. | 🟡 Ready for Phase 1 |

## Current Milestone & Next Action
- **Completed**: AI-Native SDLC planning chain (`intent.md` ➔ `DESIGN.md` ➔ `spec.md` ➔ `plan.md`).
- **Immediate Next Step**: Execute **Phase 1** in [`plan.md`](./plan.md):
  1. Install `@playwright/cli` as devDependency.
  2. Install design skills (`taste-skill`, `impeccable`).
  3. Pull reference design archetypes from `voltagent/awesome-design-md`.
  4. Run baseline verification (`npm.cmd run type-check`, `npm.cmd run build`).
