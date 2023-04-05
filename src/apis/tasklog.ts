import http from '@/axios'
import type { TaskLogsResponse } from '@/types/responses'

export async function getTaskLogs(
  limit: number,
  offset: number,
  task_id?: number,
  status?: string,
  start_time?: string,
  end_time?: string
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
  const { data } = await http.get('/task_log', {
    params: params
  })
  return data
}
export async function deleteTaskLog(id: number): Promise<void> {
  await http.delete(`/task_log/${id}`)
}
