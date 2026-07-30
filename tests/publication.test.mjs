import assert from 'node:assert/strict';
import { access, readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const pagePath = new URL('index.html', root);

test('publication metadata uses the canonical domain and dedicated social asset', async () => {
  const html = await readFile(pagePath, 'utf8');

  assert.match(html, /<link rel="canonical" href="https:\/\/aabhisheksiloya\.com\/">/);
  assert.match(html, /<meta property="og:url" content="https:\/\/aabhisheksiloya\.com\/">/);
  assert.match(html, /<meta property="og:image" content="https:\/\/aabhisheksiloya\.com\/assets\/aabhishek-siloya-social-card\.jpg">/);
  assert.match(html, /<meta property="og:image:width" content="1200">/);
  assert.match(html, /<meta property="og:image:height" content="630">/);
  assert.match(html, /<meta name="twitter:image" content="https:\/\/aabhisheksiloya\.com\/assets\/aabhishek-siloya-social-card\.jpg">/);
});

test('publication icons and social image exist', async () => {
  for (const file of [
    'assets/favicon.svg',
    'assets/apple-touch-icon.png',
    'assets/aabhishek-siloya-social-card.jpg',
  ]) {
    await access(new URL(file, root));
  }
});

test('search discovery files expose only public canonical URLs', async () => {
  const robots = await readFile(new URL('robots.txt', root), 'utf8');
  const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8');

  assert.match(robots, /Sitemap: https:\/\/aabhisheksiloya\.com\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/aabhisheksiloya\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/aabhisheksiloya\.com\/privacy\.html<\/loc>/);
});

test('privacy and not-found pages are public and reachable from the site', async () => {
  const page = await readFile(pagePath, 'utf8');
  const privacy = await readFile(new URL('privacy.html', root), 'utf8');
  const notFound = await readFile(new URL('404.html', root), 'utf8');

  assert.match(page, /href="privacy\.html">Privacy<\/a>/);
  assert.match(privacy, /90 days/);
  assert.match(privacy, /Web3Forms/);
  assert.match(privacy, /aabhisheksiloiya708@gmail\.com/);
  assert.match(privacy, /href="\.\/" aria-label="Aabhishek Siloya — home"/);
  assert.match(privacy, /href="\.\/">Return to the website<\/a>/);
  assert.match(notFound, /href="\.\/">Return to the website<\/a>/);
});

test('person structured data identifies the canonical profile and organisations', async () => {
  const html = await readFile(pagePath, 'utf8');
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

  assert.ok(match, 'Person JSON-LD is present');

  const person = JSON.parse(match[1]);
  assert.equal(person['@type'], 'Person');
  assert.equal(person['@id'], 'https://aabhisheksiloya.com/#person');
  assert.equal(person.url, 'https://aabhisheksiloya.com/');
  assert.equal(person.image, 'https://aabhisheksiloya.com/assets/aabhishek-black-white-side-profile.jpg');
  assert.deepEqual(person.sameAs, ['https://www.linkedin.com/in/aabhisheksiloya/']);

  const organisations = Object.fromEntries(person.worksFor.map((item) => [item.name, item.url]));
  assert.equal(organisations.Bhuzen, 'https://www.bhuzen.com');
  assert.equal(organisations.VaxGuard, 'https://vaxguard.app');
});

test('hero portrait uses an optimised, high-priority delivery asset', async () => {
  const html = await readFile(pagePath, 'utf8');
  const hero = new URL('assets/aabhishek-black-white-side-profile.webp', root);

  assert.match(
    html,
    /<img src="assets\/aabhishek-black-white-side-profile\.webp" srcset="assets\/aabhishek-black-white-side-profile-768\.webp 768w, assets\/aabhishek-black-white-side-profile\.webp 896w" sizes="\(max-width: 700px\) 100vw, 53vw" alt="" width="896" height="1195" fetchpriority="high" decoding="async">/,
  );

  const heroStats = await stat(hero);
  assert.ok(heroStats.size < 180_000, `hero image is ${heroStats.size} bytes`);
});

test('below-fold portraits use responsive WebP delivery', async () => {
  const html = await readFile(pagePath, 'utf8');

  for (const basename of [
    'aabhishek-premium-long-shot-2',
    'aabhishek-thinking-pose-2',
    'aabhishek-premium-close-up-2',
    'aabhishek-sunglasses-upward-gaze-front',
  ]) {
    assert.match(html, new RegExp(`src="assets/${basename}\\.webp"`));
    assert.match(html, new RegExp(`srcset="assets/${basename}-720\\.webp 720w, assets/${basename}\\.webp`));
    await access(new URL(`assets/${basename}-720.webp`, root));
    await access(new URL(`assets/${basename}.webp`, root));
  }
});

test('critical typography is self-hosted without a render-blocking font stylesheet', async () => {
  const html = await readFile(pagePath, 'utf8');
  const privacy = await readFile(new URL('privacy.html', root), 'utf8');

  assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
  assert.doesNotMatch(privacy, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
  assert.match(html, /assets\/manrope-latin-variable\.woff2/);
  assert.match(html, /assets\/newsreader-latin-variable\.woff2/);
  assert.match(privacy, /assets\/manrope-latin-variable\.woff2/);
  assert.match(privacy, /assets\/newsreader-latin-variable\.woff2/);

  await access(new URL('assets/manrope-latin-variable.woff2', root));
  await access(new URL('assets/newsreader-latin-variable.woff2', root));
});

test('brand mark and footer disclaimer retain accessible names and contrast', async () => {
  const html = await readFile(pagePath, 'utf8');

  assert.match(html, /<a class="mark" href="#home">AS <span>Aabhishek Siloya<\/span><\/a>/);
  assert.match(html, /\.footer-disclaimer\s*\{[\s\S]*?color: rgba\(248,245,239,\.58\);/);
});

test('public deploy set excludes unused portrait source files', async () => {
  for (const file of [
    'assets/aabhishek-black-white-side-profile.png',
    'assets/aabhishek-premium-long-shot-2.jpg',
    'assets/aabhishek-thinking-pose-2.jpg',
    'assets/aabhishek-premium-close-up-2.jpg',
    'assets/aabhishek-sunglasses-upward-gaze-front.jpg',
  ]) {
    await assert.rejects(
      access(new URL(file, root)),
      (error) => error.code === 'ENOENT',
      `${file} should stay in the private source archive`,
    );
  }
});

test('production build claims the approved custom domain', async () => {
  assert.equal(
    (await readFile(new URL('CNAME', root), 'utf8')).trim(),
    'aabhisheksiloya.com',
  );
});
