import { useEffect, useMemo, useState } from 'react'
import { getCurrentUser, logout as apiLogout, verifyToken } from '../api/auth.js'
import { AuthContext } from './AuthContext.js'

/*
  Trzyma informację „kto jest zalogowany” w jednym miejscu dla całej aplikacji.
  Bez Contextu trzeba by przekazywać `user` przez props przez każdy layout i stronę (prop drilling).

  `isLoading` jest true, dopóki nie wiemy, czy sesja istnieje. Bez tego po odświeżeniu /panel
  strażnik tras przez ułamek sekundy widziałby `user = null` i wyrzucał na /login.
*/
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    getCurrentUser()
      .then((currentUser) => {
        if (!ignore) setUser(currentUser)
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [])

  // useMemo: nowy obiekt `value` tylko wtedy, gdy zmieni się user lub isLoading. Inaczej każdy
  // render providera tworzyłby nowy obiekt i przerysowywał wszystkich, którzy używają useAuth.
  const value = useMemo(
    () => ({
      user,
      isLoading,
      // Zwraca ścieżkę, na którą trzeba wrócić po zalogowaniu (albo null).
      async login(token) {
        const result = await verifyToken(token)
        setUser(result.user)
        return result.redirectTo
      },
      async logout() {
        await apiLogout()
        setUser(null)
      },
    }),
    [user, isLoading],
  )

  // React 19: kontekst renderujemy bezpośrednio jako komponent (starszy zapis: <AuthContext.Provider>).
  return <AuthContext value={value}>{children}</AuthContext>
}
