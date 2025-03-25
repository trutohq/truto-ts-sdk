# truto-ts-sdk

`truto-ts-sdk` is a TypeScript/JavaScript library to interact with the Truto API, a powerful integration platform for connecting multiple SaaS applications. The SDK mirrors the Truto REST API, endpoints which are documented in the Truto Postman Collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/25523816-b3550004-776b-4372-be86-562791b192ce?action=collection%2Ffork&collection-url=entityId%3D25523816-b3550004-776b-4372-be86-562791b192ce%26entityType%3Dcollection%26workspaceId%3D7cc4fe33-eb97-4dc7-98b5-2a7ff2e94e67)

## Requires

NodeJS 18+ (the library uses `fetch`)

## Installation

Install the package via npm:
```bash
npm install @truto/truto-ts-sdk
```

or via yarn:

```bash
yarn add @truto/truto-ts-sdk
```

## Usage
Here's an example of how to use `@truto/truto-ts-sdk`:

### ESM Import
```javascript
import TrutoApi from '@truto/truto-ts-sdk'
```

### CommonJS Import
```javascript
const { default: TrutoApi } = require('@truto/truto-ts-sdk');
```
### Initializing the client
```javascript
const trutoApi = new TrutoApi({
  token: process.env.TRUTO_API_TOKEN,
})
```

### Calling the APIs
```javascript
// Fetch all installed integrations
const installedIntegrations = await trutoApi.environmentIntegration.list()
for await (const installedIntegration of installedIntegrations) {
  console.log(installedIntegration)
}

// Fetch integrated accounts for a tenant
const integratedAccounts = await trutoApi.integratedAccount.list({
  tenant_id: 'acme-1',
})
console.log(await integratedAccount.toArray()) // To fetch all

// Install an integration to the environment the API token is associated with
await trutoApi.integration.install('32b122db-ad24-400f-8ee7-0be21edc12ef')

// Make a request to the unified API
const unifiedApiCursor = await trutoApi.unifiedApi.list({
  unified_model: 'accounting',
  resource: 'accounts',
  integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c',
  created_at: '2023-05-01T00:00:00.000Z', // query parameters
  // any other query parameters
})
for await (const unifiedApiResource of unifiedApiCursor) {
  console.log(unifiedApiResource)
}

const unifiedApiResource = await trutoApi.unifiedApi.get('1', {
  unified_model: 'accounting',
  resource: 'accounts',
  integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c',
})
console.log(unifiedApiResource)
```

### Available Tools
The SDK provides a way to discover available tools and their schemas for each integrated account. This is particularly useful when building LLM-powered applications that need to interact with the integrations:

```javascript
// Get available tools for an integrated account
const tools = await trutoApi.integratedAccount.tools('766cc1ee-6637-4aa1-a73e-a0c89ccc867c', ['list', 'get'])
console.log(tools) // Array of tools with their schemas and requirements

// Get all tools without filtering by method
const allTools = await trutoApi.integratedAccount.tools('766cc1ee-6637-4aa1-a73e-a0c89ccc867c')
console.log(allTools)
```

Each tool in the response includes:
- `resource`: The resource name (e.g., 'tickets', 'accounts')
- `method`: The available method (e.g., 'list', 'get', 'create')
- `name`: A human-readable name for the tool
- `description`: A description of what the tool does
- `query_schema`: JSON schema for query parameters
- `body_schema`: JSON schema for request body (if applicable)
- `required`: Array of required parameter names

You can use these tools with your preferred LLM provider to:
- Generate function calls with proper parameter validation
- Create natural language interfaces to your integrations
- Build AI-powered automation workflows
- Implement dynamic integration capabilities

### Retry Options
The SDK provides built-in retry mechanisms to handle rate limits and transient failures. You can customize this behavior using the following options:

```javascript
// Example with retry options
const result = await trutoApi.unifiedApi.list({
  unified_model: 'accounting',
  resource: 'accounts',
  integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c',
}, {
  // Disable retries for this specific request
  noRetry: true,
  
  // Custom retry status codes (defaults to [408, 409, 425, 429, 502, 503, 504])
  retryStatusCodes: [429, 503],
  
  // Custom retry delay in seconds (defaults to 10)
  defaultRetryAfter: 5,
  
  // Maximum number of retries (defaults to 3)
  maxRetries: 5,
  
  // Request timeout in seconds (defaults to 30)
  timeout: 60,
  
  // Callback function to be notified of retries
  onRetry: (retryCount, statusCode) => {
    console.log(`Retry attempt ${retryCount} due to status code ${statusCode}`);
  }
});
```

### Request Queue
For handling high-volume API requests with rate limiting, the SDK provides a request queue mechanism. This allows you to control the rate of requests and handle concurrent operations efficiently:

```javascript
import TrutoApi, { RequestQueue } from '@truto/truto-ts-sdk'

const truto = new TrutoApi({
  token: process.env.TRUTO_API_TOKEN,
  baseUrl: process.env.TRUTO_API_BASE_URL,
})

// Create a request queue with custom concurrency and interval
const queue = new RequestQueue(truto, {
  concurrency: 5,  // Number of concurrent requests
  interval: 1000,   // Time interval in milliseconds between requests
})

// Use the queue to make API calls
const response = await queue.proxyApi
  .list({
    integrated_account_id: '820b732c-bd4d-4b98-b33e-fda752a368ff',
    resource: 'tickets',
    limit: 10,
  })
  .toArray()

console.log(response)
```

The request queue helps manage API rate limits by:
- Controlling the number of concurrent requests
- Spacing out requests over time
- Automatically handling rate limit responses
- Providing a clean interface for making queued API calls

### File Uploads
The SDK supports file uploads using FormData. You can also use the `truto_body_passthrough` option to send the FormData directly to the underlying integration's API:

```javascript
// Example of uploading a file with FormData
const formData = new FormData();
formData.append('file', fileObject); // fileObject is a File or Blob
formData.append('name', 'example.pdf');
formData.append('description', 'Document upload');

// Upload with standard FormData handling
await trutoApi.unifiedApi.create(formData, {
  unified_model: 'file-storage',
  resource: 'drive-items',
  integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c',
});

// Upload with body passthrough (sends FormData directly to integration)
await trutoApi.unifiedApi.create('documents', formData, {
  unified_model: 'file-storage',
  resource: 'drive-items',
  integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c',
  truto_body_passthrough: true, // FormData will be sent as-is to the integration
});
```

The `truto_body_passthrough` option is useful when you need to:
- Maintain specific FormData field names required by the integration
- Upload files to integrations that expect raw FormData
- Preserve the exact structure of your FormData request

## Contributing
We welcome contributions to improve `truto-ts-sdk`. Please submit issues or pull requests on the GitHub repository.

## License
MIT
