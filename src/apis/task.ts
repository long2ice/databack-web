import http from '@/axios'
import type { TasksResponse } from '@/types/responses'
import type { Sort } from '@/types/common'

export async function getTasks(
  limit: number,
  offset: number,
  compress?: boolean,
  enabled?: boolean,
  name?: string,
  data_source_id?: number,
  storage_id?: number,
  sorts?: Sort[]
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
  if (compress !== undefined) {
    params.compress = compress
  }
  if (enabled !== undefined) {
    params.enabled = enabled
  }
  if (sorts) {
    params.sorts = JSON.stringify(sorts)
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
export async function deleteTasks(ids: number[]): Promise<void> {
  const idsStr = ids.join(',')
  const { data } = await http.delete(`/task/${idsStr}`)
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
