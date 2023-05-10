import { ApiClient } from './apiClient'
import { TeamResource } from './resources/team'
import { IntegrationResource } from './resources/integration'
import { EnvironmentResource } from './resources/environment'
import { EnvironmentIntegrationResource } from './resources/environmentIntegration'
import { EnvironmentUnifiedModelResource } from './resources/environmentUnifiedModel'
import { IntegratedAccountResource } from './resources/integratedAccount'
import { LinkTokenResource } from './resources/linkToken'
import { UserResource } from './resources/user'
import { UnifiedModelResource } from './resources/unifiedModel'
import { UnifiedApi } from './resources/unifiedApi'
import { ProxyApi } from './resources/proxyApi'
import { DaemonResource } from './resources/daemon'
import { SyncJobResource } from './resources/syncJob'
import { SyncJobRunResource } from './resources/syncJobRun'

export type TrutoApiOptions = {
  baseUrl?: string
  token: string
}

export default class TrutoApi {
  public team: TeamResource
  public integration: IntegrationResource
  public environment: EnvironmentResource
  public environmentIntegration: EnvironmentIntegrationResource
  public environmentUnifiedModel: EnvironmentUnifiedModelResource
  public integratedAccount: IntegratedAccountResource
  public linkToken: LinkTokenResource
  public user: UserResource
  public unifiedModel: UnifiedModelResource
  public unifiedApi: UnifiedApi
  public proxyApi: ProxyApi
  public daemon: DaemonResource
  public syncJob: SyncJobResource
  public syncJobRun: SyncJobRunResource

  constructor(options: TrutoApiOptions) {
    const apiClient = new ApiClient(options)
    this.team = new TeamResource(apiClient)
    this.integration = new IntegrationResource(apiClient)
    this.environment = new EnvironmentResource(apiClient)
    this.environmentIntegration = new EnvironmentIntegrationResource(apiClient)
    this.environmentUnifiedModel = new EnvironmentUnifiedModelResource(
      apiClient
    )
    this.integratedAccount = new IntegratedAccountResource(apiClient)
    this.linkToken = new LinkTokenResource(apiClient)
    this.user = new UserResource(apiClient)
    this.unifiedModel = new UnifiedModelResource(apiClient)
    this.unifiedApi = new UnifiedApi(apiClient)
    this.proxyApi = new ProxyApi(apiClient)
    this.daemon = new DaemonResource(apiClient)
    this.syncJob = new SyncJobResource(apiClient)
    this.syncJobRun = new SyncJobRunResource(apiClient)
  }
}

export { Cursor } from './pagination'
