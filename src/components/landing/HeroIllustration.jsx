/*
  Ilustracja na stronę główną: zawieszka na obroży, fale NFC i telefon z otwartą stroną zawieszki.
  Rysunek w SVG (bez plików graficznych), kolory z tokenów przez klasy `fill-*` / `stroke-*`,
  więc działa offline i skaluje się bez utraty jakości. Dla czytnika ekranu — opis w `aria-label`.
*/
export default function HeroIllustration() {
  return (
    <div className="relative aspect-square overflow-hidden rounded-3xl bg-pine-soft md:aspect-4/3">
      <svg
        viewBox="0 0 400 300"
        role="img"
        aria-label="Telefon przyłożony do zawieszki na obroży otwiera stronę zwierzęcia"
        className="absolute inset-0 size-full"
      >
        {/* obroża */}
        <path d="M-10 70 Q 120 150 230 95" className="fill-none stroke-ember" strokeWidth="18" strokeLinecap="round" />
        <path d="M-10 70 Q 120 150 230 95" className="fill-none stroke-ember-soft" strokeWidth="3" strokeDasharray="2 10" />

        {/* zawieszka */}
        <line x1="112" y1="112" x2="112" y2="132" className="stroke-ink-muted" strokeWidth="3" />
        <circle cx="112" cy="168" r="38" className="fill-surface stroke-line" strokeWidth="3" />
        <circle cx="112" cy="168" r="30" className="fill-pine" />
        {/* łapa na zawieszce */}
        <g className="fill-paper">
          <ellipse cx="100" cy="160" rx="4" ry="5" />
          <ellipse cx="108" cy="153" rx="4" ry="5" />
          <ellipse cx="117" cy="153" rx="4" ry="5" />
          <ellipse cx="125" cy="160" rx="4" ry="5" />
          <ellipse cx="112" cy="176" rx="11" ry="8.5" />
        </g>

        {/* fale NFC */}
        <g className="fill-none stroke-sky" strokeWidth="4" strokeLinecap="round">
          <path d="M160 150 q 12 18 0 36" />
          <path d="M174 140 q 20 28 0 56" opacity="0.7" />
          <path d="M188 130 q 28 38 0 76" opacity="0.4" />
        </g>

        {/* telefon */}
        <g transform="rotate(8 300 160)">
          <rect x="236" y="40" width="128" height="236" rx="20" className="fill-ink" />
          <rect x="244" y="52" width="112" height="212" rx="12" className="fill-paper" />
          {/* ekran: alarm */}
          <rect x="252" y="62" width="96" height="34" rx="8" className="fill-alert" />
          <rect x="260" y="72" width="44" height="5" rx="2.5" className="fill-surface" opacity="0.8" />
          <rect x="260" y="82" width="70" height="7" rx="3.5" className="fill-surface" />
          {/* awatar */}
          <rect x="278" y="106" width="44" height="44" rx="12" className="fill-pine-soft" />
          <text x="300" y="137" textAnchor="middle" className="fill-pine font-display" fontSize="24" fontWeight="700">
            L
          </text>
          {/* tekst */}
          <rect x="262" y="160" width="76" height="6" rx="3" className="fill-line" />
          <rect x="270" y="172" width="60" height="6" rx="3" className="fill-line" />
          {/* przyciski */}
          <rect x="252" y="190" width="96" height="26" rx="8" className="fill-alert" />
          <rect x="276" y="200" width="48" height="6" rx="3" className="fill-surface" />
          <rect x="252" y="224" width="96" height="26" rx="8" className="fill-surface stroke-line" strokeWidth="2" />
          <rect x="280" y="234" width="40" height="6" rx="3" className="fill-ink-muted" />
        </g>
      </svg>
    </div>
  )
}
