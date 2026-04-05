'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // Check if error is email not confirmed
    if (error.message.toLowerCase().includes('email not confirmed')) {
      return { error: 'email_unconfirmed', message: 'Please confirm your email address to continue.' }
    }
    return { error: error.message }
  }

  // Double check user session
  if (data.user && !data.user.email_confirmed_at) {
     return { error: 'email_unconfirmed' }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const staffNumber = formData.get('staffNumber') as string
  const department = formData.get('department') as string
  const faculty = formData.get('faculty') as string

  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        full_name: fullName,
        staff_number: staffNumber,
        department: department,
        faculty: faculty
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function forgotPassword(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
