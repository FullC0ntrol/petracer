import { useParams } from 'react-router'
import { resolveTag } from '../../api/tags.js'
import FoundView from '../../components/finder/FoundView.jsx'
import InactiveTagView from '../../components/finder/InactiveTagView.jsx'
import LostView from '../../components/finder/LostView.jsx'
import OwnerQuickLog from '../../components/finder/OwnerQuickLog.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { useAuth } from '../../hooks/useAuth.js'

/*
  Routing kontekstowy: ten sam adres /t/:tagId (zapisany na zawieszce) pokazuje różne widoki.
  O wariancie decyduje SERWER (decyzja D6) — strona tylko wyświetla to, co dostała:
    inactive → „Ten tag nie jest aktywny”
    owner    → szybki zapis karmienia / spaceru
    lost     → widok alarmowy z SMS-em z lokalizacją
    found    → profil podstawowy z przyciskiem „Zadzwoń”
  Kolejność warunków i ich uzasadnienie: server/src/routes/tags.js.
*/
export default function TagPage() {
  const { tagId } = useParams()
  const { user, isLoading: isAuthLoading } = useAuth()

  // Czekamy, aż wiadomo, kto jest zalogowany. Inaczej strona zapytałaby serwer dwa razy
  // (raz „anonimowo”, raz po wczytaniu sesji) i zapisała w historii dwa skany.
  if (isAuthLoading) return <Loading />

  // `key`: po zalogowaniu albo wylogowaniu (np. z panelu DEV) pytamy serwer od nowa,
  // bo zmienia się odpowiedź na pytanie „czy skanuje właściciel”.
  return <TagContent key={user?.id ?? 'anonymous'} code={tagId} />
}

function TagContent({ code }) {
  const { data: tag, error, isLoading, reload } = useAsync(() => resolveTag(code), [code])

  if (isLoading) return <Loading />
  if (error) {
    return (
      <div role="alert" className="space-y-4 pt-10 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Nie udało się wczytać zawieszki</h1>
        <p className="text-ink-muted">{error.message}</p>
        <button type="button" onClick={reload} className="font-semibold text-pine underline underline-offset-4">
          Spróbuj ponownie
        </button>
      </div>
    )
  }

  switch (tag.variant) {
    case 'owner':
      return <OwnerQuickLog pet={tag.pet} />
    case 'lost':
      return <LostView code={tag.code} pet={tag.pet} phone={tag.phone} message={tag.message} />
    case 'found':
      return <FoundView pet={tag.pet} phone={tag.phone} />
    default:
      return <InactiveTagView code={tag.code} />
  }
}

function Loading() {
  return (
    <div className="grid place-items-center pt-16">
      <Spinner size="lg" showLabel label="Sprawdzam zawieszkę…" />
    </div>
  )
}
