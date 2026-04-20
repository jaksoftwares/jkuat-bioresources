import React from 'react'
import { InfrastructureManager } from '@/components/dashboard/infrastructure-manager'
import { protectRoute } from '@/lib/auth/role-guard'

export default async function InfrastructurePage() {
  await protectRoute(['technical_team', 'administrator'])
  
  return (
    <div className="container mx-auto py-8">
      <InfrastructureManager />
    </div>
  )
}
