import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type SyncJob = {
  id: string
  integration_name: string
  label?: string
  args_schema?: Record<string, unknown>
  args_validation?: string
  resources?: unknown[]
  default_runtime_version?: string
  environment_id: string
  mutex_key?: string
  state_key?: string
  created_at: string
  updated_at: string
}

export type SyncJobCreatePayload = {
  integration_name: string
  label?: string
  args_schema?: Record<string, unknown>
  args_validation?: string
  resources?: unknown[]
  mutex_key?: string
  state_key?: string
  default_runtime_version?: string
}

export type SyncJobUpdatePayload = {
  integration_name?: string
  label?: string
  args_schema?: Record<string, unknown>
  args_validation?: string
  resources?: unknown[]
  mutex_key?: string
  state_key?: string
  default_runtime_version?: string
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

  public delete(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.delete('sync-job', id, queryParams)
  }
}
