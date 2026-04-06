import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Search, Library } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 min-h-[550px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero_main.png"
          alt="JKUAT Bioresources"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50 dark:from-[#09090b] dark:via-[#09090b]/95 dark:to-transparent" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
          Centralized Digitization of <br/> <span className="text-primary">JKUAT Bioresources</span>
        </h1>
        
        <p className="mt-4 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          The official platform for preserving and sharing research findings on Microorganisms, African Indigenous Vegetables (AIVs), and Herbarium specimens in JKUAT.
        </p>
        
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/search">
            <Button size="lg" className="h-12 px-6 font-bold shadow-xl rounded-lg group">
              <Search className="mr-2 h-4 w-4" />
              Search Repository
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="h-12 px-6 font-bold border-primary/40 text-primary hover:bg-primary/5 rounded-lg">
              Researcher Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
