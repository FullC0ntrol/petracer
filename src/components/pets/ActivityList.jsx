import { Footprints, UtensilsCrossed } from 'lucide-react'
import { formatDistance, formatDuration, formatRelative } from '../../lib/format.js'
import Badge from '../ui/Badge.jsx'

const TYPES = {
  feeding: { label: 'Karmienie', icon: UtensilsCrossed, classes: 'bg-ember-soft text-ink' },
  walk: { label: 'Spacer', icon: Footprints, classes: 'bg-sky/15 text-ink' },
}

export default function ActivityList({ activities }) {
  return (
    <ul className="divide-y divide-line">
      {activities.map((activity) => {
        const { label, icon: Icon, classes } = TYPES[activity.type]
        const details = [formatDuration(activity.durationMin), formatDistance(activity.distanceM)].filter(Boolean)

        return (
          <li key={activity.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${classes}`}>
              <Icon size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium">
                {label}
                {details.length > 0 && <span className="font-normal text-ink-muted"> · {details.join(' · ')}</span>}
              </p>
              <p className="text-sm text-ink-muted">
                <time dateTime={activity.occurredAt}>{formatRelative(activity.occurredAt)}</time>
              </p>
            </div>
            {activity.source === 'quick_tap' && <Badge tone="pine">Po skanie</Badge>}
          </li>
        )
      })}
    </ul>
  )
}
