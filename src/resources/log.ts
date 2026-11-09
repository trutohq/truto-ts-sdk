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

/** The `log_type_filter` shape for each `log_type`. */
export type LogFilterByType = {
  unified_proxy_api: UnifiedProxyApiLogFilter
  rapid_bridge: RapidBridgeLogFilter
  webhook: WebhookLogFilter
  mcp: McpLogFilter
  sync_job_cron_trigger: SyncJobCronTriggerLogFilter
}

/** The `log_type_filter` accepted for log type `L`. */
export type LogFilterFor<L extends LogType> = LogFilterByType[L]

/**
 * Log query parameters. With a literal `log_type` the filter is narrowed to
 * that type's keys; `LogQueryParams` without an argument is the union of all
 * of them, each still strict.
 */
export type LogQueryParams<L extends LogType = LogType> = L extends LogType
  ? LogQueryBase & { log_type: L; log_type_filter?: LogFilterFor<L> }
  : never

export type Log = {
  _id: string
  timestamp: string
  metadata?: Record<string, unknown>
}

export class LogResource {
  constructor(private apiClient: ApiClient) {}
  /**
   * Generic over the log type: a literal `log_type` only accepts that type's
   * filter keys, and a non-literal `LogType` accepts any `LogTypeFilter`.
   */
  public list<L extends LogType>(
    options: PaginationOptions &
      LogQueryBase & { log_type: L; log_type_filter?: LogFilterFor<L> }
  ) {
    return new Cursor<Log>(this.apiClient, 'log', options)
  }
}
