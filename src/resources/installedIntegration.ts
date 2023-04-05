import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class InstalledIntegrationResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<any>(this.apiClient, 'environment-integration', options)
  }
  public get(id: string) {
    return this.apiClient.get<any>('environment-integration', id)
  }
  public update(id: string, body: Partial<any>) {
    return this.apiClient.update<any>('environment-integration', id, body)
  }
  public delete(id: string) {
    return this.apiClient.delete('environment-integration', id)
  }
}
