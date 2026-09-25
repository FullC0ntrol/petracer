import { Outlet, ScrollRestoration } from 'react-router'
import DevPanel from '../../dev/DevPanel.jsx'

// Wspólny korzeń wszystkich tras. `import.meta.env.DEV` jest stałą podmienianą przy budowaniu,
// więc w wersji produkcyjnej panel DEV zostaje całkowicie usunięty z paczki.
export default function RootLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
      {import.meta.env.DEV && <DevPanel />}
    </>
  )
}
