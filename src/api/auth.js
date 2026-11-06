import { request } from './request.js'

/*
  Konto i logowanie. Strony importują funkcje z plików w api/ i nie znają adresów serwera.
    register({ email, name, pin }) → { user }             POST  /api/auth/register
    login(email, pin)              → { user }             POST  /api/auth/login
    getCurrentUser()               → user | null          GET   /api/auth/me
    logout()                                              POST  /api/auth/logout
    updateSettings({ name, phone }) → user                PATCH /api/me
    getDemoLogin()                 → { enabled, email }   GET   /api/auth/demo
    loginAsDemo()                  → { user }             POST  /api/auth/demo
*/
export function register(account) {
  return request('POST', '/auth/register', account)
}

export function login(email, pin) {
  return request('POST', '/auth/login', { email, pin })
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
