import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class UnifiedModelResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<any>(this.apiClient, 'unified-model', options)
  }
  public get(id: string) {
    return this.apiClient.get<any>('unified-model', id)
  }
  public update(id: string, body: Partial<any>) {
    return this.apiClient.update<any>('unified-model', id, body)
  }
  public create(body: Partial<any>) {
    return this.apiClient.create<any>('unified-model', body)
  }
  public install(id: string) {
    return this.apiClient.create<any>('environment-unified-model', {
      unified_model_id: id,
    })
  }
  public delete(id: string) {
    return this.apiClient.delete('unified-model', id)
  }
}
