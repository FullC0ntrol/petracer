import Card from './Card.jsx'

// Kafelek z jedną liczbą. `tabular-nums` daje cyfrom równą szerokość,
// więc zmieniająca się wartość (np. czas spaceru) nie „skacze” w poziomie.
export default function StatTile({ label, value, unit, icon: Icon, hint }) {
  return (
    <Card padding="sm">
      <p className="flex items-center gap-1.5 text-sm text-ink-muted">
        {Icon && <Icon size={16} aria-hidden="true" />}
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-bold tracking-tight tabular-nums">
        {value}
        {unit && <span className="ml-1 text-base font-medium text-ink-muted">{unit}</span>}
      </p>
      {hint && <p className="mt-0.5 text-xs text-ink-muted">{hint}</p>}
    </Card>
  )
}
