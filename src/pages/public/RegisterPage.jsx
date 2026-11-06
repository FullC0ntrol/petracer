import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router'
import PageHeader from '../../components/layout/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import { useAuth } from '../../hooks/useAuth.js'

const EMPTY_FORM = { email: '', name: '', pin: '', pinRepeat: '' }

function validate({ name, pin, pinRepeat }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Podaj imię.'
  if (!/^\d{6}$/.test(pin)) errors.pin = 'PIN musi mieć dokładnie 6 cyfr.'
  else if (pin !== pinRepeat) errors.pinRepeat = 'PIN-y się różnią.'
  return errors
}

// Ten sam stan dla wszystkich pól: `handleChange` rozpoznaje pole po atrybucie `name`.
export default function RegisterPage() {
  const { user, register } = useAuth()
  const location = useLocation()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = location.state?.from
  if (user) return <Navigate to={from ? from.pathname + from.search : '/panel'} replace />

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await register({ email: form.email, name: form.name, pin: form.pin })
    } catch (registerError) {
      // Błąd z serwera dotyczy najczęściej adresu: zły format albo konto już istnieje.
      setErrors({ email: registerError.message })
      setIsSubmitting(false)
    }
  }

  const pinField = { type: 'password', inputMode: 'numeric', autoComplete: 'new-password', maxLength: 6, onChange: handleChange }

  return (
    <div className="mx-auto max-w-sm">
      <PageHeader title="Załóż konto" description="Dodasz zwierzę i utworzysz mu zawieszkę w kilka minut." />
      <Card as="form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input label="Adres e-mail" type="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} error={errors.email} />
        <Input label="Imię" name="name" autoComplete="given-name" value={form.name} onChange={handleChange} error={errors.name} />
        <Input label="PIN (6 cyfr)" name="pin" value={form.pin} error={errors.pin} hint="Będziesz go wpisywać przy logowaniu." {...pinField} />
        <Input label="Powtórz PIN" name="pinRepeat" value={form.pinRepeat} error={errors.pinRepeat} {...pinField} />
        <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Zakładam konto…' : 'Załóż konto'}
        </Button>
        <p className="text-center text-sm text-ink-muted">
          Masz już konto?{' '}
          <Link to="/login" state={location.state} className="font-semibold text-pine underline-offset-4 hover:underline">
            Zaloguj się
          </Link>
        </p>
      </Card>
    </div>
  )
}
