import { ofetch } from 'ofetch'
import * as qs from 'qs'

export type ApiClientOptions = {
  baseUrl?: string
  token: string
}

export class ApiClient {
  private baseUrl: string
  private token: string

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl || 'https://api.truto.one'
    this.token = options.token
  }

  public async request<T>(
    endpoint: string,
    init?: Record<string, unknown>
  ): Promise<T> {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }

    const response = await ofetch(`${this.baseUrl}${endpoint}`, {
      ...init,
      headers,
      retry: 3,
      retryDelay: 10000,
      timeout: 30000,
      retryStatusCodes: [408, 409, 425, 429, 502, 503, 504],
    })

    return response as T
  }

  public async list<T>(
    resource: string,
    queryParams?: Record<string, unknown>
  ): Promise<{ result: T[]; next_cursor: string | null }> {
    const queryString = qs.stringify(queryParams)
    return this.request<{ result: T[]; next_cursor: string | null }>(
      `/${resource}?${queryString}`
    )
  }

  public async get<T>(
    resource: string,
    id: string,
    queryParams?: Record<string, unknown>
  ): Promise<T> {
    const queryString = qs.stringify(queryParams)
    return this.request<T>(
      `/${resource}/${encodeURIComponent(id)}?${queryString}`
    )
  }

  public async create<T, U>(
    resource: string,
    body: U,
    queryParams?: Record<string, unknown>
  ): Promise<T> {
    const queryString = qs.stringify(queryParams)
    return this.request<T>(`/${resource}?${queryString}`, {
      method: 'POST',
      body,
    })
  }

  public async update<T, U>(
    resource: string,
    id: string,
    body: U,
    queryParams?: Record<string, unknown>
  ): Promise<T> {
    const queryString = qs.stringify(queryParams)
    return this.request<T>(
      `/${resource}/${encodeURIComponent(id)}?${queryString}`,
      {
        method: 'PATCH',
        body,
      }
    )
  }

  public async delete(
    resource: string,
    id: string,
    queryParams?: Record<string, unknown>
  ): Promise<{ id: string }> {
    const queryString = qs.stringify(queryParams)
    return this.request<{ id: string }>(
      `/${resource}/${encodeURIComponent(id)}?${queryString}`,
      {
        method: 'DELETE',
      }
    )
  }
}
