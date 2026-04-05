import React from 'react'
import Image from 'next/image'
import { Leaf } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Visual Section - Visible on larger screens */}
      <div className="relative hidden w-1/2 lg:block border-r border-slate-100 shadow-2xl">
        <Image 
          src="/assets/auth-bg.png" 
          alt="JKUAT Bioresources Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 via-teal-900/10 to-transparent" />
        
        {/* Branding Overlay */}
        <div className="absolute bottom-16 left-16 max-w-md animate-in fade-in slide-in-from-left-8 duration-700">
           <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg border border-teal-500 mb-6 group hover:scale-110 transition-transform cursor-pointer">
              <Leaf className="text-white w-8 h-8" />
           </div>
           <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">
             Preserving Nature, <br/> Enabling Discovery.
           </h1>
           <p className="text-teal-50 mt-4 text-lg font-medium opacity-90 leading-relaxed">
             Access the official JKUAT Bioresources platform to manage and discover microbial, plant, and herbarium data.
           </p>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-12 left-12 flex items-center gap-3">
           <span className="text-teal-400 font-black text-2xl tracking-tighter">JKUAT</span>
           <div className="h-1 w-8 bg-teal-500 rounded-full" />
           <span className="text-white/80 font-bold uppercase tracking-widest text-[10px]">Bioresources Repository</span>
        </div>
      </div>

      {/* Form Section */}
      <main className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2 bg-white relative">
        <div className="absolute top-12 left-12 flex items-center gap-3 lg:hidden">
           <Leaf className="text-teal-600 w-6 h-6" />
           <span className="text-teal-800 font-bold uppercase tracking-widest text-[10px]">Bioresources</span>
        </div>
        
        <div className="w-full max-w-[420px] space-y-8 animate-in fade-in zoom-in-95 duration-500">
          {children}
        </div>
        
        {/* Footer info for mobile */}
        <div className="absolute bottom-8 lg:hidden text-center w-full px-6">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
             Jomo Kenyatta University of Agriculture and Technology
           </p>
        </div>
      </main>
    </div>
  )
}
