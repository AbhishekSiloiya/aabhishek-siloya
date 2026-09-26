# Editorial navigation correction

## Decision

Remove the secondary navigation from the Editorial landing and article pages. It duplicates the global header, competes with each article's art direction and consumes first-viewport space.

## Final navigation model

- Landing: global website header only; the featured hero starts immediately below it.
- Articles: use `← Editorial` in the existing global header as the explicit return path.
- Reading progression: keep the existing next-read prompt at the end of each published article.
- Do not place previous/next controls above an article hero.

## Acceptance criteria

- No Editorial secondary navigation remains in markup or CSS.
- The Editorial hero and every article hero begin directly after their native header treatment.
- Every published article has an explicit return path without adding height.
- Desktop and mobile keep the first viewport focused on the hero.
