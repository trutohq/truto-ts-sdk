import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class SyncJobResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<any>(this.apiClient, 'sync-job', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<any>('sync-job', id, queryParams)
  }
  public update(
    id: string,
    body: Partial<any>,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<any, any>('sync-job', id, body, queryParams)
  }
  public create(body: Partial<any>, queryParams?: Record<string, unknown>) {
    return this.apiClient.create<any, any>('sync-job', body, queryParams)
  }

  public delete(id: string) {
    return this.apiClient.delete('sync-job', id)
  }
}
