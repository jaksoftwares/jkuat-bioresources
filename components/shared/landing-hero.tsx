"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Microscope, Sprout, BookOpen, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LandingHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/search`);
    }
  };

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

        {/* Global Search Bar */}
        <div className="w-full max-w-3xl bg-background rounded-2xl shadow-xl border border-border/60 p-2 sm:p-3 backdrop-blur-sm relative z-20">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 h-auto sm:h-14">
            <div className="relative flex-1 h-12 sm:h-full">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
              <Input
                type="text"
                placeholder="Search by strain number, genus, species, or common name..."
                className="w-full h-full pl-12 pr-4 text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="h-px sm:w-px sm:h-8 bg-border/60 self-center hidden sm:block" />
            <Button type="submit" size="lg" className="h-12 sm:h-full px-8 rounded-xl font-bold text-base shadow-md w-full sm:w-auto">
              Search Catalogue
            </Button>
          </form>
        </div>

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
