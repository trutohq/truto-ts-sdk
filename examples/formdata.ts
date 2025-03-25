import TrutoApi from '../src'

const truto = new TrutoApi({
  token: process.env.TRUTO_API_TOKEN as string,
  baseUrl: process.env.TRUTO_API_BASE_URL as string,
})

const formData = new FormData()

formData.append('file', new Blob(['test'], { type: 'text/plain' }), 'test.txt')

const response = await truto.proxyApi.create(formData, {
  resource: 'files',
  integrated_account_id: '820b732c-bd4d-4b98-b33e-fda752a368ff',
  truto_body_passthrough: true,
})

console.log(response)

const file = await truto.proxyApi.get(response.fileId, {
  resource: 'files',
  integrated_account_id: '820b732c-bd4d-4b98-b33e-fda752a368ff',
})

console.log(await file.text())
