import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'
import SharingOptions from '../common/SharingOptions.js'
import { Team } from './team.js'
import { EnvironmentUnifiedModel } from './environmentUnifiedModel.js'

export type UnifiedModel = {
  id: string
  name: string
  category: string
  description: string
  team_id: string
  sharing: SharingOptions
  resources: Record<string, unknown>
  scopes: Record<string, string[]>
  created_at: string
  updated_at: string
  installed_environment: string[]
  team: Team
}

export type UnifiedModelCreatePayload = {
  name: string
  category: string
  description?: string
  sharing?: SharingOptions
  resources: Record<string, unknown>
  scopes?: Record<string, string[]>
}

export type UnifiedModelUpdatePayload = {
  name?: string
  category?: string
  description?: string
  sharing?: SharingOptions
  resources?: Record<string, unknown>
  scopes?: Record<string, string[]>
}

export class UnifiedModelResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<UnifiedModel>(this.apiClient, 'unified-model', options)
  }
  public get(id: string) {
    return this.apiClient.get<UnifiedModel>('unified-model', id)
  }
  public update(id: string, body: UnifiedModelUpdatePayload) {
    return this.apiClient.update<UnifiedModel, UnifiedModelUpdatePayload>(
      'unified-model',
      id,
      body
    )
  }
  public create(body: UnifiedModelCreatePayload) {
    return this.apiClient.create<UnifiedModel, UnifiedModelCreatePayload>(
      'unified-model',
      body
    )
  }
  public install(id: string) {
    return this.apiClient.create<
      EnvironmentUnifiedModel,
      { unified_model_id: string }
    >('environment-unified-model', {
      unified_model_id: id,
    })
  }
  public delete(id: string) {
    return this.apiClient.delete('unified-model', id)
  }
}
