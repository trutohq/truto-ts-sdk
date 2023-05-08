import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class UnifiedModelResource {
  constructor(private apiClient: ApiClient) {}
  public list<T = any>(options?: PaginationOptions) {
    return new Cursor<T>(this.apiClient, 'unified-model', options)
  }
  public get<T = any>(id: string) {
    return this.apiClient.get<T>('unified-model', id)
  }
  public update<T = any, U = Partial<any>>(id: string, body: U) {
    return this.apiClient.update<T, U>('unified-model', id, body)
  }
  public create<T = any, U = Partial<any>>(body: U) {
    return this.apiClient.create<T, U>('unified-model', body)
  }
  public install<T = any>(id: string) {
    return this.apiClient.create<T, { unified_model_id: string }>(
      'environment-unified-model',
      {
        unified_model_id: id,
      }
    )
  }
  public delete(id: string) {
    return this.apiClient.delete('unified-model', id)
  }
}
