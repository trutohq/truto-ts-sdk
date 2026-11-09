import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type LogType =
  | 'unified_proxy_api'
  | 'rapid_bridge'
  | 'webhook'
  | 'mcp'
  | 'sync_job_cron_trigger'
export type RequestType = 'proxy' | 'unified'

export type DateTimeRange = {
  gt?: string // ISO 8601 format
  lt?: string // ISO 8601 format
}

/** A single value, or an array of values to match any of. */
export type LogFilterValue = string | string[]

/** `log_type_filter` keys accepted for `log_type: 'unified_proxy_api'`. */
export type UnifiedProxyApiLogFilter = {
  request_type?: RequestType | RequestType[]
  integrated_account_id?: LogFilterValue
  environment_id?: LogFilterValue
  integration?: LogFilterValue
}

/** `log_type_filter` keys accepted for `log_type: 'rapid_bridge'` (sync job runs). */
export type RapidBridgeLogFilter = {
  integrated_account_id?: LogFilterValue
  sync_job_run_id?: LogFilterValue
  environment_id?: LogFilterValue
  sync_job_run_event?: LogFilterValue
  sync_job_id?: LogFilterValue
  webhook_id?: LogFilterValue
  integration?: LogFilterValue
}

/** `log_type_filter` keys accepted for `log_type: 'webhook'` (outbound webhook deliveries). */
export type WebhookLogFilter = {
  environment_id?: LogFilterValue
  webhook_id?: LogFilterValue
  event?: LogFilterValue
  integrated_account_id?: LogFilterValue
  integration?: LogFilterValue
}

/** `log_type_filter` keys accepted for `log_type: 'mcp'`. */
export type McpLogFilter = {
  integrated_account_id?: LogFilterValue
  mcp_server_id?: LogFilterValue
  environment_id?: LogFilterValue
  mcp_method?: LogFilterValue
  tool_name?: LogFilterValue
  resource?: LogFilterValue
  method?: LogFilterValue
  client_name?: LogFilterValue
  client_version?: LogFilterValue
  request_id?: LogFilterValue
  integration?: LogFilterValue
}

/** `log_type_filter` keys accepted for `log_type: 'sync_job_cron_trigger'`. */
export type SyncJobCronTriggerLogFilter = {
  environment_id?: LogFilterValue
}

/** Any `log_type_filter`. Keys not valid for the chosen `log_type` are ignored by the API. */
export type LogTypeFilter =
  | UnifiedProxyApiLogFilter
  | RapidBridgeLogFilter
  | WebhookLogFilter
  | McpLogFilter
  | SyncJobCronTriggerLogFilter

type LogQueryBase = {
  /** `gt` and `lt` must be at most one month apart. `lt` is required when `gt` is set. */
  created_at?: DateTimeRange
}

export type LogQueryParams = LogQueryBase &
  (
    | {
        log_type: 'unified_proxy_api'
        log_type_filter?: UnifiedProxyApiLogFilter
      }
    | { log_type: 'rapid_bridge'; log_type_filter?: RapidBridgeLogFilter }
    | { log_type: 'webhook'; log_type_filter?: WebhookLogFilter }
    | { log_type: 'mcp'; log_type_filter?: McpLogFilter }
    | {
        log_type: 'sync_job_cron_trigger'
        log_type_filter?: SyncJobCronTriggerLogFilter
      }
    // Fallback for callers holding a non-literal `LogType` (for example a
    // wrapper that takes `log_type: LogType`), so they keep compiling.
    | { log_type: LogType; log_type_filter?: LogTypeFilter }
  )

export type Log = {
  _id: string
  timestamp: string
  metadata?: Record<string, unknown>
}

export class LogResource {
  constructor(private apiClient: ApiClient) {}
  public list(options: PaginationOptions & LogQueryParams) {
    return new Cursor<Log>(this.apiClient, 'log', options)
  }
}
