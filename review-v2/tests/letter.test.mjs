import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const read = name => readFile(new URL('../'+name, import.meta.url), 'utf8');
test('private letter addresses the full audience and closes with one clear invitation', async()=>{
  const html=await read('letter.html');
  assert.match(html,/For those carrying<br>what comes next/);
  assert.match(html,/founders, owners and senior leaders/i);
  assert.match(html,/class="letter-hero-portrait"/);
  assert.match(html,/class="letter-seal"/);
  assert.doesNotMatch(html,/A Letter to the Founder|Dear founder/i);
  const order=['To the person carrying the responsibility,','Working alongside you','Built for the longer view','Make the outcome measurable.','A private conversation','The nature of our work','Yours,','Begin a private conversation'];
  const positions=order.map(s=>html.indexOf(s));
  assert.ok(positions.every(n=>n>=0));
  assert.deepEqual(positions,[...positions].sort((a,b)=>a-b));
  assert.match(html,/does not include investment, tax or legal advice/);
  assert.match(html,/data-lead="conversation"/);
});

test('private letter defines measurable outcomes without promising results', async()=>{
  const html=await read('letter.html');
  assert.match(html,/id="progress-measures"/);
  assert.match(html,/Revenue or margin/);
  assert.match(html,/Hours \/ week/);
  assert.match(html,/Founder-dependent decisions/);
  assert.match(html,/measures, not promised results/i);
  assert.match(html,/baseline and target are agreed with you/i);
  assert.doesNotMatch(html,/guaranteed revenue|guaranteed growth|guaranteed time/i);
});
test('About puts Phenom first, then Sanjay, Sandeep and Martin with one-to-one mentoring stated',async()=>{
  const html=await read('about.html');
  const chapter=html.slice(html.indexOf('id="why-coaching"'),html.indexOf('id="private-room"'));
  const order=['Phenom Coaching Systems','Sanjay Wadhwa','Sandeep Mukhi','Martin Clay'];
  const positions=order.map(s=>chapter.indexOf(s));
  assert.ok(positions.every(n=>n>=0));
  assert.deepEqual(positions,[...positions].sort((a,b)=>a-b));
  assert.equal((chapter.match(/class="certificate-reserve"/g)||[]).length,1);
  assert.equal((chapter.match(/class="mentor-portrait"/g)||[]).length,3);
  assert.match(chapter,/Sanjay[\s\S]*one-to-one/);
  assert.match(chapter,/Sandeep[\s\S]*one-to-one/);
  assert.match(chapter,/Martin[\s\S]*one-to-one/);
  assert.match(chapter,/Connectd Board Advisor Course/);
  assert.match(chapter,/48492/);
  assert.match(chapter,/https:\/\/verify.trueoriginal.com\/E18C6F62-13E3-F39D-21CB-A4D4D4A3F715\//);
  assert.doesNotMatch(chapter,/\?token=|__cu=/);
});
