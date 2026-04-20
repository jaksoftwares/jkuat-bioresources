import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  MapPin, 
  Calendar, 
  User, 
  Database, 
  Info,
  BookOpen,
  FileText,
  Clock,
  Landmark,
  Search,
  Focus,
  Trees
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HerbariumDetailPage({ params }: { params: { id: string } }) {
  // Mock data fetching based on the ID
  const specimen = {
    id: params.id || "HERB-99-881",
    taxa: "Prunus africana",
    commonName: "African Cherry / Muiri",
    family: "Rosaceae",
    genus: "Prunus",
    species: "africana",
    collectionDate: "12 Oct 1999",
    locality: "Mt. Kenya Forest, Chogoria Block",
    habitat: "Montane forest, altitude approx 2100m. Found in association with Podocarpus and Ocotea species.",
    description: "Prunus africana is a medium to large evergreen tree. In the JKUAT Herbarium, this specimen represents a significant record from the Mt. Kenya region, preserved to document the morphological characteristics of the population in high-altitude forests.",
    dimensions: "Sheet size: 42cm x 29cm (A3 Standard). Specimen consists of fertile branches with flowers.",
    collector: "Dr. L. Omondi",
    determinedBy: "Prof. P. W. Njenga (2001)",
    accessionNo: "JKUAT-HB-1999-0442",
    storageCabinet: "Cabinet 5, Drawer F, Folder 3",
    conservationStatus: "Vulnerable (IUCN Red List)",
    department: "Herbarium & Botanical Gardens",
    images: ["/assets/images/herbarium_collection.png"]
  };

  return (
    <div className="min-h-screen bg-jkuat-gray-200/20 dark:bg-slate-950 pb-20">
      {/* Immersive Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image
          src="/assets/images/herbarium_collection.png"
          alt={specimen.taxa}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jkuat-green-dark via-jkuat-green-dark/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <Link href="/herbarium" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Herbarium Archive
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Badge className="mb-4 bg-jkuat-gold text-white border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Preserved Specimen
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-white italic tracking-tight mb-2">
                  {specimen.taxa}
                </h1>
                <p className="text-xl md:text-2xl text-jkuat-green-light font-medium tracking-tight">
                   {specimen.id} — Accessioned {specimen.collectionDate.split(' ').pop()}
                </p>
              </div>
              <div className="flex gap-3 pb-1">
                <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button variant="secondary" className="bg-jkuat-green hover:bg-jkuat-green-dark text-white border-none shadow-lg">
                  <Download className="mr-2 h-4 w-4" /> Export Specimen Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scientific Profile Card */}
            <Card className="border-none shadow-card overflow-hidden rounded-xl bg-white dark:bg-slate-900">
              <CardHeader className="border-b bg-jkuat-green-light/30 dark:bg-slate-800/50 pb-4">
                <div className="flex items-center gap-2 text-jkuat-green font-bold">
                  <Landmark className="h-5 w-5 text-jkuat-gold" />
                  <CardTitle className="text-xl font-bold">Herbarium Record Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-8 text-base">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                   <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-jkuat-gray-500">Accession No</p>
                    <p className="font-bold text-jkuat-gray-900 text-sm uppercase">{specimen.accessionNo}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-jkuat-gray-500">Family</p>
                    <p className="font-bold text-jkuat-gray-900 italic">{specimen.family}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-jkuat-gray-500">Genus</p>
                    <p className="font-bold text-jkuat-gray-900 italic">{specimen.genus}</p>
                  </div>
                   <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-jkuat-gray-500">Species</p>
                    <p className="font-bold text-jkuat-gray-900 italic">{specimen.species}</p>
                  </div>
                </div>

                <div className="space-y-10">
                  <section>
                    <h3 className="text-lg font-bold text-jkuat-gray-900 flex items-center gap-2 mb-3 tracking-tight">
                      <BookOpen className="h-5 w-5 text-jkuat-green" />
                      Specimen Description
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed text-base">
                      {specimen.description}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-jkuat-gray-900 flex items-center gap-2 mb-3 tracking-tight">
                      <MapPin className="h-5 w-5 text-jkuat-green" />
                      Collection Locality
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed text-base">
                      {specimen.locality}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-jkuat-gray-900 flex items-center gap-2 mb-3 tracking-tight">
                      <Trees className="h-5 w-5 text-jkuat-green" />
                      Habitat Findings
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed text-base italic">
                      {specimen.habitat}
                    </p>
                  </section>

                   <section>
                    <h3 className="text-lg font-bold text-jkuat-gray-900 flex items-center gap-2 mb-3 tracking-tight">
                      <Focus className="h-5 w-5 text-jkuat-green" />
                      Physical Dimensions
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed text-base">
                      {specimen.dimensions}
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>

            {/* Visual Records */}
            <h2 className="text-2xl font-bold text-jkuat-gray-900 mb-4 pt-4">Specimen Scans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-[3/4] relative rounded-xl overflow-hidden border border-jkuat-gray-200 bg-slate-100 flex items-center justify-center p-8 group">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                 <Image 
                    src={specimen.images[0]} 
                    alt="Herbarium sheet scan" 
                    fill 
                    className="object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500 scale-110" 
                  />
                  <div className="relative z-20 text-center">
                    <Button variant="secondary" className="bg-white/90 shadow-xl backdrop-blur-sm">
                       <Search className="mr-2 h-4 w-4" /> Full Resolution Scan
                    </Button>
                  </div>
              </div>
              <div className="aspect-[3/4] relative rounded-xl overflow-hidden border border-jkuat-gray-200 bg-muted flex items-center justify-center">
                 <p className="text-jkuat-gray-500 text-sm flex items-center gap-2 italic">
                   <Database className="h-4 w-4" /> DIGITAL ARCHIVE REF: {specimen.accessionNo}
                 </p>
              </div>
            </div>
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-6">
            <Card className="border-none shadow-card rounded-xl bg-white dark:bg-slate-900 overflow-hidden">
               <div className="bg-jkuat-green h-2 w-full" />
               <CardHeader>
                 <CardTitle className="text-lg font-bold">Curation History</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-jkuat-green-light flex items-center justify-center text-jkuat-green">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-jkuat-gray-500">Collected On</p>
                      <p className="font-bold text-jkuat-gray-900">{specimen.collectionDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-jkuat-green-light flex items-center justify-center text-jkuat-green">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-jkuat-gray-500">Collector</p>
                      <p className="font-bold text-jkuat-gray-900">{specimen.collector}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-jkuat-green-light flex items-center justify-center text-jkuat-green">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-jkuat-gray-500">Determined By</p>
                      <p className="font-bold text-jkuat-gray-900">{specimen.determinedBy}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-jkuat-gray-200">
                    <p className="text-xs font-bold uppercase text-jkuat-gray-500 mb-3 flex items-center gap-1">
                       <MapPin className="h-3 w-3" /> Herbarium Coordinates
                    </p>
                    <div className="p-4 rounded-xl bg-jkuat-green-light/50 border border-jkuat-green/20 font-mono text-sm font-bold text-jkuat-green-dark">
                      {specimen.storageCabinet}
                    </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-none shadow-card rounded-xl bg-jkuat-green-dark text-white overflow-hidden">
               <CardHeader>
                 <CardTitle className="text-lg font-bold">Conservation Status</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <p className="text-2xl font-black">{specimen.conservationStatus}</p>
                  </div>
                  <p className="mt-4 text-jkuat-green-light opacity-80 text-xs leading-relaxed italic">
                    This specimen represents a key record for biodiversity monitoring within the East African ecosystem.
                  </p>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
