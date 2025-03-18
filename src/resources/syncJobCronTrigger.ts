import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type SuperQueryRegion = 'apac' | 'wnam'
export type SyncJobRunErrorHandling = 'fail_fast' | 'ignore' | 'batch'

export type SyncJobCronTrigger = {
  id: string
  args?: Record<string, unknown>
  sync_job_id: string
  integrated_account_id: string
  cron_expression: string
  daemon_group_key?: string | null
  webhook_id?: string | null
  super_query?: SuperQueryRegion | null
  meta?: Record<string, unknown>
  events_to_send?: string[] | null
  error_handling?: SyncJobRunErrorHandling | null
  environment_id: string
  created_at: string
  updated_at: string
}

export type SyncJobCronTriggerCreatePayload = {
  args?: Record<string, unknown>
  sync_job_id: string
  integrated_account_id?: string
  daemon_group_key?: string | null
  webhook_id?: string | null
  cron_expression: string
  super_query?: SuperQueryRegion | null
  error_handling?: SyncJobRunErrorHandling | null
  events_to_send?: string[] | null
  meta?: Record<string, unknown>
  environment_id: string
}

export type SyncJobCronTriggerUpdatePayload = {
  cron_expression?: string
  daemon_group_key?: string | null
  webhook_id?: string | null
  super_query?: SuperQueryRegion | null
  error_handling?: SyncJobRunErrorHandling | null
  events_to_send?: string[] | null
  meta?: Record<string, unknown>
}

export type SyncJobCronTriggerQueryParams = {
  integrated_account_id?: string
  sync_job_id?: string
}

export class SyncJobCronTriggerResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions & SyncJobCronTriggerQueryParams) {
    return new Cursor<SyncJobCronTrigger>(
      this.apiClient,
      'sync-job-cron-trigger',
      options
    )
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<SyncJobCronTrigger>(
      'sync-job-cron-trigger',
      id,
      queryParams
    )
  }
  public create(
    body: SyncJobCronTriggerCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<
      SyncJobCronTrigger,
      SyncJobCronTriggerCreatePayload
    >('sync-job-cron-trigger', body, queryParams)
  }
  public update(
    id: string,
    body: SyncJobCronTriggerUpdatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<
      SyncJobCronTrigger,
      SyncJobCronTriggerUpdatePayload
    >('sync-job-cron-trigger', id, body, queryParams)
  }
  public delete(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.delete('sync-job-cron-trigger', id, queryParams)
  }
  public schedule(id: string) {
    return this.apiClient.request<{ success: boolean }>(
      `sync-job-cron-trigger/${id}/schedule`,
      {
        method: 'POST',
      }
    )
  }
}
