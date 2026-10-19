"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, Filter, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GlobalSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Plants", "Microorganisms", "Herbarium"]);
  const [allResources, setAllResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataUnavailable, setDataUnavailable] = useState(false);

  useEffect(() => {
    setSearchQuery(new URLSearchParams(window.location.search).get("q") ?? "");

    async function fetchData() {
      setIsLoading(true);
      try {
        const responses = await Promise.all([
          fetch('/api/plants'),
          fetch('/api/microorganisms'),
          fetch('/api/herbarium')
        ]);
        const [plantsRes, microRes, herbRes] = await Promise.all(
          responses.map((response) => response.ok ? response.json() : Promise.resolve([]))
        );
        setDataUnavailable(responses.some((response) => !response.ok));

        // The apis return arrays directly from the Repositories, so no `.data` wrapper.
        const safePlants = Array.isArray(plantsRes) ? plantsRes : (plantsRes.data || []);
        const formattedPlants = safePlants.map((p: any) => ({
          id: p.id,
          displayId: p.id.substring(0,8),
          taxa: p.scientific_name,
          localName: p.common_name || "Plant Specimen",
          family: p.family_name || "Unknown Family",
          repository: "Plants",
          image: p.images?.[0]?.secure_url || "/assets/images/spider-plant.jpg",
          color: "emerald",
        }));

        const safeMicro = Array.isArray(microRes) ? microRes : (microRes.data || []);
        const formattedMicro = safeMicro.map((m: any) => {
          const taxonomicInformation = m.taxonomic_information || {};
          const isolationInformation = m.details_of_isolation || {};
          const images = m.media?.images || m.microscopy_images || m.images || [];

          return {
            id: m.id,
            displayId: taxonomicInformation.jkuat_number || taxonomicInformation.strain_number || m.strain_code || m.id.substring(0, 8),
            taxa: taxonomicInformation.scientific_name || [taxonomicInformation.genus, taxonomicInformation.species].filter(Boolean).join(" ") || m.scientific_name || "Unknown microorganism",
            localName: isolationInformation.source_of_isolation || m.source_isolated_from || "Culture Isolate",
            family: taxonomicInformation.type_of_organism || m.category || "Microorganism",
            repository: "Microorganisms",
            image: images[0]?.secure_url || images[0]?.url || "/assets/images/microorganism.png",
            color: "blue",
          };
        });

        const safeHerb = Array.isArray(herbRes) ? herbRes : (herbRes.data || []);
        const formattedHerb = safeHerb.map((h: any) => ({
          id: h.id,
          displayId: h.herbarium_code || h.specimen_details?.herbarium_code || h.id.substring(0,8),
          taxa: h.scientific_name || [h.taxonomic_information?.genus, h.taxonomic_information?.species].filter(Boolean).join(" ") || "Unknown specimen",
          localName: h.common_name || h.habitat_description || h.physical_storage_location || "Preserved Specimen",
          family: "Preserved Record",
          repository: "Herbarium",
          image: h.specimen_images?.[0]?.secure_url || "/assets/images/herbarium_collection.png",
          color: "amber",
        }));

        setAllResources([...formattedPlants, ...formattedMicro, ...formattedHerb]);
      } catch (error) {
        console.error("Error fetching data for search:", error);
        setDataUnavailable(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredResults = useMemo(() => {
    return allResources.filter((item) => {
      const matchesSearch = 
        item.taxa?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.localName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.displayId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.family?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.includes(item.repository);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories, allResources]);

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
          {dataUnavailable && (
            <p role="status" className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              Some collection data is temporarily unavailable. Please try again shortly.
            </p>
          )}
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
            <form action="/search" method="get" className="flex gap-3">
              <div className="relative flex-1 group">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by taxon, local name, ID..." 
                  className="pl-12 h-14 text-lg shadow-sm border-border bg-card rounded-2xl focus-visible:ring-primary/20"
                />
              </div>
              <Button type="submit" className="h-14 rounded-2xl px-6">Search</Button>
            </form>

            <div className="text-sm font-medium text-muted-foreground bg-muted/50 px-5 py-2.5 rounded-2xl inline-block border border-border/40">
              Found <strong>{filteredResults.length}</strong> scientific records Matching your criteria
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center bg-card border border-dashed border-border rounded-3xl">
                   <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                   <h3 className="text-lg font-bold text-foreground mb-1">Searching Bioresources...</h3>
                   <p className="text-muted-foreground">Gathering institution-wide scientific data.</p>
                </div>
              ) : filteredResults.length > 0 ? (
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
                                 <span className="text-xs font-mono text-muted-foreground">{result.displayId}</span>
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
