import { Outlet } from 'react-router'
import Button from '../ui/Button.jsx'
import Logo from './Logo.jsx'

export default function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Logo />
        <Button to="/login" variant="ghost">
          Zaloguj się
        </Button>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>

      <footer className="mx-auto w-full max-w-5xl px-4 py-6 text-sm text-ink-muted sm:px-6">
        PetTrace · prototyp pracy inżynierskiej
      </footer>
    </div>
  )
}
