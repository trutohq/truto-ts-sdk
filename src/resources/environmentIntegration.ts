import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'
import { Integration } from './integration.js'

export type EnvironmentIntegration = {
  id: string
  integration_id: string
  environment_id: string
  show_in_catalog: boolean
  is_enabled: boolean
  override: Record<string, unknown>
  created_at: string
  updated_at: string
  integration: Integration
}

export type EnvironmentIntegrationUpdatePayload = {
  show_in_catalog?: boolean
  is_enabled?: boolean
  override?: Record<string, unknown>
}

export class EnvironmentIntegrationResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<EnvironmentIntegration>(
      this.apiClient,
      'environment-integration',
      options
    )
  }
  public get(id: string) {
    return this.apiClient.get<EnvironmentIntegration>(
      'environment-integration',
      id
    )
  }
  public update(id: string, body: EnvironmentIntegrationUpdatePayload) {
    return this.apiClient.update<
      EnvironmentIntegration,
      EnvironmentIntegrationUpdatePayload
    >('environment-integration', id, body)
  }
  public delete(id: string) {
    return this.apiClient.delete('environment-integration', id)
  }
}
