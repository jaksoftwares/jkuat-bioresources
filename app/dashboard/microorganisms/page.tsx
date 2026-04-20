export const dynamic = 'force-dynamic'

import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { MicroorganismRepository } from '@/repositories/microorganism.repository'
import { UserRole } from '@/types'
import { MicroorganismsTable } from '@/components/dashboard/microorganisms-table'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function MicroorganismsPage({ searchParams }: PageProps) {
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

  let microorganisms = []
  if (!isAdminOrTech) {
    microorganisms = await MicroorganismRepository.listByUserId(userId)
    if (searchTerm) {
       microorganisms = microorganisms.filter(m => 
          m.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          m.strain_code?.toLowerCase().includes(searchTerm.toLowerCase())
       )
    }
  } else {
    microorganisms = await MicroorganismRepository.list(filters)
  }

  return <MicroorganismsTable initialMicros={microorganisms} role={role} />
}
