import { MessageSquareText, Phone, Smartphone } from 'lucide-react'
import HeroIllustration from '../../components/landing/HeroIllustration.jsx'
import HowItWorksStep from '../../components/landing/HowItWorksStep.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'

export default function LandingPage() {
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <Badge tone="pine" size="md">
            Tag NFC / QR na obroży
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Zgubione zwierzę wraca do domu szybciej.
          </h1>
          <p className="text-lg text-ink-muted">
            Znalazca przykłada telefon do tagu i od razu widzi, jak się z Tobą skontaktować — bez instalowania
            aplikacji. Ty jednym dotknięciem zapisujesz karmienie i spacery.
          </p>
          <Button to="/login" variant="accent" size="lg">
            Zaloguj się
          </Button>
        </div>
        <HeroIllustration />
      </section>

      <section aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="mb-4 text-2xl font-bold tracking-tight">
          Jak działa tag
        </h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          <HowItWorksStep number={1} icon={Smartphone} title="Znalazca skanuje tag">
            Przykłada telefon do zawieszki albo robi zdjęcie kodu QR. Strona otwiera się w przeglądarce.
          </HowItWorksStep>
          <HowItWorksStep number={2} icon={Phone} title="Widzi profil i kontakt">
            Imię zwierzęcia, ważne informacje o zdrowiu i przycisk „Zadzwoń do opiekuna”.
          </HowItWorksStep>
          <HowItWorksStep number={3} icon={MessageSquareText} title="Wysyła Ci lokalizację">
            Gdy zwierzę jest oznaczone jako zaginione, znalazca jednym przyciskiem wysyła Ci SMS z mapą.
          </HowItWorksStep>
        </ol>
      </section>
    </div>
  )
}
