# Commercial Value Report Design

## Goal

Make the Founder Friction Finder report feel materially tailored and commercially useful while keeping every monetary range explicitly indicative, auditable and suitable for a five-to-six-minute lead experience.

## Decision

Keep a bounded monetary scenario in the report. Present it as two related views:

- value potentially exposed if the primary friction remains unchanged;
- value potentially protected or unlocked if the constraint improves.

The result is a value hypothesis, not a forecast, valuation or proven loss. A subsequent private conversation replaces model ranges with the founder's actual operating data.

## Calculation model

The model remains deterministic and uses only information the responder supplied:

1. Map the selected revenue band to a bounded low and high annual revenue range.
2. Select the low and high exposure rates for the primary growth engine.
3. Calculate the gap between the responder's engine score and the sector evidence threshold.
4. Convert that gap to the configured severity multiplier.
5. Calculate indicative value exposed as revenue range multiplied by exposure rate and severity.
6. Calculate potentially addressable value as 30 to 55 percent of that exposure range.

The report must display the inputs and explain that published sector evidence informs context and evidence thresholds; it does not prove the monetary impact for an individual business.

## Tailoring hierarchy

- Revenue band sets the commercial scale.
- Business type selects the sector evidence threshold and language.
- Revenue model explains how value is created or lost.
- Primary engine selects the exposure range, commercial narrative and action plan.
- Engine score and sector gap determine severity.
- Evidence flags determine confidence and what must be verified first.
- Team size changes the scale interpretation.
- The selected 90-day goal determines why the result matters now and how the plan's expected outcomes are phrased.
- The strongest engine identifies the capability available to support the work.

## Report experience

### Six-engine health

Repair the reference markers without weakening the content security policy. Use predefined score-position classes rather than generated inline styles.

### Executive mirror

Lead with the founder's stated goal, then connect the primary friction, strongest engine, commercial watchpoint and first decision. Avoid generic encouragement.

### Cost and opportunity

Use calm scenario language:

- If the pattern remains: indicative annual value exposed.
- If the constraint improves: potential value to protect or unlock.

Add a compact methodology line showing the responder's revenue range, engine exposure rate, sector-reference gap and severity. Keep the limitation adjacent to the figures.

### 30-day plan

Add a goal-linked value-validation block. It must state:

- the actual baseline to establish;
- the engine-specific calculation to use once actual data exists;
- the operational, saving, revenue or time benefit the action is intended to test;
- that the 30-day period validates the opportunity rather than promising the annual value.

### Copied executive summary

Include business context, stated goal, primary friction, result confidence, strongest engine, indicative exposure and opportunity ranges, the first move, two measures and a limitation statement. Keep it useful when pasted into an email or leadership note.

## Site integration

- Change every diagnostic timing reference to five to six minutes.
- Keep Diagnostic visible in the main navigation and footer of the four website pages.
- Keep the diagnostic itself focused; its ownership header links back to the main website rather than reproducing the full site navigation.

## Security and privacy

- Keep the restrictive content security policy.
- Do not add third-party scripts, trackers or remote fonts.
- Do not request additional sensitive financial inputs in the initial diagnostic.
- Keep calculations client-side.
- Keep the existing disclaimer that the report is a structured decision aid based on self-reported information.

## Verification

- Unit-test the deterministic calculation at gap and rounding boundaries.
- Test that every primary engine produces an engine-specific validation formula and goal-linked interpretation.
- Test that copied summaries contain the report's commercial and action fields.
- Reproduce and test the reference-marker bug under the strict content policy.
- Run the complete existing test suite.
- Visually inspect the report on desktop and mobile, including all five report sections.
