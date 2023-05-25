import { request } from '@/utils'

export default {
  login: (data) => request.post('http://127.0.0.1:8009/login', data, { noNeedToken: true }),
}
