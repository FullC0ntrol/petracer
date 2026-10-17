import { Link, useLocation } from 'react-router'
import { MailCheck } from 'lucide-react'
import Button from '../../components/ui/Button.jsx'

export default function CheckEmailPage() {
  // Dane przekazane przez LoginPage w `navigate(..., { state })`. Po odświeżeniu strony
  // albo wejściu z palca na ten adres `state` jest puste — wtedy prosimy o nowy link.
  const { state } = useLocation()

  if (!state?.email) {
    return (
      <div className="mx-auto max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Nie wiemy, na jaki adres wysłać link</h1>
        <p className="text-ink-muted">Wpisz swój e-mail jeszcze raz.</p>
        <Button to="/login" size="lg">
          Wróć do logowania
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-pine-soft text-pine">
        <MailCheck size={32} aria-hidden="true" />
      </span>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Sprawdź pocztę</h1>
        <p className="text-ink-muted">
          Wysłaliśmy link do logowania na <strong className="text-ink">{state.email}</strong>. Kliknij go, aby przejść
          do panelu. Link jest ważny 15 minut i działa tylko raz.
        </p>
      </div>
      {/* `devLink` zwraca tylko tryb mock i serwer uruchomiony w trybie deweloperskim. W produkcji
          link przychodzi wyłącznie e-mailem, więc ten przycisk się nie pojawi. */}
      {state.devLink && (
        <Link
          to={state.devLink}
          className="inline-flex min-h-12 items-center rounded-xl border-2 border-dashed border-amber px-5 font-semibold text-ink transition-colors hover:bg-ember-soft"
        >
          [DEV] Symuluj kliknięcie w link
        </Link>
      )}
      <p className="text-sm text-ink-muted">
        Nie widzisz wiadomości? Zajrzyj do folderu spam albo{' '}
        <Link to="/login" className="font-semibold text-pine underline-offset-4 hover:underline">
          wyślij link ponownie
        </Link>
        .
      </p>
    </div>
  )
}
