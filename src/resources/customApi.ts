import { ApiClient, ApiClientRequestOptions } from '../apiClient'
import qs from 'qs'

export class CustomApi {
    constructor(private apiClient: ApiClient) { }

    /**
     * Make a request to a custom API endpoint.
     *
     * @param method HTTP method (GET, POST, PATCH, DELETE, etc.)
     * @param path The path to call (relative to /custom)
     * @param queryParams Query parameters, including integrated_account_id
     * @param body The request body. If methodConfig is included in the body, it will be used by the backend.
     * @param init Optional request options
     */
    public async request<T = any>(
        method: string,
        path: string,
        queryParams: { integrated_account_id: string } & Record<string, any>,
        body: any = {},
        init?: ApiClientRequestOptions
    ): Promise<T> {
        const { integrated_account_id, ...rest } = queryParams
        const query = qs.stringify({ ...rest, integrated_account_id })

        return this.apiClient.request<T>(
            `/custom/${path.replace(/^\//, '')}?${query}`,
            {
                method: method.toUpperCase(),
                body: Object.keys(body).length > 0 ? body : undefined,
                ...init,
            }
        )
    }
}
