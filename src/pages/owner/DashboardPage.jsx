import { Link } from 'react-router'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Cześć, Maciej"
        description="Oto, co słychać u Twoich zwierząt."
        action={
          <Link
            to="/zwierzeta/nowe"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-pine px-4 font-semibold text-surface transition-colors hover:bg-pine/90"
          >
            <Plus size={18} aria-hidden="true" />
            Dodaj zwierzę
          </Link>
        }
      />

      <div className="space-y-8">
        <section aria-labelledby="pets-heading">
          <h2 id="pets-heading" className="mb-3 text-lg font-semibold">
            Twoje zwierzęta
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/zwierzeta/luna" className="rounded-2xl">
              <SketchBox label="Karta: Luna" hint="Etap 4" className="h-32" />
            </Link>
            <Link to="/zwierzeta/mruczek" className="rounded-2xl">
              <SketchBox label="Karta: Mruczek (Lost Mode)" hint="Etap 4" className="h-32" />
            </Link>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <section aria-labelledby="reminders-heading">
            <h2 id="reminders-heading" className="mb-3 text-lg font-semibold">
              Najbliższe przypomnienia
            </h2>
            <SketchBox label="Lista 3 przypomnień" className="h-48" />
          </section>
          <section aria-labelledby="activity-heading">
            <h2 id="activity-heading" className="mb-3 text-lg font-semibold">
              Aktywność w tym tygodniu
            </h2>
            <SketchBox label="Dystans · czas · liczba spacerów" className="h-48" />
          </section>
          <section aria-labelledby="scans-heading">
            <h2 id="scans-heading" className="mb-3 text-lg font-semibold">
              Ostatnie odczyty tagów
            </h2>
            <SketchBox label="Lista odczytów" className="h-48" />
          </section>
        </div>
      </div>
    </>
  )
}
