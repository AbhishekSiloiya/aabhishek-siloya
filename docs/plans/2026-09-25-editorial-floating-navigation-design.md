# Editorial floating navigation design

> Superseded by `2026-09-25-editorial-navigation-correction-design.md` after visual review showed that the extra navigation duplicated the global header and displaced the editorial heroes.

## Approved direction

Give Editorial a compact secondary navigation layer across the landing page and every article. Replace the landing-page host portrait with the supplied orange-glasses illustration and keep orange confined to that artwork.

## Visual thesis

A discreet editorial instrument: dark glass, hairline borders and small precise typography floating above the page without competing with the primary website navigation or individual article art direction.

## Landing navigation

- Place a compact floating bar immediately below the primary website header.
- Use four destinations: `Editorial`, `Featured`, `Collection`, and `Host`.
- `Editorial` identifies the publication; the remaining links jump to landing-page sections.
- Keep the bar visually light enough to sit above the photographic hero.

## Article navigation

- Use the same floating bar on every article.
- Provide `Editorial home`, `Collection`, `Previous`, and `Next`.
- Previous and next links follow the curated article order.
- The current page remains visually dominant; the floating bar is orientation, not a second masthead.

## Mobile behaviour

- Convert the floating bar into a horizontally scrollable sticky strip.
- Keep every target at least 44px high.
- Do not obscure article headings or create horizontal page overflow.

## Portrait

- Optimise `Aabhi - Illustrated Orange Glasses Upward Gaze.png` into a local WebP asset.
- Retain the circular host treatment.
- Crop around the face and orange glasses, with no additional orange UI accents.

## Fine tuning

- Reduce archive-card headline scale slightly.
- Tighten landing section gaps by approximately ten percent.
- Keep Newsreader at regular weight for editorial titles.
- Preserve each article's distinct visual direction.
- Respect reduced-motion preferences.

## Acceptance criteria

- Landing page uses the supplied illustrated portrait from a local optimised asset.
- Landing page contains a secondary navigation with working anchors.
- Every published article contains previous and next Editorial links.
- The navigation remains usable at desktop and mobile widths.
- No third-party image or font requests are introduced.
- Existing site and Editorial tests remain green.
