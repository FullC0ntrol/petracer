import FormField from './FormField.jsx'
import { fieldClasses } from './fieldClasses.js'

export default function Textarea({ label, hint, error, rows = 4, className = '', ...rest }) {
  return (
    <FormField label={label} hint={hint} error={error}>
      {(fieldProps) => (
        <textarea {...rest} {...fieldProps} rows={rows} className={fieldClasses(Boolean(error), `resize-y ${className}`)} />
      )}
    </FormField>
  )
}
