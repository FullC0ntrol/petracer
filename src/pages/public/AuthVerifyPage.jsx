import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { setLoggedIn } from '../../dev/devStore.js'

// W etapie 3 token z adresu zostanie sprawdzony przez warstwę API; teraz od razu „logujemy”.
export default function AuthVerifyPage() {
  const navigate = useNavigate()

  useEffect(() => {
    setLoggedIn(true)
    navigate('/panel', { replace: true })
  }, [navigate])

  return <p className="text-center text-ink-muted">Weryfikuję link…</p>
}
