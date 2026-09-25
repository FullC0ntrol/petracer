import { useParams } from 'react-router'
import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

export default function VetSharePage() {
  const { id } = useParams()

  return (
    <>
      <PageHeader title="Udostępnij weterynarzowi" description={`Zwierzę: ${id}`} />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <SketchBox label="Czas ważności linku" hint="Etap 7" className="h-24" />
          <SketchBox label="Zakres danych" className="h-32" />
          <SketchBox label="Wygeneruj kod QR" className="min-h-12" />
        </div>
        <SketchBox label="Kod QR + link" className="aspect-square" />
      </div>
      <section aria-labelledby="active-shares" className="mt-8">
        <h2 id="active-shares" className="mb-3 text-lg font-semibold">
          Aktywne udostępnienia
        </h2>
        <SketchBox label="Lista z przyciskiem „Unieważnij”" className="h-32" />
      </section>
    </>
  )
}
