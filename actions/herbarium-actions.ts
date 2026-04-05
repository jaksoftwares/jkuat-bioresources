'use server'

import { HerbariumRepository } from '@/repositories/herbarium.repository'
import { HerbariumSpecimen } from '@/types'
import { revalidatePath } from 'next/cache'

export async function listHerbarium(filters?: any) {
  try {
    return await HerbariumRepository.list(filters)
  } catch (error) {
    console.error('listHerbarium Error:', error)
    throw new Error('Failed to fetch herbarium collection')
  }
}

export async function getHerbariumById(id: string) {
  try {
    return await HerbariumRepository.getById(id)
  } catch (error) {
    console.error('getHerbariumById Error:', error)
    throw new Error('Failed to fetch specimen details')
  }
}

export async function createHerbariumRecord(data: Partial<HerbariumSpecimen>) {
  try {
    const newSpecimen = await HerbariumRepository.create(data)
    revalidatePath('/herbarium')
    return newSpecimen
  } catch (error) {
    console.error('createHerbariumRecord Error:', error)
    throw new Error('Failed to register herbarium specimen')
  }
}

export async function updateHerbariumRecord(id: string, data: Partial<HerbariumSpecimen>) {
  try {
    const updatedSpecimen = await HerbariumRepository.update(id, data)
    revalidatePath(`/herbarium/${id}`)
    revalidatePath('/herbarium')
    return updatedSpecimen
  } catch (error) {
    console.error('updateHerbariumRecord Error:', error)
    throw new Error('Failed to update herbarium record')
  }
}

export async function deleteHerbariumRecord(id: string) {
  try {
    await HerbariumRepository.delete(id)
    revalidatePath('/herbarium')
    return true
  } catch (error) {
    console.error('deleteHerbariumRecord Error:', error)
    throw new Error('Failed to delete herbarium record')
  }
}
