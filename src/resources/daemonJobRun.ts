import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type DaemonJobRunStatus =
  | 'created'
  | 'running'
  | 'completed'
  | 'failed'
  | 'stopped'

export type DaemonJobRun = {
  id: string
  args?: Record<string, unknown>
  daemon_job_id: string
  status: DaemonJobRunStatus
  daemon_id: string
  daemon_group_key: string
  created_at: string
  started_at?: string
  finished_at?: string
  updated_at: string
  environment_id: string
}

export type DaemonJobRunCreatePayload = {
  args?: Record<string, unknown>
  daemon_group_key?: string
  daemon_job_id: string
  daemon_id: string
  status: DaemonJobRunStatus
}

export type DaemonJobRunPatchPayload = {
  status?: DaemonJobRunStatus
  started_at?: string
  finished_at?: string
}

export class DaemonJobRunResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<DaemonJobRun>(this.apiClient, 'daemon-job-run', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<DaemonJobRun>('daemon-job-run', id, queryParams)
  }
  public update(
    id: string,
    body: DaemonJobRunPatchPayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<DaemonJobRun, DaemonJobRunPatchPayload>(
      'daemon-job-run',
      id,
      body,
      queryParams
    )
  }
  public create(
    body: DaemonJobRunCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<DaemonJobRun, DaemonJobRunCreatePayload>(
      'daemon-job-run',
      body,
      queryParams
    )
  }

  public delete(id: string) {
    return this.apiClient.delete('daemon-job-run', id)
  }
}
