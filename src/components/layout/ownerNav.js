import { CalendarCheck, Footprints, LayoutDashboard, Settings } from 'lucide-react'

// Jedna lista pozycji dla dolnego paska (mobile) i sidebara (desktop).
export const OWNER_NAV_ITEMS = [
  { to: '/panel', label: 'Panel', icon: LayoutDashboard },
  { to: '/spacery', label: 'Spacery', icon: Footprints },
  { to: '/harmonogram', label: 'Harmonogram', icon: CalendarCheck },
  { to: '/ustawienia', label: 'Ustawienia', icon: Settings },
]
