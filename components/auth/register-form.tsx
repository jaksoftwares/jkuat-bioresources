'use client'

import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signUpSchema } from '@/validators/schema'
import { signup } from '@/actions/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Loader2, 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  Sparkles, 
  Database, 
  Hash, 
  Building2, 
  School,
  CheckCircle2
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type FormData = z.infer<typeof signUpSchema>

export function RegisterForm() {
  const [isPending, setIsPending] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      agree_to_terms: false
    }
  })

  // Watch the checkbox state
  const agreeToTerms = watch('agree_to_terms')

  async function onSubmit(data: FormData) {
    setIsPending(true)
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('fullName', data.full_name)
    formData.append('staffNumber', data.staff_number || '')
    formData.append('department', data.department || '')
    formData.append('faculty', data.faculty || '')

    try {
      const result = await signup(formData)
      if (result?.error) {
        toast.error(result.error)
      } else if (result?.success) {
        setIsSuccess(true)
        toast.success('Registration successful. Please verify your email.')
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsPending(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-teal-50 flex items-center justify-center text-teal-600 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Check your Email</h2>
          <p className="mt-4 text-slate-500 font-medium text-lg leading-relaxed max-w-[340px] mx-auto">
            We've sent a verification link to your institutional email. Please confirm it to access the portal.
          </p>
        </div>
        <div className="pt-8">
           <Link href="/login" className="text-teal-600 font-bold hover:text-teal-700 hover:underline">
             Go to Login
           </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Create Account</h2>
        <p className="text-slate-500 text-sm font-medium">Join the researcher community today.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="full_name" className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
              Full Name
            </Label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="full_name"
                placeholder="Dr. Jane Doe"
                className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm"
                {...register('full_name')}
                disabled={isPending}
              />
            </div>
            {errors.full_name && (
              <p className="text-[10px] font-semibold text-rose-500 pl-1">{errors.full_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="email" className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
              Institutional Email
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="email@jkuat.ac.ke"
                className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm"
                {...register('email')}
                disabled={isPending}
              />
            </div>
            {errors.email && (
              <p className="text-[10px] font-semibold text-rose-500 pl-1">{errors.email.message}</p>
            )}
          </div>

          {/* Staff Number */}
          <div className="space-y-1.5">
            <Label htmlFor="staff_number" className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
              Staff Number
            </Label>
            <div className="relative group">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="staff_number"
                placeholder="PF-XXXX"
                className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm"
                {...register('staff_number')}
                disabled={isPending}
              />
            </div>
          </div>

          {/* Department */}
          <div className="space-y-1.5">
            <Label htmlFor="department" className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
              Department
            </Label>
            <div className="relative group">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="department"
                placeholder="e.g. Microbiology"
                className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm"
                {...register('department')}
                disabled={isPending}
              />
            </div>
          </div>

          {/* Faculty */}
          <div className="space-y-1.5 md:col-span-2">
            <Label htmlFor="faculty" className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
              Faculty
            </Label>
            <div className="relative group">
              <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="faculty"
                placeholder="e.g. Science & Technology"
                className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm"
                {...register('faculty')}
                disabled={isPending}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
              Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm"
                {...register('password')}
                disabled={isPending}
              />
            </div>
            {errors.password && (
              <p className="text-[10px] font-semibold text-rose-500 pl-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirm_password" className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
              Confirm Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input
                id="confirm_password"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm"
                {...register('confirm_password')}
                disabled={isPending}
              />
            </div>
            {errors.confirm_password && (
              <p className="text-[10px] font-semibold text-rose-500 pl-1">{errors.confirm_password.message}</p>
            )}
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start space-x-3 p-1">
           <Checkbox 
             id="terms" 
             checked={agreeToTerms}
             onCheckedChange={(checked) => setValue('agree_to_terms', checked === true)}
             disabled={isPending}
           />
           <div className="space-y-1">
             <Label htmlFor="terms" className="text-[11px] font-medium text-slate-600 leading-tight block">
               I agree to the <Link href="/terms" className="text-teal-600 font-bold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-teal-600 font-bold hover:underline">Privacy Policy</Link>.
             </Label>
             {errors.agree_to_terms && (
               <p className="text-[10px] font-semibold text-rose-500 pl-1">{errors.agree_to_terms.message}</p>
             )}
           </div>
        </div>

        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-bold tracking-tight shadow-md"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Profile...
            </>
          ) : (
            <>
              Register
              <Sparkles className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      <div className="pt-4 border-t border-slate-100 flex flex-col items-center gap-2">
        <p className="text-slate-500 text-xs font-medium">
          Already have an account? 
          <Link 
            href="/login" 
            className="ml-1 text-teal-600 font-black hover:text-teal-700"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
