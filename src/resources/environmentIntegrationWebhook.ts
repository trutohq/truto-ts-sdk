import { ApiClient } from '../apiClient'
import qs from 'qs'


export type EnvironmentIntegrationWebhookPayload = Record<string, unknown>

export type EnvironmentIntegrationWebhookQueryParams = {
    [key: string]: unknown
}

export class EnvironmentIntegrationWebhookResource {
    constructor(private apiClient: ApiClient) { }

    public process(
        environmentIntegrationId: string,
        body: EnvironmentIntegrationWebhookPayload,
        queryParams?: EnvironmentIntegrationWebhookQueryParams
    ) {
        const queryString = qs.stringify(queryParams)
        return this.apiClient.request(
            `environment-integration-webhook/${environmentIntegrationId}${queryString ? `?${queryString}` : ''}`,
            {
                method: 'POST',
                body: JSON.stringify(body),
            }
        )
    }
}
