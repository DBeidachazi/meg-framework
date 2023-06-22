import { request } from '@/utils'

export default {
  login: (data) => request.post('login', data, { noNeedToken: true }),
  getAllDoctor: () => request.get('admingetalldoctor'),
  getall: (username) => request.get(`getall?did=${username}`),
  sendpid: (code) => request.post('sendpid', code),
  insertPatient: (data) => request.post('insert_patient', data),
  upload: (code, formData, headers) => request.post(`upload?code=${code}`, formData, headers),
  predict: (code) => request.get(`predict?code=${code}`, { timeout: 1e20 }),

  register: (data) => request.post('register', data),
  information: () => request.get('information'),
}
