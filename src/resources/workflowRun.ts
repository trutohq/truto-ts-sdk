import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type WorkflowRun = {
    id: string
    workflow_id: string
    environment_id: string
    status: string
    result: Record<string, unknown> | null
    error: Record<string, unknown> | null
    created_at: string
    updated_at: string
}

export type WorkflowRunCreatePayload = {
    workflow_id: string
    environment_id: string
    status: string
}

export type WorkflowRunUpdatePayload = {
    status?: string
    result?: Record<string, unknown> | null
    error?: Record<string, unknown> | null
}

export type WorkflowRunQueryParams = {
    workflow_id?: string
    environment_id?: string
    status?: string
}

export class WorkflowRunResource {
    constructor(private apiClient: ApiClient) { }

    public list(options?: PaginationOptions & WorkflowRunQueryParams) {
        return new Cursor<WorkflowRun>(this.apiClient, 'workflow-run', options)
    }

    public get(id: string, queryParams?: WorkflowRunQueryParams) {
        return this.apiClient.get<WorkflowRun>('workflow-run', id, queryParams)
    }

    public create(
        body: WorkflowRunCreatePayload,
        queryParams?: WorkflowRunQueryParams
    ) {
        return this.apiClient.create<WorkflowRun, WorkflowRunCreatePayload>(
            'workflow-run',
            body,
            queryParams
        )
    }

    public update(
        id: string,
        body: WorkflowRunUpdatePayload,
        queryParams?: WorkflowRunQueryParams
    ) {
        return this.apiClient.update<WorkflowRun, WorkflowRunUpdatePayload>(
            'workflow-run',
            id,
            body,
            queryParams
        )
    }

    public delete(id: string, queryParams?: WorkflowRunQueryParams) {
        return this.apiClient.delete('workflow-run', id, queryParams)
    }
}
