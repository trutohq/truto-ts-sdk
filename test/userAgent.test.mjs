// Runs against the built package (`yarn test` builds first).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import TrutoApi from '../dist/module.js'

const { version } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8')
)

function recordUserAgents() {
  const sent = []
  globalThis.fetch = async (url, init) => {
    sent.push(init?.headers?.['User-Agent'])
    return new Response('{}', {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }
  return sent
}

test('sends the SDK name and version', async () => {
  const sent = recordUserAgents()
  const truto = new TrutoApi({
    token: 'x',
    baseUrl: 'https://api.example.test',
  })
  await truto.webhook.test({ id: 'w1' })
  assert.deepEqual(sent, [`truto-ts-sdk/${version}`])
})

test('adds userAgentSuffix after the SDK name', async () => {
  const sent = recordUserAgents()
  const truto = new TrutoApi({
    token: 'x',
    baseUrl: 'https://api.example.test',
    userAgentSuffix: 'langchain-toolset/0.1.8',
  })
  await truto.webhook.test({ id: 'w1' })
  assert.deepEqual(sent, [`truto-ts-sdk/${version} langchain-toolset/0.1.8`])
})
