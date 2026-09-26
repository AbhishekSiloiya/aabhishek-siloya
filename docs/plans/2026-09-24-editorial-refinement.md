# Editorial Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the homepage Editorial feature, native landing page and article endings feel smaller, lighter and fully aligned with the private-counsel website.

**Architecture:** Keep the existing static HTML structure and self-hosted assets. Refine the homepage through scoped CSS, restructure the Editorial landing into one lead feature plus a semantic archive list, and use shared bridge styles for article continuation and footer geometry.

**Tech Stack:** Static HTML5, CSS, vanilla JavaScript, Node test runner.

---

### Task 1: Lock the compact homepage contract

**Files:**
- Modify: `tests/editorial-integration.test.mjs`
- Modify: `assets/review.css`

**Step 1: Write the failing test**

Assert that the stylesheet caps desktop cards at 300px, hides controls above 621px and retains mobile controls.

**Step 2: Run test to verify it fails**

Run: `node --test tests/editorial-integration.test.mjs`
Expected: FAIL because the current card minimum height is 445px.

**Step 3: Implement the compact shelf**

Reduce section padding, use three visible desktop columns, cap card height at 290px, reduce card-title scale and hide desktop controls.

**Step 4: Run the test**

Run: `node --test tests/editorial-integration.test.mjs`
Expected: PASS.

### Task 2: Recompose the Editorial landing

**Files:**
- Modify: `tests/editorial-integration.test.mjs`
- Modify: `editorial/index.html`
- Modify: `editorial/assets/site.css`
- Modify: `editorial/assets/bridge.css`

**Step 1: Write the failing test**

Assert that the landing body carries `editorial-reading-room`, the archive uses `editorial-index`, and the legacy `archive-carousel` class is absent.

**Step 2: Run test to verify it fails**

Run: `node --test tests/editorial-integration.test.mjs`
Expected: FAIL on the missing reading-room and index classes.

**Step 3: Implement the warm reading room**

Apply the light canvas, rebuild the lead feature as one dark editorial plane, convert the archive to numbered rows, align all content to the main shell and limit type weights to the shared system.

**Step 4: Run the test**

Run: `node --test tests/editorial-integration.test.mjs`
Expected: PASS.

### Task 3: Add article continuation and unify footers

**Files:**
- Modify: `tests/editorial-integration.test.mjs`
- Modify: `editorial/essays/*.html`
- Modify: `editorial/assets/article-bridge.css`
- Modify: `editorial/assets/bridge.css`

**Step 1: Write the failing test**

Assert that each published article contains `editorial-continue`, one internal next-read link and the shared compact article footer.

**Step 2: Run test to verify it fails**

Run: `node --test tests/editorial-integration.test.mjs`
Expected: FAIL because no continuation band exists.

**Step 3: Implement the continuation map**

Add one next-read band to each published article, following the curated sequence, and tighten footer spacing/alignment without changing article bodies.

**Step 4: Run the test**

Run: `node --test tests/editorial-integration.test.mjs`
Expected: PASS.

### Task 4: Verify visually and structurally

**Files:**
- Verify: `index.html`
- Verify: `editorial/index.html`
- Verify: `editorial/essays/the-founder-building-a-kinder-internet-for-children.html`

**Step 1: Run the complete suite**

Run: `node --test tests/*.test.mjs`
Expected: all tests pass.

**Step 2: Check local links and formatting**

Run: local Editorial link check and `git diff --check`.
Expected: no broken local assets or whitespace errors.

**Step 3: Visually review desktop and mobile**

Check homepage shelf, landing lead/index, article continuation and footer at 1280px and 390px widths. Confirm no console warnings.

**Step 4: Commit**

```bash
git add index.html assets/review.css editorial tests/editorial-integration.test.mjs
git commit -m "refactor: refine editorial reading room"
```
