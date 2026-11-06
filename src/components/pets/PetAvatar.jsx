import { Cat, Dog, PawPrint } from 'lucide-react'
import { cn } from '../../lib/cn.js'

// Zdjęć nie ma (to priorytet 2), więc awatar to ikona gatunku. Kolor zależy od imienia,
// dzięki czemu dwa psy jednego właściciela łatwo odróżnić na pierwszy rzut oka.
const SPECIES_ICONS = { dog: Dog, cat: Cat, other: PawPrint }
const TONES = ['bg-pine-soft text-pine', 'bg-ember-soft text-ink', 'bg-sky/15 text-ink', 'bg-amber/15 text-ink']

const SIZES = {
  sm: 'size-10 rounded-xl',
  md: 'size-14 rounded-2xl',
  lg: 'size-20 rounded-2xl',
  xl: 'size-40 rounded-3xl',
}

export default function PetAvatar({ name, species, size = 'md', isLost = false, className = '' }) {
  const Icon = SPECIES_ICONS[species] ?? PawPrint
  const tone = TONES[[...name].reduce((sum, letter) => sum + letter.charCodeAt(0), 0) % TONES.length]

  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center',
        tone,
        SIZES[size],
        // Czerwona obwódka: zaginięcie widać od razu, także na liście.
        isLost && 'ring-4 ring-alert',
        className,
      )}
    >
      <Icon className="size-3/5" strokeWidth={1.75} />
    </span>
  )
}
