// TYMCZASOWE: przerywana ramka zaznaczająca miejsce na treść, która powstanie w kolejnych etapach.
export default function SketchBox({ label, hint, className = '' }) {
  return (
    <div
      className={`flex min-h-20 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-line bg-surface/60 p-4 text-center ${className}`}
    >
      <span className="text-sm font-semibold text-ink-muted">{label}</span>
      {hint && <span className="text-xs text-ink-muted">{hint}</span>}
    </div>
  )
}
