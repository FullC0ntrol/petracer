import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

const STEPS = ['Podstawowe', 'Zdrowie', 'Kontakt']

export default function PetNewPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Nowe zwierzę" description="Trzy krótkie kroki — możesz wrócić do nich później." />
      <ol className="mb-6 grid grid-cols-3 gap-2 text-sm font-semibold">
        {STEPS.map((step, index) => (
          <li
            key={step}
            className={`rounded-xl px-3 py-2 text-center ${index === 0 ? 'bg-pine-soft text-pine' : 'bg-surface text-ink-muted'}`}
          >
            {index + 1}. {step}
          </li>
        ))}
      </ol>
      <SketchBox label="Pola kroku: imię, gatunek, rasa, data urodzenia…" hint="Etap 4" className="h-72" />
      <div className="mt-6 flex justify-between gap-3">
        <SketchBox label="Wstecz" className="min-h-12 flex-1" />
        <SketchBox label="Dalej" className="min-h-12 flex-1" />
      </div>
    </div>
  )
}
