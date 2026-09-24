# Editorial refinement design

## Approved direction

Integrate Editorial into the private-counsel website as a quiet reading room. The website supplies the frame; individual essays retain their own visual character.

## Visual thesis

Warm ivory, ink and restrained bronze; Newsreader at a confident regular weight; Manrope used sparingly for labels and navigation. The result should feel collected and considered, not like a campaign carousel or a separate dark microsite.

## Homepage

- Replace the oversized 445px carousel with a 260–300px editorial shelf.
- Show all three features on desktop without carousel controls.
- Give the lead conversation a compact image-led treatment; keep the other two typographic.
- Preserve horizontal swiping and discreet controls on mobile only.
- Reduce title size and section padding so Editorial supports the homepage rather than interrupting it.

## Editorial landing

- Use the main website's warm ivory canvas and 1240px alignment.
- Keep one ink-coloured lead feature for contrast.
- Replace the boxed archive carousel with a numbered editorial index separated by rules.
- Use Newsreader 400 for titles and Manrope 550–650 for labels.
- Retain the host and salon premise, but remove redundant nested framing and excess darkness.

## Article pages

- Preserve the individual art direction of each article.
- Use the shared website navigation and local Newsreader/Manrope aliases.
- Add a single “Continue reading” line before the footer, not a card grid.
- Standardise footer height, alignment and link order across landing and articles.

## Footer

- Use one compact dark footer pattern.
- Name and role on the left; navigation on the right.
- Keep “Back to top” at the extreme right on desktop.
- On articles, expose All Editorial, the next read and A Letter without adding a second content grid.

## Interaction

- No autoplay.
- Desktop Editorial shelf is static and fully visible.
- Mobile uses scroll snap with small previous/next controls.
- Hover motion is limited to an image crop shift and a short rule movement.
- Reduced-motion preferences disable smooth movement.

## Acceptance criteria

- Homepage Editorial cards are no taller than 310px on desktop.
- Desktop carousel controls are hidden; mobile controls remain accessible.
- Editorial landing uses the local Newsreader and Manrope files and no external assets.
- Editorial archive is a list, not a card carousel.
- Every published article includes one internal continuation link.
- Landing and article footers share the same compact geometry.
- Existing security, diagnostic, lead-form and publication tests remain green.
