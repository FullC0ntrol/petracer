import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { requestMagicLink } from '../../api/auth.js'
import PageHeader from '../../components/layout/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import { useAuth } from '../../hooks/useAuth.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  // Input kontrolowany: wartość pola żyje w stanie, a pole tylko ją pokazuje i zgłasza zmiany.
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // RequireAuth zapisał tu stronę, na którą użytkownik próbował wejść przed zalogowaniem.
  const from = location.state?.from
  const redirectTo = from ? from.pathname + from.search : null

  if (user) return <Navigate to={redirectTo ?? '/panel'} replace />

  async function handleSubmit(event) {
    // Bez tego przeglądarka wysłałaby formularz „po staremu” i przeładowała całą stronę.
    event.preventDefault()

    // Sprawdzamy od razu w przeglądarce (szybka odpowiedź), a serwer i tak sprawdzi jeszcze raz.
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Wpisz poprawny adres e-mail, np. maciej@pettrace.pl.')
      return
    }

    setError(null)
    setIsSubmitting(true)
    try {
      const result = await requestMagicLink(email, redirectTo)
      navigate('/login/sprawdz-poczte', { state: { email: result.email, devToken: result.devToken } })
    } catch (requestError) {
      setError(requestError.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <PageHeader title="Zaloguj się" description="Wyślemy Ci na e-mail link do logowania — bez hasła." />
      {/* noValidate: wyłączamy dymki walidacji przeglądarki, żeby błąd wyglądał tak jak reszta aplikacji. */}
      <Card as="form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="Adres e-mail"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="maciej@pettrace.pl"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={error}
          hint="Konto demo: maciej@pettrace.pl. Inny adres założy nowe, puste konto."
        />
        <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Wysyłam…' : 'Wyślij magic link'}
        </Button>
      </Card>
    </div>
  )
}
