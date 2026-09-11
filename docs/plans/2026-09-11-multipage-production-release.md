# Multipage Production Release Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the live one-page GitHub Pages site with the approved four-page authority site without losing the custom domain, search metadata, privacy information, form delivery, or a fast rollback path.

**Architecture:** Keep `origin/main` as the GitHub Pages source. Preserve its current commit on a dated remote backup branch before promotion. Promote the reviewed static HTML, CSS, JavaScript and assets from `review-v2/` into the repository root, then add production metadata, discovery files, privacy links and secure form defaults. Publish through a pull request and verify the deployed custom domain before removing the rollback option.

**Tech Stack:** Static HTML5, CSS, vanilla ES modules, Node test runner, GitHub Pages, Web3Forms.

---

### Task 1: Establish the release boundary and rollback point

**Files:**
- Inspect: repository and remote state

1. Fetch `origin/main` and confirm the production source and custom-domain files.
2. Run the current production and review test suites as the baseline.
3. Create and push `backup/one-pager-2026-09-11` at the exact current `origin/main` commit.
4. Confirm the backup branch resolves to the same commit as pre-release `origin/main`.

### Task 2: Define production contracts before promotion

**Files:**
- Modify: `tests/publication.test.mjs`
- Modify: `review-v2/tests/review-contract.test.mjs`

1. Add failing contracts for all four public pages, canonical URLs, social metadata, ProfilePage schema, sitemap entries, privacy links and local production assets.
2. Add failing contracts for a Web3Forms honeypot, minimal fields and safe DOM APIs.
3. Run the focused tests and confirm they fail only because production promotion is pending.

### Task 3: Promote the approved site and retain compliance essentials

**Files:**
- Replace: `index.html`
- Create: `work.html`, `about.html`, `letter.html`
- Create/modify: `assets/review.css`, `assets/review.js`, `assets/lead-copy.mjs`, required images and brand assets
- Modify: `privacy.html`, `404.html`, `sitemap.xml`, `robots.txt`

1. Copy the reviewed pages and only the assets they reference into the public root.
2. Add page-specific canonical, Open Graph and Twitter metadata.
3. Preserve the approved home ProfilePage JSON-LD and custom domain.
4. Add Privacy to every footer and link the form notice directly to it.
5. Update the privacy notice with controller, purpose, lawful basis, processor/location, retention, rights and ICO complaint information; avoid claiming legal certification.
6. Add a hidden `botcheck` field and keep all form output in `textContent`.
7. Update sitemap dates and include Home, Work, About, Letter and Privacy.

### Task 4: Security, accessibility and release verification

**Files:**
- Test: `tests/*.test.mjs`
- Test: `review-v2/tests/*.test.mjs`

1. Scan for DOM injection sinks, dynamic code execution, unsafe navigation, remote scripts, exposed secrets and unnecessary data fields.
2. Run all Node tests and `git diff --check`.
3. Serve the production root locally and verify desktop and compact layouts, navigation, dialogs and zero horizontal overflow.
4. Verify every referenced local asset and internal link resolves.

### Task 5: GitHub review release and live validation

**Files:**
- Commit the reviewed release set

1. Confirm `gh` is installed and authenticated.
2. Commit the release on the existing feature branch, push it and open a draft pull request.
3. Review the PR diff and checks; merge only after the release set is clean.
4. Verify GitHub Pages serves all public routes over HTTPS on `aabhisheksiloya.com`.
5. Submit one labelled Web3Forms test from the live domain and have the owner confirm receipt.
6. If any critical route or form check fails, restore `main` from `backup/one-pager-2026-09-11`.
