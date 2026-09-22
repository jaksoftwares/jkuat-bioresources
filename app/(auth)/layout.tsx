import React from 'react'
import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Visual Section - Visible on larger screens */}
      <div className="relative hidden w-1/2 lg:block border-r border-slate-100 shadow-2xl">
        <Image 
          src="/assets/auth-bg.png" 
          alt="JKUAT Bioresources Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#004f2e]/55" />
        
        {/* Branding Overlay */}
        <div className="absolute bottom-16 left-16 max-w-md">
           <Image src="/assets/images/jkuat-logo.jpg" alt="Jomo Kenyatta University of Agriculture and Technology" width={72} height={72} className="mb-6 h-16 w-16 rounded-full object-contain" />
           <h1 className="text-3xl font-extrabold leading-tight text-white">
             JKUAT Bioresources
           </h1>
           <p className="mt-4 text-base leading-7 text-white/85">
             Digital records for microorganisms, plants, and herbarium collections.
           </p>
        </div>
        
        {/* Subtle decorative elements */}
          <div className="absolute left-12 top-10 flex items-center gap-3">
            <Image src="/assets/images/jkuat-logo.jpg" alt="JKUAT" width={40} height={40} className="h-10 w-10 rounded-full object-contain" />
            <span className="text-sm font-extrabold leading-tight text-white"><span className="block">JKUAT</span><span className="block text-white/75">Bioresources</span></span>
        </div>
      </div>

      {/* Form Section */}
      <main className="relative flex w-full flex-col items-center justify-center bg-white px-6 py-20 lg:w-1/2">
        <div className="absolute left-6 top-8 flex items-center gap-2 lg:hidden">
           <Image src="/assets/images/jkuat-logo.jpg" alt="JKUAT" width={36} height={36} className="h-9 w-9 rounded-full object-contain" />
           <span className="text-xs font-extrabold leading-tight text-primary"><span className="block">JKUAT</span><span className="block">Bioresources</span></span>
        </div>
        
        <div className="w-full max-w-[420px] space-y-8">
          {children}
        </div>
        
        {/* Footer info for mobile */}
          <div className="absolute bottom-6 w-full px-6 text-center lg:hidden">
            <p className="text-[10px] font-semibold text-slate-400">
             Jomo Kenyatta University of Agriculture and Technology
           </p>
        </div>
      </main>
    </div>
  )
}
