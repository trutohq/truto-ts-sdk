import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type Daemon = {
  id: string
  environment_id: string
  daemon_id: string
  metadata: Record<string, unknown>
  group_key: string
  created_at: string
  updated_at: string
  last_active_at?: string | null
}

export type DaemonCreatePayload = {
  daemon_id: string
  group_key: string
  metadata?: Record<string, unknown>
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

  public delete(id: string) {
    return this.apiClient.delete('daemon', id)
  }

  public ping(daemonId: string) {
    return this.apiClient.create<{ success: true }, { daemon_id: string }>(
      'daemon/ping',
      {
        daemon_id: daemonId,
      }
    )
  }
}
