import { Link } from 'react-router'
import { MailCheck } from 'lucide-react'

export default function CheckEmailPage() {
  return (
    <div className="mx-auto max-w-sm space-y-6 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-pine-soft text-pine">
        <MailCheck size={32} aria-hidden="true" />
      </span>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Sprawdź pocztę</h1>
        <p className="text-ink-muted">Wysłaliśmy link do logowania. Kliknij go, aby przejść do panelu.</p>
      </div>
      <Link
        to="/auth/verify?token=demo"
        className="inline-flex min-h-12 items-center rounded-xl border-2 border-dashed border-amber px-5 font-semibold text-ink transition-colors hover:bg-ember-soft"
      >
        [DEV] Symuluj kliknięcie w link
      </Link>
    </div>
  )
}
