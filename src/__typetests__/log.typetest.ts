// Compile-time checks for LogQueryParams, run by `yarn check` (tsc --noEmit).
// Nothing here executes.
import type TrutoApi from '../index'
import type {
  LogType,
  LogTypeFilter,
  LogQueryParams,
  LogFilterValue,
  DateTimeRange,
  RequestType,
  AuditLogFilter,
  AuditActorType,
  AuditActionKind,
} from '../index'

declare const truto: TrutoApi

// A wrapper that takes a non-literal LogType must keep compiling.
export function listLogs(logType: LogType, filter?: LogTypeFilter) {
  return truto.log.list({ log_type: logType, log_type_filter: filter })
}

// Literal log types still narrow the filter keys.
export const mcp: LogQueryParams = {
  log_type: 'mcp',
  log_type_filter: { tool_name: ['a', 'b'] },
}
export const proxy: LogQueryParams = {
  log_type: 'unified_proxy_api',
  log_type_filter: { request_type: 'proxy' },
  created_at: { gt: '2026-01-01T00:00:00Z', lt: '2026-01-02T00:00:00Z' },
}

// @ts-expect-error not a log type
export const badType: LogQueryParams = { log_type: 'nope' }

// A literal log type rejects another type's filter keys, through list() too.
truto.log.list({
  log_type: 'mcp',
  // @ts-expect-error request_type is a unified_proxy_api filter key, not an mcp one
  log_type_filter: { request_type: 'proxy' },
})
export const wrongKey: LogQueryParams = {
  log_type: 'mcp',
  // @ts-expect-error request_type is not an mcp filter key
  log_type_filter: { request_type: 'proxy' },
}
export const narrowed: LogQueryParams<'webhook'> = {
  log_type: 'webhook',
  log_type_filter: { event: 'integrated_account:created' },
}
// Literal calls with the right keys compile.
truto.log.list({ log_type: 'webhook', log_type_filter: { webhook_id: 'w' } })

// The audit log takes its own keys.
truto.log.list({
  log_type: 'audit',
  log_type_filter: {
    team_id: 't',
    audit_action_kind: 'deleted',
    audit_actor_type: ['user', 'api_token'],
    audit_target_type: ['webhook', 'datastore'],
    search: 'webhook priya',
  },
  created_at: { gt: '2026-08-20T00:00:00Z', lt: '2026-11-18T00:00:00Z' },
})
export const audit: LogQueryParams<'audit'> = {
  log_type: 'audit',
  log_type_filter: { team_id: 't', audit_action: 'webhook.updated' },
}
truto.log.list({
  log_type: 'audit',
  // @ts-expect-error not an actor type
  log_type_filter: { team_id: 't', audit_actor_type: 'robot' },
})
truto.log.list({
  log_type: 'audit',
  // @ts-expect-error the API takes one action kind, not a list
  log_type_filter: { team_id: 't', audit_action_kind: ['created', 'deleted'] },
})
truto.log.list({
  log_type: 'audit',
  // @ts-expect-error mcp_server_id is an mcp filter key, not an audit one
  log_type_filter: { team_id: 't', mcp_server_id: 'm' },
})
truto.log.list({
  log_type: 'mcp',
  // @ts-expect-error audit_action is an audit filter key, not an mcp one
  log_type_filter: { audit_action: 'webhook.updated' },
})

// Helper types are exported.
export const value: LogFilterValue = ['x']
export const range: DateTimeRange = { gt: 'x', lt: 'y' }
export const requestType: RequestType = 'unified'
export const auditFilter: AuditLogFilter = { team_id: 't' }
export const actorType: AuditActorType = 'system'
export const actionKind: AuditActionKind = 'other'
