import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type Alarm = {
    id: string
    name: string
    environment_id: string
    status: string
    config: Record<string, unknown>
    created_at: string
    updated_at: string
}

export type AlarmCreatePayload = {
    alarm_type: string
    cron_expression?: string
    duration?: number
    date?: string
    entity_id: string
}

export type AlarmUpdatePayload = Partial<AlarmCreatePayload>

export type AlarmQueryParams = {
    alarm_type?: string
    entity_id?: string
}

export class AlarmResource {
    constructor(private apiClient: ApiClient) { }

    public list(options?: PaginationOptions & AlarmQueryParams) {
        return new Cursor<Alarm>(this.apiClient, 'alarm', options)
    }

    public get(id: string, queryParams?: AlarmQueryParams) {
        return this.apiClient.get<Alarm>('alarm', id, queryParams)
    }

    public create(body: AlarmCreatePayload, queryParams?: AlarmQueryParams) {
        return this.apiClient.create<Alarm, AlarmCreatePayload>(
            'alarm',
            body,
            queryParams
        )
    }

    public update(
        id: string,
        body: AlarmUpdatePayload,
        queryParams?: AlarmQueryParams
    ) {
        return this.apiClient.update<Alarm, AlarmUpdatePayload>(
            'alarm',
            id,
            body,
            queryParams
        )
    }

    public delete(id: string, queryParams?: AlarmQueryParams) {
        return this.apiClient.delete('alarm', id, queryParams)
    }
}
