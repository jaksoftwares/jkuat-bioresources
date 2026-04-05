'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react'
import { forgotPassword } from '@/actions/auth-actions'
import { toast } from 'sonner'

export function ForgotPasswordForm() {
  const [isPending, setIsPending] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    try {
      const result = await forgotPassword(email)
      if (result.error) {
        toast.error(result.error)
      } else {
        setIsSuccess(true)
        toast.success('Reset link sent to your email.')
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsPending(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-teal-50 flex items-center justify-center text-teal-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Email Sent</h2>
          <p className="mt-4 text-slate-500 font-medium text-lg leading-relaxed max-w-[340px] mx-auto">
            Please check your inbox for instructions to reset your password.
          </p>
        </div>
        <div className="pt-8 flex flex-col gap-4">
           <Link href="/login" className="flex items-center justify-center gap-2 text-teal-600 font-bold hover:text-teal-700 hover:underline">
             Go to Login
           </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
         <Link href="/login" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-teal-600 transition-colors uppercase tracking-widest mb-4 group cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Login
         </Link>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Forgot Password?</h2>
        <p className="text-slate-500 font-medium leading-relaxed">
          Enter your university email and we will send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">
            Institutional Email
          </Label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="email@jkuat.ac.ke"
              className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-teal-500/20 transition-all text-slate-900 placeholder:text-slate-300"
              disabled={isPending}
            />
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
              Sending Link...
            </>
          ) : (
            <>
              Reset Password
              <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <div className="pt-6 border-t border-slate-100 italic text-slate-400 text-[11px] text-center">
         If you don't receive an email within 5 minutes, please contact the JKUAT Bioresources Department IT support.
      </div>
    </div>
  )
}
