import { useParams } from 'react-router'
import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

export default function PetEditPage() {
  const { id } = useParams()

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Edycja profilu" description={`Zwierzę: ${id}`} />
      <div className="space-y-4">
        <SketchBox label="Dane podstawowe" hint="Etap 4" className="h-48" />
        <SketchBox label="Zdrowie" className="h-40" />
        <SketchBox label="Kontakt dla znalazcy" className="h-32" />
        <SketchBox label="Zapisz zmiany" className="min-h-12" />
      </div>
    </div>
  )
}
