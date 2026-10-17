import { useNavigate } from 'react-router'
import { createPet } from '../../api/pets.js'
import PageHeader from '../../components/layout/PageHeader.jsx'
import PetForm from '../../components/pets/PetForm.jsx'

export default function PetNewPage() {
  const navigate = useNavigate()

  // Błąd z createPet „wypływa” do PetForm, który pokaże go nad przyciskiem.
  async function handleSubmit(values) {
    const pet = await createPet(values)
    navigate(`/zwierzeta/${pet.id}`, { replace: true })
  }

  return (
    <div className="max-w-2xl">
      <PageHeader title="Nowe zwierzę" description="Wymagane jest tylko imię — resztę możesz uzupełnić później." />
      <PetForm onSubmit={handleSubmit} submitLabel="Dodaj zwierzę" cancelTo="/panel" />
    </div>
  )
}
