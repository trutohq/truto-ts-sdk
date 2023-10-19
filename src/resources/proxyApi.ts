import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'
import { omit } from 'lodash-es'
import qs from 'qs'

export class ProxyApi {
  constructor(private apiClient: ApiClient) {}
  public list(
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    }
  ) {
    return new Cursor<any>(
      this.apiClient,
      `proxy/${queryParams.resource}`,
      omit(queryParams, ['resource'])
    )
  }
  public get(
    id: string,
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.get<any>(
      `proxy/${queryParams.resource}`,
      id,
      omit(queryParams, ['resource'])
    )
  }
  public update(
    id: string,
    body: Partial<any>,
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.update<any, any>(
      `proxy/${queryParams.resource}`,
      id,
      body,
      omit(queryParams, ['resource'])
    )
  }
  public create(
    body: Partial<any>,
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.create<any, any>(
      `proxy/${queryParams.resource}`,
      body,
      omit(queryParams, ['resource'])
    )
  }
  public delete(
    id: string,
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    }
  ) {
    return this.apiClient.delete(
      `proxy/${queryParams.resource}`,
      id,
      omit(queryParams, ['resource'])
    )
  }

  public customMethod(
    method: string,
    body: Partial<any> = {},
    queryParams: PaginationOptions & {
      resource: string
      integrated_account_id: string
    }
  ) {
    const { resource, ...rest } = queryParams
    const query = qs.stringify(rest)
    return this.apiClient.request<any>(
      `/proxy/${resource}/${method}?${query}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      }
    )
  }
}
