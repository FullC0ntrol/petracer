import { Link } from 'react-router'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

export default function WalksPage() {
  return (
    <>
      <PageHeader
        title="Spacery"
        description="Dystans i czas z ostatnich tygodni."
        action={
          <Link
            to="/spacery/nowy"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-pine px-4 font-semibold text-surface transition-colors hover:bg-pine/90"
          >
            <Plus size={18} aria-hidden="true" />
            Nowy spacer
          </Link>
        }
      />
      <div className="space-y-6">
        <SketchBox label="Wykres tygodniowy (recharts)" hint="Etap 6" className="h-56" />
        <section aria-labelledby="walk-list">
          <h2 id="walk-list" className="mb-3 text-lg font-semibold">
            Ostatnie spacery
          </h2>
          <Link to="/spacery/demo-1" className="block rounded-2xl">
            <SketchBox label="Spacer: Błonia · 3,2 km" className="h-20" />
          </Link>
          <SketchBox label="Kolejne spacery…" className="mt-3 h-40" />
        </section>
      </div>
    </>
  )
}
