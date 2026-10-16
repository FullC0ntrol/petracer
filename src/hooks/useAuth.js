import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.js'

// Własny hook: komponent pisze `useAuth()` i nie musi wiedzieć, skąd dane pochodzą.
// Błąd przypomina o owinięciu aplikacji w <AuthProvider> (patrz main.jsx).
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth musi być użyty wewnątrz <AuthProvider>.')
  return context
}
