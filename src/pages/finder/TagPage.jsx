import { Link, useParams } from 'react-router'
import { TriangleAlert } from 'lucide-react'
import { DEMO_TAGS, useDevState } from '../../dev/devStore.js'
import SketchBox from '../../dev/SketchBox.jsx'

/*
  Routing kontekstowy: ten sam adres /t/:tagId (zapisany na fizycznym tagu) pokazuje
  różne widoki zależnie od sytuacji. Kolejność warunków ma znaczenie — pierwszy pasujący wygrywa:
    1. tag nieznany / nieaktywny  → nie ma czego pokazać
    2. skanuje zalogowany właściciel → szybki zapis (nawet gdy zwierzę jest w Lost Mode,
       bo właściciel go właśnie znalazł i np. wyłączy alarm)
    3. zwierzę w Lost Mode         → widok alarmowy
    4. pozostałe                   → publiczny profil
  Na razie decyzja zapada na podstawie stanu DEV; w etapie 5 zastąpi go `resolveTag(tagId)` z API.
*/
export default function TagPage() {
  const { tagId } = useParams()
  const { isLoggedIn, lostTagIds } = useDevState()
  const tag = DEMO_TAGS.find((demoTag) => demoTag.tagId === tagId)

  if (!tag?.isActive) return <InactiveTagView tagId={tagId} />
  // Uproszczenie etapu 1: zalogowany = właściciel wszystkich przykładowych zwierząt.
  if (isLoggedIn) return <QuickTapView tag={tag} />
  if (lostTagIds.includes(tagId)) return <LostView tag={tag} />
  return <FoundView tag={tag} />
}

function InactiveTagView({ tagId }) {
  return (
    <div className="space-y-4 pt-10 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Tag nieaktywny</h1>
      <p className="text-ink-muted">
        Tag <span className="font-mono text-ink">{tagId}</span> nie jest przypisany do żadnego zwierzęcia.
      </p>
      <SketchBox label="Co zrobić dalej (np. zaprowadź do weterynarza — sprawdzi chip)" hint="Etap 5" />
    </div>
  )
}

function QuickTapView({ tag }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Cześć, {tag.petName}!</h1>
      <p className="text-ink-muted">Szybki zapis — co właśnie robicie?</p>
      <div className="grid grid-cols-2 gap-3">
        {['Spacer', 'Karmienie', 'Lek', 'Tylko sprawdzam'].map((action) => (
          <SketchBox key={action} label={action} className="h-24" />
        ))}
      </div>
      <Link to={`/zwierzeta/${tag.petId}`} className="block text-center font-semibold text-pine underline-offset-4 hover:underline">
        Przejdź do profilu
      </Link>
    </div>
  )
}

function LostView({ tag }) {
  return (
    <div className="space-y-4">
      <header className="rounded-2xl bg-alert p-5 text-surface">
        <p className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase">
          <TriangleAlert size={18} aria-hidden="true" />
          Zaginął
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight">{tag.petName} — pomóż mi wrócić do domu</h1>
      </header>
      <SketchBox label="Duże zdjęcie + komunikat właściciela" hint="Etap 5" className="aspect-square" />
      <Link
        to="lokalizacja"
        className="flex min-h-14 items-center justify-center rounded-xl bg-alert text-lg font-bold text-surface transition-colors hover:bg-alert/90"
      >
        Wyślij moją lokalizację
      </Link>
      <SketchBox label="Zadzwoń do właściciela" className="min-h-14" />
    </div>
  )
}

function FoundView({ tag }) {
  return (
    <div className="space-y-4">
      <SketchBox label={`Duże zdjęcie: ${tag.petName}`} hint="Etap 5" className="aspect-square" />
      <h1 className="text-center text-3xl font-extrabold tracking-tight">Cześć, jestem {tag.petName}!</h1>
      <Link
        to="lokalizacja"
        className="flex min-h-14 items-center justify-center rounded-xl bg-pine text-lg font-bold text-surface transition-colors hover:bg-pine/90"
      >
        Wyślij lokalizację właścicielowi
      </Link>
      <SketchBox label="Zadzwoń do właściciela" className="min-h-14" />
      <SketchBox label="Ważne informacje (alergie, leki)" className="min-h-14" />
    </div>
  )
}
