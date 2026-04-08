import { notFound } from 'next/navigation'
import { MicroorganismRepository } from '@/repositories/microorganism.repository'
import MicroorganismForm from '@/components/dashboard/microorganism-form'
import type { Microorganism } from '@/types'

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditMicroorganismPage({ params }: PageProps) {
  const microorganism = await MicroorganismRepository.getById(params.id)
  if (!microorganism) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Microorganism Strain</h1>
        <p className="mt-2 text-sm text-slate-500">Update the microorganism record details and save changes back to the database.</p>
      </div>
      <MicroorganismForm
        initialValues={microorganism as Microorganism}
        submitUrl={`/api/microorganisms/${params.id}`}
        submitMethod="PUT"
        submitLabel="Update Microorganism"
      />
    </div>
  )
}
