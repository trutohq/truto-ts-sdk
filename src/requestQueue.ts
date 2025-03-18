import PQueue from 'p-queue'
import type { Options as PQueueOptions } from 'p-queue'
import TrutoApi from './index'
import type { ApiClient, ApiClientRequestOptions } from './apiClient'
import type { PaginationOptions } from './pagination'

type ProxyApiQueryParams = PaginationOptions & {
  resource: string
  integrated_account_id: string
}

type UnifiedApiQueryParams = PaginationOptions & {
  unified_model: string
  resource: string
  integrated_account_id: string
}

export class RequestQueue {
  private queue: PQueue
  private truto: TrutoApi

  constructor(truto: TrutoApi, options?: PQueueOptions<any, any>) {
    this.queue = new PQueue({
      concurrency: 10,
      interval: 1000,
      intervalCap: 10,
      ...options,
    })
    this.truto = truto
  }

  // Proxy all methods from TrutoApi through the queue
  public proxyApi = {
    list: (queryParams: ProxyApiQueryParams, init?: ApiClientRequestOptions) =>
      this.truto.proxyApi.list(queryParams, init, this.queue),
    get: (
      id: string,
      queryParams: ProxyApiQueryParams,
      init?: ApiClientRequestOptions
    ) => this.queue.add(() => this.truto.proxyApi.get(id, queryParams, init)),
    create: (
      body: Partial<any>,
      queryParams: ProxyApiQueryParams,
      init?: ApiClientRequestOptions
    ) =>
      this.queue.add(() => this.truto.proxyApi.create(body, queryParams, init)),
    update: (
      id: string,
      body: Partial<any>,
      queryParams: ProxyApiQueryParams,
      init?: ApiClientRequestOptions
    ) =>
      this.queue.add(() =>
        this.truto.proxyApi.update(id, body, queryParams, init)
      ),
    delete: (
      id: string,
      queryParams: ProxyApiQueryParams,
      init?: ApiClientRequestOptions
    ) =>
      this.queue.add(() => this.truto.proxyApi.delete(id, queryParams, init)),
    customMethod: (
      method: string,
      body: Partial<any> = {},
      queryParams: ProxyApiQueryParams,
      init?: ApiClientRequestOptions
    ) =>
      this.queue.add(() =>
        this.truto.proxyApi.customMethod(method, body, queryParams, init)
      ),
  }

  public unifiedApi = {
    list: (options: UnifiedApiQueryParams, init?: ApiClientRequestOptions) =>
      this.truto.unifiedApi.list(options, init, this.queue),
    get: (
      id: string,
      options: UnifiedApiQueryParams,
      init?: ApiClientRequestOptions
    ) => this.queue.add(() => this.truto.unifiedApi.get(id, options, init)),
    create: (
      body: Partial<any>,
      options: UnifiedApiQueryParams,
      init?: ApiClientRequestOptions
    ) =>
      this.queue.add(() => this.truto.unifiedApi.create(body, options, init)),
    update: (
      id: string,
      body: Partial<any>,
      options: UnifiedApiQueryParams,
      init?: ApiClientRequestOptions
    ) =>
      this.queue.add(() =>
        this.truto.unifiedApi.update(id, body, options, init)
      ),
    delete: (
      id: string,
      options: UnifiedApiQueryParams,
      init?: ApiClientRequestOptions
    ) => this.queue.add(() => this.truto.unifiedApi.delete(id, options, init)),
    customMethod: (
      method: string,
      body: Partial<any> = {},
      queryParams: ProxyApiQueryParams,
      init?: ApiClientRequestOptions
    ) =>
      this.queue.add(() =>
        this.truto.unifiedApi.customMethod(method, body, queryParams, init)
      ),
  }

  public request = (...args: Parameters<ApiClient['request']>) =>
    this.queue.add(() => this.truto.apiClient.request(...args))
}
