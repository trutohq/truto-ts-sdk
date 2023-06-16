import fetch, { RequestInit } from 'node-fetch'
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

  public async request<T>(endpoint: string, init?: RequestInit): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...init,
      headers,
    })

    if (!response.ok) {
      console.error(await response.text())
      throw new Error(`API request failed: ${response.statusText}`)
    }

    return response.json() as T
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
      body: JSON.stringify(body),
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
        body: JSON.stringify(body),
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
