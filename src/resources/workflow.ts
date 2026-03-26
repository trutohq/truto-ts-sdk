import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type Workflow = {
    id: string
    name: string
    created_at: string
    updated_at: string
    [key: string]: any
}

export class WorkflowResource {
    constructor(private apiClient: ApiClient) { }

    public list(options?: PaginationOptions) {
        return new Cursor<Workflow>(this.apiClient, 'workflow', options)
    }

    public get(id: string, queryParams?: Record<string, unknown>) {
        return this.apiClient.get<Workflow>('workflow', id, queryParams)
    }

    public create(body: any, queryParams?: Record<string, unknown>) {
        return this.apiClient.create<Workflow, any>('workflow', body, queryParams)
    }

    public update(id: string, body: any, queryParams?: Record<string, unknown>) {
        return this.apiClient.update<Workflow, any>(
            'workflow',
            id,
            body,
            queryParams
        )
    }

    public delete(id: string, queryParams?: Record<string, unknown>) {
        return this.apiClient.delete('workflow', id, queryParams)
    }
}
