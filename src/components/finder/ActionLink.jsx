import { cn } from '../../lib/cn.js'

/*
  Duży przycisk-link dla znalazcy, prowadzący POZA aplikację: `tel:` (telefon) albo `sms:` (wiadomości).
  Button z `ui/` renderuje <Link> z React Routera, który obsługuje tylko adresy wewnątrz aplikacji,
  więc tu potrzebny jest zwykły <a href>. Wygląd odpowiada Button w rozmiarze `xl` (min. 56 px).
*/
const VARIANTS = {
  primary: 'bg-pine text-surface hover:bg-pine/90',
  alert: 'bg-alert text-surface hover:bg-alert/90',
  secondary: 'border border-line bg-surface text-ink hover:bg-paper',
}

export default function ActionLink({ href, variant = 'primary', icon: Icon, children }) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl px-6 text-lg font-bold transition-colors',
        VARIANTS[variant],
      )}
    >
      {Icon && <Icon size={22} aria-hidden="true" />}
      {children}
    </a>
  )
}
