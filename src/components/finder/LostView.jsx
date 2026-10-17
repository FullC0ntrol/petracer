import { MapPin, Phone, TriangleAlert } from 'lucide-react'
import { buildTelLink } from '../../lib/sms.js'
import PetAvatar from '../pets/PetAvatar.jsx'
import Button from '../ui/Button.jsx'
import Notice from '../ui/Notice.jsx'
import ActionLink from './ActionLink.jsx'
import MedicalNotes from './MedicalNotes.jsx'

/*
  Wariant 3: zwierzę zaginione. Ta sama prostota co widok znalazcy, ale z jednoznacznie alarmowym
  nagłówkiem. Główna akcja: SMS z lokalizacją. W tym wariancie numer opiekuna jest widoczny (D5).
*/
export default function LostView({ code, pet, phone, message }) {
  return (
    <div className="space-y-5">
      <header className="rounded-2xl bg-alert p-5 text-surface">
        <p className="flex items-center gap-2 text-sm font-bold tracking-wide uppercase">
          <TriangleAlert size={18} aria-hidden="true" />
          Zaginione zwierzę
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight">{pet.name} — pomóż mi wrócić do domu</h1>
      </header>

      <div className="flex items-center gap-4">
        <PetAvatar name={pet.name} species={pet.species} size="lg" isLost />
        {message ? (
          <blockquote className="flex-1 rounded-2xl bg-alert-soft p-4 text-ink">
            <p className="text-sm font-semibold">Wiadomość od opiekuna:</p>
            <p>„{message}”</p>
          </blockquote>
        ) : (
          <p className="flex-1 text-ink-muted">Opiekun szuka tego zwierzęcia. Daj mu znać, gdzie jest.</p>
        )}
      </div>

      {phone ? (
        <div className="space-y-3">
          {/* `state`: strona lokalizacji dostaje numer i imię bez ponownego pytania serwera. */}
          <Button to={`/t/${code}/lokalizacja`} state={{ phone, petName: pet.name }} variant="alert" size="xl" icon={MapPin} fullWidth>
            Wyślij SMS z lokalizacją
          </Button>
          <ActionLink href={buildTelLink(phone)} variant="secondary" icon={Phone}>
            Zadzwoń: {phone}
          </ActionLink>
        </div>
      ) : (
        <Notice tone="warning" title="Opiekun nie podał numeru telefonu">
          Zaprowadź zwierzę do weterynarza albo schroniska — sprawdzą, czy ma mikroczip.
        </Notice>
      )}

      <MedicalNotes notes={pet.medicalNotes} />
    </div>
  )
}
