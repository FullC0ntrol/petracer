import PageHeader from '../../components/layout/PageHeader.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

// Priorytet 2 (UC10): ręczny wpis spaceru. Śledzenia GPS nie robimy (decyzja D11). Na razie szkic.
export default function WalkNewPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="Nowy spacer" />
      <SketchBox
        label="Formularz: zwierzę, data i godzina, czas trwania, dystans (opcjonalnie)"
        hint="Priorytet 2"
        className="h-72"
      />
    </div>
  )
}
