import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const servicePages = [
  ['founder-business-coaching.html', 'https://aabhisheksiloya.com/founder-business-coaching.html'],
  ['strategic-advisory.html', 'https://aabhisheksiloya.com/strategic-advisory.html'],
  ['family-enterprise-advisory.html', 'https://aabhisheksiloya.com/family-enterprise-advisory.html'],
];

const essays = [
  'the-new-household-economy.html',
  'the-middle-class-ladder-is-being-repriced.html',
  'who-gets-to-live-in-the-ai-economy.html',
  'everyone-wants-an-ai-employee.html',
  'the-founder-building-a-kinder-internet-for-children.html',
  'the-future-of-travel-2026.html',
  'thirty-minutes-of-truth.html',
  'know-own-grow-the-relationship-issue.html',
];

const jsonLd = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map((match) => JSON.parse(match[1]));

const entities = (blocks) => blocks.flatMap((block) => block['@graph'] || [block]);

test('production deploy excludes the review-v2 duplicate pages', async () => {
  const reviewRoot = new URL('../review-v2/', import.meta.url);
  await assert.rejects(
    readdir(reviewRoot),
    (error) => error.code === 'ENOENT',
    'review-v2 must not be published with the canonical site',
  );
});

test('sitemap exposes every canonical service and essay without review routes', async () => {
  const sitemap = await read('sitemap.xml');
  for (const [, canonical] of servicePages) assert.match(sitemap, new RegExp(`<loc>${canonical.replaceAll('.', '\\.')}</loc>`));
  for (const essay of essays) assert.match(sitemap, new RegExp(`editorial/essays/${essay.replaceAll('.', '\\.')}`));
  assert.doesNotMatch(sitemap, /review-v2/);
});

test('service pages state one intent and expose one connected Service entity', async () => {
  const titles = new Set();
  for (const [path, canonical] of servicePages) {
    await access(new URL(path, root));
    const html = await read(path);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title, `${path} needs a title`);
    assert.ok(!titles.has(title), `${path} needs a unique title`);
    titles.add(title);
    assert.match(html, /<meta name="description" content="[^"]+">/);
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical.replaceAll('.', '\\.')}"`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path} needs one H1`);
    assert.match(html, /<meta property="og:title" content="[^"]+">/);
    assert.match(html, /<meta property="og:description" content="[^"]+">/);
    assert.match(html, /<meta property="og:image" content="https:\/\/[^"]+\/assets\/aabhishek-siloya-social-card\.jpg">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
    assert.match(html, /class="lead-dialog"/);
    assert.match(html, /href="privacy\.html">Privacy notice<\/a>/);
    const service = entities(jsonLd(html)).find((item) => item['@type'] === 'Service');
    assert.ok(service, `${path} needs Service JSON-LD`);
    assert.equal(service.provider['@id'], 'https://aabhisheksiloya.com/#person');
    assert.equal(service.url, canonical);
  }
});

test('homepage connects visitors and machines to all three services', async () => {
  const html = await read('index.html');
  const graph = entities(jsonLd(html));
  const person = graph.find((item) => item['@id'] === 'https://aabhisheksiloya.com/#person');
  for (const [path, canonical] of servicePages) {
    assert.match(html, new RegExp(`href="${path.replaceAll('.', '\\.')}"`));
    assert.ok(graph.some((item) => item['@type'] === 'Service' && item.url === canonical));
  }
  assert.equal(person.makesOffer.length, 3);
});

test('Editorial landing and essays expose complete discovery metadata', async () => {
  const landing = await read('editorial/index.html');
  assert.match(landing, /<h1[^>]*>[^<]*Editorial[^<]*<\/h1>/i);
  assert.match(landing, /<meta name="twitter:title" content="[^"]+">/);
  assert.match(landing, /<meta name="twitter:description" content="[^"]+">/);
  assert.match(landing, /<meta name="twitter:image" content="[^"]+">/);

  for (const essay of essays) {
    const html = await read(`editorial/essays/${essay}`);
    assert.match(html, /<meta name="description" content="[^"]+">/, `${essay} needs a description`);
    assert.match(html, /<meta property="og:title" content="[^"]+">/);
    assert.match(html, /<meta property="og:description" content="[^"]+">/);
    assert.match(html, /<meta property="og:image" content="https:\/\/[^"]+\/[^"]+">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${essay} needs one H1`);
    assert.match(html, /href="\.\.\/\.\.\/about\.html"[^>]*rel="author"/);
    const article = entities(jsonLd(html)).find((item) => item['@type'] === 'Article');
    assert.ok(article, `${essay} needs Article JSON-LD`);
    assert.equal(article.author['@id'], 'https://aabhisheksiloya.com/#person');
    assert.match(article.datePublished, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(article.dateModified, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test('diagnostic has one H1, site identity and share metadata', async () => {
  const html = await read('diagnostic/index.html');
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /<link rel="icon" href="\.\.\/assets\/favicon\.svg"/);
  assert.match(html, /<meta property="og:title" content="[^"]+">/);
  assert.match(html, /<meta property="og:description" content="[^"]+">/);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
});

test('release notes preserve the post-deployment indexing operations', async () => {
  const notes = await read('docs/releases/2026-09-26-seo-aeo-visibility.md');
  assert.match(notes, /Google Search Console/);
  assert.match(notes, /Bing Webmaster Tools/);
  assert.match(notes, /abhisheksiloiya\.github\.io\/Editorial/);
  assert.match(notes, /cross-domain canonical/i);
  assert.match(notes, /no ranking guarantee/i);
});
