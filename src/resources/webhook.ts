import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type Webhook = {
  id: string
  target_url: string
  secret?: string
  is_active: boolean
  environment_id: string
  created_at: string
  updated_at: string
  event_types?: string[]
}

export type WebhookCreatePayload = {
  target_url: string
  is_active?: boolean
  environment_id: string
  event_types?: string[]
}

export type WebhookUpdatePayload = {
  target_url?: string
  is_active?: boolean
  event_types?: string[]
}

export type WebhookQueryParams = {
  is_active?: boolean
  environment_id?: string
}

export type WebhookTestPayload = {
  id: string
}

export type WebhookTestResponse = {
  success: boolean
}

export class WebhookResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions & WebhookQueryParams) {
    return new Cursor<Webhook>(this.apiClient, 'webhook', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<Webhook>('webhook', id, queryParams)
  }
  public create(
    body: WebhookCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<Webhook, WebhookCreatePayload>(
      'webhook',
      body,
      queryParams
    )
  }
  public update(
    id: string,
    body: WebhookUpdatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<Webhook, WebhookUpdatePayload>(
      'webhook',
      id,
      body,
      queryParams
    )
  }
  public delete(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.delete('webhook', id, queryParams)
  }
  public test(body: WebhookTestPayload) {
    return this.apiClient.request<WebhookTestResponse>('webhook/test', {
      method: 'POST',
      body,
    })
  }
}
