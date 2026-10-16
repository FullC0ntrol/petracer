import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../../hooks/useAuth.js'
import Spinner from '../ui/Spinner.jsx'

// Strażnik tras właściciela. Zapamiętujemy w `state`, dokąd użytkownik chciał wejść,
// żeby po zalogowaniu tam wrócić (LoginPage przekazuje to dalej do magic linka).
export default function RequireAuth() {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  // Dopóki nie wiadomo, czy sesja istnieje, nie przekierowujemy — inaczej odświeżenie
  // dowolnej strony panelu zawsze kończyłoby się na /login.
  if (isLoading) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Spinner size="lg" label="Sprawdzam sesję…" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
