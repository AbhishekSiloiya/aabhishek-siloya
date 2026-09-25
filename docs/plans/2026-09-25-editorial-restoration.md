# Editorial Restoration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restore the original live Editorial landing-page composition and polish its integration with the main website while improving homepage article affordance.

**Architecture:** Keep the static HTML, self-hosted images and existing article URLs. Replace only the landing-page body composition and its scoped styles, retain the shared bridge header/footer, and refine the homepage Editorial shelf through scoped markup and CSS.

**Tech Stack:** Static HTML5, CSS, vanilla JavaScript, Node test runner.

---

### Task 1: Lock the restoration contract

**Files:**
- Modify: `tests/editorial-integration.test.mjs`

**Step 1: Write the failing tests**

Assert that the landing includes the restored cover, salon ribbon, curated feature and archive carousel; assert that the abandoned reading-room intro and numbered index are absent. Assert that homepage tiles expose consistent action labels.

**Step 2: Run the focused test**

Run: `node --test tests/editorial-integration.test.mjs`
Expected: FAIL because the current landing uses the reading-room intro and numbered index.

### Task 2: Restore and integrate the landing page

**Files:**
- Modify: `editorial/index.html`
- Modify: `editorial/assets/site.css`
- Modify: `editorial/assets/bridge.css`

**Step 1: Restore the original composition**

Use the original hero, statement, curated-feature, collection, salon-note and host structure while preserving integrated URLs, metadata, content security policy and shared site navigation.

**Step 2: Polish the presentation**

Scope the dark Editorial design, tighten desktop and mobile spacing, preserve the photographic focal point, add restrained hover/focus behaviour and align the compact footer.

**Step 3: Run the focused test**

Run: `node --test tests/editorial-integration.test.mjs`
Expected: PASS.

### Task 3: Refine the homepage shelf

**Files:**
- Modify: `index.html`
- Modify: `assets/review.css`

**Step 1: Align interaction copy**

Give each tile a concise, explicit article action with the same arrow treatment.

**Step 2: Balance the composition**

Align card content and action cues, refine the three-column proportions and preserve the compact mobile rail.

**Step 3: Run the focused test**

Run: `node --test tests/editorial-integration.test.mjs`
Expected: PASS.

### Task 4: Verify the local review build

**Files:**
- Verify: `index.html`
- Verify: `editorial/index.html`
- Verify: `editorial/assets/site.css`
- Verify: `editorial/assets/bridge.css`
- Verify: `assets/review.css`

**Step 1: Run all automated tests**

Run: `node --test tests/*.test.mjs`
Expected: all tests pass.

**Step 2: Check repository formatting**

Run: `git diff --check`
Expected: no errors.

**Step 3: Review desktop and mobile**

Inspect the homepage Editorial shelf and landing page at desktop and mobile widths. Confirm no horizontal overflow, missing assets or console errors.

**Step 4: Commit**

```bash
git add docs/plans/2026-09-25-editorial-restoration-design.md docs/plans/2026-09-25-editorial-restoration.md tests/editorial-integration.test.mjs index.html assets/review.css editorial/index.html editorial/assets/site.css editorial/assets/bridge.css
git commit -m "refactor: restore editorial salon"
```
