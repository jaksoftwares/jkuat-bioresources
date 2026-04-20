import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Filter, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HerbariumRepository } from "@/repositories/herbarium.repository";

export const dynamic = 'force-dynamic';

export default async function HerbariumPage() {
  const specimens = await HerbariumRepository.list({});

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className="relative py-20 border-b border-sidebar-border overflow-hidden">
        <Image
          src="/assets/images/herbarium_collection.png"
          alt="Herbarium Header"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sidebar via-sidebar/80 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
            Preserved Specimens
          </Badge>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Herbarium Collection</h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl">
            View our collection of preserved plant specimens including scientific information, collection dates, and where they were found.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between items-center mb-8 md:flex-row gap-4 bg-muted/40 p-4 rounded-xl border border-border">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search preserved specimens..." className="pl-10 border-border bg-card shadow-sm" />
            </div>
            <Button variant="outline" className="w-full md:w-auto border-border bg-card">
              <Filter className="mr-2 h-4 w-4" /> Filter by Region
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specimens.map((specimen: any, i: number) => (
              <Link key={i} href={`/herbarium/${specimen.id}`} className="group">
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col h-full relative cursor-pointer">
                  {/* Specimen Visual */}
                  <div className="h-56 relative bg-muted border-b border-border overflow-hidden">
                    <Image
                      src={specimen.specimen_images?.[0]?.secure_url || "/assets/images/herbarium_collection.png"}
                      alt={specimen.scientific_name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 brightness-[0.85] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                       <Badge className="bg-white/90 backdrop-blur-md text-amber-700 border-none font-mono text-[10px] px-2 py-0.5">
                         {specimen.herbarium_code || specimen.id.substring(0, 8)}
                       </Badge>
                    </div>
                  </div>
                  
                  {/* Specimen Content */}
                  <div className="p-6 bg-white dark:bg-slate-900 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold italic text-foreground mb-4 group-hover:text-primary transition-colors tracking-tight">
                      {specimen.scientific_name}
                    </h3>
                    
                    <div className="mt-auto pt-4 border-t border-border/60 flex flex-col gap-3">
                       <div className="flex items-center text-sm text-muted-foreground font-medium">
                         <MapPin className="h-4 w-4 mr-2 text-primary" />
                         <span className="truncate">{specimen.habitat_description || specimen.physical_storage_location || "Unknown location"}</span>
                       </div>
                       <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">
                          <span>{specimen.collection_date ? `Coll. ${specimen.collection_date}` : "Date Unknown"}</span>
                          <span className="text-foreground truncate max-w-[100px] text-right">{specimen.collector_id ? "Institution" : "Unknown"}</span>
                       </div>
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
