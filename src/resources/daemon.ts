import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class DaemonResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<any>(this.apiClient, 'daemon', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<any>('daemon', id, queryParams)
  }
  public create(body: Partial<any>, queryParams?: Record<string, unknown>) {
    return this.apiClient.create<any, any>('daemon', body, queryParams)
  }

  public delete(id: string) {
    return this.apiClient.delete('daemon', id)
  }

  public ping(daemonId: string) {
    return this.apiClient.create('daemon/ping', {
      daemon_id: daemonId,
    })
  }
}
