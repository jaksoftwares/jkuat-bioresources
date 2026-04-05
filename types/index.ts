export type UserRole = 'technical_team' | 'administrator' | 'researcher' | 'public_user';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  staff_number?: string;
  department?: string;
  faculty?: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ResearcherProfile {
  id: string;
  user_id: string;
  qualification?: string;
  specialization?: string;
  research_focus?: string;
  institution: string;
  created_at: string;
}

export interface Plant {
  id: string;
  scientific_name: string;
  common_name?: string;
  family_name?: string;
  genus?: string;
  species?: string;
  is_aiv: boolean;
  category?: string;
  description?: string;
  nutritional_value?: string;
  medicinal_value?: string;
  cultural_significance?: string;
  growth_conditions: Record<string, any>;
  geographic_distribution: string[];
  images: CloudinaryMedia[];
  documents: CloudinaryMedia[];
  created_by?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

export interface HerbariumSpecimen {
  id: string;
  herbarium_code: string;
  scientific_name: string;
  common_name?: string;
  collector_id?: string;
  collection_date?: string;
  habitat_description?: string;
  ecological_notes?: string;
  medicinal_notes?: string;
  physical_storage_location?: string;
  specimen_images: CloudinaryMedia[];
  supporting_documents: CloudinaryMedia[];
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Microorganism {
  id: string;
  scientific_name: string;
  strain_code?: string;
  source_isolated_from?: string;
  optimum_temperature?: number;
  min_ph?: number;
  max_ph?: number;
  growth_medium?: string;
  characteristics?: string;
  enzymatic_activity?: string;
  researcher_id?: string;
  experiment_details?: string;
  date_stored?: string;
  microscopy_images: CloudinaryMedia[];
  supporting_docs: CloudinaryMedia[];
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CloudinaryMedia {
  url: string;
  public_id: string;
  format: string;
  resource_type: string;
  secure_url: string;
}

export interface LabStorageView {
  id: string;
  scientific_name: string;
  strain_code: string;
  fridge_code?: string;
  shelf_code?: string;
  tray_code?: string;
  partition_code?: string;
  tube_label?: string;
}
