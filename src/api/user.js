import { stringify } from 'qs'
import request from '@/utils/request'

let apiHost
if (process.env.NODE_ENV === 'development') {
  console.log('========== DEVELOPMENT RUNSERVER ==========')
  apiHost = 'http://localhost:8000'
} else {
  console.log('======== PRODUCTION BUILD ========')
  apiHost = 'http://1.15.14.27:8000'
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
