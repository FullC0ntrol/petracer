import { request } from './request.js'

export function requestMagicLink(email, { name = '', next = null } = {}) {
  return request('POST', '/auth/request-link', { email, name, next })
}

export function verifyToken(token) {
  return request('POST', '/auth/verify', { token })
}

export async function getCurrentUser() {
  const { user } = await request('GET', '/auth/me')
  return user
}

export async function logout() {
  await request('POST', '/auth/logout')
}

export function updateSettings(settings) {
  return request('PATCH', '/me', settings)
}

export function getDemoLogin() {
  return request('GET', '/auth/demo')
}

export function loginAsDemo() {
  return request('POST', '/auth/demo')
}
