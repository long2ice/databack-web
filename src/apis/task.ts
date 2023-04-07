import http from '@/axios'
import type { TaskResponse, TasksResponse } from '@/types/responses'

export async function getTasks(
  limit: number,
  offset: number,
  name?: string,
  data_source_id?: number,
  storage_id?: number
): Promise<TasksResponse> {
  const params: Record<string, any> = {
    limit,
    offset
  }
  if (name) {
    params.name = name
  }
  if (data_source_id) {
    params.data_source_id = data_source_id
  }
  if (storage_id) {
    params.storage_id = storage_id
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
  keep_days: number,
  enabled: boolean,
  cron: string,
  sub_path: string
): Promise<void> {
  const { data } = await http.post('/task', {
    name,
    storage_id,
    data_source_id,
    compress,
    keep_num,
    keep_days,
    enabled,
    cron,
    sub_path
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
  storage_id: number,
  data_source_id: number,
  compress: boolean,
  keep_num: number,
  keep_days: number,
  enabled: boolean,
  cron: string,
  sub_path: string
): Promise<void> {
  const { data } = await http.patch(`/task/${id}`, {
    name,
    storage_id,
    data_source_id,
    compress,
    keep_num,
    keep_days,
    enabled,
    cron,
    sub_path
  })
  return data
}
export async function runTask(id: number): Promise<void> {
  const { data } = await http.post(`/task/${id}/run`)
  return data
}
