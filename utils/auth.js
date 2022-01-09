import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    expires: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
