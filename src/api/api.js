import { stringify } from 'qs'
import request from '@/utils/request'

let apiHost
if (process.env.NODE_ENV === 'development') {
  console.log('========== DEVELOPMENT RUNSERVER ==========')
  apiHost = 'http://localhost:8000'
} else {
  console.log('======== PRODUCTION BUILD ========')
  apiHost = 'http://localhost:8000'
}
const apiVersion = '/api/v1'

export function token (params) {
  return request({
    url: `${apiHost}${apiVersion}/token/`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function fetchCurrentUser () {
  return request({
    url: `${apiHost}${apiVersion}/users/current_user/`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// export function signin (params) {
//   return request({
//     url: `${apiHost}${apiVersion}/users/signin/`,
//     method: 'post',
//     data: params
//   })
// }

// export function signout (params) {
//   return request({
//     url: `${apiHost}${apiVersion}/users/signout/`,
//     method: 'post',
//     data: params
//   })
// }

export function queryUsers (params) {
  return request({
    url: `${apiHost}${apiVersion}/users/?${stringify(params)}`,
    method: 'get'
  })
}

export function queryUserNameIDs () {
  return request({
    url: `${apiHost}${apiVersion}/users/user_name_ids/`,
    method: 'get'
  })
}

export function queryUserNav () {
  return request({
    url: `${apiHost}${apiVersion}/usernav/`,
    method: 'get'
  })
}
