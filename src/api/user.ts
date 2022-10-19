import { get, post } from '../utils/fetchUtils'

export default {
  register: (params: {
    username: string
    passwors: string
    passwordAffirm: string
  }): Promise<any> => post('/user/register', params),

  login: (params: {
    username: string
    passwors: string
  }): Promise<any> => post('/user/login', params),

  test: (params: {
  }): Promise<any> => get('/koa/test', params)
}