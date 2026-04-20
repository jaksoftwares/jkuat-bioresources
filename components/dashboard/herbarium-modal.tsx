'use client'

import React, { useState } from 'react'
import { Plus, BookOpen } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import HerbariumForm from './herbarium-form'
import { HerbariumSpecimen } from '@/types'

interface HerbariumModalProps {
  mode: 'add' | 'edit'
  specimen?: HerbariumSpecimen
  trigger?: React.ReactNode
}

export function HerbariumModal({ mode, specimen, trigger }: HerbariumModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-jkuat-green hover:bg-jkuat-green-dark text-white font-semibold rounded-xl shadow-lg px-8">
            {mode === 'add' ? 'Add Specimen' : 'Edit Specimen'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[95vw] md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border-jkuat-gray-100 shadow-2xl custom-scrollbar">
        <DialogHeader className="border-b border-jkuat-gray-100 pb-4 mb-4">
          <DialogTitle className="text-2xl font-extrabold text-jkuat-gray-900 tracking-tight">
             {mode === 'add' ? 'New herbarium specimen' : 'Edit specimen record'}
          </DialogTitle>
        </DialogHeader>

        <HerbariumForm
          initialValues={specimen}
          submitUrl={mode === 'add' ? '/api/herbarium' : `/api/herbarium/${specimen?.id}`}
          submitMethod={mode === 'add' ? 'POST' : 'PUT'}
          submitLabel={mode === 'add' ? 'Create Record' : 'Update Record'}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
