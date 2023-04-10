import http from '@/axios'
import type { DataSourceType, RestoresResponse, TaskStatus } from '@/types/responses'

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
  status?: TaskStatus
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
  return data
}
export async function deleteRestoreLog(id: number): Promise<void> {
  await http.delete(`/restore/${id}`)
}