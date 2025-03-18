import { concat, isArray, isPlainObject, uniq } from 'lodash-es'
import * as qs from 'qs'
import pTimeout, { TimeoutError } from 'p-timeout'
import { TrutoError, TrutoTimeoutError } from './errors'
import packageJson from '../package.json'

export type ApiClientOptions = {
  baseUrl?: string
  token: string
}

export type ApiClientRequestOptions = {
  retryStatusCodes?: number[]
  defaultRetryAfter?: number
  maxRetries?: number
  timeout?: number
  headers?: Record<string, string>
}

export class ApiClient {
  private baseUrl: string
  private token: string

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl || 'https://api.truto.one'
    this.token = options.token
  }

  async parseResponseBody<T>(response: Response): Promise<T> {
    if (response.status === 204) {
      return {} as T
    }

    const contentType = response.headers.get('content-type')

    if (contentType?.includes('json')) {
      return response.json() as unknown as T
    }

    return response.blob() as unknown as T
  }

  public async request<T>(
    endpoint: string,
    init?: ApiClientRequestOptions & Record<string, unknown>
  ): Promise<T> {
    const retryStatusCodes = uniq(
      concat([408, 409, 425, 429, 502, 503, 504], init?.retryStatusCodes || [])
    )
    const defaultRetryAfter = init?.defaultRetryAfter || 10
    const maxRetries = init?.maxRetries || 3
    const timeout = init?.timeout || 30
    const headers: Record<string, string> = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
      ...(init?.headers as Record<string, string>),
      'User-Agent': `truto-ts-sdk/${packageJson.version}`,
    }

    if (isPlainObject(init?.body) || isArray(init?.body)) {
      headers['Content-Type'] = 'application/json'
    }

    let retryCount = 0

    let response: Response

    do {
      try {
        response = await pTimeout(
          fetch(`${this.baseUrl}${endpoint}`, {
            ...init,
            headers,
          }),
          {
            milliseconds: timeout * 1000,
          }
        )
        if (!response.ok) {
          if (retryStatusCodes.includes(response.status)) {
            if (response.status === 429) {
              const retryAfterHeader = response.headers.get('retry-after')
              const retryAfter = retryAfterHeader
                ? parseInt(retryAfterHeader)
                : defaultRetryAfter
              if (retryAfter) {
                await new Promise(resolve =>
                  setTimeout(resolve, retryAfter * 1000)
                )
                retryCount++
                continue
              }
            } else {
              retryCount++
              continue
            }
          }
          break
        }

        return (await this.parseResponseBody<T>(response)) as T
      } catch (err) {
        if (err instanceof TimeoutError) {
          throw new TrutoTimeoutError()
        }
        throw err
      }
    } while (retryCount < maxRetries)

    throw new TrutoError(
      response.statusText,
      response.status,
      response.statusText,
      response,
      await this.parseResponseBody<T>(response)
    )
  }

  public async list<T>(
    resource: string,
    queryParams?: Record<string, unknown>,
    init?: ApiClientRequestOptions
  ): Promise<{ result: T[]; next_cursor: string | null }> {
    const queryString = qs.stringify(queryParams)
    return this.request<{ result: T[]; next_cursor: string | null }>(
      `/${resource}?${queryString}`,
      init
    )
  }

  public async get<T>(
    resource: string,
    id: string,
    queryParams?: Record<string, unknown>,
    init?: ApiClientRequestOptions
  ): Promise<T> {
    const queryString = qs.stringify(queryParams)
    return this.request<T>(
      `/${resource}/${encodeURIComponent(id)}?${queryString}`,
      init
    )
  }

  public async create<T, U>(
    resource: string,
    body: U,
    queryParams?: Record<string, unknown>,
    init?: ApiClientRequestOptions
  ): Promise<T> {
    const queryString = qs.stringify(queryParams)
    return this.request<T>(`/${resource}?${queryString}`, {
      method: 'POST',
      body,
      ...init,
    })
  }

  public async update<T, U>(
    resource: string,
    id: string,
    body: U,
    queryParams?: Record<string, unknown>,
    init?: ApiClientRequestOptions
  ): Promise<T> {
    const queryString = qs.stringify(queryParams)
    return this.request<T>(
      `/${resource}/${encodeURIComponent(id)}?${queryString}`,
      {
        method: 'PATCH',
        body,
        ...init,
      }
    )
  }

  public async delete(
    resource: string,
    id: string,
    queryParams?: Record<string, unknown>,
    init?: ApiClientRequestOptions
  ): Promise<{ id: string }> {
    const queryString = qs.stringify(queryParams)
    return this.request<{ id: string }>(
      `/${resource}/${encodeURIComponent(id)}?${queryString}`,
      {
        method: 'DELETE',
        ...init,
      }
    )
  }
}
