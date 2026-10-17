import { Link } from 'react-router'
import { QrCode, Siren } from 'lucide-react'
import { formatAge, speciesLabel } from '../../lib/format.js'
import Badge from '../ui/Badge.jsx'
import PetAvatar from './PetAvatar.jsx'

// Karta zwierzęcia na liście w panelu. Cała karta jest jednym linkiem do profilu.
export default function PetCard({ pet }) {
  const details = [pet.breed || speciesLabel(pet.species), formatAge(pet.birthDate)].filter(Boolean).join(' · ')

  return (
    <Link
      to={`/zwierzeta/${pet.id}`}
      className="flex items-center gap-4 rounded-2xl bg-surface p-4 shadow-card transition-shadow hover:shadow-raised"
    >
      <PetAvatar name={pet.name} species={pet.species} isLost={pet.isLost} />
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="truncate font-display text-lg font-bold tracking-tight">{pet.name}</p>
        <p className="truncate text-sm text-ink-muted">{details}</p>
        <div className="flex flex-wrap gap-1.5">
          {pet.isLost && (
            <Badge tone="alert" icon={Siren}>
              Zaginione
            </Badge>
          )}
          {pet.tagCode ? (
            <Badge tone="pine" icon={QrCode}>
              <span className="font-mono">{pet.tagCode}</span>
            </Badge>
          ) : (
            <Badge tone="amber">Bez zawieszki</Badge>
          )}
        </div>
      </div>
    </Link>
  )
}
