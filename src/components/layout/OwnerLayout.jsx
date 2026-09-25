import { Link, Outlet, useLocation } from 'react-router'
import { Plus } from 'lucide-react'
import BottomNav from './BottomNav.jsx'
import Logo from './Logo.jsx'
import Sidebar from './Sidebar.jsx'

// Mobile: górny pasek z logo + dolna nawigacja + pływający przycisk szybkiej akcji.
// Desktop (lg): boczny sidebar, a treść w wygodnej, ograniczonej szerokością kolumnie.
export default function OwnerLayout() {
  const { pathname } = useLocation()
  const isTrackingWalk = pathname === '/spacery/nowy'

  return (
    <div className="min-h-dvh lg:flex">
      <Sidebar />

      <div className="flex-1">
        <header className="sticky top-0 z-20 border-b border-line bg-paper/90 px-4 py-3 backdrop-blur lg:hidden">
          <Logo to="/panel" />
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 pt-6 pb-32 sm:px-6 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>

      {!isTrackingWalk && (
        <Link
          to="/spacery/nowy"
          aria-label="Rozpocznij spacer"
          className="fixed right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 grid size-14 place-items-center rounded-2xl bg-ember text-ink shadow-raised transition-transform hover:scale-105 active:scale-95 lg:hidden"
        >
          <Plus size={26} aria-hidden="true" />
        </Link>
      )}

      <BottomNav />
    </div>
  )
}
