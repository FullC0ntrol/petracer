import { Outlet, ScrollRestoration } from 'react-router'

// Wspólny korzeń wszystkich tras.
export default function RootLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
