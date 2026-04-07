import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Search, Library } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 min-h-[500px] lg:min-h-[70vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/lab-research.png"
          alt="JKUAT Bioresources"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50 dark:from-[#09090b] dark:via-[#09090b]/95 dark:to-transparent" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left py-20 flex flex-col justify-center min-h-full">
        <div className="space-y-10 max-w-5xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05]">
            <span className="text-primary">JKUAT Bioresources</span> Research
          </h1>
          
          <p className="max-w-3xl text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            Explore our collections of indigenous vegetables, microorganisms, and herbarium specimens from across Jomo Kenyatta University.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-4">
            <Link href="/search">
              <Button size="lg" className="h-14 px-10 font-bold shadow-2xl rounded-xl group text-lg">
                <Search className="mr-3 h-5 w-5" />
                Explore Collections
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="h-14 px-10 font-bold border-primary/40 text-primary hover:bg-primary/5 rounded-xl text-lg">
                Researcher Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
