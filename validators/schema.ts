import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  staff_number: z.string().optional(),
  department: z.string().optional(),
  faculty: z.string().optional()
})

export const plantSchema = z.object({
  scientific_name: z.string().min(2, 'Scientific name is required'),
  common_name: z.string().optional(),
  family_name: z.string().optional(),
  genus: z.string().optional(),
  species: z.string().optional(),
  is_aiv: z.boolean().default(false),
  category: z.string().optional(),
  description: z.string().optional(),
  nutritional_value: z.string().optional(),
  medicinal_value: z.string().optional(),
  cultural_significance: z.string().optional(),
  growth_conditions: z.record(z.any()).default({}),
  geographic_distribution: z.array(z.string()).default([]),
  images: z.array(z.any()).default([]),
  documents: z.array(z.any()).default([])
})

export const microSchema = z.object({
  scientific_name: z.string().min(2, 'Scientific name is required'),
  strain_code: z.string().optional(),
  source_isolated_from: z.string().optional(),
  optimum_temperature: z.number().optional(),
  min_ph: z.number().optional(),
  max_ph: z.number().optional(),
  growth_medium: z.string().optional(),
  characteristics: z.string().optional(),
  enzymatic_activity: z.string().optional(),
  experiment_details: z.string().optional(),
  date_stored: z.string().optional(),
  microscopy_images: z.array(z.any()).default([]),
  supporting_docs: z.array(z.any()).default([])
})

export const herbariumSchema = z.object({
  herbarium_code: z.string().min(2, 'Herbarium code is required'),
  scientific_name: z.string().min(2, 'Scientific name is required'),
  common_name: z.string().optional(),
  collection_date: z.string().optional(),
  habitat_description: z.string().optional(),
  ecological_notes: z.string().optional(),
  medicinal_notes: z.string().optional(),
  physical_storage_location: z.string().optional(),
  specimen_images: z.array(z.any()).default([]),
  supporting_documents: z.array(z.any()).default([])
})
