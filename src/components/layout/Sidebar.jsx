import { NavLink } from 'react-router'
import { Plus } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.js'
import Button from '../ui/Button.jsx'
import Logo from './Logo.jsx'
import { OWNER_NAV_ITEMS } from './ownerNav.js'

export default function Sidebar() {
  const { user } = useAuth()

  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-8 border-r border-line bg-surface p-6 lg:flex">
      <div className="space-y-3">
        <Logo to="/panel" />
        <p className="text-sm text-ink-muted">
          Zalogowano jako <span className="font-semibold text-ink">{user.name}</span>
        </p>
      </div>

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

      <Button to="/spacery/nowy" variant="accent" size="lg" icon={Plus} className="mt-auto">
        Rozpocznij spacer
      </Button>
    </aside>
  )
}
