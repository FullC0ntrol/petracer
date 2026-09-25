import { Link } from 'react-router'
import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm">
      <PageHeader title="Zaloguj się" description="Wyślemy Ci na e-mail link do logowania — bez hasła." />
      <div className="space-y-4 rounded-2xl bg-surface p-6 shadow-card">
        <SketchBox label="Pole: adres e-mail" hint="Etap 3" className="min-h-14" />
        <Link
          to="/login/sprawdz-poczte"
          className="flex min-h-12 items-center justify-center rounded-xl bg-pine font-semibold text-surface transition-colors hover:bg-pine/90"
        >
          Wyślij magic link
        </Link>
      </div>
    </div>
  )
}
