import { Link, NavLink } from 'react-router'
import { Plus } from 'lucide-react'
import Logo from './Logo.jsx'
import { OWNER_NAV_ITEMS } from './ownerNav.js'

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-8 border-r border-line bg-surface p-6 lg:flex">
      <Logo to="/panel" />

      <nav aria-label="Nawigacja główna">
        <ul className="space-y-1">
          {OWNER_NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-colors ${
                    isActive ? 'bg-pine-soft text-pine' : 'text-ink-muted hover:bg-paper hover:text-ink'
                  }`
                }
              >
                <Icon size={20} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Link
        to="/spacery/nowy"
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-ember px-4 py-3 font-semibold text-ink shadow-card transition-colors hover:bg-ember/90"
      >
        <Plus size={18} aria-hidden="true" />
        Rozpocznij spacer
      </Link>
    </aside>
  )
}
