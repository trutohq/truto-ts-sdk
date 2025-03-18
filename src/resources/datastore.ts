import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type DatastoreMethodResponse = {
  success: boolean
  data?: unknown | null
  response?: unknown
}

type MongoDatastoreConfig = {
  data_source: string
  database: string
  api_url: string
  api_key: string
}

type GoogleCloudStorageDatastoreConfig = {
  bucket: string
  credentials: Record<string, unknown>
}

type S3DatastoreConfig = {
  access_key_id: string
  secret_access_key: string
  region: string
  bucket: string
  base_url?: string
}

type QdrantDatastoreConfig = {
  base_url: string
  api_key: string
  port?: number
  collection: string
}

type DatastoreConfig =
  | MongoDatastoreConfig
  | GoogleCloudStorageDatastoreConfig
  | S3DatastoreConfig
  | QdrantDatastoreConfig

export type Datastore = {
  id: string
  type: 'mongo_data_api' | 'google_cloud_storage' | 's3' | 'qdrant'
  label: string
  config: DatastoreConfig
  environment_id: string
  created_at: string
  updated_at: string
}

export type DatastoreCreatePayload = {
  type: 'mongo_data_api' | 'google_cloud_storage' | 's3' | 'qdrant'
  label: string
  config: DatastoreConfig
  environment_id: string
}

export type DatastoreUpdatePayload = {
  label?: string
  config?: Partial<DatastoreConfig>
}

export class DatastoreResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<Datastore>(this.apiClient, 'datastore', options)
  }
  public get(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.get<Datastore>('datastore', id, queryParams)
  }
  public create(
    body: DatastoreCreatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.create<Datastore, DatastoreCreatePayload>(
      'datastore',
      body,
      queryParams
    )
  }
  public update(
    id: string,
    body: DatastoreUpdatePayload,
    queryParams?: Record<string, unknown>
  ) {
    return this.apiClient.update<Datastore, DatastoreUpdatePayload>(
      'datastore',
      id,
      body,
      queryParams
    )
  }
  public delete(id: string, queryParams?: Record<string, unknown>) {
    return this.apiClient.delete('datastore', id, queryParams)
  }
  public test(id: string, method: string, body?: Record<string, unknown>) {
    return this.apiClient.request<DatastoreMethodResponse>(
      `datastore/${id}/test/${method}`,
      {
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined,
      }
    )
  }
}
