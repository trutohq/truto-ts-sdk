import { ApiClient } from '../apiClient'
import qs from 'qs'


export type CustomApiQueryParams = {
    integrated_account_id?: string
    [key: string]: unknown
}

export class CustomApi {
    constructor(private apiClient: ApiClient) { }

    public async get(path: string, queryParams?: CustomApiQueryParams) {
        const queryString = qs.stringify(queryParams)
        return this.apiClient.request(
            `custom/${path}${queryString ? `?${queryString}` : ''}`,
            {
                method: 'GET',
            }
        )
    }

    public async post(
        path: string,
        body?: Record<string, unknown> | unknown[],
        queryParams?: CustomApiQueryParams
    ) {
        const queryString = qs.stringify(queryParams)
        return this.apiClient.request(
            `custom/${path}${queryString ? `?${queryString}` : ''}`,
            {
                method: 'POST',
                body: body ? JSON.stringify(body) : undefined,
            }
        )
    }

    public async put(
        path: string,
        body?: Record<string, unknown> | unknown[],
        queryParams?: CustomApiQueryParams
    ) {
        const queryString = qs.stringify(queryParams)
        return this.apiClient.request(
            `custom/${path}${queryString ? `?${queryString}` : ''}`,
            {
                method: 'PUT',
                body: body ? JSON.stringify(body) : undefined,
            }
        )
    }

    public async patch(
        path: string,
        body?: Record<string, unknown> | unknown[],
        queryParams?: CustomApiQueryParams
    ) {
        const queryString = qs.stringify(queryParams)
        return this.apiClient.request(
            `custom/${path}${queryString ? `?${queryString}` : ''}`,
            {
                method: 'PATCH',
                body: body ? JSON.stringify(body) : undefined,
            }
        )
    }

    public async delete(path: string, queryParams?: CustomApiQueryParams) {
        const queryString = qs.stringify(queryParams)
        return this.apiClient.request(
            `custom/${path}${queryString ? `?${queryString}` : ''}`,
            {
                method: 'DELETE',
            }
        )
    }
}
