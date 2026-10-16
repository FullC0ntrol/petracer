import { useNavigate } from 'react-router'
import { LogOut } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import SketchBox from '../../dev/SketchBox.jsx'
import { useAuth } from '../../hooks/useAuth.js'

export default function SettingsPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  // Najpierw wychodzimy z panelu, potem kasujemy sesję. W odwrotnej kolejności RequireAuth
  // zdążyłby zauważyć brak użytkownika i przerzucić nas na /login zamiast na stronę główną.
  async function handleLogout() {
    navigate('/', { replace: true })
    await logout()
  }

  return (
    <div className="max-w-2xl">
      <PageHeader title="Ustawienia" />
      <div className="space-y-4">
        <SketchBox label="Konto: e-mail, imię" hint="Etap 7" className="h-28" />
        <SketchBox label="Powiadomienia (przełączniki)" className="h-36" />
        <SketchBox label="Dane kontaktowe widoczne dla znalazcy" className="h-36" />
        <Button variant="danger" size="lg" icon={LogOut} onClick={handleLogout}>
          Wyloguj się
        </Button>
      </div>
    </div>
  )
}
