import { useId } from 'react'
import { cn } from '../../lib/cn.js'

/*
  Komponent kontrolowany: sam nie pamięta, czy jest włączony. Wartość dostaje w `checked`,
  a kliknięcie tylko zgłasza rodzicowi nową wartość przez `onChange(!checked)`.
  Stan trzyma rodzic (podnoszenie stanu), więc może go np. zapisać albo pokazać gdzie indziej.
  `role="switch"` + `aria-checked` mówią czytnikowi ekranu, że to przełącznik wł./wył.
*/
export default function Toggle({ checked, onChange, label, description, disabled = false }) {
  const id = useId()
  const descriptionId = `${id}-description`

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <label htmlFor={id} className={cn('font-medium', disabled ? 'text-ink-muted' : 'cursor-pointer')}>
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="text-sm text-ink-muted">
            {description}
          </p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? descriptionId : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-pine' : 'bg-line',
        )}
      >
        <span
          className={cn(
            'absolute top-1 left-1 size-5 rounded-full bg-surface shadow-card transition-transform',
            checked && 'translate-x-5',
          )}
        />
      </button>
    </div>
  )
}
