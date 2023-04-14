import http from '@/axios'
import type { Sort } from '@/types/common'
import type { DataSourceResponse, DataSourcesResponse, DataSourceType } from '@/types/responses'

export async function getDataSources(
  limit: number,
  offset: number,
  name?: string,
  type?: DataSourceType,
  sorts?: Sort[]
): Promise<DataSourcesResponse> {
  const params: Record<string, any> = {
    limit,
    offset
  }
  if (name) {
    params.name = name
  }
  if (type) {
    params.type = type
  }
  if (sorts) {
    params.sorts = JSON.stringify(sorts)
  }
  const { data } = await http.get('/datasource', {
    params: params
  })
  return data
}
export async function getDataSourcesBasic(): Promise<DataSourceResponse[]> {
  const { data } = await http.get('/datasource/basic')
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
export async function deleteDataSources(ids: number[]): Promise<void> {
  const idsStr = ids.join(',')
  const { data } = await http.delete(`/datasource/${idsStr}`)
  return data
}

export async function getDataSource(id: number): Promise<DataSourceResponse> {
  const { data } = await http.get(`/datasource/${id}`)
  return data
}

export async function updateDataSource(
  id: number,
  name: string,
  type: DataSourceType,
  options: Record<string, any>
): Promise<void> {
  const { data } = await http.patch(`/datasource/${id}`, {
    name,
    type,
    options
  })
  return data
}
