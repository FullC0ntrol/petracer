import Card from '../ui/Card.jsx'

// Jeden krok sekcji „Jak działa tag” na stronie głównej.
export default function HowItWorksStep({ number, icon: Icon, title, children }) {
  return (
    <Card as="li" padding="sm" className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-pine-soft text-pine">
          <Icon size={20} aria-hidden="true" />
        </span>
        <span className="font-display text-sm font-bold text-ink-muted">Krok {number}</span>
      </div>
      <h3 className="text-lg font-bold tracking-tight">{title}</h3>
      <p className="text-sm text-ink-muted">{children}</p>
    </Card>
  )
}
