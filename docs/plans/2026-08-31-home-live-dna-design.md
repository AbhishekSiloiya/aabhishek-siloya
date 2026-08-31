# Home Page Live-DNA Reset

## Decision

Reset the local review Home page to the composition system already proven on the live site. Preserve the local review build's approved six-section storyline and copy, but use the live page as the visual authority for the header, hero, title measures, portrait crops, section rhythm and responsive behaviour.

## Why the current local Home misses

- The pale header and pale hero split the first viewport into two competing surfaces. The live page treats the header, image and copy as one full-viewport poster.
- The local name is smaller but feels less controlled because it sits in a narrow pale text plane. The live name is larger, yet balanced by the dark field and portrait mass.
- The local philosophy heading is constrained to roughly 10 characters, producing six lines at desktop. The live heading uses a wider 13-character measure and reads in four intentional lines.
- The local Home carries 66–96 pixels of top and bottom section padding. The live page uses approximately 25–36 pixels for its image-led sections, relying on internal structure rather than empty margins.
- The local mobile hero separates portrait and copy into two blocks. The live mobile hero keeps them in one dark, full-height composition.

## Selected approach

### Visual thesis

A dark, full-viewport editorial portrait establishes quiet authority; the name and counsel occupy the calm left field while the portrait owns the right. Below it, warm paper sections use wide roman-serif titles, compact vertical rhythm, precise rules and one narrative image per major idea.

### Content plan

1. Hero — identity, positioning and two actions.
2. My Philosophy — the belief system and six operating principles.
3. The CGP System — the decision framework and lead-generation action.
4. Private Correspondence — direct request and trusted-introduction routes.
5. Selected Prior Work — restrained proof through geography, clients and verified numbers.
6. About Me — personal position, story bridge and profile links.

No Home copy or section order changes are required for this visual pass.

### Interaction thesis

- A restrained hero entrance reveals the kicker, name, counsel and actions in sequence.
- The transparent fixed header shifts to a warm-paper surface after the hero.
- Section content uses a single soft opacity/translate reveal; portrait motion is limited to the existing hero depth effect and disabled for reduced-motion users.

## Desktop system

- Header: fixed, transparent over the hero, 76 pixels high; warm-paper blur after scroll.
- Shell: maximum 1240 pixels with 40-pixel side insets at a 1200-pixel viewport.
- Hero: minimum 100svh, dark ink field, portrait at 53% width, text plane at no more than 69%.
- Name: Newsreader, `clamp(82px, 11.2vw, 166px)`, line-height approximately `.98`, two lines.
- Philosophy: content/image columns approximately `1.32fr / .68fr`; title up to 13 characters wide; portrait 3:4.
- CGP: image/content columns approximately `.68fr / 1.32fr`; title up to 15 characters wide; thesis stays on one line per statement where space allows.
- Remaining sections: use the same compact 30–36 pixel outer section rhythm and preserve their approved copy hierarchy.

## Mobile system

- Header: fixed, 68 pixels high, transparent on the hero; menu remains visible.
- Hero: one dark 100svh composition with the portrait full-bleed behind the copy.
- Name: 61 pixels at 390-pixel width, positioned in the lower half after the portrait establishes presence.
- Actions: stack only when required; no two-line clickable labels.
- Philosophy and CGP portraits move before their content, matching the live narrative sequence.
- Verify at 320, 375, 390, 414 and 768 pixels with no horizontal overflow.

## Scope and safety

Modify only `review-v2/index.html`, `review-v2/assets/review.css`, `review-v2/assets/review.js` and `review-v2/tests/review-contract.test.mjs`. Do not modify Work, About, production files, routes or image assets. Do not delete files.

## Acceptance criteria

- At 1200 × 900, the first viewport has the same compositional balance as the live page: transparent header, dark integrated hero, dominant portrait, controlled two-line name and visible primary counsel.
- At 390 × 844, the hero remains a single dark composition rather than an image followed by a pale content block.
- Philosophy and CGP title widths and outer spacing closely follow the live system.
- Existing navigation, lead form, section order and copy continue to work.
- Work and About pages remain visually and functionally unchanged.

