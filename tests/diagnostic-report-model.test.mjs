import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildExecutiveSummary,
  commercialScenario,
  formatMoney,
  severityForGap,
  valueValidation,
} from '../diagnostic/report-model.mjs';

test('severity follows the documented sector-reference gap bands', () => {
  assert.equal(severityForGap(0), 0.15);
  assert.equal(severityForGap(1), 0.45);
  assert.equal(severityForGap(3), 0.75);
  assert.equal(severityForGap(5), 1);
});

test('money uses the documented progressive rounding', () => {
  assert.equal(formatMoney(24_499), '£24,000');
  assert.equal(formatMoney(25_000), '£25,000');
  assert.equal(formatMoney(99_500), '£100,000');
  assert.equal(formatMoney(146_000), '£150,000');
});

test('commercial scenario uses revenue, engine and sector gap deterministically', () => {
  const scenario = commercialScenario({
    revenueBand: 'one3',
    primaryEngine: 'demand',
    score: 3,
    reference: 6,
  });

  assert.equal(scenario.gap, 3);
  assert.equal(scenario.severity, 0.75);
  assert.equal(scenario.exposure, '£23,000–£160,000');
  assert.equal(scenario.opportunity, '£7,000–£85,000');
  assert.deepEqual(scenario.methodology, {
    revenue: '£1,000,000–£3,000,000',
    rate: '3–7%',
    gap: '3 points',
    severity: '75%',
  });
});

test('commercial scenario stays bounded when the score meets the reference', () => {
  const scenario = commercialScenario({
    revenueBand: 'three5',
    primaryEngine: 'profit',
    score: 7,
    reference: 7,
  });

  assert.equal(scenario.gap, 0);
  assert.equal(scenario.severity, 0.15);
  assert.equal(scenario.exposure, '£14,000–£60,000');
  assert.equal(scenario.opportunity, '£4,000–£35,000');
});

test('every engine gets a distinct value-validation calculation', () => {
  const engines = ['offer', 'demand', 'sales', 'profit', 'delivery', 'founder'];
  const paths = engines.map((primaryEngine) => valueValidation({
    primaryEngine,
    goal: 'improve margin and cash',
    revenueModel: 'advisory retainers',
  }));

  assert.equal(new Set(paths.map((path) => path.calculation)).size, engines.length);
  for (const path of paths) {
    assert.match(path.goalConnection, /improve margin and cash/i);
    assert.match(path.context, /advisory retainers/i);
    assert.ok(path.baseline.length > 25);
    assert.ok(path.benefit.length > 20);
  }
});

test('copied executive summary carries the commercial and action context', () => {
  const summary = buildExecutiveSummary({
    businessName: 'North Star Advisory',
    sector: 'consulting or business-services firm',
    revenue: '£1m–£3m',
    team: '11–30 people',
    revenueModel: 'advisory retainers',
    goal: 'improve margin and cash',
    resultTitle: 'Unsteady Pipeline',
    primaryEngine: 'Demand rhythm',
    confidence: 'Moderate',
    finding: 'Revenue is carrying more uncertainty than activity suggests.',
    strongestEngine: 'Offer clarity',
    exposure: '£23,000–£160,000',
    opportunity: '£7,000–£85,000',
    move: 'Build a 60-day qualified-pipeline baseline by source',
    leadingMeasure: 'Qualified pipeline coverage for the next 60 days',
    outcomeMeasure: 'Share created without direct founder chasing',
  });

  for (const expected of [
    'North Star Advisory',
    'consulting or business-services firm',
    '£1m–£3m',
    '11–30 people',
    'advisory retainers',
    'improve margin and cash',
    'Unsteady Pipeline',
    'Demand rhythm',
    'Moderate',
    'Offer clarity',
    '£23,000–£160,000',
    '£7,000–£85,000',
    'Build a 60-day qualified-pipeline baseline by source',
    'Qualified pipeline coverage for the next 60 days',
    'Share created without direct founder chasing',
    'not a forecast or proven loss',
  ]) assert.match(summary, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
});
