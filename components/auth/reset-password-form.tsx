'use client'

import React from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Lock, ShieldCheck, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function ResetPasswordForm() {
  const [isPending, setIsPending] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match')
    }

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters')
    }

    setIsPending(true)
    
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Password updated successfully')
        router.push('/login')
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Set New Password</h2>
        <p className="text-slate-500 font-medium">Please enter your new security credentials.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">
              New Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-teal-500/20 transition-all text-slate-900 placeholder:text-slate-300"
                disabled={isPending}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">
              Confirm New Password
            </Label>
            <div className="relative group">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-teal-500/20 transition-all text-slate-900 placeholder:text-slate-300"
                disabled={isPending}
              />
            </div>
            {password && confirmPassword && password !== confirmPassword && (
              <p className="flex items-center gap-1.5 mt-1.5 text-xs font-bold text-rose-500 pl-1">
                 <AlertCircle className="w-3 h-3" />
                 Passwords do not match
              </p>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isPending || !password || password !== confirmPassword}
          className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-bold tracking-tight text-base shadow-lg shadow-teal-600/20 group"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Updating Password...
            </>
          ) : (
            <>
              Update Password
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
