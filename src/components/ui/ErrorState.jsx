import { RotateCcw } from 'lucide-react'
import Button from './Button.jsx'

// Stan błędu ładowania danych: co się stało i przycisk „Spróbuj ponownie”.
// `role="alert"` sprawia, że czytnik ekranu od razu przeczyta komunikat.
export default function ErrorState({ title = 'Nie udało się wczytać danych', error, onRetry }) {
  return (
    <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-alert-soft p-4">
      <div>
        <p className="font-semibold text-alert">{title}</p>
        {error?.message && <p className="text-sm text-ink">{error.message}</p>}
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" icon={RotateCcw} onClick={onRetry}>
          Spróbuj ponownie
        </Button>
      )}
    </div>
  )
}
