import { ApiClient, ApiClientRequestOptions } from './apiClient'
import { cloneDeep, get, head } from 'lodash-es'
import PQueue from 'p-queue'

export type PaginationOptions = {
  limit?: number
  [key: string]: any
}

export class Cursor<T> {
  private apiClient: ApiClient
  private resource: string
  private options: PaginationOptions
  private nextCursor: string | undefined
  private init?: ApiClientRequestOptions
  private queue?: PQueue

  constructor(
    apiClient: ApiClient,
    resource: string,
    options?: PaginationOptions,
    init?: ApiClientRequestOptions,
    queue?: PQueue
  ) {
    this.apiClient = apiClient
    this.resource = resource
    this.options = options || {}
    this.init = cloneDeep(init)
    this.queue = queue
    const existingNextCursor = get(options, 'next_cursor')
    this.nextCursor = existingNextCursor || ''
  }

  private async queueOrExecute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.queue) {
      return this.queue.add(fn) as Promise<T>
    }
    return fn()
  }

  public async first(): Promise<T> {
    return this.queueOrExecute(async () => {
      const response = await this.apiClient.list<T>(
        this.resource,
        this.options,
        this.init
      )
      return head(response.result) as T
    })
  }

  public async toArray(): Promise<T[]> {
    let items: T[] = []

    do {
      const response = await this.next()
      items = items.concat(response.items)
    } while (this.nextCursor)

    return items
  }

  public async next(): Promise<{ items: T[]; nextCursor: string | undefined }> {
    return this.queueOrExecute(async () => {
      const response = await this.apiClient.list<T>(
        this.resource,
        {
          ...this.options,
          next_cursor: this.nextCursor,
        },
        this.init
      )

      this.nextCursor = response.next_cursor || ''
      return {
        items: response.result,
        nextCursor: this.nextCursor,
      }
    })
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    do {
      const response = await this.next()

      for (const item of response.items) {
        yield item
      }

      this.nextCursor = response.nextCursor
    } while (this.nextCursor)
  }
}
