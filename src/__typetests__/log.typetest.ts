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

// Helper types are exported.
export const value: LogFilterValue = ['x']
export const range: DateTimeRange = { gt: 'x', lt: 'y' }
export const requestType: RequestType = 'unified'
