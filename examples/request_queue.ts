import TrutoApi, { RequestQueue } from '../src'

const truto = new TrutoApi({
  token: process.env.TRUTO_API_TOKEN as string,
  baseUrl: process.env.TRUTO_API_BASE_URL as string,
})

const queue = new RequestQueue(truto, {
  concurrency: 10,
  interval: 1000,
})
