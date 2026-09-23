'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadToCloudinary } from '@/actions/media-actions'
import ImageManager from '@/components/dashboard/image-manager'
import { normalizeMicroorganism } from '@/features/microorganisms/normalize'
import type { CloudinaryMedia } from '@/types'
import { toast } from 'sonner'

type FormState = Record<string, any>
type Field = [string, string, 'text' | 'number' | 'date' | 'boolean' | 'textarea' | 'select']

const sections: Array<[string, string]> = [
  ['taxonomic_information', 'Taxonomy and designation'], ['details_of_isolation', 'Origin and isolation'],
  ['pathogenicity_information', 'Pathogenicity and biosafety'], ['availability_information', 'Availability'],
  ['cbd_information', 'CBD and Nagoya Protocol'], ['growth_related_information', 'Growth and cultivation'],
  ['preservation_information', 'Preservation'], ['identification_information', 'Identification'],
  ['depositor_information', 'Depositor'], ['morphological_identification', 'Morphological identification'],
  ['molecular_identification', 'Molecular identification'], ['biochemical_information', 'Biochemical information'],
  ['special_feature_information', 'Special features and references'], ['payment_information', 'Payment information'],
  ['administrative_information', 'Administrative metadata'],
]

const fields: Record<string, Field[]> = {
  taxonomic_information: [['type_of_organism', 'Organism type', 'select'], ['genus', 'Genus', 'text'], ['species', 'Species', 'text'], ['strain_number', 'Strain number', 'text'], ['ncbi_16s_accession_number', 'NCBI 16S accession', 'text'], ['is_type_strain', 'Type strain', 'boolean']],
  details_of_isolation: [['source_of_isolation', 'Source of isolation', 'text'], ['isolated_by', 'Isolated by', 'text'], ['isolation_date', 'Isolation date', 'date'], ['village', 'Village', 'text'], ['town', 'Town', 'text'], ['county', 'County', 'text'], ['pin_code', 'PIN code', 'text'], ['country', 'Country', 'text'], ['gps_coordinates', 'GPS coordinates', 'text']],
  pathogenicity_information: [['is_pathogenic', 'Is pathogenic', 'boolean'], ['pathogenic_to_human', 'Pathogenic to humans', 'boolean'], ['pathogenic_to_plant', 'Pathogenic to plants', 'boolean'], ['pathogenic_to_animal', 'Pathogenic to animals', 'boolean'], ['biohazard_group', 'Biohazard group', 'select']],
  availability_information: [['is_available', 'Available', 'boolean'], ['form_of_supply', 'Forms of supply (comma separated)', 'text'], ['received_from_other_pi', 'Received from another PI', 'boolean'], ['pi_organization_name', 'PI organization', 'text'], ['other_culture_collection_numbers', 'Other culture collection numbers', 'text']],
  cbd_information: [['pic_taken', 'PIC taken', 'boolean'], ['pic_issuing_authority', 'PIC issuing authority', 'text']],
  growth_related_information: [['isolation_medium_name', 'Isolation medium', 'text'], ['growth_medium_name', 'Growth medium', 'text'], ['medium_composition', 'Medium composition', 'textarea'], ['ph_range', 'pH range', 'text'], ['optimum_ph', 'Optimum pH', 'number'], ['temperature_range_celsius', 'Temperature range (C)', 'text'], ['optimum_temperature_celsius', 'Optimum temperature (C)', 'number'], ['salt_range_percentage', 'Salt range (%)', 'text'], ['optimum_salt_concentration', 'Optimum salt concentration', 'text'], ['oxygen_requirement', 'Oxygen requirement', 'select'], ['special_growth_requirements', 'Special growth requirements', 'textarea'], ['incubation_time_days', 'Incubation time (days)', 'number'], ['subculturing_period_days', 'Subculturing period (days)', 'number']],
  preservation_information: [['preservation_in_ln2', 'Preservation in liquid nitrogen', 'boolean'], ['lyophilization', 'Lyophilized', 'boolean'], ['active_form', 'Active form', 'boolean'], ['mineral_oil', 'Mineral oil', 'boolean'], ['at_4_celsius', 'Stored at 4 C', 'boolean'], ['other_preservation_methods', 'Other preservation methods', 'textarea']],
  identification_information: [['identified_by', 'Identified by', 'text'], ['identification_date', 'Identification date', 'date'], ['gene_accession_number', 'Gene accession number', 'text'], ['sequence_text', 'Sequence text', 'textarea'], ['maldi_system_similarity_index', 'MALDI similarity index', 'number'], ['biolog_system_similarity_index', 'Biolog similarity index', 'number'], ['fame_analysis_similarity_index', 'FAME similarity index', 'number'], ['api_system', 'API system', 'text']],
  depositor_information: [['depositor_name', 'Depositor name', 'text'], ['address', 'Address', 'textarea'], ['email', 'Email', 'text'], ['phone_number', 'Phone number', 'text'], ['dispatch_date', 'Dispatch date', 'date']],
  morphological_identification: [['size', 'Size', 'text'], ['shape', 'Shape', 'text'], ['color', 'Color', 'text'], ['margin', 'Margin', 'text'], ['elevation', 'Elevation', 'text'], ['consistency', 'Consistency', 'text'], ['opacity', 'Opacity', 'text'], ['gram_nature', 'Gram nature', 'select'], ['cell_morphology', 'Cell morphology', 'text'], ['capsule', 'Capsule', 'boolean'], ['spore', 'Spore', 'boolean'], ['flagella', 'Flagella', 'boolean'], ['motility', 'Motility', 'boolean']],
  molecular_identification: [['gene_used_for_identification', 'Gene used for identification', 'text'], ['cultured', 'Cultured result', 'text'], ['cultured_similarity_percentage', 'Cultured similarity (%)', 'number'], ['uncultured', 'Uncultured result', 'text'], ['uncultured_similarity_percentage', 'Uncultured similarity (%)', 'number'], ['type_strain', 'Type strain result', 'text'], ['type_strain_similarity_percentage', 'Type strain similarity (%)', 'number'], ['gc_content_percentage', 'GC content (%)', 'number'], ['tm_celsius', 'Tm (C)', 'number']],
  biochemical_information: [['results', 'Results (one key:value per line)', 'textarea']],
  special_feature_information: [['important_properties_applications', 'Important properties and applications', 'textarea'], ['patent_info', 'Patent information', 'textarea'], ['references', 'References', 'textarea'], ['legacy_experiment_details', 'Experiment details', 'textarea']],
  payment_information: [['date_of_payment', 'Date of payment', 'date'], ['mode_of_payment', 'Mode of payment', 'text'], ['payment_id', 'Payment ID', 'text']],
  administrative_information: [['signature', 'Signature', 'text'], ['record_date', 'Record date', 'date'], ['mcm_field_1', 'MCM field 1', 'text'], ['mcm_field_2', 'MCM field 2', 'text']],
}

const options: Record<string, string[]> = { type_of_organism: ['Bacteria', 'Fungi', 'Yeast', 'Algae', 'Virus', 'Other'], biohazard_group: ['1', '2', '3', '4'], oxygen_requirement: ['Aerobic', 'Anaerobic', 'Microaerophilic', 'Facultative Anaerobe', 'Unknown'], gram_nature: ['Positive', 'Negative', 'Variable', 'Unknown'] }

function displayValue(state: FormState, section: string, field: string, type: Field[2]) {
  const value = state[section]?.[field]
  if (field === 'form_of_supply') return Array.isArray(value) ? value.join(', ') : value || ''
  if (field === 'results' && value && typeof value === 'object') return Object.entries(value).map(([key, item]) => `${key}:${item}`).join('\n')
  return value ?? (type === 'boolean' ? false : '')
}

export default function MicroorganismForm({ initialValues, submitUrl, submitMethod, submitLabel, onSuccess }: any) {
  const router = useRouter()
  const normalized = normalizeMicroorganism(initialValues || {}) as FormState
  const [state, setState] = useState<FormState>(normalized)
  const [storage, setStorage] = useState({ fridge_code: '', shelf_code: '', tray_code: '', partition_code: '', tube_label: '' })
  const [images, setImages] = useState<CloudinaryMedia[]>((normalized.media?.images || []) as CloudinaryMedia[])
  const [documents, setDocuments] = useState<CloudinaryMedia[]>((normalized.media?.documents || []) as CloudinaryMedia[])
  const [pendingDocs, setPendingDocs] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const raw = initialValues?.lab_test_tubes; const tube = Array.isArray(raw) ? raw[0] : raw
    const part = tube?.lab_partitions?.[0] || tube?.lab_partitions; const tray = part?.lab_trays?.[0] || part?.lab_trays; const shelf = tray?.lab_shelves?.[0] || tray?.lab_shelves; const fridge = shelf?.lab_fridges?.[0] || shelf?.lab_fridges
    if (tube) setStorage({ fridge_code: fridge?.code || '', shelf_code: shelf?.code || '', tray_code: tray?.code || '', partition_code: part?.code || '', tube_label: tube.tube_label || '' })
  }, [initialValues])

  const update = (section: string, field: string, value: any) => setState((current) => ({ ...current, [section]: { ...current[section], [field]: value } }))
  const uploadDocuments = async () => { const uploaded: CloudinaryMedia[] = []; for (const file of pendingDocs) { const base64 = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result as string); reader.onerror = reject; reader.readAsDataURL(file) }); uploaded.push(await uploadToCloudinary(base64, 'microorganisms/docs')) }; setDocuments((current) => [...current, ...uploaded]); setPendingDocs([]); return uploaded }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setIsSubmitting(true); setErrorMessage('')
    try {
      const newlyUploadedDocuments = pendingDocs.length ? await uploadDocuments() : []
      const resultText = String(state.biochemical_information?.results || '')
      const form = { ...state, availability_information: { ...state.availability_information, form_of_supply: String(state.availability_information?.form_of_supply || '').split(',').map((item: string) => item.trim()).filter(Boolean) }, biochemical_information: { results: Object.fromEntries(resultText.split('\n').map((line: string) => line.split(':')).filter((parts: string[]) => parts[0])) }, media: { images, documents: [...documents, ...newlyUploadedDocuments] }, storage_labels: storage }
      const response = await fetch(submitUrl, { method: submitMethod, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error((await response.json()).error || 'Failed to save microorganism')
      toast.success('Microorganism saved'); onSuccess ? onSuccess() : router.push('/dashboard/microorganisms'); router.refresh()
    } catch (error) { setErrorMessage(error instanceof Error ? error.message : 'Could not save microorganism') } finally { setIsSubmitting(false) }
  }

  return <form onSubmit={handleSubmit} className="space-y-6">
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-lg font-bold">Microbial strain record</h2><p className="mt-1 text-sm text-slate-500">Complete the information available. Optional fields can remain empty.</p></div>
    {sections.map(([section, title], index) => <details key={section} open={index < 2} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><summary className="cursor-pointer text-base font-bold text-slate-800">{title}</summary><div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">{(fields[section] || []).map(([field, label, type]) => <div key={field} className={type === 'textarea' ? 'space-y-1.5 md:col-span-2' : 'space-y-1.5'}>{type === 'boolean' ? <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm font-medium"><input type="checkbox" checked={Boolean(displayValue(state, section, field, type))} onChange={(event) => update(section, field, event.target.checked)} />{label}</label> : <><Label>{label}</Label>{type === 'textarea' ? <textarea value={displayValue(state, section, field, type)} onChange={(event) => update(section, field, event.target.value)} className="min-h-24 w-full rounded-lg border border-slate-200 p-3 text-sm" /> : type === 'select' ? <select value={displayValue(state, section, field, type)} onChange={(event) => update(section, field, event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"><option value="">Select...</option>{(options[field] || []).map((option) => <option key={option}>{option}</option>)}</select> : <Input type={type} value={displayValue(state, section, field, type)} onChange={(event) => update(section, field, type === 'number' ? (event.target.value ? Number(event.target.value) : undefined) : event.target.value)} />}</>}</div>)}</div></details>)}
    <details className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><summary className="cursor-pointer text-base font-bold">Storage and media</summary><div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">{Object.entries(storage).map(([key, value]) => <div key={key}><Label>{key.replaceAll('_', ' ')}</Label><Input value={value} onChange={(event) => setStorage((current) => ({ ...current, [key]: event.target.value }))} /></div>)}</div><div className="mt-6"><ImageManager images={images} onChange={setImages} folder="microorganisms/images" label="Images" /></div><div className="mt-6 space-y-3"><Label>Supporting documents</Label><Input type="file" multiple accept=".pdf,.doc,.docx" onChange={(event) => setPendingDocs(Array.from(event.target.files || []))} /><Button type="button" variant="outline" onClick={uploadDocuments} disabled={!pendingDocs.length}>Upload documents</Button><div className="text-sm text-slate-500">{documents.length} document(s) stored</div></div></details>
    {errorMessage && <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{errorMessage}</div>}<div className="flex justify-end"><Button disabled={isSubmitting} className="h-11 px-8">{isSubmitting ? 'Saving...' : submitLabel}</Button></div>
  </form>
}