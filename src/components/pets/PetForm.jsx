import { useState } from 'react'
import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import Input from '../ui/Input.jsx'
import Notice from '../ui/Notice.jsx'
import Select from '../ui/Select.jsx'
import Textarea from '../ui/Textarea.jsx'

const EMPTY_PET = { name: '', species: 'dog', breed: '', birthDate: '', weightKg: '', medicalNotes: '' }

// Dane z API (null, liczby) → wartości pól formularza (zawsze tekst; input nie przyjmuje null).
function toFormValues(pet) {
  if (!pet) return EMPTY_PET
  return {
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    birthDate: pet.birthDate ?? '',
    weightKg: pet.weightKg === null ? '' : String(pet.weightKg),
    medicalNotes: pet.medicalNotes,
  }
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Podaj imię zwierzęcia.'
  // Polska klawiatura podpowiada przecinek („17,5”) — zamieniamy go na kropkę przed sprawdzeniem.
  const weight = Number(values.weightKg.replace(',', '.'))
  if (values.weightKg && !(weight > 0 && weight < 200)) errors.weightKg = 'Wpisz wagę w kilogramach, np. 17,5.'
  if (values.birthDate && new Date(values.birthDate) > new Date()) {
    errors.birthDate = 'Data urodzenia nie może być z przyszłości.'
  }
  return errors
}

/*
  Jeden formularz do dodawania i edycji (UC2). Strona przekazuje `onSubmit`, który zapisuje dane
  przez API. Błąd z serwera (np. walidacja) pokazujemy nad przyciskiem, błędy pól — pod polami.
*/
export default function PetForm({ pet, onSubmit, submitLabel, cancelTo }) {
  const [values, setValues] = useState(() => toFormValues(pet))
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Jedna funkcja dla wszystkich pól: nazwa pola w atrybucie `name` = klucz w obiekcie `values`.
  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitError(null)
    setIsSubmitting(true)
    try {
      await onSubmit({
        name: values.name.trim(),
        species: values.species,
        breed: values.breed.trim(),
        birthDate: values.birthDate || null,
        weightKg: values.weightKg ? Number(values.weightKg.replace(',', '.')) : null,
        medicalNotes: values.medicalNotes.trim(),
      })
    } catch (error) {
      setSubmitError(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <Card as="form" onSubmit={handleSubmit} noValidate className="space-y-5">
      <Input label="Imię *" name="name" value={values.name} onChange={handleChange} error={errors.name} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="Gatunek" name="species" value={values.species} onChange={handleChange}>
          <option value="dog">Pies</option>
          <option value="cat">Kot</option>
          <option value="other">Inne</option>
        </Select>
        <Input label="Rasa" name="breed" value={values.breed} onChange={handleChange} placeholder="np. Border collie" />
        <Input
          label="Data urodzenia"
          type="date"
          name="birthDate"
          value={values.birthDate}
          onChange={handleChange}
          error={errors.birthDate}
          max={new Date().toISOString().slice(0, 10)}
        />
        <Input
          label="Waga (kg)"
          name="weightKg"
          inputMode="decimal"
          value={values.weightKg}
          onChange={handleChange}
          error={errors.weightKg}
          placeholder="np. 17,5"
        />
      </div>

      <Textarea
        label="Uwagi medyczne"
        name="medicalNotes"
        value={values.medicalNotes}
        onChange={handleChange}
        rows={5}
        placeholder="Choroby, leki, alergie, zachowanie (np. „płochliwy, nie łapać na siłę”)"
        hint="Te informacje zobaczy osoba, która znajdzie zwierzę i zeskanuje zawieszkę."
      />

      {submitError && (
        <Notice tone="alert" title="Nie udało się zapisać">
          {submitError}
        </Notice>
      )}

      <div className="flex flex-wrap justify-end gap-3">
        <Button to={cancelTo} variant="secondary">
          Anuluj
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Zapisuję…' : submitLabel}
        </Button>
      </div>
    </Card>
  )
}
