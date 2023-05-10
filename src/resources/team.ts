import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type Team = {
  id: string
  name: string
  domain: string
  logo: string | null
  created_at: string
  updated_at: string
}

export type TeamUpdatePayload = {
  name?: string
  logo?: string | null
}

export class TeamResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<Team>(this.apiClient, 'team', options)
  }
  public get(id: string) {
    return this.apiClient.get<Team>('team', id)
  }
  public update(id: string, body: TeamUpdatePayload) {
    return this.apiClient.update<Team, TeamUpdatePayload>('team', id, body)
  }
}
