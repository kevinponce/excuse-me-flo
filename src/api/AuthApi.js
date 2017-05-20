import axios from 'axios'
import { apiBaseUrl } from '../utils/config'

var jwtDecode = require('jwt-decode')

const AUTH_TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh`_token'

export function signin (userParams) {
  return axios.post(`${apiBaseUrl()}/user_auth/`, { auth: userParams })
}

export function signup (userParams) {
  return axios.post(`${apiBaseUrl()}/users`, { user: userParams })
}

export function setRefreshToken (accessToken) {
  localStorage.setItem(REFRESH_TOKEN_KEY, accessToken)
}

export function setAuthToken (authToken) {
  localStorage.setItem(AUTH_TOKEN_KEY, authToken)
}

export function getAuthToken () {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function getRefreshToken () {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function clearTokens () {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function isLoggedIn () {
  const authToken = getAuthToken()
  return !!authToken && !isTokenExpired(authToken)
}

export function requireAuth (to, from, next) {
  if (!isLoggedIn()) {
    next({ path: '/signin', query: { redirect: to.fullPath } })
  } else {
    next()
  }
}

export function requireNoAuth (to, from, next) {
  if (isLoggedIn()) {
    next({ path: '/' })
  } else {
    next()
  }
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}

function getTokenExpirationDate (encodedToken) {
  const token = jwtDecode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}
