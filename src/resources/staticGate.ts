import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type StaticGate = {
    id: string
    name: string
    domain: string
    api_token_secret?: string
    created_by?: string | null
    environment_id: string
    created_at: string
    updated_at: string
}

export type StaticGateCreatePayload = {
    name: string
    domain: string
    created_by?: string | null
    environment_id: string
    api_token_secret?: string
}

export type StaticGateUpdatePayload = {
    name?: string
    domain?: string
}

export type StaticGateQueryParams = {
    name?: string
    created_by?: string | null
    environment_id?: string
}

export class StaticGateResource {
    constructor(private apiClient: ApiClient) { }

    public list(options?: PaginationOptions & StaticGateQueryParams) {
        return new Cursor<StaticGate>(this.apiClient, 'static-gate', options)
    }

    public get(id: string, queryParams?: StaticGateQueryParams) {
        return this.apiClient.get<StaticGate>('static-gate', id, queryParams)
    }

    public create(
        body: StaticGateCreatePayload,
        queryParams?: StaticGateQueryParams
    ) {
        return this.apiClient.create<StaticGate, StaticGateCreatePayload>(
            'static-gate',
            body,
            queryParams
        )
    }

    public update(
        id: string,
        body: StaticGateUpdatePayload,
        queryParams?: StaticGateQueryParams
    ) {
        return this.apiClient.update<StaticGate, StaticGateUpdatePayload>(
            'static-gate',
            id,
            body,
            queryParams
        )
    }

    public delete(id: string, queryParams?: StaticGateQueryParams) {
        return this.apiClient.delete('static-gate', id, queryParams)
    }
}
