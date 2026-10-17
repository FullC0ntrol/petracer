import { cn } from '../../lib/cn.js'

// Zdjęć nie ma (to priorytet 2), więc awatar to inicjał na kolorowym tle — kolor zależy od gatunku.
const SPECIES_TONES = {
  dog: 'bg-pine-soft text-pine',
  cat: 'bg-ember-soft text-ink',
  other: 'bg-sky/15 text-ink',
}

const SIZES = {
  sm: 'size-10 rounded-xl text-lg',
  md: 'size-14 rounded-2xl text-2xl',
  lg: 'size-20 rounded-2xl text-4xl',
  xl: 'size-40 rounded-3xl text-7xl',
}

export default function PetAvatar({ name, species, size = 'md', isLost = false, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center font-display font-bold',
        SPECIES_TONES[species] ?? SPECIES_TONES.other,
        SIZES[size],
        // Czerwona obwódka: zaginięcie widać od razu, także na liście.
        isLost && 'ring-4 ring-alert',
        className,
      )}
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  )
}
