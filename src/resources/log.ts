import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type LogType =
  | 'unified_proxy_api'
  | 'rapid_bridge'
  | 'webhook'
  | 'mcp'
  | 'sync_job_cron_trigger'
  | 'audit'
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

/** Who made an audited change. Any other value is refused with a 400. */
export type AuditActorType =
  | 'user'
  | 'api_token'
  | 'truto_staff'
  | 'end_user'
  | 'integrated_account'
  | 'scim'
  | 'system'

/**
 * What an audited change did, read from the end of `audit_action`. Any other
 * value is refused with a 400.
 */
export type AuditActionKind =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'failed'
  | 'other'

/**
 * `log_type_filter` keys accepted for `log_type: 'audit'` (the team's audit
 * log). The audit log is scoped to a team, not an environment: `team_id` is
 * required (the API answers 400 without it), and the caller must be an admin of
 * that team or use an API token issued for it. An API token reads only the
 * rows of its own environment.
 */
export type AuditLogFilter = {
  /** The team whose audit log to read. The API answers 400 without it. */
  team_id: string
  environment_id?: LogFilterValue
  /** An action key such as `webhook.updated`. */
  audit_action?: LogFilterValue
  audit_action_kind?: AuditActionKind
  audit_actor_type?: AuditActorType | AuditActorType[]
  /** The dashboard user who acted. */
  user_id?: LogFilterValue
  /** The kind of object changed, e.g. `webhook`; an array matches any of them. */
  audit_target_type?: LogFilterValue
  audit_target_id?: LogFilterValue
  request_id?: LogFilterValue
  /**
   * Case-insensitive text over the action, the actor's name and the target's
   * name and id. Every word (up to 5) must appear. At most 100 characters.
   */
  search?: string
}

/** Any `log_type_filter`. Keys not valid for the chosen `log_type` are ignored by the API. */
export type LogTypeFilter =
  | UnifiedProxyApiLogFilter
  | RapidBridgeLogFilter
  | WebhookLogFilter
  | McpLogFilter
  | SyncJobCronTriggerLogFilter
  | AuditLogFilter

type LogQueryBase = {
  /**
   * `gt` and `lt` must be at most one month apart (90 days for `audit`).
   * `lt` is required when `gt` is set.
   */
  created_at?: DateTimeRange
}

/** The `log_type_filter` shape for each `log_type`. */
export type LogFilterByType = {
  unified_proxy_api: UnifiedProxyApiLogFilter
  rapid_bridge: RapidBridgeLogFilter
  webhook: WebhookLogFilter
  mcp: McpLogFilter
  sync_job_cron_trigger: SyncJobCronTriggerLogFilter
  audit: AuditLogFilter
}

/** The `log_type_filter` accepted for log type `L`. */
export type LogFilterFor<L extends LogType> = LogFilterByType[L]

/**
 * `log_type_filter` as a parameter: required for `audit`, which the API
 * refuses without `team_id`, optional for every other type. Not distributed,
 * so a non-literal `LogType` keeps it optional.
 */
type LogFilterParam<L extends LogType> = [L] extends ['audit']
  ? { log_type_filter: AuditLogFilter }
  : { log_type_filter?: LogFilterFor<L> }

/**
 * Log query parameters. With a literal `log_type` the filter is narrowed to
 * that type's keys; `LogQueryParams` without an argument is the union of all
 * of them, each still strict.
 */
export type LogQueryParams<L extends LogType = LogType> = L extends LogType
  ? LogQueryBase & { log_type: L } & LogFilterParam<L>
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
      LogQueryBase & { log_type: L } & LogFilterParam<L>
  ) {
    return new Cursor<Log>(this.apiClient, 'log', options)
  }
}
