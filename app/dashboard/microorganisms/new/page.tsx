import MicroorganismForm from '@/components/dashboard/microorganism-form'

export default function NewMicroorganismPage() {
  return (
    <div className="mx-auto max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Microorganism</h1>
        <p className="mt-2 text-muted-foreground">Create a complete canonical microbial strain record.</p>
      </div>
      <MicroorganismForm submitUrl="/api/microorganisms" submitMethod="POST" submitLabel="Save Record" />
    </div>
  )
}