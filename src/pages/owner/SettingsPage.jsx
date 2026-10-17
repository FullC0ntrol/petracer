import { useState } from 'react'
import { useNavigate } from 'react-router'
import { CircleCheck, LogOut } from 'lucide-react'
import { updateSettings } from '../../api/auth.js'
import PageHeader from '../../components/layout/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import Input from '../../components/ui/Input.jsx'
import Notice from '../../components/ui/Notice.jsx'
import { useAuth } from '../../hooks/useAuth.js'

const PHONE_PATTERN = /^\+?[0-9 ()-]{9,20}$/

export default function SettingsPage() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(user.phone)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | saving | saved | error
  const [saveError, setSaveError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = {}
    if (!name.trim()) validationErrors.name = 'Podaj imię.'
    if (phone.trim() && !PHONE_PATTERN.test(phone.trim())) {
      validationErrors.phone = 'Wpisz numer z kierunkowym, np. +48 600 123 456.'
    }
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('saving')
    try {
      updateUser(await updateSettings({ name: name.trim(), phone: phone.trim() }))
      setStatus('saved')
    } catch (error) {
      setSaveError(error.message)
      setStatus('error')
    }
  }

  // Najpierw wychodzimy z panelu, potem kasujemy sesję. W odwrotnej kolejności RequireAuth
  // zdążyłby zauważyć brak użytkownika i przerzucić nas na /login zamiast na stronę główną.
  async function handleLogout() {
    navigate('/', { replace: true })
    await logout()
  }

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="Ustawienia" />

      <Card as="form" onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">Dane kontaktowe</h2>
          <p className="text-sm text-ink-muted">Zalogowano jako {user.email}</p>
        </div>

        <Input
          label="Imię"
          name="name"
          autoComplete="given-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
        />
        <Input
          label="Numer telefonu dla znalazcy"
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder="+48 600 123 456"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          error={errors.phone}
          hint="Gdy zwierzę nie jest zaginione, znalazca może tylko zadzwonić przyciskiem — numer nie jest wyświetlany. W trybie zaginięcia widać go na ekranie."
        />

        {status === 'error' && (
          <Notice tone="alert" title="Nie udało się zapisać">
            {saveError}
          </Notice>
        )}

        <div className="flex flex-wrap items-center justify-end gap-3">
          {status === 'saved' && (
            <p role="status" className="flex items-center gap-1.5 text-sm font-medium text-pine">
              <CircleCheck size={16} aria-hidden="true" />
              Zapisano
            </p>
          )}
          <Button type="submit" disabled={status === 'saving'}>
            {status === 'saving' ? 'Zapisuję…' : 'Zapisz'}
          </Button>
        </div>
      </Card>

      <Button variant="danger" size="lg" icon={LogOut} onClick={handleLogout}>
        Wyloguj się
      </Button>
    </div>
  )
}
