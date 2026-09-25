import { NavLink } from 'react-router'
import { OWNER_NAV_ITEMS } from './ownerNav.js'

export default function BottomNav() {
  return (
    <nav
      aria-label="Nawigacja główna"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-4">
        {OWNER_NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2 text-xs transition-colors ${
                  isActive ? 'font-semibold text-pine' : 'text-ink-muted hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`grid h-7 w-12 place-items-center rounded-full transition-colors ${isActive ? 'bg-pine-soft' : ''}`}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
