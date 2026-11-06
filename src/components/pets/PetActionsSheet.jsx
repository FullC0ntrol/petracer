import { useNavigate } from 'react-router'
import { ChevronRight, Eye, Pencil, Plus, QrCode, Settings } from 'lucide-react'
import Sheet from '../ui/Sheet.jsx'

/*
  Arkusz „Akcje” dla jednego zwierzęcia — cała nawigacja panelu w jednym miejscu: kafelki 2×N
  i osobny wiersz „Konto i ustawienia”. Lista kafelków to zwykła tablica obiektów, a „Oczami znalazcy”
  pojawia się tylko wtedy, gdy zwierzę ma zawieszkę.
*/
export default function PetActionsSheet({ open, onClose, pet }) {
  const navigate = useNavigate()
  // Kolor zwierzęcia: zielony, a przy zaginięciu czerwony — jak karta na ekranie.
  const tone = pet.isLost ? 'bg-alert text-paper' : 'bg-pine text-paper'

  const tiles = [
    {
      icon: QrCode,
      label: 'Zawieszka',
      hint: pet.tagCode ? `Kod ${pet.tagCode}` : 'Utwórz kod QR',
      to: `/zwierzeta/${pet.id}/tag`,
    },
    { icon: Pencil, label: 'Edytuj profil', hint: 'Dane i zdrowie', to: `/zwierzeta/${pet.id}/edytuj` },
    ...(pet.tagCode
      ? [{ icon: Eye, label: 'Oczami znalazcy', hint: 'Strona zawieszki', to: `/t/${pet.tagCode}` }]
      : []),
    { icon: Plus, label: 'Nowe zwierzę', hint: 'Dodaj kolejne', to: '/zwierzeta/nowe' },
  ]

  // Najpierw zamykamy arkusz, potem przechodzimy — inaczej <dialog> zostałby otwarty na nowej stronie.
  function go(to) {
    onClose()
    navigate(to)
  }

  return (
    <Sheet open={open} onClose={onClose} title={`Akcje: ${pet.name}`}>
      <ul className="grid grid-cols-2 gap-3">
        {tiles.map(({ icon: Icon, label, hint, to }, index) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => go(to)}
              style={{ animationDelay: `${index * 35}ms` }}
              className="flex h-full w-full animate-rise flex-col items-start gap-3 rounded-3xl bg-paper p-4 text-left transition-transform active:scale-[0.97]"
            >
              <span className={`grid size-11 place-items-center rounded-2xl ${tone}`}>
                <Icon size={20} aria-hidden="true" />
              </span>
              <span>
                <span className="block leading-tight font-bold">{label}</span>
                <span className="mt-0.5 block text-xs text-ink-muted">{hint}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => go('/ustawienia')}
        className="mt-3 flex w-full items-center gap-3 rounded-3xl p-4 text-left font-semibold transition-colors hover:bg-paper"
      >
        <Settings size={22} aria-hidden="true" />
        Konto i ustawienia
        <ChevronRight size={18} aria-hidden="true" className="ml-auto text-ink-muted" />
      </button>
    </Sheet>
  )
}
