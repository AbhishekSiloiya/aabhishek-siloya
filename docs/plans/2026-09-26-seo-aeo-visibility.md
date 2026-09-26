# SEO and Agentic-Search Visibility Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Consolidate duplicate URLs, publish three intent-specific service pages, strengthen Editorial and diagnostic metadata, and document the indexing release procedure.

**Architecture:** Keep the static GitHub Pages architecture and existing visual system. Extend the current HTML/CSS and structural Node test contracts; use the homepage `Person` node as the shared entity and reference it from `Service` and `Article` JSON-LD.

**Tech Stack:** Static HTML, CSS, ES modules, JSON-LD, XML sitemap, Node.js built-in test runner.

---

### Task 1: Add the SEO/AEO release contract

**Files:**
- Create: `tests/seo-aeo-visibility.test.mjs`
- Modify: none

**Step 1: Write failing tests**

Add contracts that assert:

- `review-v2/` contains no deployable HTML files;
- the sitemap includes the three service pages and every published essay, including Know · Own · Grow;
- no `/review-v2/` URL appears in the sitemap;
- each service page has a unique title, description, canonical, one H1, social card, lead dialogue, privacy link and parseable `Service` JSON-LD tied to `#person`;
- the homepage links contextually to all three services and its entity graph references them;
- each essay has description, social metadata, canonical, one H1, author link and parseable `Article` JSON-LD;
- Editorial has a descriptive H1 and complete social metadata;
- the diagnostic has one H1 plus favicon and social metadata;
- release notes contain Search Console, Bing and legacy Editorial actions.

**Step 2: Run the new test and verify RED**

Run: `node --test tests/seo-aeo-visibility.test.mjs`

Expected: failures for the existing review files, missing service pages, incomplete essay metadata and missing release notes.

**Step 3: Commit the failing contract**

```bash
git add tests/seo-aeo-visibility.test.mjs
git commit -m "test: define SEO and AEO release contract"
```

### Task 2: Remove production duplicates and repair discovery

**Files:**
- Delete: `review-v2/**`
- Modify: `sitemap.xml`
- Test: `tests/seo-aeo-visibility.test.mjs`

**Step 1: Remove the tracked review deployment files**

Delete the complete `review-v2/` deploy directory. The approved source already exists at the canonical root paths.

**Step 2: Update the sitemap**

Add the Know · Own · Grow canonical URL and reserve entries for the three service pages with `2026-09-26` as the release `lastmod`.

**Step 3: Run the focused contract**

Run: `node --test tests/seo-aeo-visibility.test.mjs`

Expected: duplicate and sitemap assertions pass; service and metadata assertions remain RED.

**Step 4: Commit**

```bash
git add -A review-v2 sitemap.xml
git commit -m "fix: remove duplicate production routes"
```

### Task 3: Publish intent-specific service pages

**Files:**
- Create: `founder-business-coaching.html`
- Create: `strategic-advisory.html`
- Create: `family-enterprise-advisory.html`
- Modify: `assets/review.css`
- Modify: `index.html`
- Modify: `about.html`
- Modify: `work.html`
- Modify: `letter.html`
- Test: `tests/seo-aeo-visibility.test.mjs`

**Step 1: Implement the shared service-page structure**

For each page add:

- full canonical and social metadata;
- restrictive site CSP and self-hosted fonts;
- one descriptive H1;
- opening answer block covering audience, constraint, method and evidence;
- scope and non-scope sections using supported claims only;
- links to Work, About and Diagnostic;
- concise FAQs;
- existing lead dialogue and privacy disclosure;
- `Service` JSON-LD whose provider is `https://aabhisheksiloya.com/#person`.

**Step 2: Add restrained shared CSS**

Add namespaced `.service-*` styles to `assets/review.css`, including mobile and reduced-motion behaviour.

**Step 3: Connect the pages**

Add a homepage service section and service links to shared navigation/footer where space permits. Add contextual links from About and Work without inflating their primary purpose.

**Step 4: Extend the homepage entity graph**

Add stable service IDs and connect them through the Person entity without duplicating the Person node.

**Step 5: Run focused and existing tests**

Run:

```bash
node --test tests/seo-aeo-visibility.test.mjs
node --test tests/multipage-release.test.mjs tests/publication.test.mjs tests/lead-popup.test.mjs
```

Expected: service and homepage assertions pass; Editorial assertions remain RED.

**Step 6: Commit**

```bash
git add founder-business-coaching.html strategic-advisory.html family-enterprise-advisory.html assets/review.css index.html about.html work.html letter.html
git commit -m "feat: add founder advisory service pages"
```

### Task 4: Complete Editorial and diagnostic metadata

**Files:**
- Modify: `editorial/index.html`
- Modify: `editorial/essays/*.html`
- Modify: `diagnostic/index.html`
- Test: `tests/seo-aeo-visibility.test.mjs`

**Step 1: Normalise Editorial metadata**

Add or complete descriptions, Open Graph, Twitter cards, author links and one-H1 structure. Keep the article prose unchanged except where headings must be structurally corrected.

**Step 2: Add Article structured data**

For each essay add parseable `Article` JSON-LD containing:

- canonical `mainEntityOfPage`;
- headline and description;
- `datePublished` and `dateModified` grounded in visible issue dates and release history;
- author `@id` pointing to the homepage Person;
- representative image;
- publisher identity consistent with the site.

**Step 3: Correct the diagnostic outline**

Keep the initial title as H1 and change the result reveal heading to H2. Add favicon and complete share metadata.

**Step 4: Run the focused test**

Run: `node --test tests/seo-aeo-visibility.test.mjs`

Expected: all code assertions pass except release-note operations.

**Step 5: Commit**

```bash
git add editorial diagnostic/index.html tests/seo-aeo-visibility.test.mjs
git commit -m "feat: strengthen article and diagnostic discovery metadata"
```

### Task 5: Add release and indexing notes

**Files:**
- Create: `docs/releases/2026-09-26-seo-aeo-visibility.md`
- Modify: `README.md`
- Test: `tests/seo-aeo-visibility.test.mjs`

**Step 1: Write the release note**

Record:

- duplicate-route removal;
- new service routes and keyword intent;
- sitemap and structured-data changes;
- exact Google Search Console and Bing submission checklist;
- legacy GitHub Editorial canonical/redirect checklist;
- live verification and rollback boundaries;
- no ranking guarantee and the metrics to monitor.

**Step 2: Update the README route inventory**

List the public service and Editorial routes plus the test command.

**Step 3: Run the focused test and verify GREEN**

Run: `node --test tests/seo-aeo-visibility.test.mjs`

Expected: all assertions pass.

**Step 4: Commit**

```bash
git add docs/releases/2026-09-26-seo-aeo-visibility.md README.md
git commit -m "docs: add SEO and AEO release operations"
```

### Task 6: Full verification

**Files:**
- Modify only if verification reveals a defect.

**Step 1: Run syntax and structural tests**

```bash
node --check assets/review.js
node --check assets/lead-form.mjs
node --test tests/*.test.mjs
```

Expected: all tests pass with zero failures.

**Step 2: Run publication checks**

```bash
xmllint --noout sitemap.xml
git diff --check origin/main...HEAD
rg -n '<<<<<<<|=======|>>>>>>>' . -g '!docs/plans/*.md'
```

Expected: valid XML, clean diff and no merge markers.

**Step 3: Inspect the final change set**

```bash
git status --short
git diff --stat origin/main...HEAD
git log --oneline origin/main..HEAD
```

**Step 4: Perform live checks after merge**

Verify canonical routes, `404` responses for `/review-v2/`, sitemap availability, structured-data rendering, mobile presentation and form delivery. Submit the refreshed sitemap and selected URLs in Search Console and Bing.
