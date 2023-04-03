import http from '@/axios'
import type { DataSourcesResponse, DataSourceType } from '@/types/responses'

export async function getDataSources(limit: number, offset: number): Promise<DataSourcesResponse> {
  const { data } = await http.get('/datasource', {
    params: {
      limit,
      offset
    }
  })
  return data
}

export async function createDataSource(
  name: string,
  type: DataSourceType,
  options: Record<string, any>
): Promise<void> {
  const { data } = await http.post('/datasource', {
    name,
    type,
    options
  })
  return data
}
export async function deleteDataSource(id: number): Promise<void> {
  const { data } = await http.delete(`/datasource/${id}`)
  return data
}
