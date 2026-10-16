import { useId } from 'react'
import { cn } from '../../lib/cn.js'

/*
  Zakładki według wzorca WAI-ARIA: pasek `role="tablist"` z przyciskami `role="tab"`
  i pod nim jeden panel `role="tabpanel"` z treścią aktywnej zakładki (przekazaną jako `children`).
  Komponent kontrolowany — aktywną zakładkę trzyma rodzic (`activeTab` + `onChange`).

  Klawiatura: Tab wchodzi tylko na aktywną zakładkę (pozostałe mają tabIndex=-1),
  a strzałki / Home / End przełączają między zakładkami. Dzięki temu Tab od razu
  przechodzi dalej do treści zamiast przez każdą zakładkę po kolei.
*/
export default function Tabs({ tabs, activeTab, onChange, label, children }) {
  const baseId = useId()
  const tabId = (id) => `${baseId}-tab-${id}`
  const panelId = `${baseId}-panel`

  function handleKeyDown(event) {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    const lastIndex = tabs.length - 1
    const nextIndex = {
      ArrowRight: currentIndex === lastIndex ? 0 : currentIndex + 1,
      ArrowLeft: currentIndex === 0 ? lastIndex : currentIndex - 1,
      Home: 0,
      End: lastIndex,
    }[event.key]

    if (nextIndex === undefined) return
    event.preventDefault()
    const nextTab = tabs[nextIndex]
    onChange(nextTab.id)
    document.getElementById(tabId(nextTab.id))?.focus()
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={handleKeyDown}
        className="flex gap-1 overflow-x-auto border-b border-line"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              id={tabId(tab.id)}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              className={cn(
                '-mb-px border-b-2 px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors',
                isActive ? 'border-pine text-pine' : 'border-transparent text-ink-muted hover:text-ink',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={tabId(activeTab)} className="pt-6">
        {children}
      </div>
    </div>
  )
}
