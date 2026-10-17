import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { QRCodeSVG } from 'qrcode.react'
import { Check, Copy, Download, ExternalLink, QrCode, RefreshCw, ScanLine } from 'lucide-react'
import { getPetById } from '../../api/pets.js'
import { createTag, getTagScans } from '../../api/tags.js'
import PageHeader from '../../components/layout/PageHeader.jsx'
import ScanList from '../../components/tags/ScanList.jsx'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import ErrorState from '../../components/ui/ErrorState.jsx'
import Modal from '../../components/ui/Modal.jsx'
import Notice from '../../components/ui/Notice.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import { useAsync } from '../../hooks/useAsync.js'
import { useAuth } from '../../hooks/useAuth.js'

/*
  /zwierzeta/:id/tag — zawieszka zwierzęcia (UC3, UC8, decyzja D9):
  wygenerowanie kodu, kod QR do wydruku, adres do zapisania na tagu NFC i historia skanowań.
*/
export default function PetTagPage() {
  const { id } = useParams()
  const { data, error, isLoading, reload } = useAsync(() => getPetById(id), [id])
  // Po utworzeniu tagu API zwraca zwierzę z nowym kodem — pokazujemy je bez ponownego ładowania.
  const [updatedPet, setUpdatedPet] = useState(null)
  const pet = updatedPet?.id === data?.id ? updatedPet : data

  if (isLoading) return <Spinner showLabel label="Wczytuję zawieszkę…" />
  if (error) return <ErrorState title="Nie udało się wczytać zwierzęcia" error={error} onRetry={reload} />

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Zawieszka: ${pet.name}`}
        description={
          <Link to={`/zwierzeta/${pet.id}`} className="font-semibold text-pine underline-offset-4 hover:underline">
            ← Wróć do profilu
          </Link>
        }
      />
      {pet.tagCode ? (
        <TagDetails pet={pet} onRegenerated={setUpdatedPet} />
      ) : (
        <CreateTag pet={pet} onCreated={setUpdatedPet} />
      )}
      {/* `key`: po wygenerowaniu nowego kodu historia ładuje się od nowa. */}
      <ScanHistory key={pet.tagCode} petId={pet.id} />
    </div>
  )
}

// Hook z logiką „utwórz tag”: wspólny dla pierwszego tagu i wygenerowania nowego kodu.
function useCreateTag(petId, onDone) {
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState(null)

  async function create() {
    setIsCreating(true)
    setError(null)
    try {
      onDone(await createTag(petId))
      return true
    } catch (createError) {
      setError(createError.message)
      return false
    } finally {
      setIsCreating(false)
    }
  }

  return { create, isCreating, error }
}

function CreateTag({ pet, onCreated }) {
  const { user } = useAuth()
  const { create, isCreating, error } = useCreateTag(pet.id, onCreated)

  // UC3, warunek początkowy: bez numeru telefonu znalazca nie miałby jak się skontaktować.
  if (!user.phone) {
    return (
      <Notice
        tone="warning"
        title="Najpierw podaj numer telefonu"
        action={
          <Button to="/ustawienia" variant="secondary" size="sm">
            Przejdź do ustawień
          </Button>
        }
      >
        Zawieszka prowadzi znalazcę do przycisku „Zadzwoń do opiekuna” — bez numeru nie zadziała.
      </Notice>
    )
  }

  return (
    <Card className="space-y-4 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-pine-soft text-pine">
        <QrCode size={28} aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <h2 className="text-xl font-bold">{pet.name} nie ma jeszcze zawieszki</h2>
        <p className="mx-auto max-w-md text-ink-muted">
          Wygenerujemy unikalny kod. Dostaniesz kod QR do wydruku i adres do zapisania na tagu NFC.
        </p>
      </div>
      {error && <p role="alert" className="font-medium text-alert">{error}</p>}
      <Button size="lg" icon={QrCode} onClick={create} disabled={isCreating}>
        {isCreating ? 'Tworzę…' : 'Utwórz zawieszkę'}
      </Button>
    </Card>
  )
}

function TagDetails({ pet, onRegenerated }) {
  // Adres zawieszki budujemy z adresu, pod którym działa aplikacja (w produkcji: https://petracker.pl).
  const tagUrl = `${window.location.origin}/t/${pet.tagCode}`
  const qrWrapperRef = useRef(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { create, isCreating, error } = useCreateTag(pet.id, onRegenerated)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(tagUrl)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      // Schowek bywa zablokowany (np. strona bez HTTPS) — adres i tak jest widoczny do zaznaczenia.
    }
  }

  // Kod QR to element <svg> na stronie. Zamieniamy go na tekst, pakujemy w plik (Blob)
  // i „klikamy” tymczasowy link do pobrania. Plik SVG można wydrukować w dowolnym rozmiarze bez utraty jakości.
  function handleDownload() {
    const svg = qrWrapperRef.current.querySelector('svg')
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `zawieszka-${pet.tagCode}.svg`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  async function handleRegenerate() {
    if (await create()) setIsModalOpen(false)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
      <Card className="flex flex-col items-center gap-4">
        <div ref={qrWrapperRef} className="rounded-xl bg-surface p-2">
          {/* Poziom korekcji „M” — kod da się odczytać, nawet gdy ok. 15% nadruku jest zabrudzone. */}
          <QRCodeSVG value={tagUrl} size={208} level="M" marginSize={2} title={`Kod QR zawieszki ${pet.tagCode}`} />
        </div>
        <p className="font-mono text-2xl font-bold tracking-wider">{pet.tagCode}</p>
        <Button variant="secondary" icon={Download} onClick={handleDownload}>
          Pobierz QR (SVG)
        </Button>
      </Card>

      <div className="space-y-6">
        <Card className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Adres zawieszki</h2>
            <p className="text-sm text-ink-muted">Ten adres zapisz na tagu NFC — kod QR prowadzi dokładnie tutaj.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <code className="min-w-0 flex-1 rounded-xl bg-paper px-3 py-2.5 font-mono text-sm break-all">{tagUrl}</code>
            <Button variant="secondary" icon={isCopied ? Check : Copy} onClick={handleCopy} className="shrink-0">
              {isCopied ? 'Skopiowano' : 'Kopiuj'}
            </Button>
          </div>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-ink-muted">
            <li>Zainstaluj na telefonie aplikację do zapisu tagów, np. NFC Tools.</li>
            <li>Wybierz „Zapisz” → „Dodaj rekord” → „URL / URI” i wklej adres.</li>
            <li>Przyłóż tag do telefonu. Nie blokuj tagu — zablokowanego nie da się później zmienić.</li>
            <li>Zeskanuj zawieszkę swoim telefonem: zobaczysz szybki zapis, czyli tag działa.</li>
          </ol>
          <Button to={`/t/${pet.tagCode}`} variant="ghost" icon={ExternalLink}>
            Sprawdź, co zobaczy znalazca
          </Button>
        </Card>

        <Card padding="sm" className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-muted">Zgubiona zawieszka? Wygeneruj nowy kod — stary przestanie działać.</p>
          <Button variant="danger" size="sm" icon={RefreshCw} onClick={() => setIsModalOpen(true)}>
            Nowy kod
          </Button>
        </Card>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Wygenerować nowy kod?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleRegenerate} disabled={isCreating}>
              {isCreating ? 'Generuję…' : 'Wygeneruj nowy kod'}
            </Button>
          </>
        }
      >
        <p>
          Zawieszka <span className="font-mono text-ink">{pet.tagCode}</span> przestanie działać — po zeskanowaniu
          pokaże „Ten tag nie jest aktywny”. Nowy adres trzeba zapisać na tagu i wydrukować nowy kod QR.
        </p>
        {error && (
          <p role="alert" className="mt-3 text-sm font-medium text-alert">
            {error}
          </p>
        )}
      </Modal>
    </div>
  )
}

function ScanHistory({ petId }) {
  const { data: scans, error, isLoading, reload } = useAsync(() => getTagScans(petId), [petId])

  return (
    <section aria-labelledby="scan-history-heading" className="space-y-3">
      <div>
        <h2 id="scan-history-heading" className="text-lg font-semibold">
          Historia skanowań
        </h2>
        <p className="text-sm text-ink-muted">Każde otwarcie strony zawieszki: kiedy i jaką przeglądarką.</p>
      </div>
      {isLoading && <Spinner showLabel label="Wczytuję historię…" />}
      {error && <ErrorState title="Nie udało się wczytać historii" error={error} onRetry={reload} />}
      {scans?.length === 0 && (
        <EmptyState icon={ScanLine} title="Brak skanowań" description="Gdy ktoś zeskanuje zawieszkę, zobaczysz to tutaj." />
      )}
      {scans?.length > 0 && (
        <Card padding="sm">
          <ScanList scans={scans} />
        </Card>
      )}
    </section>
  )
}
