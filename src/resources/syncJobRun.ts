import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'
import type { SyncJobRunErrorHandling } from './syncJobCronTrigger'

export type SyncJobRun = {
  id: string
  args?: Record<string, unknown>
  resources?: Record<string, unknown>
  sync_job_id: string
  integrated_account_id: string
  status: string
  daemon_id: string
  daemon_group_key: string
  created_at: string
  started_at?: string
  finished_at?: string
  updated_at: string
}

export type SyncJobRunCreatePayload = {
  args?: Record<string, unknown>
  resources?: Record<string, unknown>
  sync_job_id: string
  integrated_account_id: string
  status: string
  daemon_id: string
  daemon_group_key: string
}

export type SyncJobRunPatchPayload = {
  meta?: Record<string, unknown>
  error_handling?: SyncJobRunErrorHandling | null
  delay_between_requests_ms?: number | null
  resource_stats?: Record<string, unknown>
  /**
   * @deprecated Truto sets a run's status as it runs, and the API answers 400
   * (`sync_job_run_read_only_field`) to a PATCH that sends it. To stop a run,
   * call `delete(id)`; to run the job again, `create()` a new run.
   */
  status?: string
  /** @deprecated Set by Truto; the API answers 400 to a PATCH that sends it. */
  started_at?: string
  /** @deprecated Set by Truto; the API answers 400 to a PATCH that sends it. */
  finished_at?: string
}

export class SyncJobRunResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<SyncJobRun>(this.apiClient, 'sync-job-run', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<SyncJobRun>('sync-job-run', id, queryParams)
  }
  public update(
    id: string,
    body: SyncJobRunPatchPayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<SyncJobRun, SyncJobRunPatchPayload>(
      'sync-job-run',
      id,
      body,
      queryParams
    )
  }
  public create(
    body: SyncJobRunCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<SyncJobRun, SyncJobRunCreatePayload>(
      'sync-job-run',
      body,
      queryParams
    )
  }

  public delete(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.delete('sync-job-run', id, queryParams)
  }
}
