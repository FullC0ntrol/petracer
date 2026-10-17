import { useLocation, useParams } from 'react-router'
import { LocateFixed, MessageSquareText, ShieldCheck } from 'lucide-react'
import { resolveTag } from '../../api/tags.js'
import ActionLink from '../../components/finder/ActionLink.jsx'
import Button from '../../components/ui/Button.jsx'
import Notice from '../../components/ui/Notice.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { useGeolocation } from '../../hooks/useGeolocation.js'
import { buildFinderMessage, buildSmsLink } from '../../lib/sms.js'

/*
  /t/:tagId/lokalizacja — SMS z lokalizacją do opiekuna zaginionego zwierzęcia (UC5, decyzja D4).

  Numer i imię przychodzą z widoku alarmowego w `location.state`. Po odświeżeniu strony `state`
  znika — wtedy pytamy serwer jeszcze raz (resolveTag), żeby strona działała także z zakładki.
*/
export default function ShareLocationPage() {
  const { tagId } = useParams()
  const { state } = useLocation()

  if (state?.phone) return <ShareLocation code={tagId} phone={state.phone} petName={state.petName} />
  return <ShareLocationFromServer code={tagId} />
}

function ShareLocationFromServer({ code }) {
  const { data: tag, error, isLoading } = useAsync(() => resolveTag(code), [code])

  if (isLoading) {
    return (
      <div className="grid place-items-center pt-16">
        <Spinner size="lg" showLabel label="Sprawdzam zawieszkę…" />
      </div>
    )
  }
  // SMS z lokalizacją jest dostępny tylko dla zaginionego zwierzęcia z podanym numerem.
  if (error || tag.variant !== 'lost' || !tag.phone) {
    return (
      <div className="space-y-4 pt-10 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Ta strona nie jest teraz dostępna</h1>
        <p className="text-ink-muted">{error?.message ?? 'Zwierzę nie jest oznaczone jako zaginione.'}</p>
        <Button to={`/t/${code}`} size="lg">
          Wróć do zawieszki
        </Button>
      </div>
    )
  }
  return <ShareLocation code={code} phone={tag.phone} petName={tag.pet.name} />
}

function ShareLocation({ code, phone, petName }) {
  const { status, position, error, request } = useGeolocation()
  const smsWithLocation = position && buildSmsLink(phone, buildFinderMessage(petName, position))
  const smsWithoutLocation = buildSmsLink(phone, buildFinderMessage(petName, null))

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Wyślij opiekunowi swoją lokalizację</h1>
        <p className="text-ink-muted">
          Przygotujemy SMS z linkiem do mapy. Otworzy się Twoja aplikacja wiadomości — wystarczy nacisnąć „Wyślij”.
        </p>
      </header>

      <p className="flex gap-2 rounded-2xl bg-pine-soft p-4 text-sm text-ink">
        <ShieldCheck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-pine" />
        Twoja lokalizacja trafia tylko do treści SMS-a. PeTrace jej nie zapisuje.
      </p>

      {status === 'success' ? (
        <div className="space-y-3">
          <p role="status" className="font-semibold text-pine">
            Mamy Twoją pozycję (dokładność ok. {Math.round(position.accuracy)} m).
          </p>
          <ActionLink href={smsWithLocation} variant="alert" icon={MessageSquareText}>
            Otwórz SMS do opiekuna
          </ActionLink>
        </div>
      ) : (
        <Button variant="alert" size="xl" icon={LocateFixed} fullWidth onClick={request} disabled={status === 'locating'}>
          {status === 'locating' ? 'Ustalam pozycję…' : 'Pobierz moją lokalizację'}
        </Button>
      )}

      {status === 'error' && (
        <Notice tone="warning" title={error}>
          Możesz wysłać SMS bez mapy i opisać miejsce własnymi słowami (ulica, charakterystyczny budynek).
        </Notice>
      )}

      {/* Wyjście awaryjne zawsze pod ręką: bez lokalizacji, z prośbą o opis miejsca (UC5, alternatywa). */}
      {status !== 'success' && (
        <ActionLink href={smsWithoutLocation} variant="secondary" icon={MessageSquareText}>
          SMS bez lokalizacji
        </ActionLink>
      )}

      <Button to={`/t/${code}`} variant="ghost" fullWidth>
        Wróć
      </Button>
    </div>
  )
}
