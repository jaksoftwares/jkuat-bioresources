"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, Filter, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Expanded Mock Data
const ALL_RESOURCES = [
  {
    id: "AIV-2026-45A",
    taxa: "Amaranthus hybridus",
    localName: "Mchicha / Terere",
    family: "Amaranthaceae",
    repository: "Plants",
    image: "/assets/images/spider-plant.jpg",
    color: "emerald",
  },
  {
    id: "MIC-0012-B",
    taxa: "Bacillus subtilis",
    localName: "Lab Isolate A1",
    family: "Bacillaceae",
    repository: "Microorganisms",
    image: "/assets/images/microorganism.png",
    color: "blue",
  },
  {
    id: "HERB-99-881",
    taxa: "Prunus africana",
    localName: "Red Stinkwood",
    family: "Rosaceae",
    repository: "Herbarium",
    image: "/assets/images/herbarium_collection.png",
    color: "amber",
  },
  {
    id: "AIV-2023-102",
    taxa: "Cleome gynandra",
    localName: "Spider Plant / Saget",
    family: "Cleomaceae",
    repository: "Plants",
    image: "/assets/images/spider-plant.jpg",
    color: "emerald",
  },
  {
    id: "MIC-0088-F",
    taxa: "Trichoderma harzianum",
    localName: "Bio-control Agent",
    family: "Hypocreaceae",
    repository: "Microorganisms",
    image: "/assets/images/microorganism.png",
    color: "blue",
  },
  {
    id: "HERB-02-145",
    taxa: "Warburgia ugandensis",
    localName: "East African Greenheart",
    family: "Canellaceae",
    repository: "Herbarium",
    image: "/assets/images/herbarium_collection.png",
    color: "amber",
  },
  {
    id: "AIV-2024-034",
    taxa: "Solanum scabrum",
    localName: "Nightshade / Managu",
    family: "Solanaceae",
    repository: "Plants",
    image: "/assets/images/avis.png",
    color: "emerald",
  },
  {
    id: "MIC-0105-B",
    taxa: "Pseudomonas aeruginosa",
    localName: "Clinical Sample 02",
    family: "Pseudomonadaceae",
    repository: "Microorganisms",
    image: "/assets/images/microorganism.png",
    color: "blue",
  },
  {
    id: "HERB-15-022",
    taxa: "Vitex keniensis",
    localName: "Meru Oak",
    family: "Lamiaceae",
    repository: "Herbarium",
    image: "/assets/images/herbarium_collection.png",
    color: "amber",
  },
  {
    id: "AIV-2025-012",
    taxa: "Vigna unguiculata",
    localName: "Cowpea leaves / Kunde",
    family: "Fabaceae",
    repository: "Plants",
    image: "/assets/images/spider-plant.jpg",
    color: "emerald",
  },
];

export default function GlobalSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Plants", "Microorganisms", "Herbarium"]);

  const filteredResults = useMemo(() => {
    return ALL_RESOURCES.filter((item) => {
      const matchesSearch = 
        item.taxa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.localName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.family.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.includes(item.repository);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="bg-muted/30 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Search Our Collections</h1>
          <p className="text-muted-foreground mt-3 text-left max-w-2xl text-lg">
            Discover plant species, microbial samples, and preserved specimens from across JKUAT's laboratories.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-foreground mb-6 flex items-center text-lg">
                <Filter className="mr-2 h-5 w-5 text-primary" /> Filter Results
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">By Collection</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Plants (AIV)", value: "Plants" },
                      { label: "Microorganisms", value: "Microorganisms" },
                      { label: "Herbarium", value: "Herbarium" }
                    ].map((cat) => (
                      <label key={cat.value} className="flex items-center space-x-3 text-sm font-medium text-foreground cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="rounded-md border-border text-primary focus:ring-primary h-4 w-4" 
                          checked={selectedCategories.includes(cat.value)}
                          onChange={() => toggleCategory(cat.value)}
                        />
                        <span className="group-hover:text-primary transition-colors">{cat.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                   <Button variant="ghost" className="w-full text-xs font-bold uppercase text-muted-foreground hover:text-primary" onClick={() => setSelectedCategories(["Plants", "Microorganisms", "Herbarium"])}>
                      Reset Filters
                   </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            <div className="flex gap-3">
              <div className="relative flex-1 group">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by taxon, local name, ID..." 
                  className="pl-12 h-14 text-lg shadow-sm border-border bg-card rounded-2xl focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <div className="text-sm font-medium text-muted-foreground bg-muted/50 px-5 py-2.5 rounded-2xl inline-block border border-border/40">
              Found <strong>{filteredResults.length}</strong> scientific records Matching your criteria
            </div>

            <div className="space-y-4">
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <Link href={`/${result.repository.toLowerCase()}/${result.id}`} key={result.id} className="block group">
                    <Card className="rounded-2xl border-border group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/5 transition-all overflow-hidden bg-background">
                      <CardContent className="p-0 flex flex-col sm:flex-row items-stretch min-h-[140px]">
                        
                        {/* Visual Thumbnail */}
                        <div className="w-full sm:w-40 h-40 sm:h-auto relative shrink-0 overflow-hidden bg-muted">
                          <Image
                            src={result.image}
                            alt={result.taxa}
                            fill
                            sizes="(max-width: 640px) 100vw, 160px"
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>

                        <div className="p-6 flex flex-col justify-center flex-grow">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-1">
                              <h3 className="text-xl font-bold text-foreground italic group-hover:text-primary transition-colors leading-tight">
                                {result.taxa}
                              </h3>
                              <div className="flex items-center gap-3">
                                 <span className="text-xs font-mono text-muted-foreground">{result.id}</span>
                                 <span className="h-1 w-1 rounded-full bg-border" />
                                 <span className="text-xs font-bold text-primary/70 uppercase tracking-tighter">{result.family}</span>
                              </div>
                            </div>
                            
                            <Badge className={`bg-${result.color}-500/10 text-${result.color}-500 border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1 ring-1 ring-${result.color}-500/20`}>
                              {result.repository}
                            </Badge>
                          </div>

                          <div className="mt-4 text-sm text-foreground/70 font-medium">
                            <span className="text-foreground font-bold">{result.localName}</span>
                          </div>
                        </div>

                        <div className="hidden sm:flex items-center pr-8 pl-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 group-hover:duration-500 duration-200">
                           <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                              <ArrowRight className="h-5 w-5" />
                           </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="py-20 text-center bg-card border border-dashed border-border rounded-3xl">
                   <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                   <h3 className="text-lg font-bold text-foreground mb-1">No matching specimens found</h3>
                   <p className="text-muted-foreground">Adjust your filters or try a different search term.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

