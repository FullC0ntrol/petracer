import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Pencil, QrCode, Siren, Stethoscope } from 'lucide-react'
import Tabs from '../../components/ui/Tabs.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

const TABS = [
  { id: 'info', label: 'Informacje' },
  { id: 'health', label: 'Zdrowie' },
  { id: 'activity', label: 'Aktywność' },
  { id: 'tag', label: 'Tag' },
]

export default function PetProfilePage() {
  const { id } = useParams()
  // Na razie aktywna zakładka żyje tylko w stanie komponentu; docelowo trafi do adresu (?tab=…).
  const [activeTab, setActiveTab] = useState('info')
  const activeLabel = TABS.find((tab) => tab.id === activeTab).label

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

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} label="Sekcje profilu">
        <SketchBox label={`Treść zakładki: ${activeLabel}`} className="h-64" />
      </Tabs>
    </div>
  )
}
