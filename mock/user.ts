import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username === 'admin' && password === 'admin') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            token: 'mock-token-123456',
          },
        }
      } else {
        return {
          code: 1,
          message: '账号或密码错误',
        }
      }
    },
  },
] as MockMethod[]
