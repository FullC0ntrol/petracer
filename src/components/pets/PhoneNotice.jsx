import Button from '../ui/Button.jsx'
import Notice from '../ui/Notice.jsx'

// Ostrzeżenie o brakującym numerze — na ekranie zwierzęcia i na pustym panelu.
export default function PhoneNotice() {
  return (
    <Notice
      tone="warning"
      title="Dodaj numer telefonu"
      action={
        <Button to="/ustawienia" variant="secondary" size="sm">
          Przejdź do ustawień
        </Button>
      }
    >
      Bez numeru znalazca nie zadzwoni do Ciebie, a zawieszki nie da się utworzyć.
    </Notice>
  )
}
