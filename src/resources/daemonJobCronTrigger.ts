import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type DaemonJobCronTrigger = {
  id: string
  args?: Record<string, unknown>
  daemon_job_id: string
  daemon_id: string
  cron_expression: string
  daemon_group_key?: string | null
  environment_id: string
  created_at: string
  updated_at: string
}

export type DaemonJobCronTriggerCreatePayload = {
  args?: Record<string, unknown>
  daemon_job_id: string
  daemon_id: string
  daemon_group_key?: string | null
  cron_expression: string
  environment_id: string
}

export type DaemonJobCronTriggerUpdatePayload = {
  cron_expression?: string
  daemon_group_key?: string | null
}

export class DaemonJobCronTriggerResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<DaemonJobCronTrigger>(
      this.apiClient,
      'daemon-job-cron-trigger',
      options
    )
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<DaemonJobCronTrigger>(
      'daemon-job-cron-trigger',
      id,
      queryParams
    )
  }
  public create(
    body: DaemonJobCronTriggerCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<
      DaemonJobCronTrigger,
      DaemonJobCronTriggerCreatePayload
    >('daemon-job-cron-trigger', body, queryParams)
  }
  public update(
    id: string,
    body: DaemonJobCronTriggerUpdatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<
      DaemonJobCronTrigger,
      DaemonJobCronTriggerUpdatePayload
    >('daemon-job-cron-trigger', id, body, queryParams)
  }
  public delete(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.delete('daemon-job-cron-trigger', id, queryParams)
  }
  public schedule(id: string) {
    return this.apiClient.request<{ success: boolean }>(
      `daemon-job-cron-trigger/${id}/schedule`,
      {
        method: 'POST',
      }
    )
  }
}
