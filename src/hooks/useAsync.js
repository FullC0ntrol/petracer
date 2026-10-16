import { useEffect, useState } from 'react'

/*
  Ładowanie danych z API ze stanami: ładowanie / błąd / dane.

    const { data, error, isLoading, reload } = useAsync(() => getPetById(id), [id])

  `deps` działa jak tablica zależności w useEffect: zmiana któregoś elementu = nowe zapytanie.

  Wyścig zapytań: jeśli użytkownik szybko przejdzie z /zwierzeta/luna na /zwierzeta/mruczek,
  odpowiedź dla Luny może przyjść PO odpowiedzi dla Mruczka i nadpisać ekran złymi danymi.
  Flaga `ignore`, ustawiana w sprzątaniu efektu, sprawia, że spóźniona odpowiedź jest odrzucana.

  Każdy wynik zapisujemy razem z kluczem zapytania, które go dało. Jeśli klucz nie pasuje
  do bieżącego zapytania, wynik jest nieaktualny — czyli trwa ładowanie. Dzięki temu nie trzeba
  ustawiać „isLoading = true” wewnątrz efektu.
*/
export function useAsync(asyncFn, deps) {
  const [reloadCount, setReloadCount] = useState(0)
  const [result, setResult] = useState({ key: null, data: undefined, error: null })
  const key = JSON.stringify([...deps, reloadCount])

  useEffect(() => {
    let ignore = false
    asyncFn().then(
      (data) => {
        if (!ignore) setResult({ key, data, error: null })
      },
      (error) => {
        if (!ignore) setResult({ key, data: undefined, error })
      },
    )
    return () => {
      ignore = true
    }
    // `asyncFn` to nowa funkcja przy każdym renderze — o ponownym zapytaniu decyduje `key` z `deps`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const isCurrent = result.key === key
  return {
    data: isCurrent ? result.data : undefined,
    error: isCurrent ? result.error : null,
    isLoading: !isCurrent,
    reload: () => setReloadCount((count) => count + 1),
  }
}
