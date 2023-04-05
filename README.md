# truto-ts-sdk

`truto-ts-sdk` is a TypeScript/JavaScript library to interact with the Truto API, a powerful integration platform for connecting multiple SaaS applications. The SDK mirrors the Truto REST API, endpoints for which are documented in the Truto Postman Collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/25523816-b3550004-776b-4372-be86-562791b192ce?action=collection%2Ffork&collection-url=entityId%3D25523816-b3550004-776b-4372-be86-562791b192ce%26entityType%3Dcollection%26workspaceId%3D7cc4fe33-eb97-4dc7-98b5-2a7ff2e94e67)

## Installation

Install the package via npm:
```bash
npm install truto-ts-sdk
```

or via yarn:

```bash
yarn add truto-ts-sdk
```

## Usage
Here's an example of how to use `truto-ts-sdk`:

```javascript
import TrutoApi from 'truto-ts-sdk'

const trutoApi = new TrutoApi({
  baseUrl: 'https://api.truto.one',
  token: process.env.TRUTO_API_TOKEN,
})

// Fetch all installed integrations
const installedIntegrations = await trutoApi.installedIntegration.list()
for await (const installedIntegration of installedIntegrations) {
  console.log(installedIntegration)
}

// Fetch integrated accounts for a tenant
const integratedAccounts = await trutoApi.integratedAccount.list({
  tenant_id: 'acme-1',
})
for await (const integratedAccount of integratedAccounts) {
  console.log(integratedAccount)
}

// Install an integration to the environment the API token is associated with
await trutoApi.integration.install('32b122db-ad24-400f-8ee7-0be21edc12ef')

// Make a request to the unified API
const unifiedApiCursor = await trutoApi.unifiedApi.list({
  category: 'accounting',
  resource: 'accounts',
  integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c',
})
for await (const unifiedApiResource of unifiedApiCursor) {
  console.log(unifiedApiResource)
}

const unifiedApiResource = await trutoApi.unifiedApi.get('1', {
  category: 'accounting',
  resource: 'accounts',
  integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c',
})
console.log(unifiedApiResource)
```

## Contributing
We welcome contributions to improve `truto-ts-sdk`. Please submit issues or pull requests on the GitHub repository.

## License
MIT
