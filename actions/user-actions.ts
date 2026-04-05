'use server'

import { UserRepository } from '@/repositories/user.repository'
import { UserProfile, UserRole } from '@/types'
import { revalidatePath } from 'next/cache'

export async function getMyProfile(userId: string) {
  try {
    return await UserRepository.getProfile(userId)
  } catch (error) {
    console.error('getMyProfile Error:', error)
    throw new Error('Failed to fetch user profile')
  }
}

export async function updateMyProfile(userId: string, data: Partial<UserProfile>) {
  try {
    const updatedProfile = await UserRepository.updateProfile(userId, data)
    revalidatePath('/profile')
    return updatedProfile
  } catch (error) {
    console.error('updateMyProfile Error:', error)
    throw new Error('Failed to update user profile')
  }
}

export async function assignUserRole(userId: string, roleName: UserRole) {
  try {
    // Only administrators or technical team should realistically trigger this
    // We rely on repository logic + Supabase RLS but extra safety can be added
    const result = await UserRepository.assignRole(userId, roleName)
    revalidatePath('/admin/users')
    return result
  } catch (error) {
    console.error('assignUserRole Error:', error)
    throw new Error('Failed to assign user role')
  }
}

export async function checkUserAccess(userId: string, roleName: UserRole) {
  try {
    return await UserRepository.checkRole(userId, roleName)
  } catch (error) {
    console.error('checkUserAccess Error:', error)
    return false
  }
}
