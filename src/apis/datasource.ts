import http from '@/axios'

export async function getDatasources(limit: number, offset: number): Promise<DataSourcesResponse> {
  const { data } = await http.get('/datasource', {
    params: {
      limit,
      offset
    }
  })
  return data
}
