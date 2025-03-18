import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type LogType = 'unified_proxy_api' | 'rapid_bridge' | 'webhook'
export type RequestType = 'proxy' | 'unified'

export type DateTimeRange = {
  gt?: string // ISO 8601 format
  lt?: string // ISO 8601 format
}

export type LogTypeFilter = {
  request_type?: RequestType
}

export type LogQueryParams = {
  log_type: LogType
  created_at?: DateTimeRange
  log_type_filter?: LogTypeFilter
}

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
