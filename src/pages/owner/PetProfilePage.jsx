import { Link, useParams } from 'react-router'
import { Pencil, QrCode, Siren, Stethoscope } from 'lucide-react'
import SketchBox from '../../dev/SketchBox.jsx'

const TABS = ['Informacje', 'Zdrowie', 'Aktywność', 'Tag']

export default function PetProfilePage() {
  const { id } = useParams()

  const shortcuts = [
    { to: `/zwierzeta/${id}/zaginiecie`, label: 'Zaginięcie', icon: Siren },
    { to: `/zwierzeta/${id}/vet-share`, label: 'Dla weterynarza', icon: Stethoscope },
    { to: `/zwierzeta/${id}/tag`, label: 'Tag', icon: QrCode },
    { to: `/zwierzeta/${id}/edytuj`, label: 'Edytuj', icon: Pencil },
  ]

  return (
    <div className="space-y-6">
      <SketchBox label={`Nagłówek profilu: zdjęcie, imię (${id}), rasa, wiek`} hint="Etap 4" className="h-36" />

      <nav aria-label="Akcje zwierzęcia" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {shortcuts.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-3 font-medium transition-colors hover:border-pine hover:text-pine"
          >
            <Icon size={18} aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex gap-2 overflow-x-auto border-b border-line">
        {TABS.map((tab, index) => (
          <span
            key={tab}
            className={`px-3 py-2 text-sm font-semibold whitespace-nowrap ${index === 0 ? 'border-b-2 border-pine text-pine' : 'text-ink-muted'}`}
          >
            {tab}
          </span>
        ))}
      </div>
      <SketchBox label="Treść aktywnej zakładki" className="h-64" />
    </div>
  )
}
