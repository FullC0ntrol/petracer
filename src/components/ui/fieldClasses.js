import { cn } from '../../lib/cn.js'

// Wspólny wygląd pola tekstowego, obszaru tekstu i listy wyboru — zmiana tu zmienia wszystkie trzy.
export function fieldClasses(hasError, className = '') {
  return cn(
    'w-full min-h-12 rounded-xl border bg-surface px-3.5 py-2.5 text-ink transition-colors',
    'placeholder:text-ink-muted/70 disabled:cursor-not-allowed disabled:bg-paper',
    hasError ? 'border-alert' : 'border-line hover:border-ink-muted/50',
    className,
  )
}
