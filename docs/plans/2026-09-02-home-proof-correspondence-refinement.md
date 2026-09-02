# Home Proof and Correspondence Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Correct the Japan Airlines metric and make Private Correspondence shorter, sleeker and visually balanced.

**Architecture:** Change only the Home page’s existing semantic markup and Home-scoped CSS. Extend the existing Node contract test so the approved language and removal of the overwhelming headline remain protected.

**Tech Stack:** Static HTML, CSS, Node.js built-in test runner, browser-based responsive QA.

---

### Task 1: Protect the revised language

**Files:**
- Modify: `review-v2/tests/review-contract.test.mjs`

**Step 1: Write the failing test**

Require `3 months`, `approximately three months`, `Begin privately.`, and the absence of the former correspondence headline.

**Step 2: Run the test to verify it fails**

Run: `node --test review-v2/tests/review-contract.test.mjs`

Expected: FAIL because the Home page still contains “Around four months” and the former correspondence headline.

**Step 3: Commit the failing contract**

```bash
git add review-v2/tests/review-contract.test.mjs
git commit -m "test: define sleek correspondence contract"
```

### Task 2: Implement the approved copy and hierarchy

**Files:**
- Modify: `review-v2/index.html`
- Modify: `review-v2/assets/review.css`

**Step 1: Change the proof metric**

Use `3 months` as the display metric and: “International personalisation delivered in approximately three months, against an estimated six-to-eight-month timeline.”

**Step 2: Change the correspondence headline**

Use `Begin privately.` and bump the stylesheet query parameter.

**Step 3: Tighten Home-scoped correspondence CSS**

Reduce the headline maximum size and bottom margin; reduce contact-path minimum height and internal vertical gaps; retain bottom-aligned actions. Add narrow-screen overrides only where the base mobile rules would restore excess spacing.

**Step 4: Run the contract test**

Run: `node --test review-v2/tests/review-contract.test.mjs`

Expected: PASS.

### Task 3: Verify and commit

**Files:**
- Verify: `review-v2/index.html`
- Verify: `review-v2/assets/review.css`
- Verify: `review-v2/assets/review.js`

**Step 1: Run the full suite**

Run: `node --test review-v2/tests/*.test.mjs && node --check review-v2/assets/review.js && git diff --check`

Expected: all tests pass and no syntax or whitespace errors are reported.

**Step 2: Inspect responsive rendering**

Inspect the correspondence and proof sections at 1200px, 390px and 320px. Confirm no horizontal overflow, clean headline wrapping and aligned calls to action.

**Step 3: Commit the implementation**

```bash
git add review-v2/index.html review-v2/assets/review.css
git commit -m "refine home correspondence rhythm"
```

