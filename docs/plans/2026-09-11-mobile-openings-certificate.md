# Mobile Openings and Phenom Certificate Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add the supplied Phenom certificate and give Work, About and Letter consistent, controlled mobile openings.

**Architecture:** Keep the static HTML/CSS structure and existing reveal script. Add semantic spans that control line breaks only at the mobile breakpoint, replace the About certificate placeholder with a responsive image/link figure, and preserve desktop layout through scoped media rules.

**Tech Stack:** Static HTML, CSS, native ES modules, Node test runner, responsive WebP/JPEG/PDF assets.

---

### Task 1: Acquire and prepare certificate assets

**Files:**
- Create: `assets/credentials/phenom-international-business-coach.jpg`
- Create: `assets/credentials/phenom-international-business-coach.webp`
- Create: `assets/credentials/phenom-international-business-coach.pdf`

**Step 1: Download the two approved Drive files**

Use the authenticated Google Drive source URLs supplied in the design note. Preserve the JPG and PDF bytes without changing their content.

**Step 2: Verify the files**

Run: `file assets/credentials/phenom-international-business-coach.{jpg,pdf}`

Expected: one JPEG image and one single-page PDF.

**Step 3: Create the delivery image**

Create a high-quality WebP version capped at 1600px wide. Do not introduce a generative edit or alter the certificate content.

**Step 4: Verify visual fidelity and size**

Confirm the certificate name, Phenom mark, Sanjay Wadhwa signature and Sandeep Mukhi signature remain legible, and that the WebP is smaller than the JPG.

**Step 5: Commit**

```bash
git add assets/credentials/phenom-international-business-coach.*
git commit -m "assets: add Phenom coaching certificate"
```

### Task 2: Lock the approved mobile opening lines

**Files:**
- Modify: `work.html`
- Modify: `about.html`
- Modify: `assets/review.css`
- Test: `tests/multipage-release.test.mjs`

**Step 1: Write the failing structural test**

Assert that Work exposes two `.mobile-line` spans in its H1 and About exposes two `.mobile-line` spans in `.about-intro`, while Letter retains its two title spans.

**Step 2: Run the focused test**

Run: `node --test tests/multipage-release.test.mjs`

Expected: FAIL because Work and About do not yet contain the controlled spans.

**Step 3: Add semantic line spans**

Use these exact structures:

```html
<h1 id="work-title" data-reveal><span>A record of decisions</span><span>made real.</span></h1>
<p class="about-intro"><span>A founder’s perspective.</span><span>An honest outside view.</span></p>
```

**Step 4: Scope the mobile CSS**

Display the spans inline on desktop. At `max-width:620px`, display each span as a non-wrapping block and tune only the local font size/width required to keep exactly two lines without overflow.

**Step 5: Run the focused test**

Run: `node --test tests/multipage-release.test.mjs`

Expected: PASS.

**Step 6: Commit**

```bash
git add work.html about.html assets/review.css tests/multipage-release.test.mjs
git commit -m "fix: align mobile page openings"
```

### Task 3: Replace the Phenom placeholder

**Files:**
- Modify: `about.html`
- Modify: `assets/review.css`
- Test: `tests/multipage-release.test.mjs`

**Step 1: Write the failing certificate test**

Assert that About references the WebP preview, links to the PDF, includes meaningful certificate alt text, and no longer includes “Certificate image to be supplied”.

**Step 2: Run the focused test**

Run: `node --test tests/multipage-release.test.mjs`

Expected: FAIL on the placeholder assertions.

**Step 3: Implement the certificate figure**

Use the current `certificate-display` visual language, a responsive WebP preview, a PDF link opening in a new tab with `rel="noopener"`, and a restrained factual caption.

**Step 4: Tune the image fit**

Show the complete framed certificate without cropping its name, mark or signatures. Preserve the two-column desktop balance and stack cleanly on mobile.

**Step 5: Run the focused test**

Run: `node --test tests/multipage-release.test.mjs`

Expected: PASS.

**Step 6: Commit**

```bash
git add about.html assets/review.css tests/multipage-release.test.mjs
git commit -m "feat: publish Phenom certificate"
```

### Task 4: Visual and release verification

**Files:**
- Verify: `work.html`
- Verify: `about.html`
- Verify: `letter.html`

**Step 1: Run the complete automated suite**

Run: `node --test tests/*.test.mjs`

Expected: all tests PASS.

**Step 2: Check source hygiene**

Run: `git diff --check`

Expected: no output.

**Step 3: Perform responsive visual QA**

Inspect Work, About and Letter at 390×844 and 1280×720. Confirm exact line counts, no horizontal overflow, useful next-section visibility, certificate legibility and unchanged desktop composition.

**Step 4: Recheck lead forms**

Open the enquiry dialog from each page and confirm field visibility, privacy link and close behaviour. Do not send a second live test submission.

**Step 5: Hold for review**

Leave the local preview open. Do not push to `main` until the user approves the visual result.
