import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'

/*
  Okno modalne na natywnym <dialog>. Przeglądarka za darmo daje: przyciemnione tło (::backdrop),
  zablokowanie reszty strony, „uwięzienie” fokusu w oknie i powrót fokusu na przycisk,
  który okno otworzył.

  `showModal()` to metoda elementu DOM, więc potrzebujemy do niego dostępu — stąd `useRef`.
  Efekt otwiera okno, gdy `open` zmieni się na true, a funkcja sprzątająca je zamyka
  (gdy `open` wróci na false albo komponent zniknie ze strony).
*/
export default function Modal({ open, onClose, title, children, footer }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    dialog.showModal()
    return () => dialog.close()
  }, [open])

  // Escape wywołuje zdarzenie `cancel`. Blokujemy domyślne zamknięcie, żeby o stanie
  // decydował rodzic przez `onClose` — inaczej okno zamknęłoby się, a `open` dalej byłoby true.
  function handleCancel(event) {
    event.preventDefault()
    onClose()
  }

  // Dialog nie ma własnego paddingu, więc kliknięcie trafia w sam <dialog> tylko poza treścią, czyli w tło.
  function handleClick(event) {
    if (event.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleClick}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-surface p-0 text-ink shadow-raised backdrop:bg-ink/40"
    >
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-bold tracking-tight">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="-m-1 grid size-9 shrink-0 place-items-center rounded-xl text-ink-muted transition-colors hover:bg-paper hover:text-ink"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="text-ink-muted">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-3 pt-2">{footer}</div>}
      </div>
    </dialog>
  )
}
