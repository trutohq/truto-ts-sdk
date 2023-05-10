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
  public get(id: string) {
    return this.apiClient.get<Environment>('environment', id)
  }
  public update(id: string, body: EnvironmentUpdatePayload) {
    return this.apiClient.update<Environment, EnvironmentUpdatePayload>(
      'environment',
      id,
      body
    )
  }
}
