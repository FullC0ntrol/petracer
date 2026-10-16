import { useId } from 'react'

/*
  Wspólna „rama” dla Input, Textarea i Select: etykieta nad polem, a pod nim podpowiedź albo błąd.
  `useId` daje unikalne id, które łączy <label htmlFor> z polem — kliknięcie etykiety ustawia
  kursor w polu, a czytnik ekranu wie, jak pole się nazywa.

  `children` jest tu funkcją (render prop): rama wylicza atrybuty dostępności, a konkretne pole
  decyduje, na jakim znaczniku je rozłożyć (<input>, <textarea> czy <select>).
*/
export default function FormField({ label, hint, error, children }) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error || hint

  const fieldProps = {
    id,
    'aria-describedby': message ? messageId : undefined,
    'aria-invalid': error ? true : undefined,
  }

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
      </label>
      {children(fieldProps)}
      {message && (
        <p id={messageId} className={error ? 'text-sm font-medium text-alert' : 'text-sm text-ink-muted'}>
          {message}
        </p>
      )}
    </div>
  )
}
