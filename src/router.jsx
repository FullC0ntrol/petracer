import { createBrowserRouter } from 'react-router'
import FinderLayout from './components/layout/FinderLayout.jsx'
import OwnerLayout from './components/layout/OwnerLayout.jsx'
import PublicLayout from './components/layout/PublicLayout.jsx'
import RequireAuth from './components/layout/RequireAuth.jsx'
import RootLayout from './components/layout/RootLayout.jsx'
import VetLayout from './components/layout/VetLayout.jsx'
import LocationSentPage from './pages/finder/LocationSentPage.jsx'
import ShareLocationPage from './pages/finder/ShareLocationPage.jsx'
import TagPage from './pages/finder/TagPage.jsx'
import DashboardPage from './pages/owner/DashboardPage.jsx'
import LostModePage from './pages/owner/LostModePage.jsx'
import PetEditPage from './pages/owner/PetEditPage.jsx'
import PetNewPage from './pages/owner/PetNewPage.jsx'
import PetProfilePage from './pages/owner/PetProfilePage.jsx'
import PetTagPage from './pages/owner/PetTagPage.jsx'
import SchedulePage from './pages/owner/SchedulePage.jsx'
import SettingsPage from './pages/owner/SettingsPage.jsx'
import VetSharePage from './pages/owner/VetSharePage.jsx'
import WalkDetailsPage from './pages/owner/WalkDetailsPage.jsx'
import WalkNewPage from './pages/owner/WalkNewPage.jsx'
import WalksPage from './pages/owner/WalksPage.jsx'
import AuthVerifyPage from './pages/public/AuthVerifyPage.jsx'
import CheckEmailPage from './pages/public/CheckEmailPage.jsx'
import LandingPage from './pages/public/LandingPage.jsx'
import LoginPage from './pages/public/LoginPage.jsx'
import NotFoundPage from './pages/public/NotFoundPage.jsx'
import VetPassportPage from './pages/vet/VetPassportPage.jsx'

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
          { path: 'login/sprawdz-poczte', element: <CheckEmailPage /> },
          { path: 'auth/verify', element: <AuthVerifyPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
      {
        path: 't/:tagId',
        element: <FinderLayout />,
        children: [
          { index: true, element: <TagPage /> },
          { path: 'lokalizacja', element: <ShareLocationPage /> },
          { path: 'wyslano', element: <LocationSentPage /> },
        ],
      },
      {
        path: 'vet/:shareToken',
        element: <VetLayout />,
        children: [{ index: true, element: <VetPassportPage /> }],
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
              { path: 'zwierzeta/:id/zaginiecie', element: <LostModePage /> },
              { path: 'zwierzeta/:id/vet-share', element: <VetSharePage /> },
              { path: 'zwierzeta/:id/tag', element: <PetTagPage /> },
              { path: 'spacery', element: <WalksPage /> },
              { path: 'spacery/nowy', element: <WalkNewPage /> },
              { path: 'spacery/:id', element: <WalkDetailsPage /> },
              { path: 'harmonogram', element: <SchedulePage /> },
              { path: 'ustawienia', element: <SettingsPage /> },
            ],
          },
        ],
      },
    ],
  },
])
