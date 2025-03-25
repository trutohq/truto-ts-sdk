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

export type IntegratedAccountTool = {
  resource: string
  method: string
  name: string
  description: string
  query_schema: Record<string, unknown>
  body_schema: Record<string, unknown>
  required: string[]
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
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<IntegratedAccount>(
      'integrated-account',
      id,
      queryParams
    )
  }
  public update(
    id: string,
    body: IntegratedAccountUpdatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<
      IntegratedAccount,
      IntegratedAccountUpdatePayload
    >('integrated-account', id, body, queryParams)
  }
  public delete(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.delete('integrated-account', id, queryParams)
  }

  public refreshCredentials(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.request<{ success: boolean }>(
      `integrated-account/refresh-credentials`,
      {
        method: 'POST',
        body: JSON.stringify({
          id,
        }),
        queryParams,
      }
    )
  }

  public async tools(
    id: string,
    methods?: string[],
    queryParams?: Record<string, unknown>
  ) {
    return (
      await this.apiClient.list<IntegratedAccountTool>(
        `integrated-account/${id}/tools`,
        {
          ...queryParams,
          methods: methods?.join(','),
        }
      )
    ).result
  }
}
