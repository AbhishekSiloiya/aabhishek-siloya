import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
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
  assert.match(notFound, /href="\/">Return to the website<\/a>/);
});
