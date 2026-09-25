import { CircleCheck } from 'lucide-react'
import SketchBox from '../../dev/SketchBox.jsx'

export default function LocationSentPage() {
  return (
    <div className="space-y-6 pt-6 text-center">
      <span className="mx-auto grid size-20 place-items-center rounded-full bg-pine-soft text-pine">
        <CircleCheck size={40} aria-hidden="true" />
      </span>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Dziękujemy! Lokalizacja wysłana</h1>
        <p className="text-ink-muted">Właściciel dostał powiadomienie.</p>
      </div>
      <SketchBox label="Co dalej: zostań ze zwierzęciem, podaj wodę…" hint="Etap 5" className="h-40" />
    </div>
  )
}
