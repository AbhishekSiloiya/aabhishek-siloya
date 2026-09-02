# Founder-Facing Proof Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite and rebalance the Home-page proof section so it translates earlier transformation work into relevant evidence for founders, owners and family businesses.

**Architecture:** Keep the existing static section and route. Replace only the proof-section markup, add Home-scoped CSS for the revised evidence hierarchy, and extend the static contract test to protect the evidence boundary and provenance statement.

**Tech Stack:** Semantic HTML5, scoped CSS, Node.js built-in test runner.

---

### Task 1: Define the editorial contract

**Files:**
- Modify: `review-v2/tests/review-contract.test.mjs`

1. Assert the approved thesis, three evidence labels, existing figures and provenance statement.
2. Assert that the old generic sentence is absent.
3. Run `node --test review-v2/tests/review-contract.test.mjs` and confirm the new test fails.

### Task 2: Implement the founder-facing section

**Files:**
- Modify: `review-v2/index.html`
- Modify: `review-v2/assets/review.css`

1. Replace only the `selected-work` section markup.
2. Preserve every supplied figure and qualification.
3. Add scoped desktop and mobile rules for the proof label, outcome, explanation, cross-market line and provenance note.
4. Run the contract tests and JavaScript syntax check.

### Task 3: Visual and responsive QA

**Files:**
- Test: `review-v2/tests/review-contract.test.mjs`

1. Inspect the section at 1200, 768, 414, 375 and 320 pixels.
2. Verify hierarchy, line length, no horizontal overflow and a clear mobile sequence.
3. Run `node --test review-v2/tests/*.test.mjs`, `node --check review-v2/assets/review.js` and `git diff --check`.
4. Commit the finished section.

