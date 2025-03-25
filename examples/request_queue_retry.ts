import TrutoApi, { RequestQueue } from '../src'

const truto = new TrutoApi({
  token: process.env.TRUTO_API_TOKEN as string,
  baseUrl: process.env.TRUTO_API_BASE_URL as string,
})

const queue = new RequestQueue(truto, {
  concurrency: 3,
  interval: 1000,
})

await Promise.all(
  Array.from({ length: 100 }, async (_, i) => {
    await queue.proxyApi.get(
      '50',
      {
        integrated_account_id: '820b732c-bd4d-4b98-b33e-fda752a368ff',
        resource: 'tickets',
      },
      {
        onRetry: (error, attempt) => {
          console.log(`Retrying ${i}`, error, attempt)
        },
      }
    )
  })
)
