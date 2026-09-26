# Site consistency and editorial implementation plan

**Goal:** Make Home, Work and About feel like one personal, credible global business coaching site, then verify the lead paths.

**Approved direction:** The user approved a cross-page visual and language review, consistent footers, introduction wording and one clearly labelled delivery test. Preserve the approved Home hero, page sequence and imagery. Local review only; no publication.

**Visual thesis:** Warm paper, restrained serif headings and close alignment, with one portrait anchoring About rather than oversized slogans.

**Content plan:** About introduces Aabhishek, explains his operating background, coaching development, working approach and wider interests. Home explains the approach; Work supplies qualified evidence. Remove clever-sounding abstractions without adding results or endorsements.

**Interaction thesis:** Reuse the existing short reveals on About, consistent link hover/focus feedback, and a shared accessible enquiry dialog. Respect reduced motion.

**Architecture / stack:** Static HTML, shared CSS and JavaScript. Edit only `review-v2`. Keep footers in HTML for no-JavaScript navigation. Share form intent wording in one small module.

## Checklist

1. Review existing pages and supplied founder context. Separate user-supplied facts from unverified claims.
2. Rewrite About's five sections; simplify selected Home/Work copy. Preserve metric qualifications. Restore supplied mentor/training context without certificate imagery or endorsements.
3. Scope About styling; align site shell/header, heading rhythm, footer and form presentation. Check desktop and mobile visually.
4. Add tests for introduction/conversation wording and intent persistence. Implement shared form wording, status reset, accessible labels and success/error handling.
5. Make footers identical and use the verified founder-profile LinkedIn URL.
6. Run tests, local asset/link integrity checks and UI checks across all three pages. Submit one labelled test through the actual form; report service response separately from inbox receipt.
7. Record changes, limitations and next steps in the review audit. Leave production unchanged.
