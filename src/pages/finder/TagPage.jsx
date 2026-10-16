import { useParams } from 'react-router'
import { TriangleAlert } from 'lucide-react'
import { resolveTag } from '../../api/tags.js'
import Button from '../../components/ui/Button.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import SketchBox from '../../dev/SketchBox.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { useAuth } from '../../hooks/useAuth.js'

/*
  Routing kontekstowy: ten sam adres /t/:tagId (zapisany na fizycznym tagu) pokazuje
  różne widoki zależnie od sytuacji. Kolejność warunków ma znaczenie — pierwszy pasujący wygrywa:
    1. tag nieznany / nieaktywny     → nie ma czego pokazać
    2. skanuje zalogowany właściciel → szybki zapis (nawet gdy zwierzę jest w Lost Mode,
       bo właściciel go właśnie znalazł i np. wyłączy alarm)
    3. zwierzę w Lost Mode           → widok alarmowy
    4. pozostałe                     → publiczny profil
  Dane i flagę `isOwner` daje `resolveTag` — o tym, kto skanuje, decyduje „serwer” na podstawie sesji.
*/
export default function TagPage() {
  const { tagId } = useParams()
  const { user } = useAuth()
  // `user?.id` w zależnościach: po zalogowaniu / wylogowaniu (np. z panelu DEV) pytamy ponownie,
  // bo zmienia się odpowiedź na pytanie „czy to właściciel”.
  const { data: tag, error, isLoading } = useAsync(() => resolveTag(tagId), [tagId, user?.id])

  if (isLoading) {
    return (
      <div className="grid place-items-center pt-16">
        <Spinner size="lg" showLabel label="Sprawdzam tag…" />
      </div>
    )
  }
  if (error) return <ErrorView message={error.message} />
  if (!tag.isActive) return <InactiveTagView tagId={tag.tagId} />
  if (tag.isOwner) return <QuickTapView pet={tag.pet} />
  if (tag.pet.isLost) return <LostView pet={tag.pet} />
  return <FoundView pet={tag.pet} />
}

function ErrorView({ message }) {
  return (
    <div role="alert" className="space-y-4 pt-10 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Nie udało się wczytać tagu</h1>
      <p className="text-ink-muted">{message} Sprawdź połączenie z internetem i zeskanuj tag ponownie.</p>
    </div>
  )
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

function QuickTapView({ pet }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Cześć, {pet.name}!</h1>
      <p className="text-ink-muted">Szybki zapis — co właśnie robicie?</p>
      <div className="grid grid-cols-2 gap-3">
        {['Spacer', 'Karmienie', 'Lek', 'Tylko sprawdzam'].map((action) => (
          <SketchBox key={action} label={action} className="h-24" />
        ))}
      </div>
      <Button to={`/zwierzeta/${pet.id}`} variant="ghost" fullWidth>
        Przejdź do profilu
      </Button>
    </div>
  )
}

function LostView({ pet }) {
  return (
    <div className="space-y-4">
      <header className="rounded-2xl bg-alert p-5 text-surface">
        <p className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase">
          <TriangleAlert size={18} aria-hidden="true" />
          Zaginął
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight">{pet.name} — pomóż mi wrócić do domu</h1>
      </header>
      <SketchBox label="Duże zdjęcie + komunikat właściciela" hint="Etap 5" className="aspect-square" />
      <Button to="lokalizacja" variant="alert" size="xl" fullWidth>
        Wyślij moją lokalizację
      </Button>
      <SketchBox label="Zadzwoń do właściciela" className="min-h-14" />
    </div>
  )
}

function FoundView({ pet }) {
  return (
    <div className="space-y-4">
      <SketchBox label={`Duże zdjęcie: ${pet.name}`} hint="Etap 5" className="aspect-square" />
      <h1 className="text-center text-3xl font-extrabold tracking-tight">Cześć, jestem {pet.name}!</h1>
      <Button to="lokalizacja" size="xl" fullWidth>
        Wyślij lokalizację właścicielowi
      </Button>
      <SketchBox label="Zadzwoń do właściciela" className="min-h-14" />
      <SketchBox label="Ważne informacje (alergie, leki)" className="min-h-14" />
    </div>
  )
}
