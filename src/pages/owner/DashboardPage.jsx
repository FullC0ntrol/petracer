import { PawPrint, Plus, ScanLine } from 'lucide-react'
import { getPets } from '../../api/pets.js'
import { getRecentScans } from '../../api/tags.js'
import PageHeader from '../../components/layout/PageHeader.jsx'
import PetCard from '../../components/pets/PetCard.jsx'
import ScanList from '../../components/tags/ScanList.jsx'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import ErrorState from '../../components/ui/ErrorState.jsx'
import Notice from '../../components/ui/Notice.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { useAuth } from '../../hooks/useAuth.js'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <>
      <PageHeader
        title={`Cześć, ${user.name}`}
        description="Twoje zwierzęta i ostatnie skanowania zawieszek."
        action={
          <Button to="/zwierzeta/nowe" icon={Plus}>
            Dodaj zwierzę
          </Button>
        }
      />

      <div className="space-y-8">
        {!user.phone && (
          <Notice
            tone="warning"
            title="Dodaj numer telefonu"
            action={
              <Button to="/ustawienia" variant="secondary" size="sm">
                Przejdź do ustawień
              </Button>
            }
          >
            Bez numeru znalazca nie zadzwoni do Ciebie, a zawieszki nie da się utworzyć.
          </Notice>
        )}

        <section aria-labelledby="pets-heading">
          <h2 id="pets-heading" className="mb-3 text-lg font-semibold">
            Twoje zwierzęta
          </h2>
          <PetList />
        </section>

        <section aria-labelledby="scans-heading">
          <h2 id="scans-heading" className="mb-3 text-lg font-semibold">
            Ostatnie skanowania
          </h2>
          <RecentScans />
        </section>
      </div>
    </>
  )
}

// Cztery stany jednej listy: ładowanie → błąd / pusto / dane.
function PetList() {
  const { data: pets, error, isLoading, reload } = useAsync(getPets, [])

  if (isLoading) return <Spinner showLabel label="Wczytuję zwierzęta…" />
  if (error) return <ErrorState title="Nie udało się wczytać zwierząt" error={error} onRetry={reload} />

  if (pets.length === 0) {
    return (
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
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  )
}

function RecentScans() {
  const { data: scans, error, isLoading, reload } = useAsync(() => getRecentScans(8), [])

  if (isLoading) return <Spinner showLabel label="Wczytuję skanowania…" />
  if (error) return <ErrorState title="Nie udało się wczytać skanowań" error={error} onRetry={reload} />
  if (scans.length === 0) {
    return (
      <EmptyState
        icon={ScanLine}
        title="Nikt jeszcze nie skanował zawieszek"
        description="Każde otwarcie strony zawieszki pojawi się tutaj z datą i przeglądarką."
      />
    )
  }

  return (
    <Card padding="sm">
      <ScanList scans={scans} showPetName />
    </Card>
  )
}
