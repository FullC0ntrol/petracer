import { Outlet } from 'react-router'
import { Stethoscope } from 'lucide-react'

export default function VetLayout() {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4">
          <span className="grid size-9 place-items-center rounded-xl bg-pine-soft text-pine">
            <Stethoscope size={20} aria-hidden="true" />
          </span>
          <div>
            <p className="font-display font-bold tracking-tight">Paszport medyczny</p>
            <p className="text-xs text-ink-muted">Udostępnione przez PetTrace</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
