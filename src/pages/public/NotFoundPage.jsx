import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-sm space-y-4 py-12 text-center">
      <p className="font-display text-6xl font-extrabold tracking-tight text-pine tabular-nums">404</p>
      <h1 className="text-2xl font-bold tracking-tight">Nie ma takiej strony</h1>
      <p className="text-ink-muted">Ten adres prowadzi donikąd — może trop się urwał?</p>
      <Link
        to="/"
        className="inline-flex min-h-12 items-center rounded-xl bg-pine px-6 font-semibold text-surface transition-colors hover:bg-pine/90"
      >
        Wróć na stronę główną
      </Link>
    </div>
  )
}
