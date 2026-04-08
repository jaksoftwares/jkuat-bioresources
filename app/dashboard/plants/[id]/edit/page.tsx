import { notFound } from 'next/navigation'
import { PlantRepository } from '@/repositories/plant.repository'
import PlantForm from '@/components/dashboard/plant-form'
import type { Plant } from '@/types'

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditPlantPage({ params }: PageProps) {
  const plant = await PlantRepository.getById(params.id)
  if (!plant) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Plant Resource</h1>
        <p className="mt-2 text-sm text-slate-500">Update the plant record details and save changes back to the database.</p>
      </div>
      <PlantForm
        initialValues={plant as Plant}
        submitUrl={`/api/plants/${params.id}`}
        submitMethod="PUT"
        submitLabel="Update Plant"
      />
    </div>
  )
}
