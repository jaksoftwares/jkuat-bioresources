import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Microscope, Filter, ArrowRight } from "lucide-react";

const mockStrains = [
  { id: "MIC-0012-B", taxa: "Bacillus subtilis", type: "Bacteria", isolation: "Rhizosphere", accessions: 4 },
  { id: "MIC-0088-F", taxa: "Trichoderma harzianum", type: "Fungi", isolation: "Soil", accessions: 2 },
  { id: "MIC-0105-B", taxa: "Pseudomonas aeruginosa", type: "Bacteria", isolation: "Water sample", accessions: 7 },
  { id: "MIC-0211-A", taxa: "Streptomyces griseus", type: "Actinomycete", isolation: "Deep soil", accessions: 1 },
];

export default function MicroorganismsPage() {
  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className="bg-sidebar py-16 border-b border-sidebar-border relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent via-transparent to-transparent"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Microscope className="mr-2 h-3 w-3" /> Microbiology Repository
          </Badge>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Microorganism Strains</h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl">
            Detailed genomic and phenotypic records mapping to physical laboratory storage matrices across JKUAT bio-labs. Open directory for authenticated researchers.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-muted/40 p-4 rounded-xl border border-border">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search isolated strains..." className="pl-10 border-border bg-card shadow-sm" />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button variant="outline" className="w-full md:w-auto border-border bg-card">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockStrains.map((strain, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-card hover:border-accent/40 transition-colors flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Microscope className="h-5 w-5 text-accent" />
                  </div>
                  <Badge variant="outline" className="font-mono text-xs text-muted-foreground">
                    {strain.id}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-bold italic text-foreground mb-1">{strain.taxa}</h3>
                <p className="text-sm font-medium text-accent mb-4">{strain.type}</p>
                
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between text-sm border-t border-border pt-3">
                    <span className="text-muted-foreground">Source:</span>
                    <span className="font-medium text-foreground">{strain.isolation}</span>
                  </div>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm">
                    View Genomics
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
