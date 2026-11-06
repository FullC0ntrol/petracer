import { Link, Outlet } from 'react-router'
import { useAuth } from '../../hooks/useAuth.js'
import Logo from './Logo.jsx'

/*
  Układ panelu właściciela pod telefon: bez sidebara, dolnego paska i menu.
  U góry przyklejony nagłówek (logo + kółko konta), pod nim jedna wąska kolumna —
  na komputerze ta sama, tylko wyśrodkowana. Cała nawigacja jest na ekranie zwierzęcia:
  przełącznik awatarów u góry i arkusz „Akcje” na dole.
*/
export default function OwnerLayout() {
  const { user } = useAuth()

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 bg-paper/85 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex h-14 items-center justify-between">
            <Logo to="/panel" />
            <Link
              to="/ustawienia"
              aria-label={`Konto: ${user.name}`}
              title={user.name}
              className="grid size-10 place-items-center rounded-full bg-ink font-display font-bold text-paper transition-transform active:scale-95"
            >
              {user.name.trim().charAt(0).toUpperCase()}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-4 pt-2 pb-32">
        <Outlet />
      </main>
    </div>
  )
}
