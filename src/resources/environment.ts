import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type Environment = {
  id: string
  name: string
  team_id: string
  created_at: string
  updated_at: string
}

export type EnvironmentUpdatePayload = {
  name?: string
}

export class EnvironmentResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<Environment>(this.apiClient, 'environment', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<Environment>('environment', id, queryParams)
  }
  public update(
    id: string,
    body: EnvironmentUpdatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<Environment, EnvironmentUpdatePayload>(
      'environment',
      id,
      body,
      queryParams
    )
  }
}
