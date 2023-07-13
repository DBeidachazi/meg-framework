import { request } from '@/utils'

export default {
  login: (data) => request.post('login', data, { noNeedToken: true }),
  getAllDoctor: () => request.get('admingetalldoctor'),
  getall: (username) => request.get(`getall?did=${username}`),
  sendpid: (code) => request.post('sendpid', code),
  insertPatient: (data) => request.post('insert_patient', data),
  upload: (code, formData, headers) => request.post(`upload?code=${code}`, formData, headers),
  predict: (code) => request.get(`predict?code=${code}`, { timeout: 1e20 }),

  register: (data, headers) => request.post('register', data, headers),
  information: () => request.get('information'),

  fetchData: (username) => request.get(`quota_inquiry?username=${username}`),

  queryCase: (cid) => request.get(`query_case?cid=${cid}`),
  insertCase: (data) => request.post('insert_case', data),

  getData: (username) => request.get(`get_data?username=${username}`),

  removeDoctor: (data) => request.post('remove_doctor', data),
  removePatient: (id) => request.post(`remove_patient`, {id}),

}
