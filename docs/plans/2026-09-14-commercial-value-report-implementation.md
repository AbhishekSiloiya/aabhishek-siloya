# Commercial Value Report Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Produce a tailored, goal-aware commercial scenario and 30-day value-validation plan while repairing strict-CSP report visuals and preserving the five-to-six-minute first-party diagnostic.

**Architecture:** Extract the deterministic commercial calculations, value-validation paths and copied-summary composition into a small browser-compatible ES module. Import that module from the existing application, replace CSP-blocked inline positioning with fixed score classes and SVG attributes, and keep every calculation local to the browser.

**Tech Stack:** Static HTML, CSS, browser ES modules, Node.js built-in test runner.

---

### Task 1: Lock the tailored commercial model with tests

**Files:**
- Create: `tests/diagnostic-report-model.test.mjs`
- Create: `diagnostic/report-model.mjs`

**Step 1: Write failing tests**

Cover:

- deterministic exposure and opportunity ranges at reference gaps 0, 1, 3 and 5;
- rounding boundaries below £25k, from £25k and from £100k;
- methodology output containing revenue range, engine rate, reference gap and severity;
- six distinct engine-specific value-validation paths;
- every path connects the selected 90-day goal and uses the supplied revenue model;
- copied summary includes context, goal, finding, confidence, strongest engine, both value ranges, 30-day move, measures and limitation.

**Step 2: Run the tests and confirm RED**

Run: `node --test tests/diagnostic-report-model.test.mjs`

Expected: FAIL because `diagnostic/report-model.mjs` does not exist.

**Step 3: Implement the pure report model**

Create exports for:

- `formatMoney(value)`;
- `commercialScenario(input)`;
- `valueValidation(input)`;
- `buildExecutiveSummary(input)`.

Keep the configured revenue ranges, engine exposure rates and 30-to-55-percent addressable range version controlled in the module. Do not claim those percentages are validated market benchmarks.

**Step 4: Run the focused tests and confirm GREEN**

Run: `node --test tests/diagnostic-report-model.test.mjs`

Expected: all report-model tests pass.

### Task 2: Repair report visuals under the strict content policy

**Files:**
- Modify: `tests/diagnostic-integration.test.mjs`
- Modify: `diagnostic/app.js`
- Modify: `diagnostic/styles.css`
- Modify: `diagnostic/index.html`

**Step 1: Write failing integration tests**

Assert that:

- the report template contains no generated `style=` attributes;
- score fills and reference markers use the fixed `score-0` to `score-9` class scale;
- overall health uses an SVG meter rather than an inline custom property;
- the application loads as a module and imports the pure report model.

**Step 2: Run and confirm RED**

Run: `node --test tests/diagnostic-integration.test.mjs`

Expected: FAIL because the current report uses inline width, left and health styles.

**Step 3: Implement the CSP-safe visuals**

- Change `app.js` to a browser module.
- Add fixed width and position classes for scores 0 through 9.
- Replace the health-dial inline custom property with an SVG circle using numeric attributes.
- Keep the restrictive content security policy unchanged.

**Step 4: Run and confirm GREEN**

Run: `node --test tests/diagnostic-integration.test.mjs`

Expected: all diagnostic integration tests pass.

### Task 3: Connect the model to every report section

**Files:**
- Modify: `tests/diagnostic-integration.test.mjs`
- Modify: `diagnostic/app.js`
- Modify: `diagnostic/styles.css`

**Step 1: Write failing report-contract tests**

Assert that the report includes:

- the stated 90-day goal in the executive opening;
- `If this remains unresolved` and `If the constraint improves` scenario framing;
- a visible methodology row;
- a value-validation block in the 30-day plan;
- baseline, calculation and intended benefit labels;
- the richer summary builder rather than the previous short template.

**Step 2: Run and confirm RED**

Run: `node --test tests/diagnostic-integration.test.mjs tests/diagnostic-report-model.test.mjs`

Expected: FAIL on the new report-contract assertions.

**Step 3: Implement the tailored report**

- Rewrite the executive mirror around the selected goal, result, current strength and next decision.
- Add input-specific methodology beneath the commercial range.
- Frame downside and upside calmly without `hell` or `heaven` in the interface.
- Add engine-specific value validation to the 30-day plan.
- Use the pure summary builder for clipboard output.
- Keep paragraphs concise and avoid unsupported causal or financial claims.

**Step 4: Run and confirm GREEN**

Run: `node --test tests/diagnostic-integration.test.mjs tests/diagnostic-report-model.test.mjs`

Expected: all focused tests pass.

### Task 4: Update timing and main-site integration

**Files:**
- Modify: `tests/diagnostic-integration.test.mjs`
- Modify: `diagnostic/index.html`
- Modify: `diagnostic/app.js`
- Modify: `index.html`

**Step 1: Write failing tests**

Assert that:

- no visible diagnostic copy contains eight-to-ten or eight minutes;
- the entry and status copy use five to six minutes;
- Home, Work, About and Letter keep a first-party Diagnostic item in the main navigation and footer.

**Step 2: Run and confirm RED**

Run: `node --test tests/diagnostic-integration.test.mjs`

Expected: FAIL on the old timing references.

**Step 3: Implement the timing copy**

Update visible entry, status and invitation wording to five to six minutes. Do not alter question count or remove evidence checks to force the timing claim.

**Step 4: Run and confirm GREEN**

Run: `node --test tests/diagnostic-integration.test.mjs`

Expected: all diagnostic integration tests pass.

### Task 5: Full functional and visual verification

**Files:**
- Modify if needed: `diagnostic/app.js`
- Modify if needed: `diagnostic/styles.css`

**Step 1: Run all automated checks**

Run: `node --test tests/*.test.mjs`

Expected: zero failures.

Run: `git diff --check`

Expected: no whitespace errors.

**Step 2: Verify the local routes**

Confirm HTTP 200 for:

- `/`;
- `/diagnostic/`;
- `/diagnostic/styles.css`;
- `/diagnostic/app.js`;
- `/diagnostic/report-model.mjs`.

**Step 3: Complete representative diagnostic paths**

Run at least three scenarios:

- an early-scale demand friction;
- a higher-scale profit or delivery friction;
- a high-score no-exposed-constraint path.

Confirm deterministic ranges, goal-aware narrative, correct marker positions, summary copy and plan linkage.

**Step 4: Inspect desktop and mobile**

Inspect entry, context, assessment, reveal and all five report pages at desktop and 390-pixel mobile width. Confirm no horizontal overflow, blocked inline styles, clipping or console warnings.

**Step 5: Review the final diff**

Confirm that no tracker, external script, remote font or additional sensitive input was introduced.
