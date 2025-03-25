import TrutoApi, { RequestQueue } from '../src'

const truto = new TrutoApi({
  token: process.env.TRUTO_API_TOKEN as string,
  baseUrl: process.env.TRUTO_API_BASE_URL as string,
})

const queue = new RequestQueue(truto, {
  concurrency: 10,
  interval: 1000,
})

const response = await queue.proxyApi
  .list({
    integrated_account_id: '820b732c-bd4d-4b98-b33e-fda752a368ff',
    resource: 'tickets',
    limit: 10,
  })
  .toArray()

console.log(response)
