import { useParams } from 'react-router'
import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

export default function WalkDetailsPage() {
  const { id } = useParams()

  return (
    <>
      <PageHeader title="Szczegóły spaceru" description={`Spacer: ${id}`} />
      <div className="grid gap-6 lg:grid-cols-3">
        <SketchBox label="Trasa na mapie" hint="Etap 6" className="h-80 lg:col-span-2" />
        <div className="space-y-4">
          <SketchBox label="Statystyki" className="h-40" />
          <SketchBox label="Notatka" className="h-32" />
        </div>
      </div>
    </>
  )
}
