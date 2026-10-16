import { Link } from 'react-router'
import { PawPrint, Plus, RotateCcw } from 'lucide-react'
import { getPets } from '../../api/pets.js'
import PageHeader from '../../components/layout/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import SketchBox from '../../dev/SketchBox.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { useAuth } from '../../hooks/useAuth.js'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <>
      <PageHeader
        title={`Cześć, ${user.name}`}
        description="Oto, co słychać u Twoich zwierząt."
        action={
          <Button to="/zwierzeta/nowe" icon={Plus}>
            Dodaj zwierzę
          </Button>
        }
      />

      <div className="space-y-8">
        <section aria-labelledby="pets-heading">
          <h2 id="pets-heading" className="mb-3 text-lg font-semibold">
            Twoje zwierzęta
          </h2>
          <PetList />
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <section aria-labelledby="reminders-heading">
            <h2 id="reminders-heading" className="mb-3 text-lg font-semibold">
              Najbliższe przypomnienia
            </h2>
            <SketchBox label="Lista 3 przypomnień" className="h-48" />
          </section>
          <section aria-labelledby="activity-heading">
            <h2 id="activity-heading" className="mb-3 text-lg font-semibold">
              Aktywność w tym tygodniu
            </h2>
            <SketchBox label="Dystans · czas · liczba spacerów" className="h-48" />
          </section>
          <section aria-labelledby="scans-heading">
            <h2 id="scans-heading" className="mb-3 text-lg font-semibold">
              Ostatnie odczyty tagów
            </h2>
            <SketchBox label="Lista odczytów" className="h-48" />
          </section>
        </div>
      </div>
    </>
  )
}

// Cztery stany jednej listy: ładowanie → błąd / pusto / dane.
function PetList() {
  const { data: pets, error, isLoading, reload } = useAsync(getPets, [])

  if (isLoading) return <Spinner showLabel label="Wczytuję zwierzęta…" />

  if (error) {
    return (
      <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-alert-soft p-4">
        <p className="font-medium text-alert">Nie udało się wczytać zwierząt. {error.message}</p>
        <Button variant="secondary" size="sm" icon={RotateCcw} onClick={reload}>
          Spróbuj ponownie
        </Button>
      </div>
    )
  }

  if (pets.length === 0) {
    return (
      <EmptyState
        icon={PawPrint}
        title="Nie masz jeszcze zwierząt"
        description="Dodaj pierwsze zwierzę i przypnij mu tag — znalazca zobaczy, jak się z Tobą skontaktować."
        action={
          <Button to="/zwierzeta/nowe" icon={Plus} size="sm">
            Dodaj zwierzę
          </Button>
        }
      />
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {pets.map((pet) => (
        <Link key={pet.id} to={`/zwierzeta/${pet.id}`} className="rounded-2xl">
          <SketchBox
            label={`Karta: ${pet.name}${pet.isLost ? ' (Lost Mode)' : ''}`}
            hint="Etap 4"
            className="h-32"
          />
        </Link>
      ))}
    </div>
  )
}
