# Editorial Floating Navigation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a polished secondary Editorial navigation to the landing and article pages, replace the host portrait, and apply restrained landing-page typography and spacing refinements.

**Architecture:** Add semantic navigation markup directly to the static landing and article HTML, while centralising its visual behaviour in the existing Editorial bridge stylesheets. Use a deterministic previous/next sequence for all seven published articles and a locally optimised portrait asset.

**Tech Stack:** Static HTML5, CSS, Node test runner, local image conversion.

---

### Task 1: Lock the secondary navigation contract

**Files:**
- Modify: `tests/editorial-integration.test.mjs`

**Step 1: Write failing tests**

Assert that the landing and every published article contain `editorial-subnav`; require landing anchors for featured, archive and host; require article links for Editorial home, collection, previous and next.

**Step 2: Run the focused test**

Run: `node --test tests/editorial-integration.test.mjs`
Expected: FAIL because the secondary navigation is absent.

### Task 2: Add the portrait asset and landing navigation

**Files:**
- Create: `editorial/assets/images/aabhishek-illustrated-orange-glasses.webp`
- Modify: `editorial/index.html`
- Modify: `editorial/assets/site.css`
- Modify: `editorial/assets/bridge.css`

**Step 1: Optimise the supplied artwork**

Create a local WebP capped at 1000px on its longest edge.

**Step 2: Add the landing navigation**

Insert `Editorial`, `Featured`, `Collection`, and `Host` links after the primary header.

**Step 3: Replace and crop the host portrait**

Point the host image to the new WebP and retain a focused circular crop.

**Step 4: Apply fine tuning**

Reduce archive-title scale, tighten section gaps and style the floating navigation without introducing a new accent colour.

### Task 3: Add article previous/next navigation

**Files:**
- Modify: `editorial/essays/*.html`
- Modify: `editorial/assets/article-bridge.css`

**Step 1: Define the curated sequence**

Use a circular seven-article sequence so every article has valid previous and next links.

**Step 2: Add navigation markup**

Insert the same semantic secondary navigation after the main site header on every article.

**Step 3: Style desktop and mobile behaviour**

Use a floating desktop bar and horizontally scrollable sticky mobile strip with visible keyboard focus.

**Step 4: Run the focused test**

Run: `node --test tests/editorial-integration.test.mjs`
Expected: PASS.

### Task 4: Verify the review build

**Files:**
- Verify: `editorial/index.html`
- Verify: `editorial/essays/*.html`
- Verify: `editorial/assets/*.css`

**Step 1: Run all automated tests**

Run: `node --test tests/*.test.mjs`
Expected: all tests pass.

**Step 2: Check formatting and local links**

Run: `git diff --check` and the local publication checks.
Expected: no whitespace errors or broken local paths.

**Step 3: Review desktop and mobile**

Inspect the landing and one representative article at desktop and mobile widths. Confirm no page overflow, obscured headings or console errors.

**Step 4: Commit**

```bash
git add docs/plans/2026-09-25-editorial-floating-navigation-design.md docs/plans/2026-09-25-editorial-floating-navigation.md tests/editorial-integration.test.mjs editorial index.html assets/review.css
git commit -m "feat: add editorial floating navigation"
```
