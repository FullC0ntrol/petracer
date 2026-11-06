import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router'
import { PawPrint } from 'lucide-react'
import { getDemoLogin } from '../../api/auth.js'
import PageHeader from '../../components/layout/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { useAuth } from '../../hooks/useAuth.js'

export default function LoginPage() {
  const { user, login } = useAuth()
  const location = useLocation()
  // Inputy kontrolowane: wartość pola żyje w stanie, a pole tylko ją pokazuje i zgłasza zmiany.
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // RequireAuth zapisał tu stronę, na którą użytkownik próbował wejść przed zalogowaniem.
  const from = location.state?.from
  if (user) return <Navigate to={from ? from.pathname + from.search : '/panel'} replace />

  async function handleSubmit(event) {
    // Bez tego przeglądarka wysłałaby formularz „po staremu” i przeładowała całą stronę.
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      // Po zalogowaniu `user` w kontekście się zmienia, a `<Navigate>` wyżej sam przenosi dalej.
      await login(email, pin)
    } catch (loginError) {
      setError(loginError.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <PageHeader title="Zaloguj się" description="Wpisz adres e-mail i swój 6-cyfrowy PIN." />
      {/* noValidate: wyłączamy dymki walidacji przeglądarki, żeby błąd wyglądał tak jak reszta aplikacji. */}
      <Card as="form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="Adres e-mail"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="PIN"
          type="password"
          name="pin"
          inputMode="numeric"
          autoComplete="current-password"
          maxLength={6}
          value={pin}
          onChange={(event) => setPin(event.target.value)}
          error={error}
          hint="Nie pamiętasz PIN-u? Skontaktuj się z administratorem."
        />
        <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Loguję…' : 'Zaloguj się'}
        </Button>
        <p className="text-center text-sm text-ink-muted">
          Nie masz konta?{' '}
          <Link to="/rejestracja" state={location.state} className="font-semibold text-pine underline-offset-4 hover:underline">
            Załóż je
          </Link>
        </p>
      </Card>
      <DemoLogin />
    </div>
  )
}

/*
  Wejście na konto demonstracyjne jednym przyciskiem — do pokazu i testów. Serwer mówi, czy jest
  włączone (DEMO_LOGIN), i loguje wyłącznie na konto demo.
*/
function DemoLogin() {
  const { loginAsDemo } = useAuth()
  const { data } = useAsync(getDemoLogin, [])
  const [error, setError] = useState(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  if (!data?.enabled) return null

  async function handleClick() {
    setError(null)
    setIsLoggingIn(true)
    try {
      await loginAsDemo()
    } catch (loginError) {
      setError(loginError.message)
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="mt-4 space-y-2 text-center">
      <Button variant="ghost" icon={PawPrint} fullWidth onClick={handleClick} disabled={isLoggingIn}>
        {isLoggingIn ? 'Loguję…' : 'Wejdź na konto demo'}
      </Button>
      {error && (
        <p role="alert" className="text-sm font-medium text-alert">
          {error}
        </p>
      )}
    </div>
  )
}
