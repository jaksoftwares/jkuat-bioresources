import PlantForm from '@/components/dashboard/plant-form'

export default function AddPlantPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add Plant Resource</h1>
        <p className="mt-2 text-sm text-slate-500">Register a new plant entry with its scientific, cultural and conservation details.</p>
      </div>

      <PlantForm submitUrl="/api/plants" submitMethod="POST" submitLabel="Create Plant" />
    </div>
  )
}
