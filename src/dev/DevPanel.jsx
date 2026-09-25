import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { RotateCcw, Wrench, X } from 'lucide-react'
import { DEMO_TAGS, resetDevState, setLoggedIn, toggleLostMode, useDevState } from './devStore.js'

// Panel renderowany tylko w `npm run dev` (patrz RootLayout) — pozwala w kilka sekund
// przejść przez wszystkie warianty routingu kontekstowego.
export default function DevPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn, lostTagIds } = useDevState()

  useEffect(() => {
    if (!isOpen) return
    const closeOnEscape = (event) => event.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  return (
    <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-3 z-50 flex flex-col-reverse items-start gap-2 lg:right-4 lg:bottom-4 lg:left-auto lg:items-end">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="dev-panel"
        className="inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-bold tracking-wide text-paper shadow-raised transition-colors hover:bg-ink"
      >
        {isOpen ? <X size={14} aria-hidden="true" /> : <Wrench size={14} aria-hidden="true" />}
        DEV
      </button>

      {isOpen && (
        <section
          id="dev-panel"
          aria-label="Panel deweloperski"
          className="w-72 space-y-4 rounded-2xl border border-line bg-surface p-4 text-sm shadow-raised"
        >
          <DevSwitch label="Zalogowany jako Maciej" checked={isLoggedIn} onChange={() => setLoggedIn(!isLoggedIn)} />

          <div>
            <h2 className="mb-2 text-xs font-bold tracking-wide text-ink-muted uppercase">Otwórz tag</h2>
            <ul className="space-y-1">
              {DEMO_TAGS.map((tag) => (
                <li key={tag.tagId}>
                  <Link
                    to={`/t/${tag.tagId}`}
                    className="flex justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-pine-soft"
                  >
                    <span>{tag.petName ?? 'Nieaktywny'}</span>
                    <span className="font-mono text-xs text-ink-muted">{tag.tagId}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/vet/DEMO-SHARE" className="block rounded-lg px-2 py-1.5 transition-colors hover:bg-pine-soft">
                  Widok weterynarza
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-xs font-bold tracking-wide text-ink-muted uppercase">Lost Mode</h2>
            <div className="space-y-2">
              {DEMO_TAGS.filter((tag) => tag.isActive).map((tag) => (
                <DevSwitch
                  key={tag.tagId}
                  label={tag.petName}
                  checked={lostTagIds.includes(tag.tagId)}
                  onChange={() => toggleLostMode(tag.tagId)}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={resetDevState}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line px-3 py-2 font-semibold transition-colors hover:bg-alert-soft hover:text-alert"
          >
            <RotateCcw size={14} aria-hidden="true" />
            Resetuj dane
          </button>
        </section>
      )}
    </div>
  )
}

// Prosty przełącznik tylko na potrzeby panelu — docelowy Toggle powstanie w UI kicie (etap 2).
function DevSwitch({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-6 w-10 rounded-full transition-colors ${checked ? 'bg-pine' : 'bg-line'}`}
      >
        <span
          className={`absolute top-1 left-1 size-4 rounded-full bg-surface shadow-card transition-transform ${checked ? 'translate-x-4' : ''}`}
        />
      </button>
    </label>
  )
}
