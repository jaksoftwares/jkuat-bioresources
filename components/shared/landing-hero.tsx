import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Search, Library } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32">
      {/* Decorative background grid pattern mapping to the 'repository' digital brand feel */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 inline-flex items-center rounded-full border border-primary/20 bg-secondary px-4 py-1.5 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          <span className="text-sm font-medium text-secondary-foreground">Digital Infrastructure for African Research</span>
        </div>
        
        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Digitizing Africa's <span className="text-primary">Biological Heritage</span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          The official digital repository for JKUAT’s vital botanical resources, microscopic cultures, and comprehensive herbarium specimens. Accelerating global scientific collaboration through open accessibility.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/search">
            <Button size="lg" className="h-14 px-8 text-base font-semibold shadow-card rounded-xl w-full sm:w-auto group">
              <Search className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Explore Database
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold border-primary text-primary hover:bg-secondary rounded-xl w-full sm:w-auto">
              <Library className="mr-2 h-5 w-5" />
              Researcher Access
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
