import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { Activity, Footprints, Pencil, QrCode, Siren, Timer, UtensilsCrossed } from 'lucide-react'
import { getActivities } from '../../api/activities.js'
import { getPetById } from '../../api/pets.js'
import ActivityList from '../../components/pets/ActivityList.jsx'
import LostModeSwitch from '../../components/pets/LostModeSwitch.jsx'
import PetAvatar from '../../components/pets/PetAvatar.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import ErrorState from '../../components/ui/ErrorState.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import StatTile from '../../components/ui/StatTile.jsx'
import Tabs from '../../components/ui/Tabs.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { formatAge, formatDate, formatDuration, formatWeight, speciesLabel } from '../../lib/format.js'

const TABS = [
  { id: 'info', label: 'Dane' },
  { id: 'health', label: 'Zdrowie' },
  { id: 'activity', label: 'Aktywność' },
]

export default function PetProfilePage() {
  const { id } = useParams()
  const { data, error, isLoading, reload } = useAsync(() => getPetById(id), [id])
  /*
    Po włączeniu trybu zaginięcia API zwraca zaktualizowane zwierzę. Zapisujemy je tutaj, zamiast
    ładować całą stronę od nowa (bez mrugnięcia spinnera). Sprawdzamy id, żeby po przejściu
    na profil innego zwierzęcia nie pokazać przez chwilę danych poprzedniego.
  */
  const [updatedPet, setUpdatedPet] = useState(null)
  const pet = updatedPet?.id === data?.id ? updatedPet : data

  if (isLoading) return <Spinner showLabel label="Wczytuję profil…" />
  if (error) return <ErrorState title="Nie udało się wczytać profilu" error={error} onRetry={reload} />

  return (
    <div className="space-y-6">
      <ProfileHeader pet={pet} />
      <LostModeSwitch key={pet.id} pet={pet} onChange={setUpdatedPet} />
      <ProfileTabs pet={pet} />
    </div>
  )
}

function ProfileHeader({ pet }) {
  const details = [speciesLabel(pet.species), pet.breed, formatAge(pet.birthDate)].filter(Boolean).join(' · ')

  return (
    <header className="flex flex-wrap items-center gap-5">
      <PetAvatar name={pet.name} species={pet.species} size="lg" isLost={pet.isLost} />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{pet.name}</h1>
          {pet.isLost && (
            <Badge tone="alert" size="md" icon={Siren}>
              Zaginione
            </Badge>
          )}
        </div>
        <p className="text-ink-muted">{details}</p>
      </div>
      <div className="flex w-full flex-wrap gap-3 sm:w-auto">
        <Button to={`/zwierzeta/${pet.id}/tag`} variant="secondary" icon={QrCode}>
          Zawieszka
        </Button>
        <Button to={`/zwierzeta/${pet.id}/edytuj`} variant="secondary" icon={Pencil}>
          Edytuj
        </Button>
      </div>
    </header>
  )
}

/*
  Aktywna zakładka jest zapisana w adresie (?tab=health). Dzięki temu odświeżenie strony
  albo przycisk „wstecz” zostawia użytkownika na tej samej zakładce, a link można komuś wysłać.
*/
function ProfileTabs({ pet }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedTab = searchParams.get('tab')
  const activeTab = TABS.some((tab) => tab.id === requestedTab) ? requestedTab : 'info'

  function handleTabChange(tabId) {
    // `replace`: przełączanie zakładek nie zaśmieca historii przeglądarki.
    setSearchParams(tabId === 'info' ? {} : { tab: tabId }, { replace: true })
  }

  return (
    <Tabs tabs={TABS} activeTab={activeTab} onChange={handleTabChange} label="Sekcje profilu">
      {activeTab === 'info' && <InfoTab pet={pet} />}
      {activeTab === 'health' && <HealthTab pet={pet} />}
      {activeTab === 'activity' && <ActivityTab petId={pet.id} />}
    </Tabs>
  )
}

function InfoTab({ pet }) {
  const rows = [
    ['Gatunek', speciesLabel(pet.species)],
    ['Rasa', pet.breed || '—'],
    ['Data urodzenia', pet.birthDate ? `${formatDate(pet.birthDate)} (${formatAge(pet.birthDate)})` : '—'],
    ['Waga', formatWeight(pet.weightKg)],
    ['Zawieszka', pet.tagCode ? <span className="font-mono">{pet.tagCode}</span> : 'brak'],
  ]

  return (
    <Card padding="sm">
      <dl className="divide-y divide-line">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <dt className="text-ink-muted">{label}</dt>
            <dd className="text-right font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}

function HealthTab({ pet }) {
  if (!pet.medicalNotes) {
    return (
      <EmptyState
        icon={Activity}
        title="Brak uwag medycznych"
        description="Dopisz choroby, leki, alergie albo ważne informacje o zachowaniu — zobaczy je znalazca."
        action={
          <Button to={`/zwierzeta/${pet.id}/edytuj`} size="sm" icon={Pencil}>
            Uzupełnij
          </Button>
        }
      />
    )
  }

  return (
    <Card padding="sm" className="space-y-3">
      {/* whitespace-pre-line: zachowujemy podział na linie wpisany w formularzu. */}
      <p className="whitespace-pre-line">{pet.medicalNotes}</p>
      <p className="text-sm text-ink-muted">Te informacje widzi osoba, która zeskanuje zawieszkę.</p>
    </Card>
  )
}

function ActivityTab({ petId }) {
  const { data: activities, error, isLoading, reload } = useAsync(() => getActivities(petId, 7), [petId])

  if (isLoading) return <Spinner showLabel label="Wczytuję aktywność…" />
  if (error) return <ErrorState title="Nie udało się wczytać aktywności" error={error} onRetry={reload} />
  if (activities.length === 0) {
    return (
      <EmptyState
        icon={Footprints}
        title="Brak aktywności z ostatnich 7 dni"
        description="Zeskanuj zawieszkę swoim telefonem, żeby jednym dotknięciem zapisać karmienie albo spacer."
      />
    )
  }

  const walks = activities.filter((activity) => activity.type === 'walk')
  const feedings = activities.length - walks.length
  const walkMinutes = walks.reduce((sum, walk) => sum + (walk.durationMin ?? 0), 0)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <StatTile label="Spacery" value={walks.length} icon={Footprints} />
        <StatTile label="Karmienia" value={feedings} icon={UtensilsCrossed} />
        <StatTile label="Czas spacerów" value={formatDuration(walkMinutes) ?? '0 min'} icon={Timer} />
      </div>
      <Card padding="sm">
        <h2 className="mb-3 text-sm font-semibold text-ink-muted">Ostatnie 7 dni</h2>
        <ActivityList activities={activities} />
      </Card>
    </div>
  )
}
