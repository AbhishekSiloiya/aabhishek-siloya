import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (file) => readFile(new URL(file, root), 'utf8');

test('the review includes Home, Work, About and the founder letter', async () => {
  for (const file of ['index.html', 'work.html', 'about.html', 'letter.html']) {
    const html = await read(file);
    assert.match(html, /<main id="main">/);
    assert.match(html, /assets\/review\.css/);
    assert.match(html, /assets\/review\.js/);
    assert.match(html, /data-lead="conversation"/);
    assert.doesNotMatch(html, /placeholder|pending asset|Publicis Sapient/i);
    for (const route of ['href="./"', 'href="work.html"', 'href="about.html"']) {
      assert.match(html, new RegExp(route.replace(/[.]/g, '\\.')));
    }
  }
});

test('Home follows the approved six-movement sequence', async () => {
  const html = await read('index.html');
  const ids = ['home', 'philosophy', 'cgp', 'correspondence', 'selected-work', 'about'];
  const positions = ids.map((id) => html.indexOf(`id="${id}"`));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.match(html, /aabhishek-black-white-side-profile\.webp/);
  assert.match(html, /Clarity precedes growth[\s\S]*Growth must become profit[\s\S]*Profit creates choice/);
  assert.match(html, /£50m\+[\s\S]*\$1bn[\s\S]*Japan Airlines/);
});

test('Home proof translates earlier delivery into founder-relevant evidence', async () => {
  const html = await read('index.html');
  assert.match(html, /Before counsel, there was delivery\./);
  assert.match(html, /Commercial opportunity[\s\S]*Operating scale[\s\S]*Timeline reduction/);
  assert.match(html, /£50m\+[\s\S]*\$1bn[\s\S]*>Up to 50%</);
  assert.match(html, /approximately 3½–4 months, against an estimated 6–8-month timeline/);
  assert.doesNotMatch(html, />3 months</);
  assert.match(html, /United Kingdom · Europe · Japan/);
  assert.match(html, /not presented as clients of my current private coaching practice/);
  assert.doesNotMatch(html, /Different sectors\. The same standard\./);
});

test('Home correspondence opens quietly and preserves both lead paths', async () => {
  const html = await read('index.html');
  assert.match(html, /id="correspondence-title">Begin privately\.<\/h2>/);
  assert.match(html, /data-lead="conversation"[\s\S]*data-lead="introduction"/);
  assert.doesNotMatch(html, /Begin with the decision\. Or make a considered introduction\./);
});

test('Home carries the live-page composition without leaking into other pages', async () => {
  const [home, work, about, css] = await Promise.all([
    read('index.html'),
    read('work.html'),
    read('about.html'),
    read('assets/review.css'),
  ]);

  assert.match(home, /<body class="home-page">/);
  assert.doesNotMatch(work, /<body class="home-page">/);
  assert.doesNotMatch(about, /<body class="home-page">/);
  assert.match(home, /class="philosophy-content"/);
  assert.match(home, /class="cgp-content"/);
  assert.equal((home.match(/class="about-title-line"/g) || []).length, 2);

  assert.match(css, /html:has\(\.home-page\)\{overflow-x:clip\}/);
  assert.match(css, /\.home-page \.site-header\{[^}]*position:fixed/);
  assert.match(css, /\.home-page \.hero\{[^}]*min-height:100svh/);
  assert.match(css, /\.home-page \.hero-content\{[^}]*min-height:100svh/);
  assert.match(css, /\.home-page \.philosophy h2\{[^}]*max-width:13ch/);
  assert.match(css, /\.home-page \.cgp h2\{[^}]*max-width:15ch/);
  assert.doesNotMatch(css, /\.home-page \.hero-portrait\{[^}]*position:relative/);
});

test('cross-page copy retains specific evidence and removes generic prestige language', async () => {
  const [home, work, about, letter] = await Promise.all([
    read('index.html'),
    read('work.html'),
    read('about.html'),
    read('letter.html'),
  ]);
  const combined = [home, work, about, letter].join('\n');
  assert.doesNotMatch(combined, /Extraordinary Outcomes|considered, practical coaching practice|Let’s talk about what comes next/);
  assert.match(home, /Two decades of delivery\.[\s\S]*A founder’s perspective\./);
  assert.match(work, /Today, I work privately with founders and owners\./);
  assert.match(about, /How I developed the coaching practice\./);
  assert.match(letter, /The numbers belong to your business—not to a generic promise\./);
});

test('About is a five-part trust narrative with founder, mentors and credential imagery', async () => {
  const html = await read('about.html');
  for (const id of ['identity', 'operating-path', 'why-coaching', 'private-room', 'wider-practice']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.equal((html.match(/<img\b/g) || []).length, 5);
  assert.match(html, /A founder’s perspective\./);
  assert.match(html, /What you can expect\./);
  assert.match(html, /How I developed the coaching practice\./);
  assert.doesNotMatch(html, /award-winning|board appointment|monthly retainer|clients of my practice/i);
});

test('all pages share a complete footer and accessible enquiry fields', async () => {
  const pages = await Promise.all(['index.html', 'work.html', 'about.html', 'letter.html'].map(read));
  const css = await read('assets/review.css');
  const footers = pages.map(html => html.match(/<footer\b[\s\S]*?<\/footer>/)[0]);
  assert.equal(new Set(footers).size, 1);
  assert.match(css, /\.footer-pages a:last-child\{[^}]*position:absolute[^}]*right:0/);
  for (const html of pages) {
    assert.match(html, /assets\/review\.css\?v=23/);
    assert.match(html, /aria-labelledby="lead-title" aria-describedby="lead-note"/);
    assert.match(html, /data-message-label/);
    assert.match(html, /autocomplete="email"/);
    assert.match(html, /Web3Forms/);
    assert.doesNotMatch(html, /linkedin\.com\/in\/aabhisheksiloiya\//);
  }
});

test('Work and About use a compact final-section handoff into the shared footer', async () => {
  const css = await read('assets/review.css');
  assert.match(css, /\.work-page \.work-close\{[^}]*padding-bottom:clamp\(32px,3vw,40px\)/);
  assert.match(css, /\.about-page \.about-wider\{[^}]*padding-bottom:clamp\(30px,3vw,40px\)/);
});

test('Work reads as a six-part evidence-led authority narrative', async () => {
  const [html, css] = await Promise.all([read('work.html'), read('assets/review.css')]);

  const ids = ['opening', 'organisations', 'decisions', 'built', 'trvlr', 'practice'];
  const positions = ids.map((id) => html.indexOf(`id="${id}"`));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);

  assert.match(html, /A record of decisions made real\./);
  assert.equal((html.match(/class="case-chapter"/g) || []).length, 4);
  assert.match(html, /£50m\+[\s\S]*\$1bn[\s\S]*Up to 50%[\s\S]*3–5 year/);
  assert.match(html, /prior operating work—not clients of my present independent practice/i);
  assert.match(html, /I have also<\/span><span>carried the risk\./);
  assert.match(html, /<dt><a href="https:\/\/vaxguard\.app">VaxGuard ↗<\/a><\/dt>/);
  assert.match(html, /<dt><a href="https:\/\/www\.bhuzen\.com">Bhuzen ↗<\/a><\/dt>/);
  assert.match(html, /Bhuzen ↗<\/a><\/dt><dd>A global advisory and consulting firm for growth, transformation and technology\./);
  assert.doesNotMatch(html, /Bhuzen ↗<\/a><\/dt><dd>A venture focused on health and wellbeing\./);
  assert.match(html, /His guidance has been invaluable across multiple areas of the business/);
  assert.match(html, /Daniella Conway ↗/);
  assert.match(css, /\.client-note:before\{[^}]*daniella-conway\.jpg/);
  assert.doesNotMatch(html, /Different rooms|Three moments where scale became measurable/);
});

test('Work shows the complete approved prior-organisation register', async () => {
  const html = await read('work.html');
  const organisations = [
    'Maybourne Hotel Group',
    'Heathrow',
    'Japan Airlines',
    'Sonepar',
    'ASDA',
    'European Tours',
    'Howdens',
    'Carnival Cruise',
    'ASOS',
    'BLU Digital',
  ];

  assert.equal((html.match(/class="organisation-mark/g) || []).length, organisations.length);
  for (const organisation of organisations) assert.match(html, new RegExp(organisation));
});

test('Work uses verified local artwork and limits typographic marks to unresolved brands', async () => {
  const [html, css] = await Promise.all([read('work.html'), read('assets/review.css')]);
  for (const asset of [
    'maybourne-logo-dark.svg',
    'japan-airlines.svg',
    'sonepar-logo-black.png',
    'asda.svg',
    'howdens-logo-black-horizontal.png',
    'carnival-cruise-line-logo-340.jpg',
    'asos.svg',
  ]) {
    assert.match(html, new RegExp(`assets/client-logos/${asset.replaceAll('.', '\\.')}`));
  }
  assert.equal((html.match(/organisation-mark--type/g) || []).length, 3);
  assert.match(css, /\.organisation-mark img\{[^}]*max-height:42px/);
  assert.match(css, /\.organisation-mark--maybourne img\{[^}]*width:180px/);
  assert.match(css, /\.organisation-mark--asos img\{[^}]*width:122px/);
});

test('Work uses one restrained reveal system with a reduced-motion fallback', async () => {
  const [html, css, js] = await Promise.all([
    read('work.html'),
    read('assets/review.css'),
    read('assets/review.js'),
  ]);

  assert.match(html, /class="work-page"/);
  assert.ok((html.match(/data-reveal/g) || []).length >= 6);
  assert.match(js, /work-page/);
  assert.match(css, /\.work-page\.js-ready \[data-reveal\]/);
  assert.match(css, /prefers-reduced-motion:reduce[\s\S]*\.work-page\.js-ready \[data-reveal\]/);
});

test('Work logo register can contract to a 320px viewport', async () => {
  const css = await read('assets/review.css');
  assert.match(css, /\.organisation-mark\{[^}]*min-width:0/);
  assert.match(css, /grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
});

test('Work uses a scoped editorial-compression scale without shrinking body copy', async () => {
  const css = await read('assets/review.css');

  assert.match(css, /\.work-page\{[^}]*--work-section-y:clamp\(44px,4\.2vw,58px\)/);
  assert.match(css, /\.work-page\{[^}]*--work-display-opening:clamp\(56px,5\.7vw,78px\)/);
  assert.match(css, /\.work-page \.work-opening,[^{]+\{padding:var\(--work-section-y\) 0\}/);
  assert.match(css, /@media\(max-width:720px\)[\s\S]*\.work-page\{[^}]*--work-section-y:44px/);
  assert.match(css, /\.case-story>p:last-child\{[^}]*font-size:13px/);
  assert.match(css, /\.advisory-copy>p\{[^}]*font-size:14px/);
});

test('Work presents qualified timing evidence and one human closing portrait', async () => {
  const html = await read('work.html');

  assert.match(html, /Up to 50%/);
  assert.match(html, /reduction in delivery time/);
  assert.doesNotMatch(html, /Under four months/);
  assert.match(html, /class="work-close-portrait"[\s\S]*aabhishek-sunglasses-upward-gaze-front\.webp/);
});

test('Work polish uses a compact desktop fold, balanced founder ledger and quiet rule motion', async () => {
  const css = await read('assets/review.css');

  assert.match(css, /\.work-page\{[^}]*--work-fold-opening-y:clamp\(24px,2\.3vw,32px\)/);
  assert.match(css, /\.work-page\{[^}]*--work-fold-register-y:clamp\(22px,2\.1vw,28px\)/);
  assert.match(css, /@media\(min-width:981px\)[\s\S]*\.work-page \.work-opening\{[^}]*padding-block:var\(--work-fold-opening-y\)/);
  assert.match(css, /\.venture-register\{[^}]*display:grid[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\(max-width:720px\)[\s\S]*\.venture-register\{[^}]*display:block/);
  assert.match(css, /\.work-page\.js-ready \.case-chapter:after/);
});

test('Founder venture arrows remain attached to their labels', async () => {
  const css = await read('assets/review.css');

  assert.match(css, /\.venture-register dt a\{[^}]*display:inline-flex[^}]*white-space:nowrap/);
});
