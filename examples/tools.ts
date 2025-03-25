import TrutoApi from '../src'

const truto = new TrutoApi({
  token: process.env.TRUTO_API_TOKEN as string,
  baseUrl: process.env.TRUTO_API_BASE_URL as string,
})

const tools = await truto.integratedAccount.tools(
  'da2516e7-f107-41e1-8aa8-3cef77c83df2'
)

console.log(tools)
