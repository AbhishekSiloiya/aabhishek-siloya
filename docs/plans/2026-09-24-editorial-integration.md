# Native Editorial integration

## Direction

### Visual thesis

A quiet reading room inside the private-counsel website: warm ivory, ink, restrained burgundy, generous editorial typography and real article artwork. The Editorial should feel related to the main site without erasing the character of each essay.

### Content thesis

Editorial is proof of judgement, not a content feed. The homepage offers three considered entry points; the dedicated landing page holds the complete reading room; each article remains a distinctive long-form object and ends with a relevant next read or private-conversation invitation.

### Interaction thesis

Movement is deliberate and user-led: a manual, scroll-snapping homepage rail with previous/next controls, keyboard access and no autoplay. Article lists use small typographic shifts rather than animation for its own sake. Reduced-motion preferences are respected.

## Information architecture

- Main navigation: Home · Work · About · Editorial · Diagnostic · A Letter
- Homepage placement: after the Diagnostic invitation and before Private correspondence
- Native landing page: `/editorial/`
- Native article URLs: `/editorial/essays/<slug>.html`
- Published archive: seven current essays/series entries; the unpublished Know · Own · Grow draft remains out of navigation

## Homepage feature

Three editorial entry points:

1. The Founder Building a Kinder Internet for Children — the human conversation
2. Everyone Wants an AI Employee. The Useful Ones Are Still Interns. — the operating perspective
3. The New Household Economy — the wider social and commercial lens

The rail shows one dominant feature and glimpses the next item. It must never autoplay.

## Implementation

1. Copy the clean Editorial source into `/editorial/`.
2. Replace external Google Fonts with the website's self-hosted Manrope and Newsreader files.
3. Add a namespaced site bridge header/footer to the landing and articles.
4. Convert all Editorial navigation to native internal URLs.
5. Add canonical and social metadata under `aabhisheksiloya.com`.
6. Add the homepage editorial rail and accessible controls.
7. Add the Editorial URLs to the sitemap.
8. Run structural tests, the full suite and desktop/mobile visual review before any publication.

## Publishing boundary

This phase is local-only. Production publication requires explicit approval after review.
