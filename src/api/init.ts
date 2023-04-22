import http from '@/axios'

export async function initAdmin(email: string, password: string, nickname: string): Promise<void> {
  await http.post('/init/admin', {
    email,
    password,
    nickname
  })
}
