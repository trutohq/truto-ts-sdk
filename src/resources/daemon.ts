import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type DaemonStatus = 'stopped' | 'active' | 'stopping' | 'starting'

export type Daemon = {
  id: string
  environment_id: string
  label: string
  status: DaemonStatus
  metadata: Record<string, unknown>
  group_key: string
  created_at: string
  updated_at: string
  last_active_at?: string | null
  lock?: string | null
}

export type DaemonCreatePayload = {
  label: string
  status: DaemonStatus
  group_key: string
  metadata?: Record<string, unknown>
}

export type DaemonUpdatePayload = {
  label?: string
  status?: DaemonStatus
  group_key?: string
  metadata?: Record<string, unknown>
  last_active_at?: string | null
  lock?: string | null
}

export class DaemonResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<Daemon>(this.apiClient, 'daemon', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<Daemon>('daemon', id, queryParams)
  }
  public create(
    body: DaemonCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<Daemon, DaemonCreatePayload>(
      'daemon',
      body,
      queryParams
    )
  }
  public update(
    id: string,
    body: DaemonUpdatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<Daemon, DaemonUpdatePayload>(
      'daemon',
      id,
      body,
      queryParams
    )
  }
  public delete(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.delete('daemon', id, queryParams)
  }
}
