import axios from 'axios'
import { toast } from 'vue3-toastify'
import { i18n } from '@/i18n'
import Nprogress from 'nprogress'
const http = axios.create({
  baseURL: import.meta.env.API_URL || '/api'
})
http.interceptors.request.use((config) => {
  Nprogress.start()
  return config
})
http.interceptors.response.use(
  function (response) {
    Nprogress.done()
    return response
  },
  function (error) {
    const response = error.response
    if (response.status < 500) {
      toast.error(response.data.error)
    } else {
      toast.error(i18n.global.t('error.server'))
    }
    return Promise.reject(error)
  }
)
export default http
