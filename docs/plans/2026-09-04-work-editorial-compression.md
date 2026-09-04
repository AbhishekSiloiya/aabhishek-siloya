# Work Editorial Compression Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the local Work page materially sleeker by reducing excess vertical rhythm and display scale while preserving its approved evidence narrative and readability.

**Architecture:** Keep the existing HTML sequence and shared site shell. Introduce scoped Work-page spacing and type tokens in `review.css`, then apply them to the opening, organisation register, case chapters, founder record, TRVLR note and close. Verify the contract with the existing Node test suite and real-browser measurements at desktop and mobile sizes.

**Tech Stack:** Static HTML, CSS custom properties, vanilla JavaScript, Node test runner, Playwright visual QA.

---

### Task 1: Define the compact visual contract

**Files:**
- Modify: `review-v2/tests/review-contract.test.mjs`

**Step 1: Write the failing test**

Add a contract asserting that the Work page defines and uses scoped section-spacing and display-type tokens, including the mobile spacing override.

**Step 2: Run the test to verify it fails**

Run: `node --test review-v2/tests/review-contract.test.mjs`

Expected: FAIL because the compression tokens do not yet exist.

### Task 2: Apply editorial compression

**Files:**
- Modify: `review-v2/assets/review.css`
- Modify: `review-v2/work.html`

**Step 1: Add the minimal Work-page tokens and apply them**

Introduce scoped variables for section rhythm and display scale. Reduce opening, register, evidence-row, founder, advisory and closing dimensions. Maintain 13–15px body copy and existing content order.

**Step 2: Run the contract test**

Run: `node --test review-v2/tests/review-contract.test.mjs`

Expected: all tests PASS.

### Task 3: Verify visual behaviour

**Files:**
- Verify: `review-v2/work.html`
- Verify: `review-v2/assets/review.css`

**Step 1: Run local browser QA**

Measure page height and horizontal overflow at 1280×800 and 414×896. Verify navigation, all ten organisation marks, reveal completion and the private-conversation dialog.

**Step 2: Compare against the previous baseline**

Targets: reduce the 1280px page from approximately 4391px toward 3500–3800px and the 414px page from approximately 5949px toward 4800–5200px, with no horizontal overflow.

**Step 3: Commit the refinement**

Commit the design note, contract, CSS and cache-busting update together after all checks pass.
