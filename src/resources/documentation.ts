import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type EntityType =
  | 'integration'
  | 'unified_model'
  | 'environment_integration'
  | 'environment_unified_model'
export type DocumentationType =
  | 'readme'
  | 'note'
  | 'end_user_guide'
  | 'description'
  | 'query_schema'
  | 'body_schema'
  | 'response_schema'

export type Documentation = {
  id: string
  entity_id: string
  entity_type?: EntityType
  content: string
  type: DocumentationType
  authentication_method?: string | null
  method?: string | null
  resource?: string | null
  integration_name?: string | null
  created_at: string
  updated_at: string
}

export type DocumentationCreatePayload = {
  entity_id: string
  entity_type?: EntityType
  content: string
  type?: DocumentationType
  authentication_method?: string
  method?: string | null
  resource?: string | null
  integration_name?: string | null
}

export type DocumentationUpdatePayload = {
  entity_id?: string
  entity_type?: EntityType
  content?: string
  type?: DocumentationType
  authentication_method?: string
  method?: string
  resource?: string
  integration_name?: string
}

export type DocumentationQueryParams = {
  integration_id?: string
  environment_integration_id?: string
  unified_model_id?: string
  environment_unified_model_id?: string
}

export class DocumentationResource {
  constructor(private apiClient: ApiClient) {}
  public list(options: PaginationOptions & DocumentationQueryParams) {
    return new Cursor<Documentation>(this.apiClient, 'documentation', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<Documentation>('documentation', id, queryParams)
  }
  public create(
    body: DocumentationCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<Documentation, DocumentationCreatePayload>(
      'documentation',
      body,
      queryParams
    )
  }
  public update(
    id: string,
    body: DocumentationUpdatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<Documentation, DocumentationUpdatePayload>(
      'documentation',
      id,
      body,
      queryParams
    )
  }
  public delete(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.delete('documentation', id, queryParams)
  }
}
