import { useNavigate, useParams } from 'react-router'
import { getPetById, updatePet } from '../../api/pets.js'
import PageHeader from '../../components/layout/PageHeader.jsx'
import PetForm from '../../components/pets/PetForm.jsx'
import ErrorState from '../../components/ui/ErrorState.jsx'
import Spinner from '../../components/ui/Spinner.jsx'
import { useAsync } from '../../hooks/useAsync.js'

export default function PetEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: pet, error, isLoading, reload } = useAsync(() => getPetById(id), [id])

  async function handleSubmit(values) {
    await updatePet(id, values)
    navigate(`/zwierzeta/${id}`, { replace: true })
  }

  if (isLoading) return <Spinner showLabel label="Wczytuję dane zwierzęcia…" />
  if (error) return <ErrorState title="Nie udało się wczytać zwierzęcia" error={error} onRetry={reload} />

  return (
    <div className="max-w-2xl">
      <PageHeader title={`Edytuj: ${pet.name}`} />
      {/* `key`: po przejściu na inne zwierzę formularz zaczyna od nowa, z jego danymi. */}
      <PetForm key={pet.id} pet={pet} onSubmit={handleSubmit} submitLabel="Zapisz zmiany" cancelTo={`/zwierzeta/${id}`} />
    </div>
  )
}
