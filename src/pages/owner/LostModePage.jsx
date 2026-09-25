import { useParams } from 'react-router'
import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

export default function LostModePage() {
  const { id } = useParams()

  return (
    <>
      <PageHeader title="Tryb zaginięcia" description={`Zwierzę: ${id}`} />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <SketchBox label="Włącz / wyłącz Lost Mode (z potwierdzeniem)" hint="Etap 5" className="h-28" />
          <SketchBox label="Komunikat dla znalazców" className="h-40" />
        </div>
        <SketchBox label="Mapa z pinezkami zgłoszeń" hint="Etap 6" className="h-80 lg:col-span-3" />
      </div>
    </>
  )
}
