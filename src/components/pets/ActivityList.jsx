import { Footprints, UtensilsCrossed } from 'lucide-react'
import { formatRelative } from '../../lib/format.js'

const TYPES = {
  feeding: { label: 'Karmienie', icon: UtensilsCrossed, classes: 'bg-ember-soft text-ink' },
  walk: { label: 'Spacer', icon: Footprints, classes: 'bg-sky/15 text-ink' },
}

export default function ActivityList({ activities }) {
  return (
    <ul className="divide-y divide-line">
      {activities.map((activity) => {
        const { label, icon: Icon, classes } = TYPES[activity.type]

        return (
          <li key={activity.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${classes}`}>
              <Icon size={18} aria-hidden="true" />
            </span>
            <p className="min-w-0 flex-1 font-medium">{label}</p>
            <time dateTime={activity.occurredAt} className="text-sm text-ink-muted">
              {formatRelative(activity.occurredAt)}
            </time>
          </li>
        )
      })}
    </ul>
  )
}
