import Button from '../../components/ui/Button.jsx'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-sm space-y-4 py-12 text-center">
      <p className="font-display text-6xl font-extrabold tracking-tight text-pine tabular-nums">404</p>
      <h1 className="text-2xl font-bold tracking-tight">Nie ma takiej strony</h1>
      <p className="text-ink-muted">Ten adres prowadzi donikąd — może trop się urwał?</p>
      <Button to="/" size="lg">
        Wróć na stronę główną
      </Button>
    </div>
  )
}
