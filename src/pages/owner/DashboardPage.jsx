import { Navigate } from 'react-router'
import { PawPrint, Plus } from 'lucide-react'
import { getPets } from '../../api/pets.js'
import PhoneNotice from '../../components/pets/PhoneNotice.jsx'
import Button from '../../components/ui/Button.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import ErrorState from '../../components/ui/ErrorState.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { useAuth } from '../../hooks/useAuth.js'
import { getLastPetId } from '../../lib/lastPet.js'

/*
  /panel nie ma już własnej listy kart. Jeśli są zwierzęta, od razu otwieramy ekran
  ostatnio oglądanego (albo pierwszego) — tam jest przełącznik u góry i arkusz „Akcje”.
  Własny widok /panel zostaje tylko dla konta bez zwierząt: powitanie i przycisk „Dodaj”.
*/
export default function DashboardPage() {
  const { user } = useAuth()
  const { data: pets, error, isLoading, reload } = useAsync(getPets, [])

  if (isLoading) return <Spinner showLabel label="Wczytuję zwierzęta…" />
  if (error) return <ErrorState title="Nie udało się wczytać zwierząt" error={error} onRetry={reload} />

  if (pets.length > 0) {
    const lastId = getLastPetId()
    const target = pets.find((pet) => pet.id === lastId) ?? pets[0]
    // `replace`: „Wstecz” z ekranu zwierzęcia nie wraca na /panel, który od razu by przekierował.
    return <Navigate to={`/zwierzeta/${target.id}`} replace />
  }

  return (
    <div className="space-y-6 pt-4">
      <h1 className="text-2xl font-bold tracking-tight">Cześć, {user.name}</h1>
      {!user.phone && <PhoneNotice />}
      <EmptyState
        icon={PawPrint}
        title="Nie masz jeszcze zwierząt"
        description="Dodaj pierwsze zwierzę i utwórz mu zawieszkę — znalazca zobaczy, jak się z Tobą skontaktować."
        action={
          <Button to="/zwierzeta/nowe" icon={Plus} size="sm">
            Dodaj zwierzę
          </Button>
        }
      />
    </div>
  )
}
