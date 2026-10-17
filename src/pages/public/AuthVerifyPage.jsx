import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import Button from '../../components/ui/Button.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import { safeRedirect } from '../../lib/redirect.js'

// Tu trafia kliknięcie w link z e-maila: /auth/verify?token=…&next=/strona-sprzed-logowania
export default function AuthVerifyPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const next = safeRedirect(searchParams.get('next'))
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  /*
    Token jest jednorazowy, a StrictMode w trybie dev celowo uruchamia każdy efekt dwa razy.
    Drugie wywołanie trafiłoby na zużyty token i pokazało błąd. Ref przetrwa to podwójne
    uruchomienie, więc zapamiętujemy w nim, że weryfikacja już wystartowała.
    (Flaga `ignore` z useAsync tu nie pomoże — odrzuciłaby wynik, ale token byłby już zużyty.)
  */
  const hasStarted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    login(token ?? '').then(
      () => navigate(next ?? '/panel', { replace: true }),
      (loginError) => setError(loginError.message),
    )
  }, [login, token, next, navigate])

  if (error) {
    return (
      <div role="alert" className="mx-auto max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Nie udało się zalogować</h1>
        <p className="text-ink-muted">{error}</p>
        <Button to="/login" size="lg">
          Wyślij nowy link
        </Button>
      </div>
    )
  }

  return (
    <div className="grid place-items-center py-12">
      <Spinner size="lg" showLabel label="Weryfikuję link…" />
    </div>
  )
}
