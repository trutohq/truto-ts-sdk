import { ApiClient } from '../apiClient'

export class LinkTokenResource {
  constructor(private apiClient: ApiClient) {}
  public createForNewIntegration(options: {
    tenant_id: string
    unified_model_id?: string
  }) {
    return this.apiClient.create<
      { link_token: string },
      { tenant_id: string; unified_model_id?: string }
    >('link-token', {
      tenant_id: options.tenant_id,
      unified_model_id: options.unified_model_id,
    })
  }

  public createForExistingIntegratedAccount(options: {
    integrated_account_id: string
    unified_model_id?: string
  }) {
    return this.apiClient.create<
      { link_token: string },
      { integrated_account_id: string; unified_model_id?: string }
    >('link-token', {
      integrated_account_id: options.integrated_account_id,
      unified_model_id: options.unified_model_id,
    })
  }
}
