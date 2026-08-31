# Home Page Live-DNA Reset Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild only the local review Home page around the live site's proven header, hero, typography and section rhythm while preserving the approved Home storyline and copy.

**Architecture:** Keep the existing vanilla HTML/CSS/JavaScript review build. Add a Home-only body class so live-DNA rules cannot leak into Work or About, then replace the Home selectors with scoped layout and responsive rules. Extend the existing contract tests with static assertions for the Home scope and live-DNA structural hooks, then verify visual geometry in the browser.

**Tech Stack:** Semantic HTML5, tokenised CSS, vanilla ES modules, Node.js built-in test runner, local Python HTTP server.

---

### Task 1: Lock the Home-only contract

**Files:**
- Modify: `review-v2/tests/review-contract.test.mjs`
- Test: `review-v2/tests/review-contract.test.mjs`

**Step 1: Write the failing tests**

Add assertions that the Home body has `class="home-page"`, the hero remains before philosophy, the Home stylesheet contains a fixed transparent header, the Home hero uses `min-height:100svh`, and the mobile Home hero does not switch to a separate pale image/content stack.

**Step 2: Run the test to verify it fails**

Run: `node --test review-v2/tests/review-contract.test.mjs`

Expected: FAIL because the Home-only class and scoped live-DNA rules do not exist.

**Step 3: Commit the failing contract**

Run: `git add review-v2/tests/review-contract.test.mjs && git commit -m "test: define live-dna home contract"`

### Task 2: Restore the live-balanced header and hero

**Files:**
- Modify: `review-v2/index.html`
- Modify: `review-v2/assets/review.css`
- Modify: `review-v2/assets/review.js`
- Test: `review-v2/tests/review-contract.test.mjs`

**Step 1: Add the Home scope and reveal hooks**

Set the Home body class, add progressive-enhancement data hooks to the four hero content groups, and keep all current link targets and lead-intent attributes.

**Step 2: Implement scoped desktop rules**

Under `.home-page`, make the header fixed and transparent over the hero, restore the 76-pixel header and 1240-pixel shell, make the hero dark and 100svh, set the portrait to 53% full height, and restore the live page's name, counsel and action measures.

**Step 3: Implement the scrolled header state**

Update `review.js` to toggle a Home-only `.scrolled` state after leaving the top of the hero, without changing the mobile-menu or lead-dialog behaviour.

**Step 4: Run the contract tests**

Run: `node --test review-v2/tests/review-contract.test.mjs`

Expected: PASS for the new structural rules and existing navigation/form tests.

**Step 5: Commit**

Run: `git add review-v2/index.html review-v2/assets/review.css review-v2/assets/review.js review-v2/tests/review-contract.test.mjs && git commit -m "refine: restore live-balanced home hero"`

### Task 3: Rebalance all Home sections without changing their story

**Files:**
- Modify: `review-v2/index.html`
- Modify: `review-v2/assets/review.css`
- Test: `review-v2/tests/review-contract.test.mjs`

**Step 1: Add semantic Home content wrappers where required**

Add `philosophy-content` and `cgp-content` wrappers/classes matching the approved section hierarchy. Do not rewrite section copy or reorder sections.

**Step 2: Implement the live section rhythm**

Scope compact 30–36 pixel outer section spacing to Home; set Philosophy to `1.32fr/.68fr` with a 13-character title measure; set CGP to `.68fr/1.32fr` with a 15-character title measure; retain correspondence, proof and About content but rebalance their title measures and internal grids to the same paper-and-rule system.

**Step 3: Preserve visual restraint**

Keep one portrait in Hero, Philosophy, CGP and About only. Do not add cards, decorative gradients, logo clouds or extra photography.

**Step 4: Run tests**

Run: `node --test review-v2/tests/review-contract.test.mjs`

Expected: PASS.

**Step 5: Commit**

Run: `git add review-v2/index.html review-v2/assets/review.css review-v2/tests/review-contract.test.mjs && git commit -m "refine: align home sections to live rhythm"`

### Task 4: Match responsive behaviour

**Files:**
- Modify: `review-v2/assets/review.css`
- Test: `review-v2/tests/review-contract.test.mjs`

**Step 1: Implement the 1040- and 720-pixel transitions**

Collapse the Philosophy list and CGP thesis progressively, then move the Philosophy and CGP portraits before their content at mobile widths. Keep the Home mobile hero full-bleed, dark and 100svh.

**Step 2: Protect navigation and actions**

Ensure the fixed header remains readable in both transparent and scrolled states, clickable text remains on one line, and the mobile menu retains its current functional behaviour.

**Step 3: Verify responsive widths**

Inspect 320, 375, 390, 414 and 768 pixels. Expected: no horizontal scroll; no clipped headings; no two-line clickable labels; image tracks use `minmax(0, 1fr)`.

**Step 4: Commit**

Run: `git add review-v2/assets/review.css review-v2/tests/review-contract.test.mjs && git commit -m "refine: complete responsive home composition"`

### Task 5: Final QA and review handoff

**Files:**
- Modify: `review-v2/REVIEW.md`

**Step 1: Run automated checks**

Run: `node --test review-v2/tests/*.test.mjs`

Expected: all tests PASS.

Run: `node --check review-v2/assets/review.js`

Expected: no output and exit code 0.

**Step 2: Run the visual comparison**

Compare live and local at 1200 × 900, 768 × 900 and 390 × 844. Check header/hero integration, title measures, portrait crops, section rhythm and horizontal overflow.

**Step 3: Run accessibility smoke checks**

Keyboard-test skip link, main navigation, mobile menu, lead-dialog open/close, focus visibility and reduced-motion behaviour.

**Step 4: Record the review scope**

Update `review-v2/REVIEW.md` to state that Home has been reset to the live visual DNA and that Work/About remain frozen for this pass.

**Step 5: Commit**

Run: `git add review-v2/REVIEW.md && git commit -m "docs: update home review handoff"`

