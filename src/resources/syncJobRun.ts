import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class SyncJobRunResource {
  constructor(private apiClient: ApiClient) {}
  public list<T = any>(options?: PaginationOptions) {
    return new Cursor<T>(this.apiClient, 'sync-job-run', options)
  }
  public get<T = any>(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<T>('sync-job-run', id, queryParams)
  }
  public update<T = any, U = any>(
    id: string,
    body: U,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<T, U>('sync-job-run', id, body, queryParams)
  }
  public create<T = any, U = any>(
    body: U,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<T, U>('sync-job-run', body, queryParams)
  }

  public delete(id: string) {
    return this.apiClient.delete('sync-job-run', id)
  }
}
