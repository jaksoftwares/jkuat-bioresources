'use server'

import { MicroorganismRepository } from '@/repositories/microorganism.repository'
import { Microorganism } from '@/types'
import { revalidatePath } from 'next/cache'

export async function listMicroorganisms(filters?: any) {
  try {
    return await MicroorganismRepository.list(filters)
  } catch (error) {
    console.error('listMicroorganisms Error:', error)
    throw new Error('Failed to fetch microorganisms')
  }
}

export async function getMicroorganismById(id: string) {
  try {
    return await MicroorganismRepository.getById(id)
  } catch (error) {
    console.error('getMicroorganismById Error:', error)
    throw new Error('Failed to fetch microorganism details')
  }
}

export async function createMicroorganism(data: Partial<Microorganism>) {
  try {
    const newMicro = await MicroorganismRepository.create(data)
    revalidatePath('/microorganisms')
    return newMicro
  } catch (error) {
    console.error('createMicroorganism Error:', error)
    throw new Error('Failed to register microorganism')
  }
}

export async function updateMicroorganism(id: string, data: Partial<Microorganism>) {
  try {
    const updatedMicro = await MicroorganismRepository.update(id, data)
    revalidatePath(`/microorganisms/${id}`)
    revalidatePath('/microorganisms')
    return updatedMicro
  } catch (error) {
    console.error('updateMicroorganism Error:', error)
    throw new Error('Failed to update microorganism record')
  }
}

export async function deleteMicroorganism(id: string) {
  try {
    await MicroorganismRepository.delete(id)
    revalidatePath('/microorganisms')
    return true
  } catch (error) {
    console.error('deleteMicroorganism Error:', error)
    throw new Error('Failed to delete microorganism record')
  }
}

export async function assignLabStorage(microorganism_id: string, partition_id: string, tube_label: string) {
  try {
    const result = await MicroorganismRepository.assignStorage({
      microorganism_id,
      partition_id,
      tube_label
    })
    revalidatePath('/inventory/storage')
    revalidatePath(`/microorganisms/${microorganism_id}`)
    return result
  } catch (error) {
    console.error('assignLabStorage Error:', error)
    throw new Error('Failed to assign storage location')
  }
}

export async function getLabStorageMap() {
  try {
    return await MicroorganismRepository.getStorageView()
  } catch (error) {
    console.error('getLabStorageMap Error:', error)
    throw new Error('Failed to fetch lab storage distribution')
  }
}
