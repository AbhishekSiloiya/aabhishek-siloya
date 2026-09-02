import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (file) => readFile(new URL(file, root), 'utf8');

test('the review is deliberately limited to Home, Work and About', async () => {
  for (const file of ['index.html', 'work.html', 'about.html']) {
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

  assert.match(css, /\.home-page \.site-header\{[^}]*position:fixed/);
  assert.match(css, /\.home-page \.hero\{[^}]*min-height:100svh/);
  assert.match(css, /\.home-page \.hero-content\{[^}]*min-height:100svh/);
  assert.match(css, /\.home-page \.philosophy h2\{[^}]*max-width:13ch/);
  assert.match(css, /\.home-page \.cgp h2\{[^}]*max-width:15ch/);
  assert.doesNotMatch(css, /\.home-page \.hero-portrait\{[^}]*position:relative/);
});

test('About is a five-part first-person trust narrative with one portrait', async () => {
  const html = await read('about.html');
  for (const id of ['identity', 'operating-path', 'why-coaching', 'private-room', 'wider-practice']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.equal((html.match(/<img\b/g) || []).length, 1);
  assert.match(html, /I help founders see the whole decision\./);
  assert.match(html, /Direct questions\. No theatre\./);
  assert.doesNotMatch(html, /award-winning|board appointment|monthly retainer|clients of my practice/i);
});

test('Work uses three proof rows, three fields and one qualified case', async () => {
  const html = await read('work.html');
  assert.equal((html.match(/class="work-record"/g) || []).length, 3);
  assert.equal((html.match(/class="field"/g) || []).length, 3);
  assert.match(html, /earlier operating experience—not clients of my present independent practice/);
  assert.match(html, /£50m\+[\s\S]*\$1bn[\s\S]*six to eight months to around four/);
  assert.match(html, /Daniella later confirmed that the itinerary feedback had been taken on board and the itinerary updated\./);
  assert.doesNotMatch(html, /client logos|logo wall|official asset/i);
});
