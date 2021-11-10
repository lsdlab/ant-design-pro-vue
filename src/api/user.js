import request from '@/utils/request'

let apiHost
if (process.env.NODE_ENV === 'development') {
  console.log('========== DEVELOPMENT RUNSERVER ==========')
  apiHost = 'http://localhost:8000'
} else {
  console.log('======== PRODUCTION BUILD ========')
  apiHost = 'http://192.168.124.61:8000'
  // apiHost = 'http://localhost:5000'
}
const apiVersion = '/api/v1'

export function signin (params) {
  return request({
    url: `${apiHost}${apiVersion}/users/signin/`,
    method: 'post',
    data: params
  })
}

export function signout (params) {
  return request({
    url: `${apiHost}${apiVersion}/users/signout/`,
    method: 'post',
    data: params
  })
}

const userApi = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
