import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'
import SharingOptions from '../common/SharingOptions.js'
import { Team } from './team.js'
import { EnvironmentIntegration } from './environmentIntegration.js'

export type Integration = {
  id: string
  name: string
  category: string
  is_beta: boolean
  config: Record<string, unknown>
  team_id: string
  team: Team
  installed_environment: string[]
  sharing: SharingOptions
  created_at: string
  updated_at: string
}

export type IntegrationCreatePayload = {
  name: string
  is_beta?: boolean
  category?: string
  config: Record<string, unknown>
  sharing?: SharingOptions
}

export type IntegrationUpdatePayload = {
  name?: string
  is_beta?: boolean
  category?: string
  config?: Record<string, unknown>
  sharing?: SharingOptions
}

export class IntegrationResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<Integration>(this.apiClient, 'integration', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<Integration>('integration', id, queryParams)
  }
  public update(
    id: string,
    body: IntegrationUpdatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<Integration, IntegrationUpdatePayload>(
      'integration',
      id,
      body,
      queryParams
    )
  }
  public create(
    body: IntegrationCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<Integration, IntegrationCreatePayload>(
      'integration',
      body,
      queryParams
    )
  }
  public install(id: string, options: { is_enabled?: boolean } = {}) {
    return this.apiClient.create<EnvironmentIntegration, any>(
      'environment-integration',
      {
        integration_id: id,
        ...options,
      }
    )
  }
  public delete(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.delete('integration', id, queryParams)
  }
}
