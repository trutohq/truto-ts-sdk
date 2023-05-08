import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class IntegratedAccountResource {
  constructor(private apiClient: ApiClient) {}
  public list<T = any>(options?: PaginationOptions) {
    return new Cursor<T>(this.apiClient, 'integrated-account', options)
  }
  public get<T = any>(id: string) {
    return this.apiClient.get<T>('integrated-account', id)
  }
  public update(id: string, body: Partial<any>) {
    return this.apiClient.update<any, any>('integrated-account', id, body)
  }
  public create(body: Partial<any>) {
    return this.apiClient.create<any, any>('integrated-account', body)
  }
  public delete(id: string) {
    return this.apiClient.delete('integrated-account', id)
  }

  public refreshCredentials(id: string) {
    return this.apiClient.request<any>(
      `integrated-account/refresh-credentials`,
      {
        method: 'POST',
        body: JSON.stringify({
          id,
        }),
      }
    )
  }
}
