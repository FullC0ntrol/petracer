import { Navigate, Outlet, useLocation } from 'react-router'
import { useDevState } from '../../dev/devStore.js'

// Strażnik tras właściciela. W etapie 3 `useDevState` zostanie zastąpione przez `useAuth`.
// Zapamiętujemy w `state`, dokąd użytkownik chciał wejść, żeby po logowaniu tam wrócić.
export default function RequireAuth() {
  const { isLoggedIn } = useDevState()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
