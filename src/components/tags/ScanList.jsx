import { ScanLine, UserCheck } from 'lucide-react'
import { describeUserAgent, formatRelative } from '../../lib/format.js'
import Badge from '../ui/Badge.jsx'

/*
  Historia skanowań zawieszki (audyt, UC8): kiedy, jaką przeglądarką i czy skanował sam właściciel.
  Celowo bez lokalizacji i adresu IP — minimalizacja danych osobowych (01-zakres.md).
  `showPetName` — w panelu lista obejmuje wszystkie zwierzęta, więc pokazujemy też imię.
*/
export default function ScanList({ scans, showPetName = false }) {
  return (
    <ul className="divide-y divide-line">
      {scans.map((scan) => (
        <li key={scan.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-xl ${scan.byOwner ? 'bg-pine-soft text-pine' : 'bg-ember-soft text-ink'}`}
          >
            {scan.byOwner ? <UserCheck size={18} aria-hidden="true" /> : <ScanLine size={18} aria-hidden="true" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">
              {showPetName && <span>{scan.petName} · </span>}
              <time dateTime={scan.scannedAt}>{formatRelative(scan.scannedAt)}</time>
            </p>
            <p className="truncate text-sm text-ink-muted">{describeUserAgent(scan.userAgent)}</p>
          </div>
          <Badge tone={scan.byOwner ? 'pine' : 'neutral'}>{scan.byOwner ? 'Ty' : 'Inna osoba'}</Badge>
        </li>
      ))}
    </ul>
  )
}
