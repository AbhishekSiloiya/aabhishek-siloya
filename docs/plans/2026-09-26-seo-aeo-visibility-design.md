# SEO and agentic-search visibility design

## Objective

Make the production site easier for search engines and answer agents to discover, consolidate, understand and cite, while preserving the current private-counsel positioning and visual system.

## Chosen approach

Use a focused authority architecture rather than attempting to make the homepage rank for every commercial query.

1. Remove or consolidate duplicate public URLs before adding new indexable material.
2. Give each commercial search intent one dedicated service page.
3. Connect every public page to one stable person entity and explicit service or article entities.
4. Keep the Editorial people-first and evidence-led; improve its machine-readable authorship and publication metadata without rewriting the essays for keywords.
5. Record operational Search Console and legacy-domain steps in the release notes because they cannot be completed solely by changing the production repository.

## Information architecture

The existing Home, Work, About, Editorial, Diagnostic and Letter destinations remain. Add three first-party service destinations:

- `/founder-business-coaching.html` — business coaching for founders and owner-leaders;
- `/strategic-advisory.html` — strategic advisory for founders navigating growth and consequential decisions;
- `/family-enterprise-advisory.html` — support for family enterprises facing growth, leadership transition and continuity.

The homepage remains the branded entity page. It will introduce the three services in a restrained section and link to each with descriptive anchor text. The service pages will use the established header, typography, lead dialogue and footer rather than introducing a new design language.

## Content boundaries

The new pages will use only claims already supported by the live site:

- more than two decades across product and digital strategy;
- operating experience across the UK, Europe, Japan and India;
- selected work and outcomes already described on the Work page;
- current coaching and advisory credentials already published on About;
- current positioning around founders, owners and family enterprises.

They will not add invented client counts, revenue ranges, guarantees, testimonials, prices or claims of specialist legal, tax, investment or succession-planning advice. “Private counsel” remains brand language; descriptive service terms carry search intent.

## Technical consolidation

- Remove the tracked `review-v2/` directory from the production deploy set so its four duplicate HTML routes return `404` after release.
- Keep `diagnostic.html` as a deliberate `noindex` compatibility redirect to `/diagnostic/`.
- Add every canonical production page to `sitemap.xml`, including the current Know · Own · Grow essay and the three service pages.
- Use materially accurate `lastmod` values dated to this release.
- Record the legacy `abhisheksiloiya.github.io/Editorial/` cross-domain canonical requirement in the release notes. If that repository is available, update its live pages separately; do not fake an HTTP redirect from this repository.

## Metadata and structured data

- Homepage: refine the title and description toward founder business coaching and strategic advisory while retaining Aabhishek’s name and London context.
- Service pages: unique title, description, canonical, Open Graph, Twitter card, one H1 and `Service` JSON-LD linked to the existing `Person` entity.
- Editorial landing: descriptive Editorial H1 and complete social metadata.
- Essays: unique descriptions where absent; social cards; explicit author link; `Article` JSON-LD with headline, canonical URL, author, publication/modification dates and representative image.
- Diagnostic: one H1 in the document outline, favicon/social metadata and an explicit description of the tool.
- Existing homepage `Person` graph remains the entity source of truth and gains service relationships without creating competing person IDs.

## Agentic-search presentation

Each service page opens with a short, direct statement answering four retrieval questions:

1. Who is the service for?
2. What decisions or constraints does it address?
3. How does Aabhishek work?
4. What evidence supports the offer?

The pages will use visible headings, short answer paragraphs, evidence links and a concise FAQ. These are written for human clarity and citation, not hidden keyword blocks or crawler-only content.

## Verification

Automated contracts will cover:

- absence of deployable `review-v2` HTML;
- complete sitemap coverage with no review URLs;
- unique service titles, H1s, canonicals and `Service` schema;
- homepage navigation and contextual links to all service pages;
- complete Editorial descriptions, social metadata and `Article` schema;
- one H1 on the diagnostic;
- restrictive CSP, privacy links and existing lead-form behaviour;
- release notes containing the Search Console and legacy Editorial operational checklist.

Manual post-deployment checks remain necessary for Search Console indexing, live redirects, page rendering, form delivery and legacy GitHub Editorial consolidation.
