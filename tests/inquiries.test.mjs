import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.js';

function harness() {
  const rows = [];
  return {
    rows,
    env: {
      INQUIRY_LIMITER: { limit: async () => ({ success: true }) },
      DB: { prepare: () => ({ bind: (...values) => ({ run: async () => { rows.push(values); } }) }) }
    }
  };
}
function inquiry(extra = {}) {
  return new Request('https://example.test/api/inquiries', {
    method: 'POST', headers: { Origin: 'https://example.test' },
    body: new URLSearchParams({ name: 'Website QA', email: 'qa@example.test', message: 'Planning a golf room in a future home.', ...extra })
  });
}

test('saves house-hunting context and selected finish with the inquiry', async () => {
  const { env, rows } = harness();
  const result = await worker.fetch(inquiry({ property_stage: "I'm house hunting", property_url: 'https://example.test/listing?floor=2', finish: 'The Library' }), env);
  assert.equal(result.status, 201);
  assert.deepEqual(rows[0].slice(6), ['The Library', "I'm house hunting", 'https://example.test/listing?floor=2']);
});

test('older cached forms remain compatible after the additive migration', async () => {
  const { env, rows } = harness();
  assert.equal((await worker.fetch(inquiry(), env)).status, 201);
  assert.deepEqual(rows[0].slice(7), ['', '']);
});

test('rejects unsupported, credential-bearing and overlong property links without saving', async () => {
  for (const property_url of ['javascript:alert(1)', 'file:///private.pdf', 'https://user:pass@example.test', 'not a url', `https://example.test/${'a'.repeat(2048)}`]) {
    const { env, rows } = harness();
    assert.equal((await worker.fetch(inquiry({ property_url }), env)).status, 400, property_url.slice(0, 50));
    assert.equal(rows.length, 0);
  }
});

test('rejects an unknown property stage', async () => {
  const { env, rows } = harness();
  assert.equal((await worker.fetch(inquiry({ property_stage: 'unknown' }), env)).status, 400);
  assert.equal(rows.length, 0);
});

test('database failure cannot produce a success response', async () => {
  const { env } = harness();
  env.DB.prepare = () => ({ bind: () => ({ run: async () => { throw new Error('Unavailable'); } }) });
  assert.equal((await worker.fetch(inquiry({ property_stage: 'I own a home' }), env)).status, 503);
});
