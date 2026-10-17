import { useState } from 'react'
import { Link } from 'react-router'
import { Siren } from 'lucide-react'
import { setLostMode } from '../../api/pets.js'
import { useAuth } from '../../hooks/useAuth.js'
import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import Modal from '../ui/Modal.jsx'
import Notice from '../ui/Notice.jsx'
import Textarea from '../ui/Textarea.jsx'
import Toggle from '../ui/Toggle.jsx'

/*
  Przełącznik trybu zaginięcia w profilu zwierzęcia (UC6, decyzja D10).

  Przełącznik nie zmienia stanu od razu — otwiera okno z potwierdzeniem, bo włączenie trybu
  upublicznia numer telefonu właściciela każdemu, kto zeskanuje zawieszkę. Wyłączenie też
  wymaga potwierdzenia, żeby nie zgasić alarmu przypadkowym dotknięciem.
*/
export default function LostModeSwitch({ pet, onChange }) {
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [message, setMessage] = useState(pet.lostMessage)
  const [error, setError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const willEnable = !pet.isLost

  function openModal() {
    setMessage(pet.lostMessage)
    setError(null)
    setIsModalOpen(true)
  }

  async function handleConfirm() {
    setIsSaving(true)
    setError(null)
    try {
      const updated = await setLostMode(pet.id, willEnable, message)
      onChange(updated)
      setIsModalOpen(false)
    } catch (saveError) {
      setError(saveError.message)
    }
    setIsSaving(false)
  }

  return (
    <Card as="section" padding="sm" aria-label="Tryb zaginięcia" className={pet.isLost ? 'ring-2 ring-alert' : ''}>
      <Toggle
        label="Zaginione"
        description={
          pet.isLost
            ? 'Znalazca widzi czerwony alarm, Twój numer telefonu i komunikat.'
            : 'Włącz, jeśli zwierzę się zgubiło — strona zawieszki pokaże alarm.'
        }
        checked={pet.isLost}
        onChange={openModal}
      />
      {pet.isLost && pet.lostMessage && (
        <p className="mt-3 rounded-xl bg-alert-soft p-3 text-sm text-ink">
          <span className="font-semibold">Komunikat dla znalazcy:</span> {pet.lostMessage}
        </p>
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={willEnable ? `Włączyć tryb zaginięcia dla ${pet.name}?` : 'Wyłączyć tryb zaginięcia?'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Anuluj
            </Button>
            <Button variant={willEnable ? 'alert' : 'primary'} icon={willEnable ? Siren : undefined} onClick={handleConfirm} disabled={isSaving}>
              {isSaving ? 'Zapisuję…' : willEnable ? 'Włącz tryb zaginięcia' : 'Tak, odnalazło się'}
            </Button>
          </>
        }
      >
        {willEnable ? (
          <div className="space-y-4">
            <p>
              Każdy, kto zeskanuje zawieszkę, zobaczy czerwony widok alarmowy z Twoim numerem telefonu
              i będzie mógł wysłać Ci SMS ze swoją lokalizacją.
            </p>
            {!user.phone && (
              <Notice tone="warning" title="Nie masz podanego numeru telefonu">
                Znalazca nie będzie mógł zadzwonić ani wysłać SMS-a.{' '}
                <Link to="/ustawienia" className="font-semibold underline underline-offset-4">
                  Uzupełnij w ustawieniach
                </Link>
              </Notice>
            )}
            {!pet.tagCode && (
              <Notice tone="warning">Zwierzę nie ma jeszcze zawieszki — alarm zobaczy dopiero ktoś, kto zeskanuje tag.</Notice>
            )}
            <Textarea
              label="Komunikat dla znalazcy (opcjonalnie)"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              maxLength={500}
              placeholder="np. Jest płochliwy — nie łap go, tylko daj znać, gdzie jest."
            />
          </div>
        ) : (
          <p>Strona zawieszki znowu pokaże zwykły profil, a Twój numer przestanie być widoczny jako tekst.</p>
        )}
        {error && (
          <p role="alert" className="mt-3 text-sm font-medium text-alert">
            {error}
          </p>
        )}
      </Modal>
    </Card>
  )
}
