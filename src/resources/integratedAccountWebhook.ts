import { ApiClient } from '../apiClient'
import qs from 'qs'


export type IntegratedAccountWebhookPayload = Record<string, unknown>

export type IntegratedAccountWebhookQueryParams = {
    [key: string]: unknown
}

export class IntegratedAccountWebhookResource {
    constructor(private apiClient: ApiClient) { }

    public process(
        integratedAccountId: string,
        body: IntegratedAccountWebhookPayload,
        queryParams?: IntegratedAccountWebhookQueryParams
    ) {
        const queryString = qs.stringify(queryParams)
        return this.apiClient.request(
            `integrated-account-webhook/${integratedAccountId}${queryString ? `?${queryString}` : ''}`,
            {
                method: 'POST',
                body: JSON.stringify(body),
            }
        )
    }
}
