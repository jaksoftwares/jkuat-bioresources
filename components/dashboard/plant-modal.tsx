'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import PlantForm from './plant-form'
import { Plant } from '@/types'

interface PlantModalProps {
  mode: 'add' | 'edit'
  plant?: Plant
  trigger?: React.ReactNode
}

export function PlantModal({ mode, plant, trigger }: PlantModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-jkuat-green hover:bg-jkuat-green-dark text-white font-semibold rounded-xl shadow-lg px-8">
            {mode === 'add' ? 'Add Plant' : 'Edit Plant'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[95vw] md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border-jkuat-gray-100 shadow-2xl custom-scrollbar">
        <DialogHeader className="border-b border-jkuat-gray-100 pb-4 mb-4">
          <DialogTitle className="text-2xl font-extrabold text-jkuat-gray-900 tracking-tight">
             {mode === 'add' ? 'New plant specimen' : 'Edit plant record'}
          </DialogTitle>
        </DialogHeader>

        <PlantForm
          initialValues={plant}
          submitUrl={mode === 'add' ? '/api/plants' : `/api/plants/${plant?.id}`}
          submitMethod={mode === 'add' ? 'POST' : 'PUT'}
          submitLabel={mode === 'add' ? 'Create Record' : 'Update Record'}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
