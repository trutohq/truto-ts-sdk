import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'
import { Integration } from './integration.js'
import { EnvironmentIntegration } from './environmentIntegration.js'

export type IntegratedAccount = {
  id: string
  tenant_id: string
  environment_integration_id: string
  context: Record<string, unknown>
  created_at: string
  updated_at: string
  environment_id: string
  integration: Integration
  environment_integration: Omit<EnvironmentIntegration, 'integration'>
}

export type IntegratedAccountUpdatePayload = {
  context?: Record<string, unknown>
}

export class IntegratedAccountResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<IntegratedAccount>(
      this.apiClient,
      'integrated-account',
      options
    )
  }
  public get(id: string) {
    return this.apiClient.get<IntegratedAccount>('integrated-account', id)
  }
  public update(id: string, body: IntegratedAccountUpdatePayload) {
    return this.apiClient.update<
      IntegratedAccount,
      IntegratedAccountUpdatePayload
    >('integrated-account', id, body)
  }
  public delete(id: string) {
    return this.apiClient.delete('integrated-account', id)
  }

  public refreshCredentials(id: string) {
    return this.apiClient.request<{ success: boolean }>(
      `integrated-account/refresh-credentials`,
      {
        method: 'POST',
        body: JSON.stringify({
          id,
        }),
      }
    )
  }
}
