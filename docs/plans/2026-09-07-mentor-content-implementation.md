# Mentor Content Hierarchy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reorder and rewrite the three mentor acknowledgments without changing their visual weight.

**Architecture:** The About page remains static HTML using the existing mentor-register CSS. A contract test fixes the intended order and relationship language.

**Tech Stack:** HTML, CSS, Node.js test runner.

---

### Task 1: Fix the editorial hierarchy

**Files:**
- Modify: `review-v2/tests/letter.test.mjs`
- Modify: `review-v2/about.html`

1. Change the test order to Sanjay, Sandeep, Martin and assert all three one-to-one relationships.
2. Run the test and confirm it fails on the old order.
3. Reorder the existing rows and replace only their relationship copy.
4. Run all review tests and expect a full pass.
5. Check the About section at desktop and 390px mobile widths.

