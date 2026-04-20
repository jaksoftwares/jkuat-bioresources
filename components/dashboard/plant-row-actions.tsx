'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Eye, Edit, Trash2 } from 'lucide-react'
import { PlantModal } from './plant-modal'
import { PlantDetailModal } from './plant-view-modal'
import { Plant } from '@/types'

interface PlantRowActionsProps {
  plant: Plant
}

export function PlantRowActions({ plant }: PlantRowActionsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this plant record? This cannot be undone.')) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/plants/${plant.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const body = await response.json()
        throw new Error(body?.error || 'Unable to delete plant')
      }

      router.refresh()
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <PlantDetailModal plant={plant} />
      
      <PlantModal 
        mode="edit" 
        plant={plant} 
        trigger={
          <button className="text-xs font-semibold text-jkuat-gray-400 hover:text-jkuat-green transition-colors">
            Edit
          </button>
        }
      />

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-xs font-semibold text-jkuat-gray-400 hover:text-rose-600 transition-colors disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  )
}
