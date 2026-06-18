# Advanced Usage

This document covers additional SDK endpoints available on the `TrutoApi` client. For core usage (unified API, proxy API, integrated accounts, etc.), see the main [README](./README.md).

## Table of Contents

- [Custom API](#custom-api)
- [MCP (Model Context Protocol)](#mcp-model-context-protocol)
- [Workflows](#workflows)
- [Workflow Runs](#workflow-runs)
- [Alarms](#alarms)
- [Static Gates](#static-gates)
- [Sandbox Integrated Accounts](#sandbox-integrated-accounts)
- [Integrated Account Webhooks](#integrated-account-webhooks)
- [Environment Integration Webhooks](#environment-integration-webhooks)

---

## Custom API

Make arbitrary HTTP requests through Truto's custom API proxy. Useful when the unified or proxy API doesn't cover a specific integration endpoint.

Accessible via `trutoApi.customApi`.

```javascript
// GET request
const result = await trutoApi.customApi.get('my/custom/path', {
  integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c',
})

// POST request
await trutoApi.customApi.post(
  'my/custom/path',
  { key: 'value' },
  { integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c' }
)

// PUT request
await trutoApi.customApi.put(
  'my/custom/path',
  { key: 'updated-value' },
  { integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c' }
)

// PATCH request
await trutoApi.customApi.patch(
  'my/custom/path',
  { key: 'partial-update' },
  { integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c' }
)

// DELETE request
await trutoApi.customApi.delete('my/custom/path', {
  integrated_account_id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c',
})
```

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `get(path, queryParams?)` | `path`: API path, `queryParams`: optional filters including `integrated_account_id` | GET request |
| `post(path, body?, queryParams?)` | `path`: API path, `body`: request payload, `queryParams`: optional filters | POST request |
| `put(path, body?, queryParams?)` | `path`: API path, `body`: request payload, `queryParams`: optional filters | PUT request |
| `patch(path, body?, queryParams?)` | `path`: API path, `body`: request payload, `queryParams`: optional filters | PATCH request |
| `delete(path, queryParams?)` | `path`: API path, `queryParams`: optional filters | DELETE request |

---

## MCP (Model Context Protocol)

Interact with Truto's MCP server to discover and invoke tools programmatically. This is useful for building AI agents that need to call integration tools via the MCP protocol.

Accessible via `trutoApi.mcp`.

```javascript
const mcpToken = 'your-mcp-token'

// Initialize an MCP session
const initResponse = await trutoApi.mcp.initialize(
  mcpToken,
  'my-client',
  '1.0.0'
)

// List available tools
const tools = await trutoApi.mcp.listTools(mcpToken)

// Call a specific tool
const result = await trutoApi.mcp.callTool(mcpToken, 'list_tickets', {
  status: 'open',
})

// Low-level call with a raw MCP payload
const response = await trutoApi.mcp.call(mcpToken, {
  method: 'tools/call',
  id: 3,
  params: { name: 'get_ticket', arguments: { id: '123' } },
})
```

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `initialize(token, clientName, clientVersion, queryParams?)` | Start an MCP session | Sends an `initialize` request with protocol version `2024-11-05` |
| `listTools(token, queryParams?)` | List available tools | Sends a `tools/list` request |
| `callTool(token, name, args, queryParams?)` | Invoke a tool by name | Sends a `tools/call` request with the given arguments |
| `call(token, payload, queryParams?)` | Send a raw MCP payload | Low-level method for custom MCP messages |

---

## Workflows

Create and manage automation workflows.

Accessible via `trutoApi.workflow`.

```javascript
// List all workflows
const workflows = await trutoApi.workflow.list()
for await (const workflow of workflows) {
  console.log(workflow)
}

// Get a specific workflow
const workflow = await trutoApi.workflow.get('workflow-id')

// Create a workflow
const newWorkflow = await trutoApi.workflow.create({
  trigger_name: 'on_ticket_created',
  config: {
    actions: [{ type: 'notify', channel: 'slack' }],
  },
})

// Update a workflow
await trutoApi.workflow.update('workflow-id', {
  config: { actions: [{ type: 'notify', channel: 'email' }] },
})

// Delete a workflow
await trutoApi.workflow.delete('workflow-id')
```

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `list(options?)` | `options`: pagination + `environment_id`, `trigger_name` filters | List workflows (paginated cursor) |
| `get(id, queryParams?)` | `id`: workflow ID | Get a single workflow |
| `create(body, queryParams?)` | `body`: `{ trigger_name, config }` | Create a new workflow |
| `update(id, body, queryParams?)` | `id`: workflow ID, `body`: partial update | Update an existing workflow |
| `delete(id, queryParams?)` | `id`: workflow ID | Delete a workflow |

---

## Workflow Runs

Track and manage individual executions of workflows.

Accessible via `trutoApi.workflowRun`.

```javascript
// List runs for a specific workflow
const runs = await trutoApi.workflowRun.list({ workflow_id: 'workflow-id' })
for await (const run of runs) {
  console.log(run.status, run.result)
}

// Get a specific run
const run = await trutoApi.workflowRun.get('run-id')

// Create a workflow run
const newRun = await trutoApi.workflowRun.create({
  workflow_id: 'workflow-id',
  environment_id: 'env-id',
  status: 'pending',
})

// Update a run (e.g. mark as completed)
await trutoApi.workflowRun.update('run-id', {
  status: 'completed',
  result: { tickets_processed: 42 },
})

// Delete a run
await trutoApi.workflowRun.delete('run-id')
```

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `list(options?)` | `options`: pagination + `workflow_id`, `environment_id`, `status` filters | List workflow runs (paginated cursor) |
| `get(id, queryParams?)` | `id`: run ID | Get a single run |
| `create(body, queryParams?)` | `body`: `{ workflow_id, environment_id, status }` | Create a new run |
| `update(id, body, queryParams?)` | `id`: run ID, `body`: partial update (`status`, `result`, `error`) | Update a run |
| `delete(id, queryParams?)` | `id`: run ID | Delete a run |

---

## Alarms

Create and manage alarms that trigger on schedules, durations, or specific dates.

Accessible via `trutoApi.alarm`.

```javascript
// List all alarms
const alarms = await trutoApi.alarm.list()
for await (const alarm of alarms) {
  console.log(alarm)
}

// Get a specific alarm
const alarm = await trutoApi.alarm.get('alarm-id')

// Create a cron-based alarm
const cronAlarm = await trutoApi.alarm.create({
  alarm_type: 'cron',
  cron_expression: '0 9 * * *',
  entity_id: 'some-entity-id',
})

// Create a duration-based alarm
const durationAlarm = await trutoApi.alarm.create({
  alarm_type: 'duration',
  duration: 3600,
  entity_id: 'some-entity-id',
})

// Create a date-based alarm
const dateAlarm = await trutoApi.alarm.create({
  alarm_type: 'date',
  date: '2026-06-01T00:00:00.000Z',
  entity_id: 'some-entity-id',
})

// Update an alarm
await trutoApi.alarm.update('alarm-id', {
  cron_expression: '0 10 * * *',
})

// Delete an alarm
await trutoApi.alarm.delete('alarm-id')
```

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `list(options?)` | `options`: pagination + `alarm_type`, `entity_id` filters | List alarms (paginated cursor) |
| `get(id, queryParams?)` | `id`: alarm ID | Get a single alarm |
| `create(body, queryParams?)` | `body`: `{ alarm_type, entity_id }` + optional `cron_expression`, `duration`, `date` | Create an alarm |
| `update(id, body, queryParams?)` | `id`: alarm ID, `body`: partial update | Update an alarm |
| `delete(id, queryParams?)` | `id`: alarm ID | Delete an alarm |

---

## Static Gates

Manage static gates that define domain-scoped access points.

Accessible via `trutoApi.staticGate`.

```javascript
// List all static gates
const gates = await trutoApi.staticGate.list()
for await (const gate of gates) {
  console.log(gate)
}

// Get a specific static gate
const gate = await trutoApi.staticGate.get('gate-id')

// Create a static gate
const newGate = await trutoApi.staticGate.create({
  name: 'Production Gate',
  domain: 'api.example.com',
  environment_id: 'env-id',
})

// Update a static gate
await trutoApi.staticGate.update('gate-id', {
  name: 'Updated Gate Name',
})

// Delete a static gate
await trutoApi.staticGate.delete('gate-id')
```

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `list(options?)` | `options`: pagination + `name`, `created_by`, `environment_id` filters | List static gates (paginated cursor) |
| `get(id, queryParams?)` | `id`: gate ID | Get a single gate |
| `create(body, queryParams?)` | `body`: `{ name, domain, environment_id }` + optional `api_token_secret`, `created_by` | Create a gate |
| `update(id, body, queryParams?)` | `id`: gate ID, `body`: partial update (`name`, `domain`) | Update a gate |
| `delete(id, queryParams?)` | `id`: gate ID | Delete a gate |

---

## Sandbox Integrated Accounts

Create sandboxed copies of integrated accounts for testing purposes.

Accessible via `trutoApi.sandboxIntegratedAccount`.

```javascript
// List sandbox accounts
const sandboxAccounts = await trutoApi.sandboxIntegratedAccount.list()
for await (const account of sandboxAccounts) {
  console.log(account)
}

// Get a specific sandbox account
const account = await trutoApi.sandboxIntegratedAccount.get('sandbox-account-id')

// Create a sandbox copy of an integrated account
const sandbox = await trutoApi.sandboxIntegratedAccount.create({
  id: '766cc1ee-6637-4aa1-a73e-a0c89ccc867c', // ID of the integrated account to sandbox
})

// Delete a sandbox account
await trutoApi.sandboxIntegratedAccount.delete('sandbox-account-id')
```

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `list(options?)` | `options`: pagination + query filters | List sandbox accounts (paginated cursor) |
| `get(id, queryParams?)` | `id`: sandbox account ID | Get a single sandbox account |
| `create(body, queryParams?)` | `body`: `{ id }` (ID of the source integrated account) | Create a sandbox account |
| `delete(id, queryParams?)` | `id`: sandbox account ID | Delete a sandbox account |

---

## Integrated Account Webhooks

Process incoming webhooks for a specific integrated account.

Accessible via `trutoApi.integratedAccountWebhook`.

```javascript
// Process a webhook payload for an integrated account
await trutoApi.integratedAccountWebhook.process(
  '766cc1ee-6637-4aa1-a73e-a0c89ccc867c', // integrated account ID
  {
    event: 'ticket.created',
    data: { id: '123', title: 'New ticket' },
  }
)
```

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `process(integratedAccountId, body, queryParams?)` | `integratedAccountId`: account ID, `body`: webhook payload | Forward a webhook payload for processing |

---

## Environment Integration Webhooks

Process incoming webhooks for a specific environment integration.

Accessible via `trutoApi.environmentIntegrationWebhook`.

```javascript
// Process a webhook payload for an environment integration
await trutoApi.environmentIntegrationWebhook.process(
  'env-integration-id',
  {
    event: 'sync.completed',
    data: { records: 150 },
  }
)
```

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `process(environmentIntegrationId, body, queryParams?)` | `environmentIntegrationId`: environment integration ID, `body`: webhook payload | Forward a webhook payload for processing |
