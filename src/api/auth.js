import * as http from './http/auth.js'
import * as mock from './mock/auth.js'
import { API_MODE } from './mode.js'

/*
  Logowanie bez hasła (magic link) i dane konta:
    requestMagicLink(email, { name, next }) → { email, devLink? }   POST /api/auth/request-link
    verifyToken(token)                      → { user }              POST /api/auth/verify
    getCurrentUser()                        → user | null           GET  /api/auth/me
    logout()                                                        POST /api/auth/logout
    updateSettings({ name, phone })         → user                  PATCH /api/me

  Każdy plik w api/ wygląda tak samo: wybiera implementację według trybu i eksportuje jej funkcje.
  Strony importują stąd i nie wiedzą, czy rozmawiają z localStorage, czy z serwerem.
*/
const impl = API_MODE === 'http' ? http : mock

export const { requestMagicLink, verifyToken, getCurrentUser, logout, updateSettings } = impl
