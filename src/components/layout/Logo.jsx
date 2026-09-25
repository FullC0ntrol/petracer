import { Link } from 'react-router'
import { PawPrint } from 'lucide-react'

export default function Logo({ to = '/' }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-xl font-display text-lg font-bold tracking-tight text-ink"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-pine text-paper">
        <PawPrint size={20} aria-hidden="true" />
      </span>
      PetTrace
    </Link>
  )
}
