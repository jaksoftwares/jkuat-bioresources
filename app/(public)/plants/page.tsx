import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Sprout, Filter, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlantRepository } from "@/repositories/plant.repository";
import { loadPublicData } from "@/lib/public-data";
import { PublicDataUnavailable } from "@/components/public/public-data-unavailable";

export const dynamic = 'force-dynamic';

export default async function PlantsRepositoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const searchQuery = typeof params.q === "string" ? params.q.trim() : "";
  const result = await loadPublicData(
    "plant collection",
    () => PlantRepository.list({ search: searchQuery || undefined }),
  );
  const plants = result.data ?? [];

  return (
    <div className="min-h-screen">
      {result.failed && (
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <PublicDataUnavailable collection="Plant records" />
        </div>
      )}
      {/* Category Header */}
      <div className="relative py-20 border-b border-sidebar-border overflow-hidden">
        <Image
          src="/Thumbnail to AIVs.jpg"
          alt="Botanical Header"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sidebar via-sidebar/80 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
            Find Plant Information
          </Badge>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Indigenous Plants</h1>
          <p className="text-sidebar-foreground/80 text-lg mt-4 max-w-2xl text-white">
            Browse our collection of African Indigenous Vegetables (AIVs) including their scientific profiles, origins, and characteristics.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-muted/40 p-4 rounded-xl border border-border">
            <form action="/plants" method="get" className="flex w-full max-w-xl gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input name="q" defaultValue={searchQuery} placeholder="Search plants by name or family..." className="pl-10 border-border bg-card shadow-sm" />
              </div>
              <Button type="submit">Search</Button>
            </form>
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
                    <th className="px-6 py-4 font-semibold text-sm w-16 text-center">Visual</th>
                    <th className="px-6 py-4 font-semibold text-sm">Scientific Name</th>
                    <th className="px-6 py-4 font-semibold text-sm">Local Name</th>
                    <th className="px-6 py-4 font-semibold text-sm">Family</th>
                    <th className="px-6 py-4 font-semibold text-sm text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {plants.map((plant: any) => (
                    <tr key={plant.id} className="hover:bg-muted/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <Link href={`/plants/${plant.id}`} className="block">
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-border shadow-sm group-hover:scale-105 transition-transform bg-slate-100">
                            <Image src={plant.images?.[0]?.secure_url || "/assets/images/spider-plant.jpg"} alt={plant.scientific_name} fill sizes="48px" className="object-cover" />
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/plants/${plant.id}`} className="flex flex-col">
                          <span className="font-bold italic text-foreground group-hover:text-primary transition-colors">{plant.scientific_name}</span>
                          <span className="text-xs font-mono text-muted-foreground mt-1">{plant.id.substring(0,8)}</span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground font-medium">
                        <Link href={`/plants/${plant.id}`} className="block">
                          {plant.common_name || "N/A"}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <Link href={`/plants/${plant.id}`} className="block">
                          <Badge variant="outline" className="font-medium bg-background text-foreground/70 border-border">
                            {plant.family_name || "Unknown"}
                          </Badge>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button nativeButton={false} render={<Link href={`/plants/${plant.id}`} />} variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 transition-transform group-hover:translate-x-1">
                             Detail <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {plants.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        {searchQuery ? `No plants found for "${searchQuery}".` : "No plant records are available."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination placeholder */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/20">
              <span className="text-sm text-muted-foreground">
                 Showing {plants.length} of {plants.length} records
              </span>
              <div className="flex gap-2">
                <Button variant="outline" disabled size="sm">Previous</Button>
                <Button variant="outline" disabled size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
