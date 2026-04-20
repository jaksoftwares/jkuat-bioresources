export const dynamic = 'force-dynamic'

import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { HerbariumRepository } from '@/repositories/herbarium.repository'
import { UserRole } from '@/types'
import { HerbariumTable } from '@/components/dashboard/herbarium-table'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HerbariumPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const searchTerm = typeof resolvedParams.search === 'string' ? resolvedParams.search : undefined
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id || 'dev-user-id'

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
  const filters = { search: searchTerm }

  let specimens = []
  if (!isAdminOrTech) {
    specimens = await HerbariumRepository.listByUserId(userId)
    if (searchTerm) {
      specimens = specimens.filter(s => 
        s.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.herbarium_code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  } else {
    specimens = await HerbariumRepository.list(filters)
  }

  return <HerbariumTable initialSpecimens={specimens} role={role} />
}
