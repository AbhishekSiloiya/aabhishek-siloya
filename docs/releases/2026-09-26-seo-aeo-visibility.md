# SEO and agentic search visibility release — 26 September 2026

## Release scope

- Added three focused, indexable service pages:
  - `/founder-business-coaching.html` — founder business coaching intent.
  - `/strategic-advisory.html` — founder and owner strategic advisory intent.
  - `/family-enterprise-advisory.html` — family enterprise leadership and continuity intent.
- Added homepage links and a connected `Person` → `Offer` → `Service` schema graph.
- Repositioned homepage metadata around “Founder Business Coach” and “Strategic Advisor” without changing the private-counsel proposition.
- Removed the public `/review-v2/` duplicate site from the production source.
- Added the three service URLs and the previously omitted Know Own Grow essay to `sitemap.xml`.
- Added complete Article schema, author links, descriptions and social metadata to all eight editorial pages.
- Added complete share metadata, favicon identity and one-H1 semantics to the Founder Friction Finder.
- Added self-referencing `og:url` metadata to every editorial article and the Founder Friction Finder so social crawlers resolve the same canonical identity as search engines.
- Corrected the family-enterprise Twitter card image URL and added regression coverage for canonical social URLs and the shared card asset.

## Post-deployment operations

These actions require account or repository access and are not completed by the local code release.

### Google Search Console

1. Verify `https://aabhisheksiloya.com/sitemap.xml` is accepted and resubmit it after deployment.
2. Inspect and request indexing for the homepage and the three new service URLs.
3. Inspect one editorial URL and `/diagnostic/` to confirm the selected canonical equals the declared canonical.
4. Confirm `/review-v2/`, `/review-v2/about.html`, `/review-v2/work.html` and `/review-v2/letter.html` no longer return indexable `200` responses.
5. Review Pages, Core Web Vitals and Enhancements after Google recrawls the release.

### Bing Webmaster Tools

1. Submit the production sitemap.
2. Request indexing for the homepage and three service URLs.
3. Review Index Explorer for duplicate `/review-v2/` paths and canonical conflicts.

### Legacy Editorial repository

The old `https://abhisheksiloiya.github.io/Editorial/` site is a separate deployment and is not present in this workspace. Update that repository so every old article URL either:

- issues a permanent redirect to its matching `https://aabhisheksiloya.com/editorial/essays/...` URL; or
- declares a cross-domain canonical to that matching production URL when redirects are unavailable.

Do not point every old article at the editorial homepage. Preserve one-to-one URL intent. Remove the old sitemap from search consoles after redirects or cross-domain canonicals are live.

## Live verification and rollback

- Verify all sitemap URLs return `200`, use HTTPS and declare a self-referencing canonical.
- Validate homepage, service and Article JSON-LD after deployment.
- Check desktop and mobile rendering, lead-dialog submission and internal links on all three service pages.
- Confirm `/review-v2/` returns `404` rather than an indexable copy.
- Roll back the release commit if canonical hosts, lead submission or page rendering regress; resubmit the sitemap only after the corrected build is live.

## Measurement

Record a launch baseline, then review at 14, 30 and 90 days:

- indexed canonical URLs;
- non-brand impressions and clicks for founder coaching, strategic advisory and family enterprise queries;
- editorial impressions and referring domains;
- qualified enquiries by landing page.

This release improves crawlability, relevance and entity clarity. There is no ranking guarantee; outcomes depend on recrawl time, competitive authority, content quality and external signals.
