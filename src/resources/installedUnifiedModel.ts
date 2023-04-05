import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class InstalledUnifiedModelResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<any>(this.apiClient, 'environment-unified-model', options)
  }
  public get(id: string) {
    return this.apiClient.get<any>('environment-unified-model', id)
  }
  public update(id: string, body: Partial<any>) {
    return this.apiClient.update<any>('environment-unified-model', id, body)
  }
  public delete(id: string) {
    return this.apiClient.delete('environment-unified-model', id)
  }
}
