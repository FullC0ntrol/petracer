import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

const GROUPS = [
  { id: 'overdue', title: 'Zaległe', height: 'h-20' },
  { id: 'today', title: 'Dziś', height: 'h-20' },
  { id: 'upcoming', title: 'Nadchodzące', height: 'h-40' },
]

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        title="Harmonogram"
        description="Szczepienia, leki, odrobaczanie i wizyty."
        action={<SketchBox label="Dodaj przypomnienie" className="min-h-11" />}
      />
      <div className="space-y-6">
        {GROUPS.map((group) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`}>
            <h2 id={`group-${group.id}`} className="mb-3 text-lg font-semibold">
              {group.title}
            </h2>
            <SketchBox label={`Przypomnienia: ${group.title.toLowerCase()}`} hint="Etap 7" className={group.height} />
          </section>
        ))}
      </div>
    </>
  )
}
