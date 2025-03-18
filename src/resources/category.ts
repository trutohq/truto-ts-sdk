import { ApiClient } from '../apiClient'
import { PaginationOptions, Cursor } from '../pagination'

export type Category = {
  name: string
  label: string
  created_at: string
  updated_at: string
}

export class CategoryResource {
  constructor(private apiClient: ApiClient) {}
  public list(options?: PaginationOptions) {
    return new Cursor<Category>(this.apiClient, 'category', options)
  }
}
