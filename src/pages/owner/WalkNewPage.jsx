import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

export default function WalkNewPage() {
  return (
    <>
      <PageHeader title="Spacer na żywo" />
      <div className="space-y-4">
        <SketchBox label="Mapa z bieżącą trasą" hint="Etap 6" className="h-[50dvh]" />
        <div className="grid grid-cols-3 gap-3">
          <SketchBox label="Czas" />
          <SketchBox label="Dystans" />
          <SketchBox label="Tempo" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SketchBox label="Start / pauza" className="min-h-14" />
          <SketchBox label="Zakończ" className="min-h-14" />
        </div>
      </div>
    </>
  )
}
