import { useState } from 'react'
import { CircleCheck, Footprints, UtensilsCrossed } from 'lucide-react'
import { logActivity } from '../../api/activities.js'
import { formatRelative } from '../../lib/format.js'
import PetAvatar from '../pets/PetAvatar.jsx'
import Button from '../ui/Button.jsx'
import Notice from '../ui/Notice.jsx'

const ACTIONS = [
  { type: 'feeding', label: 'Karmienie', done: 'Zapisano karmienie', icon: UtensilsCrossed },
  { type: 'walk', label: 'Spacer', done: 'Zapisano spacer', icon: Footprints },
]

/*
  Wariant 2: zalogowany właściciel skanuje zawieszkę własnego zwierzęcia (UC7).
  Jedno dotknięcie zapisuje aktywność z bieżącą godziną (source: quick_tap).
*/
export default function OwnerQuickLog({ pet }) {
  const [saved, setSaved] = useState(null) // { label, occurredAt } ostatniego zapisu
  const [savingType, setSavingType] = useState(null)
  const [error, setError] = useState(null)

  async function handleLog(action) {
    setSavingType(action.type)
    setError(null)
    try {
      const activity = await logActivity(pet.id, { type: action.type, source: 'quick_tap' })
      setSaved({ label: action.done, occurredAt: activity.occurredAt })
    } catch (logError) {
      setError(logError.message)
    }
    setSavingType(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 pt-4">
        <PetAvatar name={pet.name} species={pet.species} size="lg" />
        <div>
          <p className="text-sm font-semibold text-pine">To Twoja zawieszka · szybki zapis</p>
          <h1 className="text-2xl font-bold tracking-tight">{pet.name}: co robicie?</h1>
        </div>
      </div>

      {saved && (
        <p role="status" className="flex items-center gap-2 rounded-2xl bg-pine-soft p-4 font-semibold text-pine">
          <CircleCheck size={22} aria-hidden="true" />
          {saved.label} ({formatRelative(saved.occurredAt)})
        </p>
      )}
      {error && (
        <Notice tone="alert" title="Nie udało się zapisać">
          {error}
        </Notice>
      )}

      <div className="grid gap-3">
        {ACTIONS.map((action) => (
          <Button
            key={action.type}
            size="xl"
            variant={action.type === 'feeding' ? 'accent' : 'primary'}
            icon={action.icon}
            fullWidth
            disabled={savingType !== null}
            onClick={() => handleLog(action)}
          >
            {savingType === action.type ? 'Zapisuję…' : action.label}
          </Button>
        ))}
      </div>

      <Button to={`/zwierzeta/${pet.id}`} variant="ghost" fullWidth>
        Przejdź do profilu
      </Button>
    </div>
  )
}
