# DESIGN SYSTEM SPECIFICATION (DESIGN.md)
*Synthesized from `pbakaus/impeccable`, `Leonxlnx/taste-skill`, and `VoltAgent/awesome-design-md`*

---

## 1. Aesthetic Direction & Theme
- **Theme**: Editorial Memory Book & Warm Romantic Keepsake
- **Mood**: Tender, high-craft, whimsical, intimate, non-commercial
- **Tone**: A tactile love letter meets an art magazine editorial

### Taste-Skill Dial Configurations
```yaml
DESIGN_VARIANCE: 8      # High layout asymmetry, dynamic multi-column & overlapping elements
MOTION_INTENSITY: 7     # Fluid Framer Motion springs, interactive physics, origami unfolding
VISUAL_DENSITY: 5       # Balanced editorial white-space, breathing room for imagery & typography
```

---

## 2. Anti-AI-Slop Manifesto (Guardrails)
1. **No Default Gradients**: Ban generic violet-to-cyan or purple-to-pink linear gradients. Use authentic subtle tones (warm champagne `#FDF8F5`, dusty rose `#F2BAC9`, muted blush `#F9EBEA`, deep plum/charcoal ink `#2C1A24`).
2. **No Monotonous 3-Card Grids**: Prohibit three identical centered boxes. Use magazine-style asymmetric spreads, varying photo ratios (3:4 portrait, 16:9 cinematic, 1:1 polaroid).
3. **Typography Contrast**: Avoid generic unstyled sans-serif fonts. Pair an expressive editorial serif for headings/quotes with a legible, crisp sans-serif for interactive controls.
4. **Natural Physics**: Avoid robotic linear CSS transitions (`ease-in-out 0.3s`). All motion uses Framer Motion spring dampening (`type: "spring", stiffness: 300, damping: 20`).
5. **Tactile Interaction**: Subtle grain overlay, soft drop shadows (`rgba(142, 68, 85, 0.08)`), letter seals, stamp borders, and organic button response states.

---

## 3. Color Tokens & Semantic Roles
```css
:root {
  /* Surfaces & Backgrounds */
  --bg-primary: #FCF8F7;        /* Soft warm paper */
  --bg-secondary: #F8EFF0;      /* Gentle blush tinted canvas */
  --bg-card: #FFFFFF;           /* Crisp card surface */
  --bg-glass: rgba(255, 255, 255, 0.78); /* Frosted blur backdrop */

  /* Text & Inks */
  --text-main: #2C1820;         /* Deep espresso ink */
  --text-muted: #7A5C67;        /* Muted plum heather */
  --text-accent: #C24D6F;       /* Warm rose accent */
  --text-quote: #964860;        /* Editorial quote nuance */

  /* Accents & States */
  --accent-blush: #F4C2CE;      /* Soft petal pink */
  --accent-rose: #E76F8E;       /* Primary interactive rose */
  --accent-rose-hover: #D65A7B; /* Deep interactive rose */
  --accent-gold: #DFBA73;       /* Subtle wax seal / metallic shimmer */
  
  /* Borders & Shadows */
  --border-delicate: rgba(231, 111, 142, 0.16);
  --border-focused: rgba(231, 111, 142, 0.45);
  --shadow-editorial: 0 12px 36px -8px rgba(120, 50, 75, 0.08);
  --shadow-float: 0 20px 48px -12px rgba(120, 50, 75, 0.14);
}
```

---

## 4. Typography Scale & Pairings
- **Display / Heading Serif**: `'Playfair Display', 'Cormorant Garamond', Georgia, serif`
  - Editorial titles, birthday wishes, love letter headings.
  - Features: italic flourishes, quotation accents, loose line-height (`1.2 - 1.3`).
- **Body & Controls Sans**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  - Crisp readability, generous letter-spacing on small caps labels (`letter-spacing: 0.05em`).

---

## 5. Component Recipes & Interactive Specifications

### A. Persistent Floating Year Switcher
- Floating pill fixed at top right or bottom center.
- Frosted glass container (`backdrop-filter: blur(12px)`).
- Pill chips: `2025 (Archive)` and `2026 (Celebrating)`.
- Active state: warm rose capsule with smooth layout animation (`layoutId="yearPill"`).

### B. Animated Invitation Letter & Runaway Button
- **Envelope Unfold**: 3-step state sequence (Folded Envelope ➔ Wax Seal Crack ➔ Unfolding Letter Sheet).
- **Runaway "No" Button**:
  - Event listener on `onPointerEnter` / `onTouchStart`.
  - Calculates randomized translation offsets within safe viewport boundary `[x: -200px..200px, y: -160px..160px]`.
  - Instant tactile dodge with spring recoil (`damping: 15`).
- **Growing "Yes" Button**:
  - Starts at `scale: 1.0`.
  - Each time the "No" button is triggered, `scale` increases by `+0.12` (up to `scale: 1.6`).
  - Pulsing glow accentuating warmth.

### C. Date & Place Planner Suite
- **Calendar Day Picker**: Soft pastel rounded calendar with day selection and custom time dropdown.
- **Location Selector**:
  - Google Places API Autocomplete input box with location pin icon.
  - Food Category Tags: Horizontal scrollable badge filter (`[All, Japanese, Italian, Candlelight, Café & Dessert, Fine Dining]`).
  - Featured Pre-Selected Restaurant Cards:
    - High-aspect ratio food photography.
    - Title, cuisine badge, neighborhood, curated recommendation note.
    - One-click selection highlighting card with rose gold border.

---

## 6. Playwright CLI Browser Debugging Protocol
Every component and state must be validated using `@playwright/cli`:
```bash
# 1. Open live dev server in headless or headed session
playwright-cli open http://localhost:3000

# 2. View mobile viewport (390x844 - iPhone size)
playwright-cli resize 390 844
playwright-cli screenshot --path=artifacts/mobile-home.png

# 3. View desktop viewport (1440x900)
playwright-cli resize 1440 900
playwright-cli screenshot --path=artifacts/desktop-home.png

# 4. Trigger interaction verification (e.g. click Yes)
playwright-cli click "button:has-text('Yes')"
playwright-cli screenshot --path=artifacts/planner-state.png
```
