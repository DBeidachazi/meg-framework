import { resolveToken } from '../utils'

export const users = {
  admin: {
    id: 1,
    name: '大脸怪(admin)',
    avatar: 'http://tva1.sinaimg.cn/mw690/006Hj19Tly1hf4ppw4i52j30oe0mxn5d.jpg',
    email: 'Ronnie@123.com',
    role: ['admin'],
  },
  editor: {
    id: 2,
    name: '大脸怪(editor)',
    avatar: 'http://tva1.sinaimg.cn/mw690/006Hj19Tly1hf4ppw4i52j30oe0mxn5d.jpg',
    email: 'Ronnie@123.com',
    role: ['editor'],
  },
  guest: {
    id: 3,
    name: '访客(guest)',
    avatar: 'http://tva1.sinaimg.cn/mw690/006Hj19Tly1hf4ppw4i52j30oe0mxn5d.jpg',
    role: [],
  },
}
export default [
  {
    url: '/api/user',
    method: 'get',
    response: ({ headers }) => {
      const token = resolveToken(headers?.authorization)
      return {
        code: 0,
        data: {
          ...(users[token] || users.guest),
        },
      }
    },
  },
]
