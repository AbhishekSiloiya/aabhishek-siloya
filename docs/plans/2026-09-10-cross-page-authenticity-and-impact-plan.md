# Cross-page Authenticity and Impact Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refine Work navigation and logo scale, unify closing spacing, add an evidence-safe impact framework to the Letter, and complete an authenticity audit across all four pages.

**Architecture:** Keep the existing static HTML, shared CSS and shared JavaScript architecture. Add semantic links and one cardless ruled measurement section, with all responsive and footer behaviour remaining in `review-v2/assets/review.css`.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Node test runner.

---

### Task 1: Work venture links and organisation scale

**Files:**
- Modify: `review-v2/work.html`
- Modify: `review-v2/assets/review.css`
- Test: `review-v2/tests/review-contract.test.mjs`

**Step 1: Write the failing test**

Assert that VaxGuard links to `https://vaxguard.app`, Bhuzen links to `https://www.bhuzen.com`, and the organisation marks use the enlarged CSS scale.

**Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="Work" review-v2/tests/review-contract.test.mjs`

Expected: FAIL on missing venture links or new scale rule.

**Step 3: Implement the minimal change**

Wrap each venture name in its external link. Increase logo maximum dimensions by roughly 15–20% while preserving the existing register height and mobile containment.

**Step 4: Run the focused test**

Expected: PASS.

### Task 2: Shared footer and closing rhythm

**Files:**
- Modify: `review-v2/assets/review.css`
- Modify: `review-v2/index.html`
- Modify: `review-v2/work.html`
- Modify: `review-v2/about.html`
- Modify: `review-v2/letter.html`
- Test: `review-v2/tests/review-contract.test.mjs`

**Step 1: Extend the shared-footer contract**

Assert one stylesheet version and one identical footer fragment across all pages. Keep `Back to top` at the right edge.

**Step 2: Run the footer test and verify failure if versions differ**

Run: `node --test --test-name-pattern="footer" review-v2/tests/review-contract.test.mjs`

**Step 3: Implement shared spacing**

Use the Work footer height as the reference. Reduce only the space between the final section and footer on Work and About; do not compress body copy.

**Step 4: Run the focused test**

Expected: PASS.

### Task 3: Letter measurement passage

**Files:**
- Modify: `review-v2/letter.html`
- Modify: `review-v2/assets/review.css`
- Test: `review-v2/tests/letter.test.mjs`

**Step 1: Write the failing content contract**

Assert the presence of commercial outcome, hours per week, founder-dependent decisions and the sentence that targets are agreed from the client baseline rather than guaranteed.

**Step 2: Run the Letter test and verify failure**

Run: `node --test review-v2/tests/letter.test.mjs`

Expected: FAIL on the missing measurement passage.

**Step 3: Add the semantic ruled section**

Insert the passage after `Built for the longer view` and before `A private conversation`. Use three editorial rows, not cards. Keep the copy short and avoid universal benchmarks.

**Step 4: Add responsive styles and run the test**

Expected: PASS.

### Task 4: Authentic Editorial integrity pass and full QA

**Files:**
- Modify only where needed: `review-v2/index.html`, `review-v2/work.html`, `review-v2/about.html`, `review-v2/letter.html`
- Test: `review-v2/tests/*.test.mjs`

**Step 1: Audit each meaningful claim**

Classify it as supported fact, faithful paraphrase, attributed opinion or unsupported inference. Remove generic significance, repeated promises and any sentence that could apply unchanged to an unrelated coach.

**Step 2: Preserve evidence and useful qualification**

Do not weaken the Work provenance note, TRVLR attribution, certification wording or mentor relationships.

**Step 3: Run all automated checks**

Run: `node --test review-v2/tests/*.test.mjs`

Expected: all tests PASS.

**Step 4: Run static and visual QA**

Run: `git diff --check`

Verify desktop and compact widths for overflow, footer placement, logo containment and Letter reading order.
