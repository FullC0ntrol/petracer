import Button from '../../components/ui/Button.jsx'
import SketchBox from '../../dev/SketchBox.jsx'

export default function ShareLocationPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Gdzie jesteś?</h1>
      <p className="text-ink-muted">Pokażemy właścicielowi, gdzie teraz jest zwierzę.</p>
      <SketchBox label="Mapa z Twoją pozycją" hint="Etap 6" className="h-64" />
      <SketchBox label="Wiadomość (opcjonalnie)" className="h-24" />
      <SketchBox label="Twój telefon (opcjonalnie)" className="min-h-14" />
      <Button to="../wyslano" relative="path" size="xl" fullWidth>
        Wyślij lokalizację
      </Button>
    </div>
  )
}
