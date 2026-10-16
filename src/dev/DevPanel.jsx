import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { RotateCcw, Wrench, X } from 'lucide-react'
import { requestMagicLink } from '../api/auth.js'
import { devSetLostMode, getDevOverview, resetDemoData } from '../api/dev.js'
import Button from '../components/ui/Button.jsx'
import Toggle from '../components/ui/Toggle.jsx'
import { useAuth } from '../hooks/useAuth.js'

const DEMO_EMAIL = 'maciej@pettrace.pl'
const OPEN_KEY = 'pettrace:dev-panel-open'
const DEV_LINK_CLASSES = 'flex justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-pine-soft'

function readIsOpen() {
  try {
    return sessionStorage.getItem(OPEN_KEY) === '1'
  } catch {
    return false
  }
}

function writeIsOpen(isOpen) {
  try {
    sessionStorage.setItem(OPEN_KEY, isOpen ? '1' : '0')
  } catch {
    // Bez sessionStorage panel po prostu zamknie się po przeładowaniu.
  }
}

/*
  Ekrany pobierają dane raz, przy wejściu na stronę. Po zmianie danych z panelu (Lost Mode, reset)
  najprościej przeładować stronę, żeby wszystko wczytało się od nowa. To narzędzie deweloperskie,
  więc taka „siekiera” jest w porządku; panel zapamiętuje w sessionStorage, że był otwarty.
*/
function reloadPage() {
  window.location.reload()
}

// Panel renderowany tylko w `npm run dev` (patrz RootLayout) — pozwala w kilka sekund
// przejść przez wszystkie warianty routingu kontekstowego.
export default function DevPanel() {
  const [isOpen, setIsOpen] = useState(readIsOpen)

  useEffect(() => {
    writeIsOpen(isOpen)
    if (!isOpen) return
    const closeOnEscape = (event) => event.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  return (
    <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-3 z-50 flex flex-col-reverse items-start gap-2 lg:right-4 lg:bottom-4 lg:left-auto lg:items-end">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="dev-panel"
        className="inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-bold tracking-wide text-paper shadow-raised transition-colors hover:bg-ink"
      >
        {isOpen ? <X size={14} aria-hidden="true" /> : <Wrench size={14} aria-hidden="true" />}
        DEV
      </button>

      {isOpen && <DevPanelContent />}
    </div>
  )
}

// Osobny komponent: montuje się przy każdym otwarciu panelu, więc zawsze pokazuje świeże dane.
function DevPanelContent() {
  const { user, login, logout } = useAuth()
  const [isBusy, setIsBusy] = useState(false)
  const tags = getDevOverview()

  // Logowanie idzie tą samą drogą co w aplikacji (magic link → weryfikacja), tylko bez klikania.
  async function handleLoginChange(shouldBeLoggedIn) {
    setIsBusy(true)
    if (shouldBeLoggedIn) {
      const { devToken } = await requestMagicLink(DEMO_EMAIL)
      await login(devToken)
    } else {
      await logout()
    }
    setIsBusy(false)
  }

  function handleLostChange(petId, isLost) {
    devSetLostMode(petId, isLost)
    reloadPage()
  }

  function handleReset() {
    resetDemoData()
    reloadPage()
  }

  return (
    <section
      id="dev-panel"
      aria-label="Panel deweloperski"
      className="w-72 space-y-4 rounded-2xl border border-line bg-surface p-4 text-sm shadow-raised"
    >
      <Toggle
        label={user ? `Zalogowany: ${user.name}` : 'Zalogowany'}
        description={user ? undefined : DEMO_EMAIL}
        checked={Boolean(user)}
        onChange={handleLoginChange}
        disabled={isBusy}
      />

      <div>
        <h2 className="mb-2 text-xs font-bold tracking-wide text-ink-muted uppercase">Otwórz</h2>
        <ul className="space-y-1">
          {tags.map((tag) => (
            <li key={tag.tagId}>
              <Link to={`/t/${tag.tagId}`} className={DEV_LINK_CLASSES}>
                <span>{tag.petName ?? 'Nieaktywny'}</span>
                <span className="font-mono text-xs text-ink-muted">{tag.tagId}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/vet/DEMO-SHARE" className={DEV_LINK_CLASSES}>
              Widok weterynarza
            </Link>
          </li>
          <li>
            <Link to="/dev/ui" className={DEV_LINK_CLASSES}>
              Galeria UI
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-xs font-bold tracking-wide text-ink-muted uppercase">Lost Mode</h2>
        <div className="space-y-2">
          {tags
            .filter((tag) => tag.petId)
            .map((tag) => (
              <Toggle
                key={tag.tagId}
                label={tag.petName}
                checked={tag.isLost}
                onChange={(isLost) => handleLostChange(tag.petId, isLost)}
              />
            ))}
        </div>
      </div>

      <Button variant="danger" size="sm" icon={RotateCcw} fullWidth onClick={handleReset}>
        Resetuj dane
      </Button>
    </section>
  )
}
