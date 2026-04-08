'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Eye, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface HerbariumRowActionsProps {
  specimenId: string
}

export function HerbariumRowActions({ specimenId }: HerbariumRowActionsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this herbarium specimen record? This cannot be undone.')) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/herbarium/${specimenId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const body = await response.json()
        throw new Error(body?.error || 'Unable to delete herbarium specimen')
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
        href={`/dashboard/herbarium/${specimenId}/edit`}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:text-amber-600"
        aria-label="View specimen"
      >
        <Eye className="w-4 h-4" />
      </Link>
      <Link
        href={`/dashboard/herbarium/${specimenId}/edit`}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:text-blue-600"
        aria-label="Edit specimen"
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
        aria-label="Delete specimen"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
