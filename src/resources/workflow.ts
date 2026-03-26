import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type Workflow = {
    id: string
    environment_id: string
    trigger_name: string
    config: Record<string, unknown>
    created_at: string
    updated_at: string
}

export type WorkflowCreatePayload = {
    trigger_name: string
    config: Record<string, unknown>
}

export type WorkflowUpdatePayload = {
    trigger_name?: string
    config?: Record<string, unknown>
}

export type WorkflowQueryParams = {
    environment_id?: string
    trigger_name?: string
}

export class WorkflowResource {
    constructor(private apiClient: ApiClient) { }

    public list(options?: PaginationOptions & WorkflowQueryParams) {
        return new Cursor<Workflow>(this.apiClient, 'workflow', options)
    }

    public get(id: string, queryParams?: WorkflowQueryParams) {
        return this.apiClient.get<Workflow>('workflow', id, queryParams)
    }

    public create(
        body: WorkflowCreatePayload,
        queryParams?: WorkflowQueryParams
    ) {
        return this.apiClient.create<Workflow, WorkflowCreatePayload>(
            'workflow',
            body,
            queryParams
        )
    }

    public update(
        id: string,
        body: WorkflowUpdatePayload,
        queryParams?: WorkflowQueryParams
    ) {
        return this.apiClient.update<Workflow, WorkflowUpdatePayload>(
            'workflow',
            id,
            body,
            queryParams
        )
    }

    public delete(id: string, queryParams?: WorkflowQueryParams) {
        return this.apiClient.delete('workflow', id, queryParams)
    }
}
