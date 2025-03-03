import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type DaemonJob = {
  id: string
  label: string
  args_schema?: Record<string, unknown>
  args_validation?: string
  environment_id: string
  created_at: string
  updated_at: string
}

export type DaemonJobCreatePayload = {
  label: string
  args_schema?: Record<string, unknown>
  args_validation?: string
}

export type DaemonJobUpdatePayload = {
  label?: string
  args_schema?: Record<string, unknown>
  args_validation?: string
}

export class DaemonJobResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<DaemonJob>(this.apiClient, 'daemon-job', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<DaemonJob>('daemon-job', id, queryParams)
  }
  public update(
    id: string,
    body: DaemonJobUpdatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<DaemonJob, DaemonJobUpdatePayload>(
      'daemon-job',
      id,
      body,
      queryParams
    )
  }
  public create(
    body: DaemonJobCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<DaemonJob, DaemonJobCreatePayload>(
      'daemon-job',
      body,
      queryParams
    )
  }

  public delete(id: string) {
    return this.apiClient.delete('daemon-job', id)
  }
}
