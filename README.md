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
// Get the read tools (list and get) for an integrated account
const tools = await trutoApi.integratedAccount.tools('766cc1ee-6637-4aa1-a73e-a0c89ccc867c', ['read'])
console.log(tools) // Array of tools with their schemas and requirements

// Get all tools without filtering by method
const allTools = await trutoApi.integratedAccount.tools('766cc1ee-6637-4aa1-a73e-a0c89ccc867c')
console.log(allTools)
```

`methods` accepts a method name (`list`, `get`, `create`, `update`, `delete`, or a custom method name) or a group: `read` (list and get), `write` (create, update and delete), or `custom` (everything else). Pass several entries to combine them, for example `['list', 'create']`. `tags` works the same way.

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

Truto already provides a toolset for the following LLM libraries
- Langchain.js - https://github.com/trutohq/truto-langchainjs-toolset

### Logs
`trutoApi.log.list()` reads logs for one `log_type` at a time: `unified_proxy_api`, `rapid_bridge` (sync job runs), `webhook` (outbound webhook deliveries), `mcp`, `sync_job_cron_trigger`, or `audit` (your team's audit log). `log_type_filter` takes keys specific to that log type, and TypeScript checks them for you:

```javascript
const logs = await trutoApi.log
  .list({
    log_type: 'mcp',
    created_at: { gt: '2026-10-01T00:00:00Z', lt: '2026-10-31T00:00:00Z' },
    log_type_filter: { mcp_server_id: 'f3c1...', tool_name: 'list_all_tickets' },
  })
  .toArray()
```

| `log_type` | `log_type_filter` keys |
| --- | --- |
| `unified_proxy_api` | `request_type` (`proxy` or `unified`), `integrated_account_id`, `environment_id`, `integration` |
| `rapid_bridge` | `integrated_account_id`, `sync_job_run_id`, `sync_job_id`, `sync_job_run_event`, `webhook_id`, `environment_id`, `integration` |
| `webhook` | `webhook_id`, `event`, `integrated_account_id`, `environment_id`, `integration` |
| `mcp` | `integrated_account_id`, `mcp_server_id`, `mcp_method`, `tool_name`, `resource`, `method`, `client_name`, `client_version`, `request_id`, `environment_id`, `integration` |
| `sync_job_cron_trigger` | `environment_id` |
| `audit` | `team_id` (required), `environment_id`, `audit_action`, `audit_action_kind` (`created`, `updated`, `deleted`, `failed`, `other`), `audit_actor_type`, `user_id`, `audit_target_type`, `audit_target_id`, `request_id`, `search` |

Each filter value can be a string or an array of strings to match any of them, except `team_id`, `audit_action_kind` and `search`, which take one value.

The audit log belongs to a team, not an environment: pass the team's ID as `team_id` (TypeScript requires it, since the API refuses a request without it). An admin of that team reads all of it; an API token issued for the team reads only its own environment's entries. Each entry carries the same fixed set of fields: `timestamp`, `log_type`, `team_id`, `environment_id`, the `audit_*` fields, `user_id`, `api_token_id`, and the request's `http_method`, `http_url`, `http_status_code`, `http_request_id`, `http_ip`, `http_useragent` and `http_country`.

```javascript
const deletions = await trutoApi.log
  .list({
    log_type: 'audit',
    created_at: { gt: '2026-11-01T00:00:00Z', lt: '2026-11-18T00:00:00Z' },
    log_type_filter: { team_id: '<team_id>', audit_action_kind: 'deleted' },
  })
  .toArray()
```

`created_at.gt` and `created_at.lt` can be at most one month apart (90 days for `audit`), and `lt` is required when you set `gt`.

### Errors
A failed request throws a `TrutoError` with `statusCode`, `statusText`, `response`, and `data` (the parsed response body, when there is one). A request that runs past its timeout throws a `TrutoTimeoutError`, which extends `TrutoError`. Both are exported from the package:

```javascript
import TrutoApi, { TrutoError, TrutoTimeoutError } from '@truto/truto-ts-sdk'

try {
  await trutoApi.integratedAccount.get('766cc1ee-6637-4aa1-a73e-a0c89ccc867c')
} catch (err) {
  if (err instanceof TrutoTimeoutError) {
    // retry later
  } else if (err instanceof TrutoError) {
    console.log(err.statusCode, err.data)
  }
}
```

### Retry Options
The SDK provides built-in retry mechanisms to handle rate limits and transient failures. `webhook.test()` is never retried: it sends a test event, and the API answers 502 when your endpoint refuses it, so a retry would send the event again. You can customize this behavior using the following options:

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
  },
  
  // Callback function to be notified when rate limited (429 status code)
  onRateLimited: (retryAfter, retryCount) => {
    console.log(`Rate limited, waiting ${retryAfter} seconds before retry ${retryCount + 1}`);
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
await trutoApi.unifiedApi.create(formData, {
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

`yarn run check` type-checks the source (including `src/__typetests__`), and `yarn test` builds the package and runs `test/` against the build with Node's test runner.

## License
MIT
