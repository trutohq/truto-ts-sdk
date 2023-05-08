import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class IntegrationResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<any>(this.apiClient, 'integration', options)
  }
  public get(id: string) {
    return this.apiClient.get<any>('integration', id)
  }
  public update(id: string, body: Partial<any>) {
    return this.apiClient.update<any, any>('integration', id, body)
  }
  public create(body: Partial<any>) {
    return this.apiClient.create<any, any>('integration', body)
  }
  public install(id: string, options: { is_enabled?: boolean } = {}) {
    return this.apiClient.create<any, any>('environment-integration', {
      integration_id: id,
      ...options,
    })
  }
  public delete(id: string) {
    return this.apiClient.delete('integration', id)
  }
}
