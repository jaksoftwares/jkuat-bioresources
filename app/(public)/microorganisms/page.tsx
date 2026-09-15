import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { MicroorganismRepository } from "@/repositories/microorganism.repository";
import { TaxonomicInformation, PathogenicityInformation, DetailsOfIsolation } from "@/features/microorganisms/types";

export const dynamic = 'force-dynamic';

export default async function MicroorganismsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  // Use repository search. (In a real app, you'd pass all filter params here)
  const strains = await MicroorganismRepository.list({ search: searchQuery });

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <div className="bg-secondary border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/search" className="hover:text-primary transition-colors">Catalogue</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Microbial Strains</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Microbial Strains Collection</h1>
          <p className="text-muted-foreground max-w-3xl">
            Explore our extensive repository of authenticated bacteria, fungi, and yeast strains. Use the filters to narrow down by taxonomic group, biohazard level, or isolation source.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Faceted Filtering Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input defaultValue={searchQuery} placeholder="Search catalogue..." className="pl-9 h-10 bg-background border-border/60" />
              </div>
            </div>

            <div className="space-y-4 border-t border-border/40 pt-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Type of Organism</h3>
              <div className="space-y-2">
                {["Bacteria", "Fungi", "Yeast", "Algae", "Virus", "Other"].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1.5 rounded-md transition-colors">
                    <input type="checkbox" className="rounded border-border/60 text-primary focus:ring-primary h-4 w-4" />
                    <span className="text-sm font-medium">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-border/40 pt-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Biohazard Group</h3>
              <div className="space-y-2">
                {["1", "2", "3", "4"].map((group) => (
                  <label key={group} className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1.5 rounded-md transition-colors">
                    <input type="checkbox" className="rounded border-border/60 text-primary focus:ring-primary h-4 w-4" />
                    <span className="text-sm font-medium">Risk Group {group}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* High-Density Data Table */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground font-medium">
                Showing <strong className="text-foreground">{strains.length}</strong> strains
              </p>
              <Button variant="outline" size="sm" className="h-8 border-border/60">
                <Filter className="h-3 w-3 mr-2" /> Sort By: Scientific Name
              </Button>
            </div>

            <div className="border border-border/60 rounded-xl overflow-hidden bg-card shadow-sm">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[120px] font-bold text-foreground">Strain No.</TableHead>
                    <TableHead className="font-bold text-foreground">Scientific Name</TableHead>
                    <TableHead className="font-bold text-foreground">Organism Type</TableHead>
                    <TableHead className="font-bold text-foreground">Isolation Source</TableHead>
                    <TableHead className="w-[100px] font-bold text-foreground text-center">Risk Group</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {strains.map((strain: any) => {
                    // Type casting based on the JSONB structure
                    const taxInfo = strain.taxonomic_information as TaxonomicInformation;
                    const isoInfo = strain.details_of_isolation as DetailsOfIsolation;
                    const pathInfo = strain.pathogenicity_information as PathogenicityInformation;

                    return (
                      <TableRow key={strain.id} className="group hover:bg-muted/30 transition-colors cursor-pointer">
                        <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                          {taxInfo?.strain_number || strain.id.substring(0, 8)}
                        </TableCell>
                        <TableCell>
                          <span className="italic font-semibold text-foreground group-hover:text-primary transition-colors">
                            {taxInfo?.genus} {taxInfo?.species}
                          </span>
                          {taxInfo?.is_type_strain && (
                             <Badge variant="outline" className="ml-2 text-[10px] uppercase tracking-wider py-0 px-1.5 border-primary/30 text-primary">Type Strain</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {taxInfo?.type_of_organism || "Unknown"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground truncate max-w-[150px]">
                          {isoInfo?.source_of_isolation || "Unknown"}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={pathInfo?.biohazard_group === "1" ? "secondary" : "destructive"} className="font-mono shadow-none">
                            RG-{pathInfo?.biohazard_group || "1"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/microorganisms/${strain.id}`}>
                            <Button size="sm" variant="ghost" className="h-8 px-2 text-primary hover:bg-primary/10 hover:text-primary group-hover:flex">
                              Details <ChevronRight className="ml-1 w-3 h-3" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {strains.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                        No strains found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination Placeholder */}
            <div className="flex items-center justify-between mt-6 px-2">
               <p className="text-sm text-muted-foreground">Page 1 of 1</p>
               <div className="flex gap-2">
                 <Button disabled variant="outline" size="sm">Previous</Button>
                 <Button disabled variant="outline" size="sm">Next</Button>
               </div>
            </div>
            
          </main>
        </div>
      </div>
    </div>
  );
}
