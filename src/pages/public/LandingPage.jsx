import { Link } from 'react-router'
import SketchBox from '../../dev/SketchBox.jsx'

export default function LandingPage() {
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <p className="inline-block rounded-full bg-pine-soft px-3 py-1 text-sm font-semibold text-pine">
            Tag NFC / QR na obroży
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Zgubione zwierzę wraca do domu szybciej.
          </h1>
          <p className="text-lg text-ink-muted">
            Znalazca przykłada telefon do tagu i od razu widzi, jak się z Tobą skontaktować — bez instalowania
            aplikacji. Ty masz w jednym miejscu spacery, szczepienia i leki.
          </p>
          <Link
            to="/login"
            className="inline-flex min-h-12 items-center rounded-xl bg-ember px-6 font-semibold text-ink shadow-card transition-colors hover:bg-ember/90"
          >
            Zaloguj się
          </Link>
        </div>
        <SketchBox label="Ilustracja: telefon + tag na obroży" hint="Etap 8" className="aspect-square md:aspect-4/3" />
      </section>

      <section aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="mb-4 text-2xl font-bold tracking-tight">
          Jak działa tag
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <SketchBox label="1. Znalazca skanuje tag" className="h-32" />
          <SketchBox label="2. Widzi profil i kontakt" className="h-32" />
          <SketchBox label="3. Wysyła Ci lokalizację" className="h-32" />
        </div>
      </section>
    </div>
  )
}
