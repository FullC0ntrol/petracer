import { Phone } from 'lucide-react'
import { buildTelLink } from '../../lib/sms.js'
import PetAvatar from '../pets/PetAvatar.jsx'
import Notice from '../ui/Notice.jsx'
import ActionLink from './ActionLink.jsx'
import MedicalNotes from './MedicalNotes.jsx'

/*
  Wariant 4: zwierzę nie jest zaginione, skanuje ktoś obcy.
  Znalazca widzi imię i uwagi medyczne, ale nie dane opiekuna (decyzja D5). Numer jest tylko
  w linku `tel:` przycisku „Zadzwoń” — interfejs nie wyświetla go jako tekstu.
*/
export default function FoundView({ pet, phone }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 pt-4 text-center">
        <PetAvatar name={pet.name} species={pet.species} size="xl" />
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Cześć, jestem {pet.name}!</h1>
          <p className="text-ink-muted">Jeśli jestem sam, mój opiekun na pewno się o mnie martwi.</p>
        </div>
      </div>

      {phone ? (
        <ActionLink href={buildTelLink(phone)} icon={Phone}>
          Zadzwoń do opiekuna
        </ActionLink>
      ) : (
        <Notice tone="warning" title="Opiekun nie podał numeru telefonu">
          Zaprowadź zwierzę do weterynarza albo schroniska — sprawdzą, czy ma mikroczip.
        </Notice>
      )}

      <MedicalNotes notes={pet.medicalNotes} />
    </div>
  )
}
