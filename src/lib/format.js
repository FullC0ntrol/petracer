/*
  Formatowanie dat, liczb i tekstów do wyświetlenia. Same funkcje czyste: dostają wartość,
  zwracają napis, niczego nie zmieniają — łatwo je testować i używać w każdym komponencie.

  Intl.* to wbudowane w przeglądarkę narzędzia do formatowania zgodnie z językiem (tu: polski),
  np. „17 paź 2026, 14:05” albo „3,2 km”, bez dodatkowych bibliotek.
*/

const LOCALE = 'pl-PL'
const DAY_MS = 24 * 60 * 60 * 1000

const dateFormatter = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' })
const dateTimeFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})
const timeFormatter = new Intl.DateTimeFormat(LOCALE, { hour: '2-digit', minute: '2-digit' })
const relativeFormatter = new Intl.RelativeTimeFormat(LOCALE, { numeric: 'auto' })
const kmFormatter = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 })

/*
  Polska odmiana liczebników ma trzy formy: 1 rok, 2–4 lata (ale 12–14 lat), 5+ lat.
  plural(3, 'rok', 'lata', 'lat') → 'lata'
*/
export function plural(count, one, few, many) {
  if (count === 1) return one
  const lastDigit = count % 10
  const lastTwoDigits = count % 100
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) return few
  return many
}

// "2023-05-14" → "14 maja 2023". Datę bez godziny składamy z części, żeby strefa czasowa
// nie przesunęła jej o dzień (new Date("2023-05-14") to północ czasu UTC, nie polskiego).
export function formatDate(value) {
  if (!value) return '—'
  const [year, month, day] = value.slice(0, 10).split('-').map(Number)
  return dateFormatter.format(new Date(year, month - 1, day))
}

export function formatDateTime(value) {
  return dateTimeFormatter.format(new Date(value))
}

// „dziś, 14:05”, „wczoraj, 8:12”, „3 dni temu” — czytelniejsze niż pełna data dla świeżych zdarzeń.
export function formatRelative(value) {
  const date = new Date(value)
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const daysAgo = Math.ceil((startOfToday - date) / DAY_MS)

  if (daysAgo <= 0) return `dziś, ${timeFormatter.format(date)}`
  if (daysAgo === 1) return `wczoraj, ${timeFormatter.format(date)}`
  if (daysAgo < 7) return relativeFormatter.format(-daysAgo, 'day')
  return formatDateTime(value)
}

// Wiek z daty urodzenia: „3 lata”, „8 miesięcy”, „2 tygodnie”.
export function formatAge(birthDate) {
  if (!birthDate) return null
  const [year, month, day] = birthDate.split('-').map(Number)
  const birth = new Date(year, month - 1, day)
  const now = new Date()

  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  if (now.getDate() < birth.getDate()) months -= 1

  if (months >= 12) {
    const years = Math.floor(months / 12)
    return `${years} ${plural(years, 'rok', 'lata', 'lat')}`
  }
  if (months >= 1) return `${months} ${plural(months, 'miesiąc', 'miesiące', 'miesięcy')}`
  const weeks = Math.max(0, Math.floor((now - birth) / (7 * DAY_MS)))
  return `${weeks} ${plural(weeks, 'tydzień', 'tygodnie', 'tygodni')}`
}

export function formatDuration(minutes) {
  if (!minutes) return null
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (!hours) return `${rest} min`
  return rest ? `${hours} h ${rest} min` : `${hours} h`
}

export function formatDistance(meters) {
  if (meters === null || meters === undefined) return null
  return meters < 1000 ? `${meters} m` : `${kmFormatter.format(meters / 1000)} km`
}

export function formatWeight(kg) {
  if (kg === null || kg === undefined) return '—'
  return `${kmFormatter.format(kg)} kg`
}

const SPECIES_LABELS = { dog: 'Pies', cat: 'Kot', other: 'Inne zwierzę' }

export function speciesLabel(species) {
  return SPECIES_LABELS[species] ?? SPECIES_LABELS.other
}

/*
  Przeglądarka i system z nagłówka User-Agent, np. „Chrome · Android”.
  Kolejność sprawdzania ma znaczenie: Edge i Samsung Internet też mają w nazwie „Chrome”,
  a Chrome — „Safari”, więc najpierw szukamy nazw bardziej szczegółowych.
*/
export function describeUserAgent(userAgent = '') {
  const os = /Android/i.test(userAgent)
    ? 'Android'
    : /iPhone|iPad|iPod/i.test(userAgent)
      ? 'iOS'
      : /Windows/i.test(userAgent)
        ? 'Windows'
        : /Mac OS X|Macintosh/i.test(userAgent)
          ? 'macOS'
          : /Linux/i.test(userAgent)
            ? 'Linux'
            : null

  const browser = /Edg(e|A|iOS)?\//.test(userAgent)
    ? 'Edge'
    : /SamsungBrowser/.test(userAgent)
      ? 'Samsung Internet'
      : /Firefox|FxiOS/.test(userAgent)
        ? 'Firefox'
        : /Chrome|CriOS/.test(userAgent)
          ? 'Chrome'
          : /Safari/.test(userAgent)
            ? 'Safari'
            : null

  if (!os && !browser) return userAgent ? userAgent.split(/[ /]/)[0] : 'Nieznana przeglądarka'
  return [browser ?? 'Przeglądarka', os].filter(Boolean).join(' · ')
}
