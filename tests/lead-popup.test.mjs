import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  buildLeadPayload,
  getLeadMode,
} from '../assets/lead-form.mjs';

const pagePath = new URL('../index.html', import.meta.url);

test('page exposes four attributed lead entry points and one dialog', async () => {
  const html = await readFile(pagePath, 'utf8');

  for (const intent of ['hero', 'cgp', 'conversation', 'introduction']) {
    assert.match(html, new RegExp(`data-lead-intent="${intent}"`));
  }

  assert.equal((html.match(/id="lead-dialog"/g) || []).length, 1);
  assert.equal((html.match(/id="lead-form"/g) || []).length, 1);
  assert.match(html, /Begin with clarity/);
});

test('conversation sources resolve to the private-conversation mode', () => {
  for (const intent of ['hero', 'cgp', 'conversation']) {
    const mode = getLeadMode(intent);
    assert.equal(mode.kind, 'conversation');
    assert.equal(mode.heading, 'Begin with the decision.');
  }
});

test('introduction source resolves to the introduction mode', () => {
  const mode = getLeadMode('introduction');

  assert.equal(mode.kind, 'introduction');
  assert.equal(mode.heading, 'Make a considered introduction.');
});

test('payload records attribution without leaking irrelevant mode fields', () => {
  const payload = buildLeadPayload({
    entries: {
      name: 'Aabhishek Website Test',
      email: 'aabhisheksiloiya708@gmail.com',
      decision: 'TEST — Quiet Authority lead form delivery verification',
      introduced_person: 'Should not be included',
    },
    intent: 'cgp',
    pageUrl: 'https://aabhisheksiloiya.com/?utm_source=linkedin&utm_campaign=quiet-authority',
  });

  assert.equal(payload.intent, 'cgp');
  assert.equal(payload.utm_source, 'linkedin');
  assert.equal(payload.utm_campaign, 'quiet-authority');
  assert.equal(payload.page_url, 'https://aabhisheksiloiya.com/?utm_source=linkedin&utm_campaign=quiet-authority');
  assert.equal(payload.decision, 'TEST — Quiet Authority lead form delivery verification');
  assert.equal('introduced_person' in payload, false);
});

test('introduction payload excludes private-conversation fields', () => {
  const payload = buildLeadPayload({
    entries: {
      name: 'Trusted Introducer',
      email: 'introducer@example.com',
      introduced_person: 'A family-business owner',
      introduction_context: 'A succession decision',
      decision: 'Should not be included',
    },
    intent: 'introduction',
    pageUrl: 'https://aabhisheksiloya.com/',
  });

  assert.equal(payload.introduced_person, 'A family-business owner');
  assert.equal(payload.introduction_context, 'A succession decision');
  assert.equal('decision' in payload, false);
});
