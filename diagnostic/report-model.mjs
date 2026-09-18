const revenueRanges = {
  pre1: [250_000, 1_000_000],
  one3: [1_000_000, 3_000_000],
  three5: [3_000_000, 5_000_000],
  five10: [5_000_000, 10_000_000],
  tenplus: [10_000_000, 20_000_000],
};

const exposureRates = {
  offer: [0.02, 0.05],
  demand: [0.03, 0.07],
  sales: [0.02, 0.06],
  profit: [0.03, 0.08],
  delivery: [0.02, 0.06],
  founder: [0.01, 0.04],
};

const validationPaths = {
  offer: {
    baseline: 'Record buyer comprehension and first-conversation conversion before changing the proposition.',
    calculation: 'Qualified conversations × conversion improvement × average contribution per win',
    benefit: 'Tests whether clearer value creates more qualified movement and fewer bespoke sales exceptions.',
  },
  demand: {
    baseline: 'Record qualified pipeline by source, expected decision date and direct founder involvement.',
    calculation: 'Additional qualified opportunities × baseline win rate × average contribution per win',
    benefit: 'Tests revenue growth and forward visibility from demand that does not depend on founder chasing.',
  },
  sales: {
    baseline: 'Record current stage conversion, median days in stage and contribution per successful opportunity.',
    calculation: 'Qualified opportunities × win-rate improvement × average contribution per win',
    benefit: 'Tests revenue recovered from opportunities already entering the business and shorter decision cycles.',
  },
  profit: {
    baseline: 'Record true contribution margin for the five most material clients, offers or service lines.',
    calculation: 'Affected revenue × contribution-margin improvement',
    benefit: 'Tests margin, cash and value protected through pricing, scope or delivery-cost discipline.',
  },
  delivery: {
    baseline: 'Record usable capacity, cycle time, rework cost and work that becomes at risk before delivery.',
    calculation: 'Recovered capacity × contribution per unit + avoided rework cost',
    benefit: 'Tests capacity released, cost avoided and revenue that can be delivered without reducing quality.',
  },
  founder: {
    baseline: 'Record founder interventions, hours absorbed and decision time for the selected repeated decision.',
    calculation: 'Founder hours released × agreed value-of-time proxy + avoided decision-delay cost',
    benefit: 'Tests time freedom, faster decisions and capacity redirected towards clients, direction and growth.',
  },
};

export function severityForGap(gap) {
  if (gap >= 5) return 1;
  if (gap >= 3) return 0.75;
  if (gap >= 1) return 0.45;
  return 0.15;
}

export function formatMoney(value) {
  const step = value >= 100_000 ? 10_000 : value >= 25_000 ? 5_000 : 1_000;
  const rounded = Math.max(step, Math.round(value / step) * step);
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(rounded);
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

function pointLabel(value) {
  return `${value} ${value === 1 ? 'point' : 'points'}`;
}

export function commercialScenario({ revenueBand, primaryEngine, score, reference }) {
  const revenue = revenueRanges[revenueBand] || revenueRanges.pre1;
  const rate = exposureRates[primaryEngine] || exposureRates.offer;
  const gap = Math.max(0, reference - score);
  const severity = severityForGap(gap);
  const exposureLow = revenue[0] * rate[0] * severity;
  const exposureHigh = revenue[1] * rate[1] * severity;

  return {
    exposure: `${formatMoney(exposureLow)}–${formatMoney(exposureHigh)}`,
    opportunity: `${formatMoney(exposureLow * 0.3)}–${formatMoney(exposureHigh * 0.55)}`,
    gap,
    severity,
    methodology: {
      revenue: `${formatMoney(revenue[0])}–${formatMoney(revenue[1])}`,
      rate: `${Math.round(rate[0] * 100)}–${Math.round(rate[1] * 100)}%`,
      gap: pointLabel(gap),
      severity: formatPercent(severity),
    },
  };
}

export function valueValidation({ primaryEngine, goal, revenueModel }) {
  const path = validationPaths[primaryEngine] || validationPaths.offer;
  return {
    ...path,
    context: `Apply this to the economics of ${revenueModel}.`,
    goalConnection: `Use the evidence to judge progress towards your stated goal to ${goal}.`,
  };
}

export function buildExecutiveSummary(input) {
  return `${input.businessName} — Founder Friction Finder

Business context
${input.sector} · ${input.revenue} revenue · ${input.team} · ${input.revenueModel}
Stated 90-day goal: ${input.goal}.

Executive finding
Result: ${input.resultTitle}
First constraint to verify: ${input.primaryEngine}
Confidence: ${input.confidence}
${input.finding}
Current strength to lean on: ${input.strongestEngine}.

Indicative commercial scenario
Annual value potentially exposed if the pattern remains: ${input.exposure}.
Potential value to protect or unlock if the constraint improves: ${input.opportunity}.

30-day move
${input.move}.
Leading measure: ${input.leadingMeasure}.
Outcome measure: ${input.outcomeMeasure}.

These ranges are based on the supplied revenue band, the primary-engine scenario rate and the gap from the Bhuzen sector evidence threshold. They are an indicative decision range, not a forecast or proven loss. Replace them with actual conversion, contribution, capacity and founder-time data before making a financial decision.`;
}
