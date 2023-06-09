import http from '@/axios'
import type { Sort } from '@/types/common'
import type { TaskLogsResponse } from '@/types/responses'

export async function getTaskLogs(
  limit: number,
  offset: number,
  is_deleted?: boolean,
  data_source_id?: number,
  storage_id?: number,
  task_id?: number,
  status?: string,
  start_time?: string,
  end_time?: string,
  sorts?: Sort[]
): Promise<TaskLogsResponse> {
  const params: Record<string, any> = {
    limit,
    offset
  }
  if (task_id) {
    params.task_id = task_id
  }
  if (status) {
    params.status = status
  }
  if (start_time) {
    params.start_time = start_time
  }
  if (end_time) {
    params.end_time = end_time
  }
  if (data_source_id) {
    params.data_source_id = data_source_id
  }
  if (storage_id) {
    params.storage_id = storage_id
  }
  if (sorts) {
    params.sorts = JSON.stringify(sorts)
  }
  if (is_deleted !== undefined) {
    params.is_deleted = is_deleted
  }
  const { data } = await http.get('/task_log', {
    params: params
  })
  return data
}
export async function deleteTaskLogs(ids: number[]): Promise<void> {
  const idsStr = ids.join(',')
  await http.delete(`/task_log/${idsStr}`)
}
