import TrutoApi from '../src'

const truto = new TrutoApi({
  token: process.env.TRUTO_API_TOKEN as string,
  baseUrl: process.env.TRUTO_API_BASE_URL as string,
})

const formData = new FormData()

formData.append('test', 'test')

formData.append('file', new Blob(['test'], { type: 'text/plain' }), 'test.txt')

await truto.proxyApi.create(formData, {
  resource: 'multipart',
  integrated_account_id: 'abefac22-863d-4444-be2c-239a2d505cf7',
})
