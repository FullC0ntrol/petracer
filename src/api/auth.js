import * as http from './http/auth.js'
import * as mock from './mock/auth.js'

/*
  Logowanie bez hasła (magic link) i dane konta:
    requestMagicLink(email, { name, next }) → { email, devLink? }   POST /api/auth/request-link
    verifyToken(token)                      → { user }              POST /api/auth/verify
    getCurrentUser()                        → user | null           GET  /api/auth/me
    logout()                                                        POST /api/auth/logout
    updateSettings({ name, phone })         → user                  PATCH /api/me
    getDemoLogin()                          → { enabled, email }    GET  /api/auth/demo
    loginAsDemo()                           → { user }              POST /api/auth/demo

  Każdy plik w api/ wygląda tak samo: wybiera implementację według trybu (src/api/mode.js)
  i eksportuje jej funkcje. Strony importują stąd i nie wiedzą, czy rozmawiają z localStorage,
  czy z serwerem.

  Dlaczego osobna linijka dla każdej funkcji, zamiast `const impl = …; export const { … } = impl`?
  Vite zamienia `import.meta.env.VITE_API_MODE` na stały napis, a przy takim zapisie bundler widzi,
  że druga gałąź (`mock.…`) nigdy nie jest używana, i wycina cały kod mock z paczki produkcyjnej.
  Przy wersji z obiektem `impl` kod obu trybów zostawałby w paczce.
*/
const useHttp = import.meta.env.VITE_API_MODE === 'http'

export const requestMagicLink = useHttp ? http.requestMagicLink : mock.requestMagicLink
export const verifyToken = useHttp ? http.verifyToken : mock.verifyToken
export const getCurrentUser = useHttp ? http.getCurrentUser : mock.getCurrentUser
export const logout = useHttp ? http.logout : mock.logout
export const updateSettings = useHttp ? http.updateSettings : mock.updateSettings
export const getDemoLogin = useHttp ? http.getDemoLogin : mock.getDemoLogin
export const loginAsDemo = useHttp ? http.loginAsDemo : mock.loginAsDemo
