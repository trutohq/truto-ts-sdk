import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type User = {
  id: string
  name: string
  email: string
  is_active: boolean
  is_staff: boolean
  last_login_at?: string | null
  created_at: string
  updated_at: string
  role: string[]
  team: string[]
  environment: string[]
}

export class UserResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<User>(this.apiClient, 'user', options)
  }
  public get(id: string) {
    return this.apiClient.get<User>('user', id)
  }
}
