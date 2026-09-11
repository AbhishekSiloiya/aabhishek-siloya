import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { leadCopy } from '../assets/lead-copy.mjs';

const root = new URL('../', import.meta.url);
const pages = ['index.html', 'work.html', 'about.html', 'letter.html'];

test('every public page exposes one accessible lead dialog', async () => {
  for (const page of pages) {
    const html = await readFile(new URL(page, root), 'utf8');
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
    assert.equal((html.match(/id="lead-dialog"/g) || []).length, 1, page);
    assert.equal((html.match(/id="lead-form"/g) || []).length, 1, page);
    assert.match(html, /data-lead="conversation"/, page);
    assert.match(main, /data-lead="conversation"/, `${page} has a mobile-visible lead entry point in main content`);
  }
});

test('Home preserves private-conversation and trusted-introduction paths', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  assert.match(html, /data-lead="conversation"/);
  assert.match(html, /data-lead="introduction"/);
});

test('About publishes its mobile lead entry point with the current stylesheet', async () => {
  const html = await readFile(new URL('about.html', root), 'utf8');
  assert.match(html, /assets\/review\.css\?v=26/);
});

test('conversation copy is plain, private and outcome-neutral', () => {
  const copy = leadCopy('conversation');
  assert.equal(copy.intent, 'conversation');
  assert.equal(copy.subject, 'A private conversation — Aabhishek Siloya');
  assert.match(copy.note, /leave out sensitive/i);
});

test('introduction copy requires permission before personal data is shared', () => {
  const copy = leadCopy('introduction');
  assert.equal(copy.intent, 'introduction');
  assert.equal(copy.subject, 'An introduction — Aabhishek Siloya');
  assert.match(copy.note, /permission/i);
});
