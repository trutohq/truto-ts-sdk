// Runs against the built package (`yarn test` builds first), so it checks the
// URLs the published SDK sends. No test framework: node's own runner.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import TrutoApi from '../dist/module.js'

function recordFetch(status = 200, body = '{}') {
  const calls = []
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), method: init?.method })
    return new Response(body, {
      status,
      headers: { 'content-type': 'application/json' },
    })
  }
  return calls
}

const BASE = 'https://api.example.test'

// Paths these methods used to build with no leading `/`, which sent them to
// `https://api.truto.onewebhook/test` (Uday, 20 Nov).
const CASES = [
  ['webhook.test', t => t.webhook.test({ id: 'w1' }), `${BASE}/webhook/test`],
  [
    'customApi.get',
    t => t.customApi.get('reports/daily', { integrated_account_id: 'a1' }),
    `${BASE}/custom/reports/daily?integrated_account_id=a1`,
  ],
  [
    'mcp.call',
    t => t.mcp.call('tok', { jsonrpc: '2.0', method: 'ping', id: 1 }),
    `${BASE}/mcp/tok`,
  ],
  [
    'datastore.test',
    t => t.datastore.test('d1', 'list'),
    `${BASE}/datastore/d1/test/list`,
  ],
  [
    'syncJobCronTrigger.schedule',
    t => t.syncJobCronTrigger.schedule('c1'),
    `${BASE}/sync-job-cron-trigger/c1/schedule`,
  ],
  [
    'daemonJobCronTrigger.schedule',
    t => t.daemonJobCronTrigger.schedule('c1'),
    `${BASE}/daemon-job-cron-trigger/c1/schedule`,
  ],
  [
    'integratedAccount.refreshCredentials',
    t => t.integratedAccount.refreshCredentials('a1'),
    `${BASE}/integrated-account/refresh-credentials`,
  ],
]

for (const [name, call, expected] of CASES) {
  test(`${name} calls ${expected.slice(BASE.length)}`, async () => {
    const calls = recordFetch()
    const truto = new TrutoApi({ token: 'x', baseUrl: BASE })
    await call(truto)
    assert.equal(calls[0]?.url, expected)
  })
}

test('a base URL with a trailing slash gets no double slash', async () => {
  const calls = recordFetch()
  const truto = new TrutoApi({ token: 'x', baseUrl: `${BASE}/` })
  await truto.webhook.test({ id: 'w1' })
  assert.equal(calls[0].url, `${BASE}/webhook/test`)
})

test('webhook.test is sent once, even when the API answers 502', async () => {
  const calls = recordFetch(502, '{"message":"bad gateway"}')
  const truto = new TrutoApi({ token: 'x', baseUrl: BASE })
  await assert.rejects(truto.webhook.test({ id: 'w1' }))
  assert.equal(calls.length, 1)
})
