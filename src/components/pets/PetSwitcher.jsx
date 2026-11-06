import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Plus } from 'lucide-react'
import { getPets } from '../../api/pets.js'
import { useAsync } from '../../hooks/useAsync.js'
import { cn } from '../../lib/cn.js'
import PetAvatar from './PetAvatar.jsx'

/*
  Przełącznik zwierząt u góry ekranu: poziomo przewijany rząd awatarów (scroll-snap).
  Aktywne zwierzę ma obwódkę, zaginione — pulsującą czerwoną kropkę. Ostatni kafelek „+” dodaje zwierzę.

  Lista ładuje się raz: przy przejściu z Luny na Mruczka React zostawia ten komponent na miejscu
  (zmienia się tylko parametr :id), więc useAsync z pustą tablicą zależności nie pyta API ponownie.
  `current` to zwierzę z ekranu — po włączeniu trybu zaginięcia kropka pojawia się od razu.
*/
export default function PetSwitcher({ activeId, current }) {
  const { data: pets } = useAsync(getPets, [])
  const listRef = useRef(null)
  const activeRef = useRef(null)

  // Aktywny awatar na środek — przewijamy tylko listę, nie całą stronę.
  useEffect(() => {
    const list = listRef.current
    const item = activeRef.current
    if (!list || !item) return
    list.scrollTo({ left: item.offsetLeft - list.clientWidth / 2 + item.clientWidth / 2, behavior: 'smooth' })
  }, [activeId, pets])

  if (!pets) return <div className="h-[92px]" aria-hidden="true" />

  return (
    <nav aria-label="Twoje zwierzęta" className="-mx-4 sm:mx-0">
      <ul ref={listRef} className="no-scrollbar flex snap-x gap-2 overflow-x-auto px-4 py-1 sm:px-0">
        {pets.map((listed) => {
          const pet = current?.id === listed.id ? { ...listed, ...current } : listed
          const isActive = pet.id === activeId
          return (
            <li key={pet.id} ref={isActive ? activeRef : undefined} className="snap-center">
              <Link
                to={`/zwierzeta/${pet.id}`}
                aria-current={isActive ? 'page' : undefined}
                className="group flex w-[72px] flex-col items-center gap-1 transition-transform active:scale-95"
              >
                <span className="relative">
                  <span
                    className={cn(
                      'block rounded-[1.15rem] p-[3px] transition-colors',
                      isActive ? 'bg-pine' : 'bg-transparent group-hover:bg-line',
                    )}
                  >
                    <PetAvatar name={pet.name} species={pet.species} className="ring-2 ring-paper" />
                  </span>
                  {pet.isLost && (
                    <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center" title="Zaginione">
                      <span className="absolute inset-0 animate-ping rounded-full bg-alert opacity-60" />
                      <span className="relative size-3 rounded-full bg-alert ring-2 ring-paper" />
                    </span>
                  )}
                </span>
                <span className={cn('max-w-full truncate text-sm', isActive ? 'font-bold text-ink' : 'text-ink-muted')}>
                  {pet.name}
                </span>
              </Link>
            </li>
          )
        })}
        <li className="snap-center">
          <Link to="/zwierzeta/nowe" className="group flex w-[72px] flex-col items-center gap-1 active:scale-95">
            <span className="grid size-[62px] place-items-center rounded-[1.15rem] border-2 border-dashed border-line text-ink-muted transition-colors group-hover:border-pine group-hover:text-pine">
              <Plus size={24} aria-hidden="true" />
            </span>
            <span className="text-sm text-ink-muted">Dodaj</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
