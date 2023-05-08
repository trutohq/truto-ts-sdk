import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class EnvironmentResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<any>(this.apiClient, 'environment', options)
  }
  public get(id: string) {
    return this.apiClient.get<any>('environment', id)
  }
  public update(id: string, body: Partial<any>) {
    return this.apiClient.update<any, any>('environment', id, body)
  }
}
