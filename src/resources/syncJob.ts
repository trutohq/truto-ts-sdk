import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type SyncJob = {
  id: string
  integration_name: string
  args_schema?: Record<string, unknown>
  resources?: Record<string, unknown>
  environment_id: string
  created_at: string
  updated_at: string
}

export type SyncJobCreatePayload = {
  integration_name: string
  args_schema?: Record<string, unknown>
  resources?: Record<string, unknown>
}

export type SyncJobUpdatePayload = {
  integration_name?: string
  args_schema?: Record<string, unknown>
  resources?: Record<string, unknown>
}

export class SyncJobResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<SyncJob>(this.apiClient, 'sync-job', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<SyncJob>('sync-job', id, queryParams)
  }
  public update(
    id: string,
    body: SyncJobUpdatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<SyncJob, SyncJobUpdatePayload>(
      'sync-job',
      id,
      body,
      queryParams
    )
  }
  public create(
    body: SyncJobCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<SyncJob, SyncJobCreatePayload>(
      'sync-job',
      body,
      queryParams
    )
  }

  public delete(id: string) {
    return this.apiClient.delete('sync-job', id)
  }
}
