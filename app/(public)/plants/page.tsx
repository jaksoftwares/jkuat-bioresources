import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Sprout, Filter, ArrowRight } from "lucide-react";

const mockPlants = [
  { id: "AIV-2026-45A", taxa: "Amaranthus hybridus", local: "Mchicha / Terere", family: "Amaranthaceae", accessions: 12 },
  { id: "AIV-2023-102", taxa: "Cleome gynandra", local: "Spider Plant / Saget", family: "Cleomaceae", accessions: 8 },
  { id: "AIV-2024-034", taxa: "Solanum scabrum", local: "Nightshade / Managu", family: "Solanaceae", accessions: 24 },
  { id: "AIV-2025-012", taxa: "Vigna unguiculata", local: "Cowpea leaves / Kunde", family: "Fabaceae", accessions: 15 },
];

export default function PlantsRepositoryPage() {
  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className="bg-sidebar py-16 border-b border-sidebar-border relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Sprout className="mr-2 h-3 w-3" /> Botany Repository
          </Badge>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">African Indigenous Vegetables</h1>
          <p className="text-sidebar-foreground/80 text-lg mt-4 max-w-2xl text-white">
            Explore comprehensive digital catalogs encompassing seed origins, phenotypic traits, medicinal values, and geographical mapping of plants native to Africa.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-muted/40 p-4 rounded-xl border border-border">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search AIV repository..." className="pl-10 border-border bg-card shadow-sm" />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button variant="outline" className="w-full md:w-auto border-border bg-card">
                <Filter className="mr-2 h-4 w-4" /> Attributes
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted text-foreground border-b border-border">
                    <th className="px-6 py-4 font-semibold text-sm">Taxonomy (Scientific Name)</th>
                    <th className="px-6 py-4 font-semibold text-sm">Local Name</th>
                    <th className="px-6 py-4 font-semibold text-sm">Family</th>
                    <th className="px-6 py-4 font-semibold text-sm">Accessions</th>
                    <th className="px-6 py-4 font-semibold text-sm text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockPlants.map((plant, i) => (
                    <tr key={i} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold italic text-foreground">{plant.taxa}</span>
                          <span className="text-xs font-mono text-muted-foreground mt-1">{plant.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{plant.local}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{plant.family}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="bg-background text-primary border-primary/20">
                          {plant.accessions} records
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination placeholder */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/20">
              <span className="text-sm text-muted-foreground">Showing 1 to 4 of 48 records</span>
              <div className="flex gap-2">
                <Button variant="outline" disabled size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
