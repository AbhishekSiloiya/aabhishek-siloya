import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const pages = [
  ['index.html', 'https://aabhisheksiloya.com/'],
  ['work.html', 'https://aabhisheksiloya.com/work.html'],
  ['about.html', 'https://aabhisheksiloya.com/about.html'],
  ['letter.html', 'https://aabhisheksiloya.com/letter.html'],
];

const read = (path) => readFile(new URL(path, root), 'utf8');

test('production exposes the approved four-page navigation', async () => {
  for (const [path] of pages) await access(new URL(path, root));

  for (const [path] of pages) {
    const html = await read(path);
    assert.match(html, /href="\.\/">Home<\/a>/);
    assert.match(html, /href="work\.html"[^>]*>Work<\/a>/);
    assert.match(html, /href="about\.html"[^>]*>About<\/a>/);
    assert.match(html, /href="letter\.html"[^>]*>A Letter<\/a>/);
    assert.doesNotMatch(html, /review-v2\//);
  }
});

test('every public page carries canonical and share metadata', async () => {
  for (const [path, canonical] of pages) {
    const html = await read(path);
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical.replaceAll('.', '\\.')}">`));
    assert.match(html, new RegExp(`<meta property="og:url" content="${canonical.replaceAll('.', '\\.')}">`));
    assert.match(html, /<meta property="og:title" content="[^"]+">/);
    assert.match(html, /<meta property="og:description" content="[^"]+">/);
    assert.match(html, /<meta property="og:image" content="https:\/\/aabhisheksiloya\.com\/assets\/aabhishek-siloya-social-card\.jpg">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
  }
});

test('public pages use a restrictive static-site content policy', async () => {
  for (const [path] of pages) {
    const html = await read(path);
    const policy = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/)?.[1];
    assert.ok(policy, `${path} has a CSP`);
    assert.match(policy, /default-src 'self'/);
    assert.match(policy, /script-src 'self'/);
    assert.match(policy, /connect-src 'self' https:\/\/api\.web3forms\.com/);
    assert.match(policy, /object-src 'none'/);
    assert.doesNotMatch(policy, /unsafe-eval|unsafe-inline|\*/);
  }
});

test('lead forms minimise data, disclose processing and include spam protection', async () => {
  for (const [path] of pages) {
    const html = await read(path);
    assert.match(html, /name="botcheck"[^>]*hidden/);
    assert.match(html, /href="privacy\.html">Privacy notice<\/a>/);
    assert.match(html, /name="name"/);
    assert.match(html, /name="email"/);
    assert.match(html, /name="organisation"/);
    assert.match(html, /name="message"/);
    assert.doesNotMatch(html, /name="phone"|name="address"/);
  }

  const js = await read('assets/review.js');
  assert.match(js, /window\.location\.origin \+ window\.location\.pathname/);
  assert.doesNotMatch(js, /\.innerHTML|\.outerHTML|insertAdjacentHTML|document\.write|eval\(|new Function/);
});

test('privacy notice provides the information required at collection', async () => {
  const privacy = await read('privacy.html');
  assert.match(privacy, /data controller is Aabhishek Siloya/i);
  assert.match(privacy, /legitimate interests/i);
  assert.match(privacy, /steps at your request before entering into a working relationship/i);
  assert.match(privacy, /United States.*US-East/is);
  assert.match(privacy, /server logs.*two months/is);
  assert.match(privacy, /access.*correct.*delete.*object/is);
  assert.match(privacy, /ico\.org\.uk/);
  assert.doesNotMatch(privacy, /Submission records are retained there for 90 days/);
});

test('sitemap exposes the complete canonical site', async () => {
  const sitemap = await read('sitemap.xml');
  for (const [, canonical] of [...pages, ['privacy.html', 'https://aabhisheksiloya.com/privacy.html']]) {
    assert.match(sitemap, new RegExp(`<loc>${canonical.replaceAll('.', '\\.')}</loc>`));
  }
  assert.match(sitemap, /<lastmod>2026-09-11<\/lastmod>/);
});

test('mobile letter title is locked to two lines so the portrait enters the first viewport', async () => {
  const letter = await read('letter.html');
  const css = await read('assets/review.css');

  assert.match(letter, /<h1 id="letter-title"><span>For those carrying<\/span><span>what comes next\.<\/span><\/h1>/);
  assert.match(letter, /href="assets\/review\.css\?v=24"/);
  assert.match(css, /\.letter-opening h1 span\{display:block\}/);
  assert.match(css, /@media\(max-width:759px\)[\s\S]*\.letter-opening h1\{[^}]*font-size:clamp\(36px,10vw,42px\)[^}]*max-width:none/);
  assert.match(css, /@media\(max-width:759px\)[\s\S]*\.letter-opening h1 span\{white-space:nowrap\}/);
  assert.match(css, /@media\(max-width:759px\)[\s\S]*\.letter-portrait-wrap\{min-height:245px\}/);
});

test('Work and About use controlled two-line mobile opening statements', async () => {
  const work = await read('work.html');
  const about = await read('about.html');
  const css = await read('assets/review.css');

  assert.match(work, /<h1 id="work-title" data-reveal><span>A record of decisions<\/span><span>made real\.<\/span><\/h1>/);
  assert.match(about, /<p class="about-intro"><span>A founder’s perspective\.<\/span><span>An honest outside view\.<\/span><\/p>/);
  assert.match(work, /href="assets\/review\.css\?v=25"/);
  assert.match(about, /href="assets\/review\.css\?v=25"/);
  assert.match(css, /@media\(max-width:620px\)[\s\S]*\.work-opening h1 span,\.about-intro span\{display:block;white-space:nowrap\}/);
});
