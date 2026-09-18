# Founder diagnostic integration

## Decision

Host the supplied Founder Friction Finder as a first-party child page at `/diagnostic/`. Preserve its original interface, question flow, scoring and report logic; change only the ownership presentation to “by Aabhishek Siloya” and “Powered by Bhuzen”.

## Experience

- Home: a slim editorial invitation immediately after the CGP System and before Private Correspondence.
- Letter: a contextual alternative beside the closing invitation for someone who would rather reflect before writing.
- Header and footer: a direct first-party Diagnostic link on every main page.
- Legacy route: `diagnostic.html` redirects to `/diagnostic/`.

## Visual thesis

The supplied experience remains the design authority. It is presented intact, with only the ownership lockup adapted to the Aabhishek/Bhuzen relationship.

## Content boundary

Use only PRD-supported claims: approximately eight minutes, 18 evidence-led questions, one constraint to examine and a focused 30-day move. Describe the output as directional, not a diagnosis.

## Verification

- Automated contract for placement, link safety, wording and unchanged primary navigation.
- Byte-for-byte verification of the supplied application logic.
- Desktop and mobile visual review of the intro and assessment flow.
- No third-party scripts, styles or font requests; fonts are self-hosted.
- Existing publication, form and multipage tests remain green.
