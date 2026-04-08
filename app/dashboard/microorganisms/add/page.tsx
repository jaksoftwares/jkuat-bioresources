import MicroorganismForm from '@/components/dashboard/microorganism-form'

export default function AddMicroorganismPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add Microorganism Strain</h1>
        <p className="mt-2 text-sm text-slate-500">Register a new microbial strain with its identification, growth parameters, and experimental details.</p>
      </div>

      <MicroorganismForm submitUrl="/api/microorganisms" submitMethod="POST" submitLabel="Create Microorganism" />
    </div>
  )
}
