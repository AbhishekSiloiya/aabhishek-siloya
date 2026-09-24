import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const articles = [
  'the-new-household-economy.html',
  'the-middle-class-ladder-is-being-repriced.html',
  'who-gets-to-live-in-the-ai-economy.html',
  'everyone-wants-an-ai-employee.html',
  'the-founder-building-a-kinder-internet-for-children.html',
  'the-future-of-travel-2026.html',
  'thirty-minutes-of-truth.html',
];

test('primary pages include native Editorial navigation', () => {
  for (const page of ['index.html', 'work.html', 'about.html', 'letter.html']) {
    const html = read(page);
    assert.match(html, /href="editorial\/"[^>]*>Editorial<\/a>/, `${page} needs native Editorial navigation`);
    assert.doesNotMatch(html, /abhisheksiloiya\.github\.io\/Editorial/);
  }
});

test('homepage has an accessible, manual Editorial feature rail', () => {
  const html = read('index.html');
  const js = read('assets/review.js');
  assert.match(html, /<section[^>]+id="editorial"/);
  assert.match(html, /data-editorial-track/);
  assert.match(html, /data-editorial-prev/);
  assert.match(html, /data-editorial-next/);
  assert.match(html, /editorial\/essays\/the-founder-building-a-kinder-internet-for-children\.html/);
  assert.match(html, /editorial\/essays\/everyone-wants-an-ai-employee\.html/);
  assert.match(html, /editorial\/essays\/the-new-household-economy\.html/);
  assert.doesNotMatch(js, /setInterval\s*\(/, 'Editorial rail must not autoplay');
});

test('Editorial landing is native and points to every published essay', () => {
  const html = read('editorial/index.html');
  assert.match(html, /<link rel="canonical" href="https:\/\/aabhisheksiloya\.com\/editorial\/">/);
  assert.match(html, /href="\.\.\/work\.html"/);
  assert.match(html, /href="\.\.\/about\.html"/);
  assert.match(html, /href="\.\.\/diagnostic\/"/);
  for (const article of articles) assert.match(html, new RegExp(`essays/${article.replaceAll('.', '\\.')}`));
  assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
});

test('published essays have native canonicals, local typography and a return path', () => {
  for (const article of articles) {
    const html = read(`editorial/essays/${article}`);
    assert.match(html, new RegExp(`https://aabhisheksiloya\\.com/editorial/essays/${article.replaceAll('.', '\\.')}`));
    assert.match(html, /href="\.\.\/"/);
    assert.match(html, /editorial-site-bridge/);
    assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
    assert.doesNotMatch(html, /src="https?:\/\//, `${article} must not make third-party image requests`);
  }
});

test('sitemap publishes the Editorial landing and essays', () => {
  const sitemap = read('sitemap.xml');
  assert.match(sitemap, /https:\/\/aabhisheksiloya\.com\/editorial\//);
  for (const article of articles) assert.match(sitemap, new RegExp(`editorial/essays/${article.replaceAll('.', '\\.')}`));
});
