import assert from 'node:assert/strict';
import test from 'node:test';

test('introduction asks for consent and context, not a personal business decision', async () => {
  const { leadCopy } = await import('../assets/lead-copy.mjs');
  const copy = leadCopy('introduction');
  assert.match(copy.label, /introduce/i);
  assert.match(copy.note, /permission/i);
  assert.match(copy.subject, /introduction/i);
  assert.equal(copy.intent, 'introduction');
});

test('conversation has its own plain-language question and stable subject', async () => {
  const { leadCopy } = await import('../assets/lead-copy.mjs');
  const copy = leadCopy('conversation');
  assert.match(copy.label, /discuss/i);
  assert.match(copy.subject, /conversation/i);
  assert.equal(copy.intent, 'conversation');
  assert.deepEqual(leadCopy(undefined), copy);
});
