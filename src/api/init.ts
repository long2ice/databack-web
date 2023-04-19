import http from '@/axios'

export async function initAdmin(email: string, password: string, nickname: string): Promise<void> {
  await http.post('/admin/init', {
    email,
    password,
    nickname
  })
}
