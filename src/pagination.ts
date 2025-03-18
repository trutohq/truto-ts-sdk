import { ApiClient, ApiClientRequestOptions } from './apiClient'
import { cloneDeep, get, head } from 'lodash-es'

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
  constructor(
    apiClient: ApiClient,
    resource: string,
    options?: PaginationOptions,
    init?: ApiClientRequestOptions
  ) {
    this.apiClient = apiClient
    this.resource = resource
    this.options = options || {}
    this.init = cloneDeep(init)
    const existingNextCursor = get(options, 'next_cursor')
    this.nextCursor = existingNextCursor || ''
  }

  public async first(): Promise<T> {
    const response = await this.apiClient.list<T>(
      this.resource,
      this.options,
      this.init
    )
    return head(response.result) as T
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
