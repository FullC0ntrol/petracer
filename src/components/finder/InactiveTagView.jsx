import { TagIcon } from 'lucide-react'

// Wariant 1: kod nie istnieje albo zawieszka nie jest przypisana do zwierzęcia.
export default function InactiveTagView({ code }) {
  return (
    <div className="space-y-6 pt-10 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-line/70 text-ink-muted">
        <TagIcon size={32} aria-hidden="true" />
      </span>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Ten tag nie jest aktywny</h1>
        <p className="text-ink-muted">
          Zawieszka <span className="font-mono text-ink">{code}</span> nie jest przypisana do żadnego zwierzęcia.
        </p>
      </div>
      <p className="rounded-2xl bg-surface p-4 text-left shadow-card">
        Jeśli znalazłeś zwierzę, zaprowadź je do najbliższego weterynarza albo schroniska — sprawdzą, czy ma mikroczip
        z danymi opiekuna.
      </p>
    </div>
  )
}
