import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Microscope, Filter, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MicroorganismRepository } from "@/repositories/microorganism.repository";

export const dynamic = 'force-dynamic';

export default async function MicroorganismsPage() {
  const strains = await MicroorganismRepository.list();

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className="relative py-20 border-b border-sidebar-border overflow-hidden">
        <Image
          src="/assets/images/microorganism.png"
          alt="Microbiology Header"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sidebar via-sidebar/80 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
            Scientific Samples
          </Badge>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Microorganism Samples</h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl">
            Explore our collection of bacterial and fungal samples with detailed scientific findings from across JKUAT’s biological laboratories.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-muted/40 p-4 rounded-xl border border-border">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search our microbial collection..." className="pl-10 border-border bg-card shadow-sm" />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button variant="outline" className="w-full md:w-auto border-border bg-card">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strains.map((strain: any, i: number) => (
              <Link key={i} href={`/microorganisms/${strain.id}`} className="group">
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-sidebar-primary/30 transition-all flex flex-col h-full relative cursor-pointer">
                  {/* Visual Image */}
                  <div className="h-40 relative bg-muted border-b border-border">
                    <Image
                      src={strain.microscopy_images?.[0]?.secure_url || "/assets/images/microorganism.png"}
                      alt={strain.scientific_name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                    <div className="absolute top-3 right-3">
                       <Badge className="bg-white/90 backdrop-blur-sm text-black border-none font-mono text-[10px]">
                         {strain.strain_code || strain.id.substring(0, 8)}
                       </Badge>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow bg-white dark:bg-slate-900">
                    <h3 className="text-xl font-bold italic text-foreground mb-1 group-hover:text-primary transition-colors tracking-tight">
                      {strain.scientific_name}
                    </h3>
                    <p className="text-sm font-bold text-primary/70 uppercase tracking-widest mb-4">
                      {strain.category || "Microorganism"}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-border/50">
                       <p className="text-xs text-muted-foreground flex items-center justify-between">
                         <span className="font-semibold uppercase tracking-tighter">Isolation Source</span>
                         <span className="text-foreground font-bold">{strain.source_isolated_from || "Unknown"}</span>
                       </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
