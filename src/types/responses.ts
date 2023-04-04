export type DataSourceType = 'mysql' | 'postgres' | 'local' | 'ssh'

export interface DataSourceResponse {
  id: number
  created_at: string
  updated_at: string
  type: DataSourceType
  name: string
  options: [key: string]
}

export interface DataSourcesResponse {
  total: number
  data: DataSourceResponse[]
}

export type StorageType = 'local' | 's3' | 'ssh'

export interface StorageResponse {
  id: number
  created_at: string
  updated_at: string
  type: StorageType
  name: string
  options: [key: string]
}
export interface StoragesResponse {
  total: number
  data: StorageResponse[]
}
export interface TaskResponse {
  id: number
  created_at: string
  updated_at: string
  name: string
  compress: boolean
  keep_num: number
  enabled: boolean
  cron: string
}
export interface TasksResponse {
  total: number
  data: TaskResponse[]
}
