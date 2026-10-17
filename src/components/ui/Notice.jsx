import { CircleAlert, Info, TriangleAlert } from 'lucide-react'
import { cn } from '../../lib/cn.js'

// Ramka z komunikatem w treści strony (np. „brak numeru telefonu”). Ton decyduje o kolorze i ikonie.
// Tekst zawsze w kolorze `ink`, bo kolory tokenów na jasnym tle nie zawsze dają kontrast AA.
const TONES = {
  info: { classes: 'bg-pine-soft', icon: Info, iconClasses: 'text-pine' },
  warning: { classes: 'bg-amber/15', icon: TriangleAlert, iconClasses: 'text-amber' },
  alert: { classes: 'bg-alert-soft', icon: CircleAlert, iconClasses: 'text-alert' },
}

export default function Notice({ tone = 'info', title, children, action, className = '' }) {
  const { classes, icon: Icon, iconClasses } = TONES[tone]

  return (
    <div className={cn('flex gap-3 rounded-2xl p-4 text-ink', classes, className)}>
      <Icon size={20} aria-hidden="true" className={cn('mt-0.5 shrink-0', iconClasses)} />
      <div className="flex-1 space-y-2">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className="text-sm">{children}</div>}
        {action}
      </div>
    </div>
  )
}
