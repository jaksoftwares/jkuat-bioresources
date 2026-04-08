import { notFound } from 'next/navigation'
import { HerbariumRepository } from '@/repositories/herbarium.repository'
import HerbariumForm from '@/components/dashboard/herbarium-form'
import type { HerbariumSpecimen } from '@/types'

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditHerbariumPage({ params }: PageProps) {
  const specimen = await HerbariumRepository.getById(params.id)
  if (!specimen) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Herbarium Specimen</h1>
        <p className="mt-2 text-sm text-slate-500">Update the specimen record details and save changes back to the database.</p>
      </div>
      <HerbariumForm
        initialValues={specimen as HerbariumSpecimen}
        submitUrl={`/api/herbarium/${params.id}`}
        submitMethod="PUT"
        submitLabel="Update Specimen"
      />
    </div>
  )
}
