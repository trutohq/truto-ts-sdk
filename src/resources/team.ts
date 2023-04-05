import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class TeamResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<any>(this.apiClient, 'team', options)
  }
  public get(id: string) {
    return this.apiClient.get<any>('team', id)
  }
  public update(id: string, body: Partial<any>) {
    return this.apiClient.update<any>('team', id, body)
  }
}
