import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { Activity, ChevronRight, Footprints, Pencil, Plus, QrCode, ScanLine, Siren, Timer, UtensilsCrossed } from 'lucide-react'
import { getActivities } from '../../api/activities.js'
import { getPetById } from '../../api/pets.js'
import { getTagScans } from '../../api/tags.js'
import PhoneNotice from '../../components/owner/PhoneNotice.jsx'
import ActivityList from '../../components/pets/ActivityList.jsx'
import LostModeSwitch from '../../components/pets/LostModeSwitch.jsx'
import PetActionsSheet from '../../components/pets/PetActionsSheet.jsx'
import PetAvatar from '../../components/pets/PetAvatar.jsx'
import PetSwitcher from '../../components/pets/PetSwitcher.jsx'
import ScanList from '../../components/tags/ScanList.jsx'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import ErrorState from '../../components/ui/ErrorState.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import StatTile from '../../components/ui/StatTile.jsx'
import Tabs from '../../components/ui/Tabs.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { useAuth } from '../../hooks/useAuth.js'
import { cn } from '../../lib/cn.js'
import { formatAge, formatDate, formatDuration, formatWeight, speciesLabel } from '../../lib/format.js'
import { setLastPetId } from '../../lib/lastPet.js'

const TABS = [
  { id: 'info', label: 'Dane' },
  { id: 'health', label: 'Zdrowie' },
  { id: 'activity', label: 'Aktywność' },
]

/*
  Ekran skupiony na JEDNYM zwierzęciu — główny ekran panelu.
  Od góry: przełącznik zwierząt, duża karta zwierzęcia, tryb zaginięcia, zakładki,
  ostatnie skanowania. Cała nawigacja jest w arkuszu pod pływającym przyciskiem „Akcje”.
*/
export default function PetProfilePage() {
  const { id } = useParams()
  const { user } = useAuth()
  const { data, error, isLoading, reload } = useAsync(() => getPetById(id), [id])
  /*
    Po włączeniu trybu zaginięcia API zwraca zaktualizowane zwierzę. Zapisujemy je tutaj, zamiast
    ładować całą stronę od nowa (bez mrugnięcia spinnera). Sprawdzamy id, żeby po przejściu
    na profil innego zwierzęcia nie pokazać przez chwilę danych poprzedniego.
  */
  const [updatedPet, setUpdatedPet] = useState(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const pet = updatedPet?.id === data?.id ? updatedPet : data

  // Zapamiętujemy oglądane zwierzę — następne wejście na /panel otworzy właśnie je.
  useEffect(() => {
    setLastPetId(id)
  }, [id])

  return (
    <div className="space-y-4">
      <PetSwitcher activeId={id} current={pet} />

      {isLoading ? (
        <Spinner showLabel label="Wczytuję profil…" />
      ) : error ? (
        <ErrorState title="Nie udało się wczytać profilu" error={error} onRetry={reload} />
      ) : (
        <>
          <PetHero pet={pet} />
          {!user.phone && <PhoneNotice />}
          <LostModeSwitch key={pet.id} pet={pet} onChange={setUpdatedPet} />
          <ProfileTabs pet={pet} />
          <RecentPetScans pet={pet} />

          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="mx-auto block text-sm font-semibold text-ink-muted underline-offset-4 hover:underline"
          >
            Więcej akcji: spacer, harmonogram, weterynarz, zawieszka…
          </button>

          <ActionsButton pet={pet} isOpen={isSheetOpen} onClick={() => setIsSheetOpen(true)} />
          <PetActionsSheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)} pet={pet} />
        </>
      )}
    </div>
  )
}

// Duża karta u góry: zielona, a przy zaginięciu czerwona — stan widać zanim cokolwiek przeczytasz.
function PetHero({ pet }) {
  const details = [speciesLabel(pet.species), pet.breed, formatAge(pet.birthDate)].filter(Boolean).join(' · ')
  const chip = 'inline-flex items-center gap-1.5 rounded-full bg-paper/20 px-3 py-1.5 transition-colors hover:bg-paper/30'

  return (
    <section
      aria-label={`Karta: ${pet.name}`}
      className={cn(
        'relative overflow-hidden rounded-3xl p-5 text-paper shadow-raised',
        pet.isLost ? 'bg-alert' : 'bg-pine',
      )}
    >
      {/* Dekoracyjne koła w tle — czysty CSS, bez grafik. */}
      <span aria-hidden="true" className="absolute -top-16 -right-12 size-48 rounded-full bg-paper/10" />
      <span aria-hidden="true" className="absolute -bottom-20 left-20 size-40 rounded-full bg-paper/10" />

      <div className="relative flex items-center gap-4">
        <PetAvatar name={pet.name} species={pet.species} size="lg" className="ring-4 ring-paper/40" />
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-paper/20 px-2.5 py-0.5 text-xs font-bold">
            {pet.isLost ? <Siren size={14} aria-hidden="true" /> : null}
            {pet.isLost ? 'Zaginione' : 'Bezpieczne w domu'}
          </p>
          <h1 className="mt-1.5 truncate text-3xl font-extrabold tracking-tight sm:text-4xl">{pet.name}</h1>
          <p className="truncate text-sm opacity-85">{details}</p>
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2 text-sm font-semibold">
        <Link to={`/zwierzeta/${pet.id}/tag`} className={chip}>
          <QrCode size={16} aria-hidden="true" />
          {pet.tagCode ? <span className="font-mono">{pet.tagCode}</span> : 'Bez zawieszki'}
        </Link>
        <Link to={`/zwierzeta/${pet.id}/edytuj`} className={chip}>
          <Pencil size={16} aria-hidden="true" />
          Edytuj
        </Link>
      </div>
    </section>
  )
}

function RecentPetScans({ pet }) {
  const { data: scans, error, isLoading, reload } = useAsync(() => getTagScans(pet.id), [pet.id])

  return (
    <Card as="section" padding="sm" aria-labelledby="scans-heading">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id="scans-heading" className="text-lg font-semibold">
          Ostatnie skanowania
        </h2>
        <Link to={`/zwierzeta/${pet.id}/tag`} className="inline-flex items-center text-sm font-semibold text-pine">
          Historia <ChevronRight size={16} aria-hidden="true" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner showLabel label="Wczytuję skanowania…" />
      ) : error ? (
        <ErrorState title="Nie udało się wczytać skanowań" error={error} onRetry={reload} />
      ) : scans.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-ink-muted">
          <ScanLine size={16} aria-hidden="true" />
          Nikt jeszcze nie skanował zawieszki.
        </p>
      ) : (
        <ScanList scans={scans.slice(0, 3)} />
      )}
    </Card>
  )
}

// Pływający przycisk na dole, na środku — w zasięgu kciuka. Kółko ma kolor zwierzęcia,
// a „+” obraca się w „×”, gdy arkusz jest otwarty.
function ActionsButton({ pet, isOpen, onClick }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-30 flex justify-center px-4">
      <button
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="pointer-events-auto inline-flex min-h-15 animate-pop items-center gap-3 rounded-full bg-ink py-2 pr-7 pl-2 font-display text-lg font-bold text-paper shadow-raised transition-transform active:scale-95"
      >
        <span
          className={cn(
            'grid size-11 place-items-center rounded-full text-paper transition-transform duration-300',
            pet.isLost ? 'bg-alert' : 'bg-pine',
            isOpen && 'rotate-45',
          )}
        >
          <Plus size={24} strokeWidth={2.5} aria-hidden="true" />
        </span>
        Akcje
      </button>
    </div>
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
