import { Plus } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

// Priorytet 2 (UC10): ręcznie wpisane spacery i podsumowanie z 7 dni. Na razie szkic.
export default function WalksPage() {
  return (
    <>
      <PageHeader
        title="Spacery"
        description="Spacery z ostatnich 7 dni."
        action={
          <Button to="/spacery/nowy" icon={Plus}>
            Dodaj spacer
          </Button>
        }
      />
      <div className="space-y-6">
        <SketchBox label="Podsumowanie z 7 dni: liczba spacerów, łączny czas i dystans" hint="Priorytet 2" className="h-32" />
        <SketchBox label="Lista spacerów: zwierzę, data, czas trwania, dystans" hint="Priorytet 2" className="h-56" />
      </div>
    </>
  )
}
