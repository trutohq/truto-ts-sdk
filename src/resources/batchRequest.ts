import { ApiClient } from '../apiClient'

type SyncJobResourceNode = {
  name?: string
  depends_on?: string
}

type SyncJobResourceRequest = SyncJobResourceNode & {
  resource: string
  name?: string
  method: string
  id?: string
  query?: Record<string, unknown> | string
  depends_on?: string
  loop_on?: string
  persist?: boolean
  recurse?: {
    if?: string
    config?: {
      id?: string
      query?: Record<string, unknown> | string
    }
  }
  delete_tracking?: 'hard' | 'soft'
  delete_tracking_query?: Record<string, unknown>
  response_format?: 'raw' | 'unified' | 'normalized'
  body?: Record<string, unknown> | string
}

type SyncJobResourceTransform = SyncJobResourceNode & {
  name: string
  type: 'spool' | 'transform'
  config?: Record<string, unknown>
  persist?: boolean
}

type SyncJobResource = SyncJobResourceRequest | SyncJobResourceTransform

export type BatchRequestCreatePayload = {
  integrated_account_id: string
  args?: Record<string, unknown>
  resources: SyncJobResource[]
}

export type BatchRequest = unknown

export class BatchRequestResource {
  constructor(private apiClient: ApiClient) {}
  public create<T>(
    body: BatchRequestCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<T, BatchRequestCreatePayload>(
      'batch-request',
      body,
      queryParams
    )
  }
}
