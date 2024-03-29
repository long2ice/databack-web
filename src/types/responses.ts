export type DataSourceType =
  | 'mysql'
  | 'postgres'
  | 'local'
  | 'ssh'
  | 'redis'
  | 'mongo'
  | 'clickhouse'

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
  path: string
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
  keep_days: number
  sub_path: string
  enabled: boolean
  cron: string
  data_source_name: string
  storage_name: string
  data_source_id: number
  storage_id: number
}
export interface TasksResponse {
  total: number
  data: TaskResponse[]
}
export type TaskStatus = 'running' | 'success' | 'failed'
export interface TaskLogResponse {
  status: TaskStatus
  data_source_type: DataSourceType
  data_source_name: string
  storage_name: string
  message: string
  start_at: string
  updated_at: string
  task_id: number
  end_at: string
  size: number
  path: string
  created_at: string
  is_deleted: boolean
  id: number
}
export interface TaskLogsResponse {
  total: number
  data: TaskLogResponse[]
}
export interface TaskLogStatResponse {
  date: string
  count: number
  status: TaskStatus
}
export interface StatResponse {
  datasource_count: number
  storage_count: number
  task_count: number
  task_log_count: number
  restore_log_count: number
  admin_count: number
  action_log_count: number
  task_logs: TaskLogStatResponse[]
}
export interface RestoreResponse {
  id: number
  task_log_id: number
  restore_type: DataSourceType
  message: string
  options: [key: string]
  status: TaskStatus
  start_at: string
  end_at: string
  created_at: string
  updated_at: string
}
export interface RestoresResponse {
  total: number
  data: RestoreResponse[]
}
export interface TokenResponse {
  access_token: string
  refresh_token: string
}
export interface AdminResponse {
  id: number
  created_at: string
  updated_at: string
  nickname: string
  email: string
  last_login_at: string
  is_superuser: boolean
  is_active: boolean
  password: string
}
export interface AdminsResponse {
  total: number
  data: AdminResponse[]
}
export interface ActionLogResponse {
  id: number
  created_at: string
  updated_at: string
  path: string
  method: string
  content: string
  ip: string
  admin_id: number
}
export interface ActionLogsResponse {
  total: number
  data: ActionLogResponse[]
}

export interface InitedResponse {
  inited: boolean
}
export interface OauthResponse {
  type: string
  url: string
}
