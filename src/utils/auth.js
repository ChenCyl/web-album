/**
 * 本页 code from vue_admin_template
 */

import Cookies from 'js-cookie'

// const TokenKeys = ['JSESSIONID', 'loginStatus']

export function getToken(key) {
  return Cookies.get(key)
}

export function setToken(key, value) {
  return Cookies.set(key, value)
}

export function removeToken(key) {
  return Cookies.remove(key)
}
