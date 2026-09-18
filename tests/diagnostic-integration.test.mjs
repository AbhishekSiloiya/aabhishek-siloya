import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('the website navigates to a first-party diagnostic child page', async () => {
  for (const path of ['index.html', 'work.html', 'about.html', 'letter.html']) {
    const html = await read(path);
    const header = html.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0] ?? '';
    assert.match(header, /href="diagnostic\/"[^>]*>Diagnostic<\/a>/);
    assert.doesNotMatch(html, /founder-growth-diagnostic\.abhisheksiloiya\.chatgpt\.site/);
  }
  assert.match(await read('index.html'), /class="diagnostic-action" href="diagnostic\/"/);
});

test('the supplied Founder Friction Finder experience is preserved', async () => {
  const html = await read('diagnostic/index.html');
  for (const id of ['introScreen', 'contextScreen', 'questionScreen', 'mirrorScreen', 'revealScreen', 'reportScreen', 'emailGate']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /Founder Friction Finder/);
  assert.match(html, /Eighteen evidence-led questions/);
  assert.match(html, /Build my action report/);
  assert.doesNotMatch(html, /<iframe|chatgpt\.site/);
});

test('the tool identifies Aabhishek and credits Bhuzen', async () => {
  const html = await read('diagnostic/index.html');
  assert.match(html, /by Aabhishek Siloya/i);
  assert.match(html, /Powered by Bhuzen/i);
  assert.match(html, /href="\.\.\/"[^>]*>Aabhishek Siloya<\/a>/);
});

test('the original assessment flow remains while report logic is modular', async () => {
  const [html, app] = await Promise.all([read('diagnostic/index.html'), read('diagnostic/app.js')]);
  assert.match(html, /<script type="module" src="\.\/app\.js\?v=\d+"><\/script>/);
  assert.match(app, /from '\.\/report-model\.mjs'/);
  for (const id of ['startButton', 'contextForm', 'answerOptions', 'buildReport', 'reportNav']) {
    assert.match(`${html}\n${app}`, new RegExp(id));
  }
});

test('report charts use CSP-safe score classes and SVG attributes', async () => {
  const [app, css] = await Promise.all([read('diagnostic/app.js'), read('diagnostic/styles.css')]);
  assert.doesNotMatch(app, /style="/);
  assert.doesNotMatch(app, /\.style\./);
  assert.match(app, /score-fill score-\$\{score\}/);
  assert.match(app, /score-marker score-\$\{target\}/);
  assert.match(app, /class="health-meter"/);
  assert.match(app, /stroke-dasharray="\$\{health\.percent\} 100"/);
  for (let score = 0; score <= 9; score += 1) {
    assert.match(css, new RegExp(`\\.score-${score}\\s*\\{`));
  }
});

test('the report connects goal, commercial range and 30-day value validation', async () => {
  const app = await read('diagnostic/app.js');
  for (const phrase of [
    'Your stated 90-day priority',
    'If this remains unresolved',
    'If the constraint improves',
    'How this range was built',
    'Value validation',
    'Baseline to establish',
    'Calculation once actuals are known',
    'Intended benefit',
  ]) assert.match(app, new RegExp(phrase, 'i'));
  assert.match(app, /calculateCommercialScenario\(\{/);
  assert.match(app, /valueValidation\(\{/);
  assert.match(app, /buildExecutiveSummary\(\{/);
});

test('the full report is gated after section three for every new assessment', async () => {
  const [html, app, privacy] = await Promise.all([
    read('diagnostic/index.html'),
    read('diagnostic/app.js'),
    read('privacy.html'),
  ]);
  assert.match(app, /target>=3 && !reportUnlocked\(\)/);
  assert.match(app, /openEmailGate\('plan'\)/);
  assert.doesNotMatch(app, /localStorage\.(?:getItem|setItem)\('bhuzen-founder-report-email'/);
  assert.match(app, /fetch\('https:\/\/api\.web3forms\.com\/submit'/);
  assert.match(app, /function isLocalPreview\(\)/);
  assert.match(app, /if\(isLocalPreview\(\)\)return/);
  assert.match(html, /connect-src 'self' https:\/\/api\.web3forms\.com/);
  assert.match(html, /Send my diagnostic summary to Aabhishek/i);
  assert.match(privacy, /diagnostic summary/i);
  assert.match(privacy, /individual answers stay in your browser/i);
});

test('all five report sections open with a consistent editorial masthead', async () => {
  const [app, css] = await Promise.all([read('diagnostic/app.js'), read('diagnostic/styles.css')]);
  assert.equal((app.match(/class="report-opening(?:\s|")/g) ?? []).length, 5);
  assert.match(css, /\.report-opening\s*\{/);
  assert.match(css, /\.report-opening-grid\s*\{/);
});

test('the final report page has one dominant booking action', async () => {
  const app = await read('diagnostic/app.js');
  assert.doesNotMatch(app, /Visit my website/i);
  assert.doesNotMatch(app, /Choose what happens next/i);
  assert.match(app, /One decision\. One conversation\./i);
  assert.match(app, /Book a private conversation/i);
});

test('tailored report copy avoids mechanical or duplicated phrasing', async () => {
  const app = await read('diagnostic/app.js');
  for (const weakPhrase of [
    'outcome-led ${s.offer}',
    'every ${s.demand.replace',
    'A usable foundation for ${goalLabels',
  ]) assert.doesNotMatch(app, new RegExp(weakPhrase.replace(/[${}()[\].+*?^$|\\]/g, '\\$&')));
  assert.match(app, /A usable foundation for the 90-day priority/);
});

test('the diagnostic is a five-to-six-minute main-site destination', async () => {
  const diagnosticFiles = await Promise.all([
    read('diagnostic/index.html'),
    read('diagnostic/app.js'),
    read('index.html'),
  ]);
  for (const source of diagnosticFiles) {
    assert.doesNotMatch(source, /8[–-]10 minutes|eight minutes/i);
  }
  assert.match(diagnosticFiles[0], /5[–-]6 minutes/i);
  assert.match(diagnosticFiles[1], /5[–-]6 minutes/i);

  for (const path of ['index.html', 'work.html', 'about.html', 'letter.html']) {
    const html = await read(path);
    const header = html.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0] ?? '';
    const footer = html.match(/<footer class="footer">[\s\S]*?<\/footer>/)?.[0] ?? '';
    assert.match(header, /href="diagnostic\/"[^>]*>Diagnostic<\/a>/);
    assert.match(footer, /href="diagnostic\/"[^>]*>Diagnostic<\/a>/);
  }
});

test('the embedded tool loads no third-party scripts, styles or fonts', async () => {
  const [html, css] = await Promise.all([read('diagnostic/index.html'), read('diagnostic/styles.css')]);
  assert.doesNotMatch(html, /<script[^>]+src="https?:\/\//i);
  assert.doesNotMatch(html, /<link[^>]+rel="stylesheet"[^>]+href="https?:\/\//i);
  assert.doesNotMatch(css, /https?:\/\//i);
});

test('the compact mobile header keeps the ownership status hidden', async () => {
  const [app, css] = await Promise.all([read('diagnostic/app.js'), read('diagnostic/styles.css')]);
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.top-status \{ display: none; \}/);
  assert.doesNotMatch(css, /\.top-status\s*\{[^}]*display:\s*flex[^}]*\}/);
  assert.match(app, /function centreActiveReportTab/);
  assert.match(app, /nav\.scrollTo\(\{/);
});

test('the former diagnostic URL redirects to the local child page', async () => {
  const html = await read('diagnostic.html');
  assert.match(html, /url=diagnostic\//i);
  assert.match(html, /href="diagnostic\/"/);
});

test('privacy and discovery files describe the first-party diagnostic', async () => {
  const [privacy, sitemap] = await Promise.all([read('privacy.html'), read('sitemap.xml')]);
  assert.match(privacy, /diagnostic runs in your browser/i);
  assert.match(sitemap, /https:\/\/aabhisheksiloya\.com\/diagnostic\//);
  assert.doesNotMatch(sitemap, /diagnostic\.html/);
});
