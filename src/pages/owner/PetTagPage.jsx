import { useParams } from 'react-router'
import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

export default function PetTagPage() {
  const { id } = useParams()

  return (
    <>
      <PageHeader title="Tag" description={`Zwierzę: ${id}`} />
      <div className="grid gap-6 md:grid-cols-2">
        <SketchBox label="Parowanie: wpisz lub zeskanuj ID tagu" hint="Etap 7" className="h-40" />
        <SketchBox label="Podgląd QR tagu" className="h-40" />
      </div>
      <section aria-labelledby="scan-history" className="mt-8">
        <h2 id="scan-history" className="mb-3 text-lg font-semibold">
          Historia odczytów
        </h2>
        <SketchBox label="Data · przybliżone miejsce · kontekst (znalazca / właściciel / weterynarz)" className="h-56" />
      </section>
    </>
  )
}
