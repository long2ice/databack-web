import http from '@/axios'
import type { DataSourceType, RestoresResponse, TaskStatus } from '@/types/responses'
import type { Sort } from '@/types/common'

export async function restoreTaskLog(
  task_log_id: number,
  restore_type: DataSourceType,
  options: Record<string, any>
): Promise<void> {
  await http.post('/restore', {
    task_log_id,
    options,
    restore_type
  })
}
export async function getRestoreLogs(
  limit: number,
  offset: number,
  status?: TaskStatus,
  sorts?: Sort[]
): Promise<RestoresResponse> {
  const params: Record<string, any> = {
    limit,
    offset
  }
  if (status) {
    params.status = status
  }
  const { data } = await http.get('/restore', {
    params: params
  })
  if (sorts) {
    params.sorts = JSON.stringify(sorts)
  }
  return data
}
export async function deleteRestoreLogs(ids: number[]): Promise<void> {
  const idsStr = ids.join(',')
  await http.delete(`/restore/${idsStr}`)
}
