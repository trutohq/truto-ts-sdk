import { ApiClient, ApiClientRequestOptions } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'
import { omit } from 'lodash-es'
import qs from 'qs'
import PQueue from 'p-queue'

export class ProxyApi {
  constructor(private apiClient: ApiClient) {}
  public list(
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions,
    queue?: PQueue
  ) {
    return new Cursor<any>(
      this.apiClient,
      `proxy/${queryParams.resource}`,
      omit(queryParams, ['resource']),
      init,
      queue
    )
  }
  public get(
    id: string,
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions
  ) {
    return this.apiClient.get<any>(
      `proxy/${queryParams.resource}`,
      id,
      omit(queryParams, ['resource']),
      init
    )
  }
  public update(
    id: string,
    body: Partial<any>,
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions
  ) {
    return this.apiClient.update<any, any>(
      `proxy/${queryParams.resource}`,
      id,
      body,
      omit(queryParams, ['resource']),
      init
    )
  }
  public create(
    body: Partial<any>,
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions
  ) {
    return this.apiClient.create<any, any>(
      `proxy/${queryParams.resource}`,
      body,
      omit(queryParams, ['resource']),
      init
    )
  }
  public delete(
    id: string,
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    },
    init?: ApiClientRequestOptions
  ) {
    return this.apiClient.delete(
      `proxy/${queryParams.resource}`,
      id,
      omit(queryParams, ['resource']),
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
      `/proxy/${resource}/${method}?${query}`,
      {
        method: 'POST',
        body,
        ...init,
      }
    )
  }
}
