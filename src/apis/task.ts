import http from '@/axios'
import type { TaskResponse, TasksResponse } from '@/types/responses'

export async function getTasks(
  limit: number,
  offset: number,
  name?: string,
  enabled?: boolean
): Promise<TasksResponse> {
  const params: Record<string, any> = {
    limit,
    offset
  }
  if (name) {
    params.name = name
  }
  if (enabled !== undefined) {
    params.enabled = enabled
  }
  const { data } = await http.get('/task', {
    params: params
  })
  return data
}

export async function createTask(
  name: string,
  storage_id: number,
  data_source_id: number,
  compress: boolean,
  keep_num: number,
  enabled: boolean,
  cron: string
): Promise<void> {
  const { data } = await http.post('/task', {
    name,
    storage_id,
    data_source_id,
    compress,
    keep_num,
    enabled,
    cron
  })
  return data
}
export async function deleteTask(id: number): Promise<void> {
  const { data } = await http.delete(`/task/${id}`)
  return data
}
export async function getTask(id: number): Promise<TaskResponse> {
  const { data } = await http.get(`/task/${id}`)
  return data
}
export async function updateTask(
  id: number,
  name: string,
  storage_id?: number,
  data_source_id?: number,
  compress?: boolean,
  keep_num?: number,
  enabled?: boolean,
  cron?: string
): Promise<void> {
  const params: Record<string, any> = {
    name
  }
  if (storage_id !== undefined) {
    params.storage_id = storage_id
  }
  if (data_source_id !== undefined) {
    params.data_source_id = data_source_id
  }
  if (compress !== undefined) {
    params.compress = compress
  }
  if (keep_num !== undefined) {
    params.keep_num = keep_num
  }
  if (enabled !== undefined) {
    params.enabled = enabled
  }
  if (cron !== undefined) {
    params.cron = cron
  }
  const { data } = await http.patch(`/task/${id}`, params)
  return data
}
