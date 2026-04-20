'use client'

import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginSchema } from '@/validators/schema'
import { login } from '@/actions/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/auth.store'

type FormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isPending, setIsPending] = React.useState(false)
  const [isUnconfirmed, setIsUnconfirmed] = React.useState(false)
  const { setAuth } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: FormData) {
    setIsPending(true)
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    try {
      const result = await login(formData) as any
      if (result?.error === 'email_unconfirmed') {
        setIsUnconfirmed(true)
      } else if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Successfully logged in')
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsPending(false)
    }
  }

  if (isUnconfirmed) {
    return (
      <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
          <Mail className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Verify Your Email</h2>
          <p className="mt-4 text-slate-500 font-medium text-lg leading-relaxed max-w-[340px] mx-auto">
            It looks like your email hasn't been confirmed yet. Please check your JKUAT institutional inbox for the verification link.
          </p>
        </div>
        <div className="pt-8 flex flex-col gap-4">
           <Button 
             variant="outline" 
             onClick={() => setIsUnconfirmed(false)}
             className="border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
           >
             Back to Login
           </Button>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
             Didn't receive the email? Check your spam folder or contact support.
           </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Sign In</h2>
        <p className="mt-2 text-slate-500 font-medium">Welcome back to the Bioresources Repository.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">
              University Email
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="email@jkuat.ac.ke"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-teal-500/20 transition-all text-slate-900 placeholder:text-slate-300"
                {...register('email')}
                disabled={isPending}
              />
            </div>
            {errors.email && (
              <p className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-rose-500 pl-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <Label htmlFor="password" className="text-xs font-black uppercase text-slate-400 tracking-widest">
                Password
              </Label>
              <Link 
                href="/forgot-password" 
                className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline tracking-tight"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-teal-500/20 transition-all text-slate-900 placeholder:text-slate-300"
                {...register('password')}
                disabled={isPending}
              />
            </div>
            {errors.password && (
              <p className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-rose-500 pl-1">
                <AlertCircle className="w-3 h-3" />
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-bold tracking-tight text-base shadow-lg shadow-teal-600/20 group"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Verifying Credentials...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <div className="pt-4 border-t border-slate-100 flex flex-col items-center gap-3">
        <p className="text-slate-500 text-sm font-medium">
          New to the platform? 
          <Link 
            href="/register" 
            className="ml-1 text-teal-600 font-black hover:text-teal-700 hover:underline"
          >
            Create an Account
          </Link>
        </p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] text-center max-w-[280px]">
          By continuing you agree to the JKUAT IT Policy and Data usage guidelines.
        </p>
      </div>
    </div>
  )
}
