# Work Evidence Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fit the Work page’s opening and organisation register above the desktop fold, strengthen the evidence metric, balance the founder section and add a restrained closing portrait.

**Architecture:** Preserve the existing six-section HTML sequence and shared navigation/form behaviour. Make local, Work-scoped HTML and CSS changes only: desktop fold tokens, tighter case rows, a two-column venture ledger and a circular close portrait using an existing local asset. Extend the existing contract tests before implementation, then verify computed page geometry and interactions in a real browser.

**Tech Stack:** Static HTML, scoped CSS, vanilla JavaScript, Node test runner, browser-based responsive QA.

---

### Task 1: Define the evidence and layout contract

**Files:**
- Modify: `review-v2/tests/review-contract.test.mjs`

**Step 1: Write the failing tests**

Add assertions that require:

- “Up to 50%” with “reduction in delivery time”, and no “Under four months”.
- The existing sunglasses portrait inside a `work-close-portrait` figure.
- A two-column `venture-register` at desktop and a one-column mobile override.
- Desktop-only fold spacing tokens and the subtle case-rule reveal.

**Step 2: Run tests and verify the intended failure**

Run: `node --test review-v2/tests/review-contract.test.mjs`

Expected: the new tests FAIL because the metric, portrait, ledger and fold tokens are absent.

### Task 2: Implement the HTML refinement

**Files:**
- Modify: `review-v2/work.html`

**Step 1: Update the Japan Airlines evidence**

Use `Up to 50%` as the metric and `reduction in delivery time` as its label. Retain the qualified six-to-eight-month and approximately three-and-a-half-to-four-month evidence in the supporting sentence.

**Step 2: Tighten all four case paragraphs**

Remove redundant nouns and lists while preserving the commercial mechanism, scale and named context.

**Step 3: Add the closing portrait**

Add `assets/aabhishek-sunglasses-upward-gaze-front.webp` in a circular `work-close-portrait` figure beside the “Present practice” kicker.

**Step 4: Bump the stylesheet query version**

Change `review.css?v=7` to `review.css?v=8`.

### Task 3: Implement the visual refinement

**Files:**
- Modify: `review-v2/assets/review.css`

**Step 1: Compress the desktop fold**

Add scoped opening/register spacing tokens and apply a desktop-only compact rhythm. Keep the organisation title on one desktop line and the ten marks in a shallow two-row register.

**Step 2: Make the chapter rows sleeker**

Reduce row padding and title scale modestly, align the long metric without wrapping and animate each bottom rule through the existing `visible` class.

**Step 3: Balance the founder ledger**

Use a 2×2 border-led ledger at desktop, reverting to one column at 720px.

**Step 4: Compose the closing portrait**

Use a 170px circular crop at desktop and approximately 132px on mobile, with a restrained bronze border and no new visual effects.

**Step 5: Run the full contract suite**

Run: `node --test review-v2/tests/review-contract.test.mjs`

Expected: all tests PASS.

### Task 4: Browser QA and commit

**Files:**
- Verify: `review-v2/work.html`
- Verify: `review-v2/assets/review.css`

**Step 1: Verify desktop geometry**

At 1400×800, confirm the organisation register ends within the initial viewport and there is no horizontal overflow.

**Step 2: Verify responsive behaviour**

At 768×1024, 414×896 and 320×780, confirm correct reading order, no overflow, a one-column founder ledger and a proportionate portrait.

**Step 3: Verify interactions**

Confirm all reveals complete during sequential scrolling, the mobile menu opens, the lead dialog opens and browser logs contain no errors.

**Step 4: Commit**

Commit the plan, contract, HTML and CSS after fresh verification.
