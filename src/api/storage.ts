import http from '@/axios'
import type { StorageResponse, StoragesResponse, StorageType } from '@/types/responses'
import type { Sort } from '@/types/common'

export async function getStorages(
  limit: number,
  offset: number,
  name?: string,
  type?: StorageType,
  sorts?: Sort[]
): Promise<StoragesResponse> {
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
  const { data } = await http.get('/storage', {
    params: params
  })
  return data
}
export async function getStoragesBasic(): Promise<StorageResponse[]> {
  const { data } = await http.get('/storage/basic')
  return data
}
export async function createStorage(
  name: string,
  path: string,
  type: StorageType,
  options: Record<string, any>
): Promise<void> {
  const { data } = await http.post('/storage', {
    name,
    path,
    type,
    options
  })
  return data
}
export async function deleteStorages(ids: number[]): Promise<void> {
  const idsStr = ids.join(',')
  const { data } = await http.delete(`/storage/${idsStr}`)
  return data
}

export async function getStorage(id: number): Promise<StorageResponse> {
  const { data } = await http.get(`/storage/${id}`)
  return data
}

export async function updateStorage(
  id: number,
  name: string,
  path: string,
  type: StorageType,
  options: Record<string, any>
): Promise<void> {
  const { data } = await http.patch(`/storage/${id}`, {
    name,
    path,
    type,
    options
  })
  return data
}
