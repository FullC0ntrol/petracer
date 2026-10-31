import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'

/*
  Arkusz wysuwany od dołu (bottom sheet). Działa jak Modal — ten sam natywny <dialog>
  z showModal(), więc tło, blokada strony i fokus są za darmo — różni się tylko wyglądem:
  przyklejony do dolnej krawędzi, w zasięgu kciuka. Na komputerze to wyśrodkowana karta nad dołem ekranu.
  Zamykanie: przycisk X, Escape albo kliknięcie w przyciemnione tło.
*/
export default function Sheet({ open, onClose, title, children }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    dialog.showModal()
    return () => dialog.close()
  }, [open])

  function handleCancel(event) {
    event.preventDefault()
    onClose()
  }

  function handleClick(event) {
    if (event.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleClick}
      className="mx-auto mt-auto mb-0 max-h-[85dvh] w-full max-w-xl animate-sheet rounded-t-[2.25rem] bg-surface p-0 text-ink shadow-raised backdrop:bg-ink/40 sm:mb-4 sm:rounded-[2.25rem]"
    >
      <div className="px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:px-5">
        {/* Uchwyt — sygnał „to jest arkusz”, znany z aplikacji mobilnych. */}
        <span aria-hidden="true" className="mx-auto mb-3 block h-1.5 w-12 rounded-full bg-line" />
        <div className="mb-4 flex items-center justify-between gap-4 px-1">
          <h2 id={titleId} className="text-xl font-bold tracking-tight">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="grid size-9 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-paper hover:text-ink"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  )
}
