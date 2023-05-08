import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class InstalledUnifiedModelResource {
  constructor(private apiClient: ApiClient) {}
  public list<T = any>(options?: PaginationOptions) {
    return new Cursor<T>(this.apiClient, 'environment-unified-model', options)
  }
  public get<T = any>(id: string) {
    return this.apiClient.get<T>('environment-unified-model', id)
  }
  public update(id: string, body: Partial<any>) {
    return this.apiClient.update<any, any>(
      'environment-unified-model',
      id,
      body
    )
  }
  public delete(id: string) {
    return this.apiClient.delete('environment-unified-model', id)
  }
}
