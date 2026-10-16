import { useId, useState } from 'react'
import { Clock, Footprints, LogOut, MapPin, Plus, Route, Siren, Trash2 } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import Card from '../../components/ui/Card.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import Input from '../../components/ui/Input.jsx'
import Modal from '../../components/ui/Modal.jsx'
import Select from '../../components/ui/Select.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import StatTile from '../../components/ui/StatTile.jsx'
import Tabs from '../../components/ui/Tabs.jsx'
import Textarea from '../../components/ui/Textarea.jsx'
import Toggle from '../../components/ui/Toggle.jsx'

const BUTTON_VARIANTS = ['primary', 'accent', 'secondary', 'ghost', 'danger', 'alert']
const BUTTON_SIZES = ['sm', 'md', 'lg', 'xl']
const BADGE_TONES = ['neutral', 'pine', 'ember', 'alert', 'sky', 'amber']
const DEMO_TABS = [
  { id: 'info', label: 'Informacje' },
  { id: 'health', label: 'Zdrowie' },
  { id: 'activity', label: 'Aktywność' },
  { id: 'tag', label: 'Tag' },
]

// Galeria wszystkich komponentów z `components/ui` — tu sprawdzamy każdy wariant, zanim trafi na stronę.
export default function UiGalleryPage() {
  const [notifications, setNotifications] = useState({ reminders: true, scans: false })
  const [activeTab, setActiveTab] = useState('info')
  const [isModalOpen, setIsModalOpen] = useState(false)

  function toggleNotification(key) {
    setNotifications((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <>
      <PageHeader title="Galeria UI" description="Wszystkie wspólne komponenty i ich warianty." />

      <div className="space-y-10">
        <GallerySection title="Button">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {BUTTON_VARIANTS.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {BUTTON_SIZES.map((size) => (
                <Button key={size} size={size} icon={Plus}>
                  Rozmiar {size}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/" variant="secondary">
                Link (prop „to”)
              </Button>
              <Button disabled>Wyłączony</Button>
              <Button variant="danger" icon={LogOut}>
                Wyloguj się
              </Button>
            </div>
            <div className="max-w-md">
              <Button variant="alert" size="xl" icon={MapPin} fullWidth>
                Wyślij moją lokalizację
              </Button>
            </div>
          </div>
        </GallerySection>

        <GallerySection title="Badge">
          <div className="flex flex-wrap items-center gap-2">
            {BADGE_TONES.map((tone) => (
              <Badge key={tone} tone={tone}>
                {tone}
              </Badge>
            ))}
            <Badge tone="alert" icon={Siren}>
              Zaginiony
            </Badge>
            <Badge tone="pine" size="md">
              Rozmiar md
            </Badge>
          </div>
        </GallerySection>

        <GallerySection title="Card">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <p className="font-semibold">padding „md” (domyślny)</p>
              <p className="text-sm text-ink-muted">Biała karta z ciepłym cieniem.</p>
            </Card>
            <Card padding="sm">
              <p className="font-semibold">padding „sm”</p>
              <p className="text-sm text-ink-muted">Ciaśniejsza, np. na kafelki.</p>
            </Card>
            <Card as="article" padding="none" className="overflow-hidden">
              <div className="h-16 bg-pine-soft" />
              <p className="p-4 font-semibold">padding „none” + as=„article”</p>
            </Card>
          </div>
        </GallerySection>

        <GallerySection title="Spinner">
          <div className="flex flex-wrap items-center gap-6">
            <Spinner size="sm" />
            <Spinner />
            <Spinner size="lg" />
            <Spinner showLabel label="Wczytuję spacery…" />
          </div>
        </GallerySection>

        <GallerySection title="Input · Textarea · Select">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Imię zwierzęcia" placeholder="np. Luna" hint="Tak zobaczy je znalazca." />
            <Input label="Adres e-mail" type="email" defaultValue="maciej@" error="Wpisz poprawny adres e-mail." />
            <Select label="Gatunek" defaultValue="dog">
              <option value="dog">Pies</option>
              <option value="cat">Kot</option>
              <option value="other">Inne</option>
            </Select>
            <Input label="Wyłączone" defaultValue="LUNA-7K2Q" disabled />
            <Textarea label="Komunikat dla znalazców" placeholder="np. Jest płochliwa, nie goń jej." className="sm:col-span-2" />
          </div>
        </GallerySection>

        <GallerySection title="Toggle">
          <Card className="max-w-md space-y-4">
            <Toggle
              label="Przypomnienia"
              description="Szczepienia, leki i wizyty."
              checked={notifications.reminders}
              onChange={() => toggleNotification('reminders')}
            />
            <Toggle
              label="Odczyty tagu"
              checked={notifications.scans}
              onChange={() => toggleNotification('scans')}
            />
            <Toggle label="Wyłączony" checked={false} onChange={() => {}} disabled />
          </Card>
        </GallerySection>

        <GallerySection title="Tabs">
          <Tabs tabs={DEMO_TABS} activeTab={activeTab} onChange={setActiveTab} label="Przykładowe zakładki">
            <p className="text-ink-muted">
              Treść zakładki: <strong className="text-ink">{DEMO_TABS.find((tab) => tab.id === activeTab).label}</strong>
            </p>
          </Tabs>
        </GallerySection>

        <GallerySection title="Modal">
          <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
            Otwórz modal
          </Button>
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Unieważnić link?"
            footer={
              <>
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Anuluj
                </Button>
                <Button variant="danger" icon={Trash2} onClick={() => setIsModalOpen(false)}>
                  Unieważnij
                </Button>
              </>
            }
          >
            Weterynarz straci dostęp do paszportu medycznego. Tej operacji nie można cofnąć.
          </Modal>
        </GallerySection>

        <GallerySection title="EmptyState">
          <EmptyState
            icon={Footprints}
            title="Brak spacerów"
            description="Rozpocznij pierwszy spacer, a tu pojawi się jego trasa i statystyki."
            action={
              <Button icon={Plus} size="sm">
                Nowy spacer
              </Button>
            }
          />
        </GallerySection>

        <GallerySection title="StatTile">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatTile label="Dystans" value="12,4" unit="km" icon={Route} hint="w tym tygodniu" />
            <StatTile label="Czas" value="3:25" unit="h" icon={Clock} />
            <StatTile label="Spacery" value="9" icon={Footprints} />
          </div>
        </GallerySection>
      </div>
    </>
  )
}

function GallerySection({ title, children }) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="mb-4 border-b border-line pb-2 text-lg font-semibold">
        {title}
      </h2>
      {children}
    </section>
  )
}
