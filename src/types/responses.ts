export type DataSourceType = 'mysql' | 'postgres' | 'local' | 'ssh'

export interface DataSource {
  id: number
  created_at: string
  updated_at: string
  type: DataSourceType
  name: string
  options: [key: string]
}

export interface DataSourcesResponse {
  total: number
  data: DataSource[]
}
