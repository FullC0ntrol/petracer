import { Link, Outlet } from 'react-router'
import Logo from './Logo.jsx'

export default function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Logo />
        <Link
          to="/login"
          className="rounded-xl px-4 py-2 font-semibold text-pine transition-colors hover:bg-pine-soft"
        >
          Zaloguj się
        </Link>
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
