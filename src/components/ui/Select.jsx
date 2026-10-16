import { ChevronDown } from 'lucide-react'
import FormField from './FormField.jsx'
import { fieldClasses } from './fieldClasses.js'

// Natywny <select> (działa z klawiaturą i na telefonie bez dodatkowego kodu), tylko z własną strzałką:
// `appearance-none` chowa systemową, a ikona leży nad polem i nie przechwytuje kliknięć.
export default function Select({ label, hint, error, className = '', children, ...rest }) {
  return (
    <FormField label={label} hint={hint} error={error}>
      {(fieldProps) => (
        <div className="relative">
          <select {...rest} {...fieldProps} className={fieldClasses(Boolean(error), `appearance-none pr-10 ${className}`)}>
            {children}
          </select>
          <ChevronDown
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-muted"
          />
        </div>
      )}
    </FormField>
  )
}
