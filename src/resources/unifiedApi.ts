import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'
import { omit } from 'lodash-es'

export class UnifiedApi {
  constructor(private apiClient: ApiClient) {}
  public list(
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return new Cursor<any>(
      this.apiClient,
      `unified/${options.unified_model}/${options.resource}`,
      omit(options, ['unified_model', 'resource'])
    )
  }
  public get(
    id: string,
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.get<any>(
      `unified/${options.unified_model}/${options.resource}`,
      id,
      omit(options, ['unified_model', 'resource'])
    )
  }
  public update(
    id: string,
    body: Partial<any>,
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.update<any, any>(
      `unified/${options.unified_model}/${options.resource}`,
      id,
      body,
      omit(options, ['unified_model', 'resource'])
    )
  }
  public create(
    body: Partial<any>,
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.create<any, any>(
      `unified/${options.unified_model}/${options.resource}`,
      body,
      omit(options, ['unified_model', 'resource'])
    )
  }
  public delete(
    id: string,
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.delete(
      `unified/${options.unified_model}/${options.resource}`,
      id,
      omit(options, ['unified_model', 'resource'])
    )
  }

  public meta(
    method: string,
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.get<any>(
      `unified/${options.unified_model}/${options.resource}/meta`,
      method,
      omit(options, ['unified_model', 'resource'])
    )
  }
}
