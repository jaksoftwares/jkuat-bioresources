'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Eye, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { HerbariumModal } from './herbarium-modal'
import { HerbariumSpecimen } from '@/types'

interface HerbariumRowActionsProps {
  specimen: HerbariumSpecimen
}

export function HerbariumRowActions({ specimen }: HerbariumRowActionsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this specimen record? This cannot be undone.')) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/herbarium/${specimen.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const body = await response.json()
        throw new Error(body?.error || 'Unable to delete specimen')
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
      <Link
        href={`/portal/herbarium/${specimen.id}`}
        target="_blank"
        className="text-xs font-semibold text-jkuat-gray-400 hover:text-jkuat-green transition-colors"
      >
        View
      </Link>
      
      <HerbariumModal 
        mode="edit" 
        specimen={specimen} 
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
