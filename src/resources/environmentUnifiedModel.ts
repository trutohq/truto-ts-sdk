import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'
import { UnifiedModel } from './unifiedModel.js'

export type EnvironmentUnifiedModel = {
  id: string
  unified_model_id: string
  environment_id: string
  created_at: string
  updated_at: string
  unified_model: UnifiedModel
}

export type EnvironmentUnifiedModelCreatePayload = {
  unified_model_id: string
}

export class EnvironmentUnifiedModelResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<EnvironmentUnifiedModel>(
      this.apiClient,
      'environment-unified-model',
      options
    )
  }
  public get(id: string) {
    return this.apiClient.get<EnvironmentUnifiedModel>(
      'environment-unified-model',
      id
    )
  }
  public create(body: EnvironmentUnifiedModelCreatePayload) {
    return this.apiClient.create<
      EnvironmentUnifiedModel,
      EnvironmentUnifiedModelCreatePayload
    >('environment-unified-model', body)
  }
  public delete(id: string) {
    return this.apiClient.delete('environment-unified-model', id)
  }
}
