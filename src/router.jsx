import { createBrowserRouter } from 'react-router'
import FinderLayout from './components/layout/FinderLayout.jsx'
import OwnerLayout from './components/layout/OwnerLayout.jsx'
import PublicLayout from './components/layout/PublicLayout.jsx'
import RequireAuth from './components/layout/RequireAuth.jsx'
import RootLayout from './components/layout/RootLayout.jsx'
import UiGalleryPage from './pages/dev/UiGalleryPage.jsx'
import ShareLocationPage from './pages/finder/ShareLocationPage.jsx'
import TagPage from './pages/finder/TagPage.jsx'
import DashboardPage from './pages/owner/DashboardPage.jsx'
import PetEditPage from './pages/owner/PetEditPage.jsx'
import PetNewPage from './pages/owner/PetNewPage.jsx'
import PetProfilePage from './pages/owner/PetProfilePage.jsx'
import PetTagPage from './pages/owner/PetTagPage.jsx'
import SettingsPage from './pages/owner/SettingsPage.jsx'
import LandingPage from './pages/public/LandingPage.jsx'
import LoginPage from './pages/public/LoginPage.jsx'
import NotFoundPage from './pages/public/NotFoundPage.jsx'
import RegisterPage from './pages/public/RegisterPage.jsx'

/*
  Trasy są pogrupowane według layoutu. Trasa bez `path`, a z `element`, to tzw. layout route:
  nie zmienia adresu, tylko owija swoje dzieci wspólnym wyglądem (albo, jak RequireAuth,
  wspólnym warunkiem dostępu).
*/
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <LandingPage /> },
          { path: 'login', element: <LoginPage /> },
          { path: 'rejestracja', element: <RegisterPage /> },
          // Galeria komponentów tylko przy pracy lokalnej: w wersji produkcyjnej warunek wycina ją z paczki.
          ...(import.meta.env.DEV ? [{ path: 'dev/ui', element: <UiGalleryPage /> }] : []),
          { path: '*', element: <NotFoundPage /> },
        ],
      },
      {
        path: 't/:tagId',
        element: <FinderLayout />,
        children: [
          { index: true, element: <TagPage /> },
          { path: 'lokalizacja', element: <ShareLocationPage /> },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <OwnerLayout />,
            children: [
              { path: 'panel', element: <DashboardPage /> },
              { path: 'zwierzeta/nowe', element: <PetNewPage /> },
              { path: 'zwierzeta/:id', element: <PetProfilePage /> },
              { path: 'zwierzeta/:id/edytuj', element: <PetEditPage /> },
              { path: 'zwierzeta/:id/tag', element: <PetTagPage /> },
              { path: 'ustawienia', element: <SettingsPage /> },
            ],
          },
        ],
      },
    ],
  },
])
