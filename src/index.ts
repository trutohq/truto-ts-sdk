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
import { DaemonJobResource } from './resources/daemonJob'
import { DaemonJobRunResource } from './resources/daemonJobRun'
import { ApiTokenResource } from './resources/apiToken'
import { BatchRequestResource } from './resources/batchRequest'
import { CategoryResource } from './resources/category'
import { DaemonJobCronTriggerResource } from './resources/daemonJobCronTrigger'
import { DatastoreResource } from './resources/datastore'
import { DocumentationResource } from './resources/documentation'
import { LogResource } from './resources/log'
import { SyncJobCronTriggerResource } from './resources/syncJobCronTrigger'
import { WebhookResource } from './resources/webhook'

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
  public daemonJob: DaemonJobResource
  public daemonJobRun: DaemonJobRunResource
  public apiToken: ApiTokenResource
  public batchRequest: BatchRequestResource
  public category: CategoryResource
  public daemonJobCronTrigger: DaemonJobCronTriggerResource
  public datastore: DatastoreResource
  public documentation: DocumentationResource
  public log: LogResource
  public syncJobCronTrigger: SyncJobCronTriggerResource
  public webhook: WebhookResource
  public apiClient: ApiClient

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
    this.daemonJob = new DaemonJobResource(apiClient)
    this.daemonJobRun = new DaemonJobRunResource(apiClient)
    this.apiToken = new ApiTokenResource(apiClient)
    this.batchRequest = new BatchRequestResource(apiClient)
    this.category = new CategoryResource(apiClient)
    this.daemonJobCronTrigger = new DaemonJobCronTriggerResource(apiClient)
    this.datastore = new DatastoreResource(apiClient)
    this.documentation = new DocumentationResource(apiClient)
    this.log = new LogResource(apiClient)
    this.syncJobCronTrigger = new SyncJobCronTriggerResource(apiClient)
    this.webhook = new WebhookResource(apiClient)
    this.apiClient = apiClient
  }
}

export { Cursor } from './pagination'
export { RequestQueue } from './requestQueue'
