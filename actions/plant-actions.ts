'use server'

import { PlantRepository } from '@/repositories/plant.repository'
import { Plant } from '@/types'
import { revalidatePath } from 'next/cache'

export async function listPlants(filters?: any) {
  try {
    return await PlantRepository.list(filters)
  } catch (error) {
    console.error('listPlants Error:', error)
    throw new Error('Failed to fetch plants')
  }
}

export async function getPlantById(id: string) {
  try {
    return await PlantRepository.getById(id)
  } catch (error) {
    console.error('getPlantById Error:', error)
    throw new Error('Failed to fetch plant details')
  }
}

export async function createPlant(data: Partial<Plant>) {
  try {
    const newPlant = await PlantRepository.create(data)
    revalidatePath('/plants')
    return newPlant
  } catch (error) {
    console.error('createPlant Error:', error)
    throw new Error('Failed to create plant record')
  }
}

export async function updatePlant(id: string, data: Partial<Plant>) {
  try {
    const updatedPlant = await PlantRepository.update(id, data)
    revalidatePath(`/plants/${id}`)
    revalidatePath('/plants')
    return updatedPlant
  } catch (error) {
    console.error('updatePlant Error:', error)
    throw new Error('Failed to update plant record')
  }
}

export async function addLocalName(plant_id: string, language_code: string, local_name: string) {
  try {
    const result = await PlantRepository.addLocalName(plant_id, language_code, local_name)
    revalidatePath(`/plants/${plant_id}`)
    return result
  } catch (error) {
    console.error('addLocalName Error:', error)
    throw new Error('Failed to add local name')
  }
}
