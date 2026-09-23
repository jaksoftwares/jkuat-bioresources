'use client'

import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Eye, FileText, Microscope } from 'lucide-react'
import { normalizeMicroorganism } from '@/features/microorganisms/normalize'

interface MicroorganismDetailModalProps { micro: any }

function formatValue(value: unknown) {
  if (value === undefined || value === null || value === '') return 'Not recorded'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'Not recorded'
  return String(value)
}

function FieldGroup({ title, value }: { title: string; value: Record<string, unknown> | undefined }) {
  if (!value) return null
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 border-b border-slate-100 pb-3 text-xs font-black uppercase tracking-[0.16em] text-slate-500">{title}</h3>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
        {Object.entries(value).map(([key, item]) => (
          <div key={key} className="min-w-0">
            <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{key.replaceAll('_', ' ')}</dt>
            <dd className="mt-1 break-words text-sm font-medium text-slate-700">{formatValue(item)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function MicroorganismDetailModal({ micro }: MicroorganismDetailModalProps) {
  const canonical = normalizeMicroorganism(micro)
  const tax = canonical.taxonomic_information
  const title = `${tax.genus || 'Unknown'} ${tax.species || ''}`.trim()
  const rawStorage = micro.lab_test_tubes
  const storage = Array.isArray(rawStorage) ? rawStorage[0] : rawStorage
  const getRelated = (value: any) => Array.isArray(value) ? value[0] : value
  const partition = getRelated(storage?.lab_partitions)
  const tray = getRelated(partition?.lab_trays)
  const shelf = getRelated(tray?.lab_shelves)
  const fridge = getRelated(shelf?.lab_fridges)
  const storageFields = storage ? {
    fridge_code: fridge?.code,
    shelf_code: shelf?.code,
    tray_code: tray?.code,
    partition_code: partition?.code,
    tube_label: storage.tube_label,
  } : undefined
  const biochemical = canonical.biochemical_information?.results

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50">
          <Eye className="h-3.5 w-3.5 text-jkuat-green" /> Full Details
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-6xl overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-0 shadow-2xl">
        <header className="bg-slate-900 px-6 py-8 text-white md:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-jkuat-green text-white">{tax.strain_number}</Badge>
            <Badge variant="outline" className="border-white/30 text-white">{tax.type_of_organism}</Badge>
            <Badge variant="outline" className="border-white/30 text-white">Risk group {canonical.pathogenicity_information.biohazard_group}</Badge>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold italic">{title}</h2>
          <p className="mt-2 text-sm text-white/60">Record ID: {canonical.id || 'Not recorded'} · Updated: {canonical.updated_at || 'Not recorded'}</p>
        </header>

        <div className="space-y-5 p-5 md:p-8">
          <FieldGroup title="Taxonomy and designation" value={canonical.taxonomic_information as unknown as Record<string, unknown>} />
          <FieldGroup title="Origin and isolation" value={canonical.details_of_isolation as unknown as Record<string, unknown>} />
          <FieldGroup title="Pathogenicity and biosafety" value={canonical.pathogenicity_information as unknown as Record<string, unknown>} />
          <FieldGroup title="Availability" value={canonical.availability_information as unknown as Record<string, unknown>} />
          <FieldGroup title="CBD and Nagoya Protocol" value={canonical.cbd_information as unknown as Record<string, unknown>} />
          <FieldGroup title="Growth and cultivation" value={canonical.growth_related_information as unknown as Record<string, unknown>} />
          <FieldGroup title="Preservation" value={canonical.preservation_information as unknown as Record<string, unknown>} />
          <FieldGroup title="Identification" value={canonical.identification_information as unknown as Record<string, unknown>} />
          <FieldGroup title="Depositor" value={canonical.depositor_information as unknown as Record<string, unknown>} />
          <FieldGroup title="Morphological identification" value={canonical.morphological_identification as unknown as Record<string, unknown>} />
          <FieldGroup title="Molecular identification" value={canonical.molecular_identification as unknown as Record<string, unknown>} />
          <FieldGroup title="Special features and references" value={canonical.special_feature_information as unknown as Record<string, unknown>} />
          <FieldGroup title="Biochemical information" value={biochemical as unknown as Record<string, unknown>} />
          <FieldGroup title="Payment information" value={canonical.payment_information as unknown as Record<string, unknown>} />
          <FieldGroup title="Administrative metadata" value={canonical.administrative_information as unknown as Record<string, unknown>} />
          <FieldGroup title="Physical storage" value={storageFields} />

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 border-b border-slate-100 pb-3 text-xs font-black uppercase tracking-[0.16em] text-slate-500">Media archive</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><Microscope className="h-4 w-4" /> Images ({canonical.media.images.length})</p>
                {canonical.media.images.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{canonical.media.images.map((image: any, index) => <a key={`${image.public_id || image.url}-${index}`} href={image.url} target="_blank" rel="noreferrer" className="aspect-square overflow-hidden rounded-lg border border-slate-200"><img src={image.url} alt={image.caption || `Strain image ${index + 1}`} className="h-full w-full object-cover" /></a>)}</div> : <p className="text-sm text-slate-500">No images recorded.</p>}
              </div>
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><FileText className="h-4 w-4" /> Documents ({canonical.media.documents.length})</p>
                {canonical.media.documents.length ? <div className="space-y-2">{canonical.media.documents.map((document: any, index) => <a key={`${document.public_id || document.url}-${index}`} href={document.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 hover:border-jkuat-green"><FileText className="h-4 w-4" />{document.name || document.caption || `Document ${index + 1}`}</a>)}</div> : <p className="text-sm text-slate-500">No documents recorded.</p>}
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}