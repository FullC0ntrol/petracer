import { Inbox } from 'lucide-react'

// Stan „nic tu jeszcze nie ma” — zamiast pustego miejsca mówi, co się stało i co można zrobić.
export default function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-10 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-pine-soft text-pine">
        <Icon size={24} aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="font-display text-lg font-semibold">{title}</p>
        {description && <p className="max-w-sm text-sm text-ink-muted">{description}</p>}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  )
}
