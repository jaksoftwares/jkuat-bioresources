import HerbariumForm from '@/components/dashboard/herbarium-form'

export default function AddHerbariumPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add Herbarium Specimen</h1>
        <p className="mt-2 text-sm text-slate-500">Register a new herbarium specimen with collection location, ecological notes, and preservation details.</p>
      </div>

      <HerbariumForm submitUrl="/api/herbarium" submitMethod="POST" submitLabel="Create Specimen" />
    </div>
  )
}
