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
  insertCase: (body, cid) => request.post("insert_case", {body, cid}),

  getData: (username) => request.get(`get_data?username=${username}`),
  getAllData: () => request.get('get_all_data'),

  removeDoctor: (data) => request.post('remove_doctor', data),
  removePatient: (id) => request.post(`remove_patient`, {id}),

  getDoctorInfo: (username) => request.get(`get_doctor_info?username=${username}`),

  updateDoctorInfo: (info) => request.post('insert_doctor_info', info),

  changePassword: (data) => request.post('change_password', data),
  changePhoneNumber: (data) => request.post('change_phonenumber', data),
  changeEmail: (data) => request.post('change_email', data),
}
