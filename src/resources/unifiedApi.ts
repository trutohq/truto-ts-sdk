import { ApiClient, ApiClientRequestOptions } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'
import { omit } from 'lodash-es'
import qs from 'qs'
import PQueue from 'p-queue'

export class UnifiedApi {
  constructor(private apiClient: ApiClient) {}
  public list(
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions,
    queue?: PQueue
  ) {
    return new Cursor<any>(
      this.apiClient,
      `unified/${options.unified_model}/${options.resource}`,
      omit(options, ['unified_model', 'resource']),
      init,
      queue
    )
  }
  public get(
    id: string,
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions
  ) {
    return this.apiClient.get<any>(
      `unified/${options.unified_model}/${options.resource}`,
      id,
      omit(options, ['unified_model', 'resource']),
      init
    )
  }
  public update(
    id: string,
    body: Partial<any>,
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions
  ) {
    return this.apiClient.update<any, any>(
      `unified/${options.unified_model}/${options.resource}`,
      id,
      body,
      omit(options, ['unified_model', 'resource']),
      init
    )
  }
  public create(
    body: Partial<any>,
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions
  ) {
    return this.apiClient.create<any, any>(
      `unified/${options.unified_model}/${options.resource}`,
      body,
      omit(options, ['unified_model', 'resource']),
      init
    )
  }
  public delete(
    id: string,
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions
  ) {
    return this.apiClient.delete(
      `unified/${options.unified_model}/${options.resource}`,
      id,
      omit(options, ['unified_model', 'resource']),
      init
    )
  }

  public meta(
    method: string,
    options: PaginationOptions & {
      unified_model: string
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions
  ) {
    return this.apiClient.get<any>(
      `unified/${options.unified_model}/${options.resource}/meta`,
      method,
      omit(options, ['unified_model', 'resource']),
      init
    )
  }

  public customMethod(
    method: string,
    body: Partial<any> = {},
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions
  ) {
    const { resource, ...rest } = queryParams
    const query = qs.stringify(rest)
    return this.apiClient.request<any>(
      `/unified/${resource}/${method}?${query}`,
      {
        method: 'POST',
        body,
        ...init,
      }
    )
  }
}
