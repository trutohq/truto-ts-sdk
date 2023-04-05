import { ApiClient } from './apiClient'
import { TeamResource } from './resources/team'
import { IntegrationResource } from './resources/integration'
import { EnvironmentResource } from './resources/environment'
import { InstalledIntegrationResource } from './resources/installedIntegration'
import { InstalledUnifiedModelResource } from './resources/installedUnifiedModel'
import { IntegratedAccountResource } from './resources/integratedAccount'
import { LinkTokenResource } from './resources/linkToken'
import { UserResource } from './resources/user'
import { UnifiedModelResource } from './resources/unifiedModel'
import { UnifiedApi } from './resources/unifiedApi'
import { ProxyApi } from './resources/proxyApi'

export type TrutoApiOptions = {
  baseUrl: string
  token: string
}

export default class TrutoApi {
  public team: TeamResource
  public integration: IntegrationResource
  private environment: EnvironmentResource
  private installedIntegration: InstalledIntegrationResource
  private installedUnifiedModel: InstalledUnifiedModelResource
  private integratedAccount: IntegratedAccountResource
  private linkToken: LinkTokenResource
  private user: UserResource
  private unifiedModel: UnifiedModelResource
  private unifiedApi: UnifiedApi
  private proxyApi: ProxyApi

  constructor(options: TrutoApiOptions) {
    const apiClient = new ApiClient(options)
    this.team = new TeamResource(apiClient)
    this.integration = new IntegrationResource(apiClient)
    this.environment = new EnvironmentResource(apiClient)
    this.installedIntegration = new InstalledIntegrationResource(apiClient)
    this.installedUnifiedModel = new InstalledUnifiedModelResource(apiClient)
    this.integratedAccount = new IntegratedAccountResource(apiClient)
    this.linkToken = new LinkTokenResource(apiClient)
    this.user = new UserResource(apiClient)
    this.unifiedModel = new UnifiedModelResource(apiClient)
    this.unifiedApi = new UnifiedApi(apiClient)
    this.proxyApi = new ProxyApi(apiClient)
  }
}
