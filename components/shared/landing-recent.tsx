import { Badge } from "@/components/ui/badge";
import { ArrowRight, Microscope, Sprout, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const recentAssets = [
  {
    id: "AIV-2026-45A",
    type: "Plant",
    taxa: "Amaranthus hybridus",
    localName: "Mchicha / Terere",
    repository: "Plants Archive",
    icon: Sprout,
    time: "Added 2 days ago",
  },
  {
    id: "MIC-0012-B",
    type: "Strain",
    taxa: "Bacillus subtilis subsp. inaquosorum",
    localName: "Soil isolate 4B",
    repository: "Microorganisms",
    icon: Microscope,
    time: "Added 4 days ago",
  },
  {
    id: "HERB-99-881",
    type: "Specimen",
    taxa: "Prunus africana",
    localName: "Red Stinkwood",
    repository: "Herbarium Collection",
    icon: BookOpen,
    time: "Added 1 week ago",
  },
];

export function LandingRecent() {
  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-left">
              Recently Accessioned
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Preview the latest biological additions digitized and verified by our partner laboratories.
            </p>
          </div>
          <Link href="/search">
            <Button variant="outline" className="font-semibold text-primary border-primary/20 hover:bg-secondary">
              View All Records <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentAssets.map((asset, index) => (
            <Link key={index} href="/search" className="group block">
              <div className="h-full rounded-[16px] border border-border bg-card p-6 shadow-card hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-mono text-xs border-none hover:bg-primary/20">
                    {asset.id}
                  </Badge>
                  <asset.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="italic font-semibold text-foreground text-lg mb-1">{asset.taxa}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-4">Local: {asset.localName}</p>
                
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider">{asset.repository}</span>
                  <span className="text-xs text-muted-foreground">{asset.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
