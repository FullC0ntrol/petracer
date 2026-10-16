import { createContext } from 'react'

// Sam „kanał”, którym AuthProvider przekazuje dane w dół drzewa. Osobny plik, bo plik .jsx
// z komponentami powinien eksportować tylko komponenty (wymóg odświeżania na żywo w Vite).
export const AuthContext = createContext(null)
