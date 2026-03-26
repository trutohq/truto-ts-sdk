import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type SandboxIntegratedAccount = {
    id: string
    integrated_account: any
    created_at: string
    updated_at: string
}

export type SandboxIntegratedAccountCreatePayload = {
    id: string
}

export type SandboxIntegratedAccountQueryParams = Record<string, unknown>

export class SandboxIntegratedAccountResource {
    constructor(private apiClient: ApiClient) { }

    public list(
        options?: PaginationOptions & SandboxIntegratedAccountQueryParams
    ) {
        return new Cursor<SandboxIntegratedAccount>(
            this.apiClient,
            'sandbox-integrated-account',
            options
        )
    }

    public get(id: string, queryParams?: SandboxIntegratedAccountQueryParams) {
        return this.apiClient.get<SandboxIntegratedAccount>(
            'sandbox-integrated-account',
            id,
            queryParams
        )
    }

    public create(
        body: SandboxIntegratedAccountCreatePayload,
        queryParams?: SandboxIntegratedAccountQueryParams
    ) {
        return this.apiClient.create<
            SandboxIntegratedAccount,
            SandboxIntegratedAccountCreatePayload
        >('sandbox-integrated-account', body, queryParams)
    }

    public delete(id: string, queryParams?: SandboxIntegratedAccountQueryParams) {
        return this.apiClient.delete('sandbox-integrated-account', id, queryParams)
    }
}
