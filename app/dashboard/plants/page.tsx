export const dynamic = 'force-dynamic'

import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { PlantRepository } from '@/repositories/plant.repository'
import { UserRole } from '@/types'
import { PlantsTable } from '@/components/dashboard/plants-table'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PlantsManagementPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const searchTerm = typeof resolvedParams.search === 'string' ? resolvedParams.search : undefined
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id || 'dev-user-id'

  // Fetch role
  let role: UserRole = 'researcher'
  if (user) {
    const { data: roleProfile } = await supabase
      .from('user_roles')
      .select('roles(name)')
      .eq('user_id', user.id)
      .single()
    role = (roleProfile?.roles as any)?.name || 'public_user'
  }
  
  const isAdminOrTech = role === 'administrator' || role === 'technical_team'
  
  // Fetch data with filters
  const filters = {
    search: searchTerm
  }

  let plants = []
  if (!isAdminOrTech) {
    // Researcher view: only their own items, filtered by search if present
    // Note: Our repository listByUserId doesn't support filters yet in the Repo method 
    // but we can list all and filter or update the repository.
    // Better: Update repository to support filters in listByUserId.
    plants = await PlantRepository.listByUserId(userId)
    if (searchTerm) {
       plants = plants.filter(p => 
          p.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.common_name?.toLowerCase().includes(searchTerm.toLowerCase())
       )
    }
  } else {
    plants = await PlantRepository.list(filters)
  }

  return <PlantsTable initialPlants={plants} role={role} />
}
