import { useParams } from 'react-router'
import Badge from '../../components/ui/Badge.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

export default function VetPassportPage() {
  const { shareToken } = useParams()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SketchBox label="Zwierzę: zdjęcie, imię, gatunek, wiek" className="flex-1" />
        <Badge tone="amber" size="md">
          Link <span className="font-mono">{shareToken}</span> · licznik ważności (etap 5)
        </Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <SketchBox label="Szczepienia" hint="Etap 5" className="h-40" />
        <SketchBox label="Leki" className="h-40" />
        <SketchBox label="Alergie i choroby" className="h-32" />
        <SketchBox label="Waga (historia)" className="h-32" />
      </div>
    </div>
  )
}
