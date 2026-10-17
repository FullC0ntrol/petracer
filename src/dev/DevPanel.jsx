import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { RotateCcw, Wrench, X } from 'lucide-react'
import { requestMagicLink } from '../api/auth.js'
import { devSetLostMode, getDevOverview, resetDemoData } from '../api/mock/dev.js'
import { API_MODE } from '../api/mode.js'
import Button from '../components/ui/Button.jsx'
import Toggle from '../components/ui/Toggle.jsx'
import { useAuth } from '../hooks/useAuth.js'

const DEMO_EMAIL = 'maciej@pettrace.pl'
const OPEN_KEY = 'pettrace:dev-panel-open'
const DEV_LINK_CLASSES = 'flex justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-pine-soft'

// Zawieszki z danych przykładowych — te same w trybie mock (seed.js) i http (server/sql/seed.sql).
const DEMO_TAGS = [
  { code: 'LUNA-7K2Q', petName: 'Luna' },
  { code: 'MRCZ-4P9D', petName: 'Mruczek' },
  { code: 'XXXX-0000', petName: null },
]

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
  Ekrany pobierają dane raz, przy wejściu na stronę. Po zmianie danych z panelu (tryb zaginięcia, reset)
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
        DEV · {API_MODE}
      </button>

      {isOpen && <DevPanelContent />}
    </div>
  )
}

// Osobny komponent: montuje się przy każdym otwarciu panelu, więc zawsze pokazuje świeże dane.
function DevPanelContent() {
  const { user, login, logout } = useAuth()
  const [isBusy, setIsBusy] = useState(false)
  const [error, setError] = useState(null)
  const isMock = API_MODE === 'mock'
  const tags = isMock ? getDevOverview() : DEMO_TAGS

  // Logowanie idzie tą samą drogą co w aplikacji (magic link → weryfikacja), tylko bez klikania.
  async function handleLoginChange(shouldBeLoggedIn) {
    setIsBusy(true)
    setError(null)
    try {
      if (shouldBeLoggedIn) {
        const { devLink } = await requestMagicLink(DEMO_EMAIL)
        if (!devLink) throw new Error('Serwer nie zwrócił linku (działa w trybie produkcyjnym?).')
        await login(new URL(devLink, window.location.origin).searchParams.get('token'))
      } else {
        await logout()
      }
    } catch (loginError) {
      setError(loginError.message)
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
      {error && <p className="text-xs font-medium text-alert">{error}</p>}

      <div>
        <h2 className="mb-2 text-xs font-bold tracking-wide text-ink-muted uppercase">Otwórz</h2>
        <ul className="space-y-1">
          {tags.map((tag) => (
            <li key={tag.code}>
              <Link to={`/t/${tag.code}`} className={DEV_LINK_CLASSES}>
                <span>{tag.petName ?? 'Nieaktywny'}</span>
                <span className="font-mono text-xs text-ink-muted">{tag.code}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/dev/ui" className={DEV_LINK_CLASSES}>
              Galeria UI
            </Link>
          </li>
        </ul>
      </div>

      {isMock ? (
        <>
          <div>
            <h2 className="mb-2 text-xs font-bold tracking-wide text-ink-muted uppercase">Tryb zaginięcia</h2>
            <div className="space-y-2">
              {tags
                .filter((tag) => tag.petId && tag.isActive)
                .map((tag) => (
                  <Toggle
                    key={tag.code}
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
        </>
      ) : (
        <p className="text-xs text-ink-muted">
          Tryb http: tryb zaginięcia przełączasz w profilu zwierzęcia, a dane resetujesz poleceniem{' '}
          <code className="font-mono">npm run db:reset</code> w folderze <code className="font-mono">server/</code>.
        </p>
      )}
    </section>
  )
}
