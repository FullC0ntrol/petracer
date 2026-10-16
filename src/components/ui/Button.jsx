import { Link } from 'react-router'
import { cn } from '../../lib/cn.js'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS = {
  primary: 'bg-pine text-surface hover:bg-pine/90',
  accent: 'bg-ember text-ink shadow-card hover:bg-ember/90',
  secondary: 'border border-line bg-surface text-ink hover:bg-paper',
  ghost: 'text-pine hover:bg-pine-soft',
  // Akcja nieodwracalna (wylogowanie, unieważnienie) — ostrzega, ale nie krzyczy.
  danger: 'border border-line bg-surface text-alert hover:bg-alert-soft',
  // Główna akcja w trybie zaginięcia — jedyny w pełni czerwony przycisk w aplikacji.
  alert: 'bg-alert text-surface hover:bg-alert/90',
}

const SIZES = {
  sm: 'min-h-9 px-3 text-sm',
  md: 'min-h-11 px-4',
  lg: 'min-h-12 px-6',
  // Dla znalazcy: min. 56 px wysokości, żeby trafić kciukiem w stresie.
  xl: 'min-h-14 px-6 text-lg font-bold',
}

const ICON_SIZES = { sm: 16, md: 18, lg: 18, xl: 22 }

/*
  Jeden komponent dla dwóch znaczników: z propem `to` renderuje <Link> (nawigacja),
  bez niego — <button> (akcja na stronie). Wygląd jest ten sam, semantyka poprawna.
  `...rest` przekazuje dalej wszystko, czego nie wyciągnęliśmy (onClick, disabled, relative, aria-*…).
  Domyślne `type="button"` chroni przed przypadkowym wysłaniem formularza.
*/
export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  fullWidth = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className)
  const content = (
    <>
      {Icon && <Icon size={ICON_SIZES[size]} aria-hidden="true" />}
      {children}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  )
}
