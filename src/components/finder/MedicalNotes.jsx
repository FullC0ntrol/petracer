import { HeartPulse } from 'lucide-react'

// Uwagi medyczne widoczne dla znalazcy (np. alergia, leki, „nie łapać na siłę”).
export default function MedicalNotes({ notes }) {
  if (!notes) return null

  return (
    <section aria-labelledby="medical-heading" className="rounded-2xl bg-surface p-4 shadow-card">
      <h2 id="medical-heading" className="mb-2 flex items-center gap-2 font-semibold">
        <HeartPulse size={18} aria-hidden="true" className="text-alert" />
        Ważne informacje o zdrowiu
      </h2>
      <p className="whitespace-pre-line">{notes}</p>
    </section>
  )
}
