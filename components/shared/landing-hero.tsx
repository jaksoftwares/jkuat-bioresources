"use client";

import { Microscope, Sprout, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="relative w-full bg-secondary border-b border-border/60">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero_main.png"
          alt="JKUAT Bioresources Facility"
          fill
          className="object-cover object-center opacity-[0.15] mix-blend-multiply"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/95" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center justify-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8 border border-primary/20 shadow-sm">
          <div  />
          
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6 max-w-4xl">
          Welcome to the JKUAT Biological Resource Center
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/70 max-w-4xl mb-12 font-medium leading-relaxed">
          At JKUAT Bioresources, we are dedicated to advancing academic research and fostering a deeper understanding of biological sciences. Our state-of-the-art facility is committed to the collection, preservation, and distribution of microbial cultures, herbarium specimens, and indigenous flora, providing essential resources to researchers, educators, and students.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full max-w-3xl">
          <Link href="/microorganisms" className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-background/50 hover:bg-background border border-border/50 hover:border-border transition-all group">
            <Microscope className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground">Microbial Strains</span>
          </Link>
          <Link href="/plants" className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-background/50 hover:bg-background border border-border/50 hover:border-border transition-all group">
            <Sprout className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground">Live Plants</span>
          </Link>
          <Link href="/herbarium" className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-background/50 hover:bg-background border border-border/50 hover:border-border transition-all group">
            <BookOpen className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground">Herbarium</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
