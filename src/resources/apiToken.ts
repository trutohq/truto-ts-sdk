import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type ApiToken = {
  id: string
  name: string
  created_by: string
  environment_id: string
  created_at: string
  updated_at: string
}

export class ApiTokenResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<ApiToken>(this.apiClient, 'api-token', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<ApiToken>('api-token', id, queryParams)
  }
}
