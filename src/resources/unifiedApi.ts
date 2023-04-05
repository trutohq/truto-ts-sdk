import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'
import { omit } from 'lodash-es'

export class UnifiedApi {
  constructor(private apiClient: ApiClient) {}
  public list(
    options: PaginationOptions & {
      category: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return new Cursor<any>(
      this.apiClient,
      `unified/${options.category}/${options.resource}`,
      omit(options, ['category', 'resource'])
    )
  }
  public get(
    id: string,
    options: PaginationOptions & {
      category: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.get<any>(
      `unified/${options.category}/${options.resource}`,
      id,
      omit(options, ['category', 'resource'])
    )
  }
  public update(
    id: string,
    body: Partial<any>,
    options: PaginationOptions & {
      category: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.update<any>(
      `unified/${options.category}/${options.resource}`,
      id,
      body,
      omit(options, ['category', 'resource'])
    )
  }
  public create(
    body: Partial<any>,
    options: PaginationOptions & {
      category: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.create<any>(
      `unified/${options.category}/${options.resource}`,
      body,
      omit(options, ['category', 'resource'])
    )
  }
  public delete(
    id: string,
    options: PaginationOptions & {
      category: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.delete(
      `unified/${options.category}/${options.resource}`,
      id,
      omit(options, ['category', 'resource'])
    )
  }

  public meta(
    method: string,
    options: PaginationOptions & {
      category: string
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.get<any>(
      `unified/${options.category}/${options.resource}/meta`,
      method,
      omit(options, ['category', 'resource'])
    )
  }
}
