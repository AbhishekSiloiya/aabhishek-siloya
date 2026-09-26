# Editorial integration release

Date: 26 September 2026

Release branch: `feat/editorial-integration`

Target branch: `main`

Production domain: `aabhisheksiloya.com`

## Release purpose

Move the approved Editorial collection into the main Aabhishek Siloya website while retaining the first-party diagnostic, private-conversation forms, mobile refinements and established visual system.

## Included

- Native Editorial destination and seven published essays under `/editorial/`.
- Editorial entry in the primary navigation and shared footers.
- Compact featured-article rail on the home page with manual controls.
- First-party Founder Friction Finder under `/diagnostic/`.
- Real Phenom International Business Coach certificate on About.
- Controlled two-line mobile openings on Work, About and A Letter.
- Mobile-visible lead entry point on About.
- Canonical metadata and sitemap coverage for the Editorial collection.
- Release checks for tests, merge markers and the production `CNAME`.

## Verification before merge

- `node --test tests/*.test.mjs`
- `git diff --check origin/main...HEAD`
- GitHub pull-request checks must pass before merge.
- No production merge or deployment is included in the preparation step.

## Production fallback

The pre-release production state is preserved at commit `9aa40138a98373f25dbf5194d33deef472e052be` using both:

- Branch: `backup/pre-editorial-release-2026-09-26`
- Annotated tag: `production-2026-09-26-pre-editorial`

If rollback is required, create a pull request that restores `main` to the content represented by the tagged commit. Do not force-push or rewrite `main`. Run the same release checks on the rollback pull request, merge it normally, then verify the custom domain, navigation, forms and core pages.

## Post-merge production check

1. Confirm GitHub Pages completes successfully and serves the expected commit.
2. Check Home, Work, About, A Letter, Editorial, one essay, Diagnostic and Privacy on desktop and mobile.
3. Submit one clearly labelled live test through the private-conversation form and confirm delivery to the configured inbox; delete the test submission afterwards.
4. Confirm `https://aabhisheksiloya.com/sitemap.xml`, canonical links, certificate PDF and diagnostic report flow.
5. If a release-blocking fault is found, use the fallback pull-request procedure above.

## Known operational boundary

Automated tests validate form structure, privacy copy and Web3Forms integration code. Actual email delivery can only be confirmed with a controlled live submission after deployment.
