'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Eye, Edit, Trash2 } from 'lucide-react'

interface PlantRowActionsProps {
  plantId: string
}

export function PlantRowActions({ plantId }: PlantRowActionsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this plant record? This cannot be undone.')) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/plants/${plantId}`, {
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
    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <Link
        href={`/dashboard/plants/${plantId}/edit`}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:text-teal-600"
        aria-label="View plant"
      >
        <Eye className="w-4 h-4" />
      </Link>
      <Link
        href={`/dashboard/plants/${plantId}/edit`}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:text-blue-600"
        aria-label="Edit plant"
      >
        <Edit className="w-4 h-4" />
      </Link>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-slate-400 hover:text-rose-600"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label="Delete plant"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
