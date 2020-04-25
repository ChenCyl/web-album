/**
 * 本页 code from vue_admin_template
 */

import Cookies from 'js-cookie'

const TokenKey = 'photown_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
