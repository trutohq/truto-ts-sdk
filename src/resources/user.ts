import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export class UserResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<any>(this.apiClient, 'user', options)
  }
  public get(id: string) {
    return this.apiClient.get<any>('user', id)
  }
}
