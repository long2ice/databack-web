import http from '@/axios'
import type { TokenResponse } from '@/types/responses'

export async function signIn(email: string, password: string): Promise<TokenResponse> {
  const { data } = await http.post('/auth/sign_in', {
    email,
    password
  })
  return data
}
export async function refresh(): Promise<TokenResponse> {
  const { data } = await http.post('/auth/refresh')
  return data
}
