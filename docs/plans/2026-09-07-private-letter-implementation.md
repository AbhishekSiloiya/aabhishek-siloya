# Private Letter Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the letter opening and tighten its copy for the full target audience.

**Architecture:** Keep the existing static page, shared navigation, footer, enquiry dialog and reveal system. Change only the letter markup, its scoped CSS and contract tests.

**Tech Stack:** HTML, CSS, existing JavaScript, Node.js test runner.

---

### Task 1: Lock the inclusive narrative

**Files:**
- Modify: `review-v2/tests/letter.test.mjs`
- Modify: `review-v2/letter.html`

1. Make the test require the inclusive headline, portrait, AS seal and revised section sequence.
2. Run the letter test and confirm it fails.
3. Replace the hero and tighten the letter copy.
4. Run the letter test and confirm it passes.

### Task 2: Balance the responsive composition

**Files:**
- Modify: `review-v2/assets/review.css`
- Test: `review-v2/tests/review-contract.test.mjs`

1. Add scoped desktop and mobile styles for the portrait-led opening.
2. Run all review tests.
3. Inspect desktop, 768px and 390px layouts; confirm no horizontal overflow.
4. Confirm no browser console errors and commit the implementation.

