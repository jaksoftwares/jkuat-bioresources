import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Leaf, Microscope, BookOpen } from "lucide-react";
import Link from "next/link";

// Mock data to demonstrate the system
const mockResults = [
  {
    id: "AIV-2026-45A",
    type: "Plant",
    taxa: "Amaranthus hybridus",
    localName: "Mchicha / Terere",
    family: "Amaranthaceae",
    repository: "Plants Archive",
    icon: Leaf,
    color: "text-primary",
  },
  {
    id: "MIC-0012-B",
    type: "Strain",
    taxa: "Bacillus subtilis subsp. inaquosorum",
    localName: "Soil isolate 4B",
    family: "Bacillaceae",
    repository: "Microorganisms",
    icon: Microscope,
    color: "text-accent",
  },
  {
    id: "HERB-99-881",
    type: "Specimen",
    taxa: "Prunus africana",
    localName: "Red Stinkwood",
    family: "Rosaceae",
    repository: "Herbarium Collection",
    icon: BookOpen,
    color: "text-secondary-foreground",
  },
  {
    id: "AIV-2023-102",
    type: "Plant",
    taxa: "Cleome gynandra",
    localName: "Spider Plant / Saget",
    family: "Cleomaceae",
    repository: "Plants Archive",
    icon: Leaf,
    color: "text-primary",
  },
];

export default function GlobalSearchPage() {
  return (
    <div className="bg-muted/30 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Global Repository Search</h1>
          <p className="text-muted-foreground mt-2">
            Search across African Indigenous Vegetables, Microorganism strains, and Herbarium specimens.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <h2 className="font-semibold text-foreground mb-4 flex items-center">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Category</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm text-foreground">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                      <span>All Collections</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-foreground">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span>Plants (AIV)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-foreground">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span>Microorganisms</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-foreground">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span>Herbarium Specimens</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Taxonomic Family</h3>
                  <div className="space-y-2">
                    {/* Just visual mockups */}
                    <label className="flex flex-col text-sm text-foreground">
                      <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                        <option>Any Family</option>
                        <option>Amaranthaceae</option>
                        <option>Bacillaceae</option>
                        <option>Rosaceae</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search by taxon, local name, ID, or description..." 
                  className="pl-10 h-12 text-base shadow-sm border-border bg-card"
                />
              </div>
              <Button size="lg" className="h-12 px-8 shadow-sm">Search</Button>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing <strong>4</strong> results for your search.
            </div>

            <div className="space-y-4">
              {mockResults.map((result) => (
                <Link href={`/${result.repository.toLowerCase().split(' ')[0]}/${result.id}`} key={result.id} className="block group">
                  <Card className="hover:border-primary/40 hover:shadow-md transition-all">
                    <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-secondary ${result.color}`}>
                          <result.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-foreground italic">{result.taxa}</h3>
                            <Badge variant="outline" className="text-xs font-mono bg-background">
                              {result.id}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground flex gap-3">
                            <span><strong>Local Name:</strong> {result.localName}</span>
                            <span>&bull;</span>
                            <span><strong>Family:</strong> {result.family}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0">
                        <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20 whitespace-nowrap">
                          {result.repository}
                        </Badge>
                      </div>

                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
