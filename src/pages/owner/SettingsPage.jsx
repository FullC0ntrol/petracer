import { useNavigate } from 'react-router'
import { LogOut } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader.jsx'
import { setLoggedIn } from '../../dev/devStore.js'
import SketchBox from '../../dev/SketchBox.jsx'

export default function SettingsPage() {
  const navigate = useNavigate()

  function handleLogout() {
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <div className="max-w-2xl">
      <PageHeader title="Ustawienia" />
      <div className="space-y-4">
        <SketchBox label="Konto: e-mail, imię" hint="Etap 7" className="h-28" />
        <SketchBox label="Powiadomienia (przełączniki)" className="h-36" />
        <SketchBox label="Dane kontaktowe widoczne dla znalazcy" className="h-36" />
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-line bg-surface px-5 font-semibold text-alert transition-colors hover:bg-alert-soft"
        >
          <LogOut size={18} aria-hidden="true" />
          Wyloguj się
        </button>
      </div>
    </div>
  )
}
