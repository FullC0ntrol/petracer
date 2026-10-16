import FormField from './FormField.jsx'
import { fieldClasses } from './fieldClasses.js'

// `fieldProps` idą po `...rest`, żeby id i aria-* z FormField nie zostały przypadkiem nadpisane.
export default function Input({ label, hint, error, className = '', ...rest }) {
  return (
    <FormField label={label} hint={hint} error={error}>
      {(fieldProps) => <input {...rest} {...fieldProps} className={fieldClasses(Boolean(error), className)} />}
    </FormField>
  )
}
