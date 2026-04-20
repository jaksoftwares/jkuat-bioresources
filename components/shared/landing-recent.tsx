import { Badge } from "@/components/ui/badge";
import { ArrowRight, Microscope, Sprout, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlantRepository } from "@/repositories/plant.repository";
import { MicroorganismRepository } from "@/repositories/microorganism.repository";
import { HerbariumRepository } from "@/repositories/herbarium.repository";

export async function LandingRecent() {
  const [plants, micro, herbarium] = await Promise.all([
    PlantRepository.list({}),
    MicroorganismRepository.list(),
    HerbariumRepository.list({})
  ]);

  const latestPlant = plants?.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
  const latestMicro = micro?.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
  const latestHerb = herbarium?.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  const recentAssets = [];

  if (latestPlant) {
    recentAssets.push({
      id: latestPlant.id.substring(0, 8).toUpperCase(),
      type: "Plant",
      taxa: latestPlant.scientific_name,
      localName: latestPlant.common_name || "Indigenous Specimen",
      repository: "Botanical Collection",
      icon: Sprout,
      time: new Date(latestPlant.created_at).toLocaleDateString(),
      url: `/plants/${latestPlant.id}`
    });
  }

  if (latestMicro) {
    recentAssets.push({
      id: latestMicro.strain_code || latestMicro.id.substring(0, 8).toUpperCase(),
      type: "Microorganism",
      taxa: latestMicro.scientific_name,
      localName: latestMicro.source_isolated_from || "Culture Isolate",
      repository: "Microorganisms Registry",
      icon: Microscope,
      time: new Date(latestMicro.created_at).toLocaleDateString(),
      url: `/microorganisms/${latestMicro.id}`
    });
  }

  if (latestHerb) {
    recentAssets.push({
      id: latestHerb.herbarium_code || latestHerb.id.substring(0, 8).toUpperCase(),
      type: "Specimen",
      taxa: latestHerb.scientific_name,
      localName: latestHerb.habitat_description || latestHerb.physical_storage_location || "Preserved Specimen",
      repository: "Herbarium Collection",
      icon: BookOpen,
      time: new Date(latestHerb.created_at).toLocaleDateString(),
      url: `/herbarium/${latestHerb.id}`
    });
  }

  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-left flex items-center gap-2">
              <Clock className="h-8 w-8 text-primary" /> Latest Discoveries
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl text-left">
              Explore the most recent live data acquisitions dynamically synchronized from JKUAT Bioresource laboratories.
            </p>
          </div>
          <Link href="/search">
            <Button variant="outline" className="font-semibold text-primary border-primary/20 hover:bg-secondary">
              Search All Collections <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentAssets.map((asset, index) => (
            <Link key={index} href={asset.url} className="group block">
              <div className="h-full rounded-[16px] border border-border bg-card p-6 shadow-card hover:border-primary/30 transition-all flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-mono text-xs border-none hover:bg-primary/20">
                    {asset.id}
                  </Badge>
                  <asset.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="italic font-semibold text-foreground text-lg mb-1 leading-snug">{asset.taxa}</h3>
                <p className="text-sm font-medium text-foreground/70 mb-4 truncate">{asset.localName}</p>
                
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary/80 uppercase tracking-widest">{asset.repository}</span>
                  <span className="text-[11px] font-bold text-muted-foreground">{asset.time}</span>
                </div>
              </div>
            </Link>
          ))}

          {recentAssets.length === 0 && (
             <div className="md:col-span-3 text-center py-10 bg-muted/30 border border-dashed border-border rounded-2xl">
                <p className="text-muted-foreground italic text-sm">Awaiting new laboratory discoveries...</p>
             </div>
          )}
        </div>
      </div>
    </section>
  );
}
