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
  Leaf,
  FileText,
  Clock,
  FlaskConical
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PlantDetailPage({ params }: { params: { id: string } }) {
  // Mock data fetching based on the ID
  const plant = {
    id: params.id || "AIV-2026-45A",
    taxa: "Amaranthus hybridus",
    local: "Mchicha / Terere",
    family: "Amaranthaceae",
    order: "Caryophyllales",
    description: "Amaranthus hybridus, commonly known as green amaranth or slim amaranth, is a widespread species of flowering plant. It is widely cultivated as a leaf vegetable across Sub-Saharan Africa due to its high nutritional value, containing significant amounts of vitamin A, vitamin C, iron, and calcium.",
    distribution: "Found throughout East Africa, particularly in fertile, well-drained soils near agricultural settlements.",
    usage: "The leaves and young stems are eaten boiled or in stews. In some cultures, the seeds are harvested and used as a pseudocereal. It is also used traditionally to treat anemia due to its high iron content.",
    conservationStatus: "Not Evaluated (Common)",
    storageLocation: "Laboratory 4, Cabinet B, Shelf 2",
    accessionDate: "15 Jan 2026",
    collector: "Dr. K. Mburu",
    department: "Botany Department",
    images: ["/assets/images/indigenous_plants.png"]
  };

  return (
    <div className="min-h-screen bg-jkuat-gray-200/20 dark:bg-slate-950 pb-20">
      {/* Immersive Header */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <Image
          src="/assets/images/spider-plant.jpg"
          alt={plant.taxa}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jkuat-green-dark via-jkuat-green-dark/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="mx-auto max-w-7xl">
            <Link href="/plants" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Plant Registry
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Badge className="mb-4 bg-jkuat-gold text-white border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Plant Specimen
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-white italic tracking-tight mb-2">
                  {plant.taxa}
                </h1>
                <p className="text-xl md:text-2xl text-jkuat-green-light font-medium">
                  {plant.local}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button variant="secondary" className="bg-jkuat-green hover:bg-jkuat-green-dark text-white border-none shadow-lg">
                  <Download className="mr-2 h-4 w-4" /> Export Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scientific Profile Card */}
            <Card className="border-none shadow-card overflow-hidden rounded-xl bg-white dark:bg-slate-900">
              <CardHeader className="border-b bg-jkuat-green-light/30 dark:bg-slate-800/50 pb-4">
                <div className="flex items-center gap-2 text-jkuat-green font-bold">
                  <Info className="h-5 w-5" />
                  <CardTitle className="text-xl font-bold">Scientific Profile</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-jkuat-gray-500">ID Number</p>
                    <p className="font-mono text-lg font-bold text-jkuat-gray-900">{plant.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-jkuat-gray-500">Family</p>
                    <p className="text-lg font-bold text-jkuat-gray-900">{plant.family}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-jkuat-gray-500">Order</p>
                    <p className="text-lg font-bold text-jkuat-gray-900">{plant.order}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-lg font-bold text-jkuat-gray-900 flex items-center gap-2 mb-3">
                      <Leaf className="h-5 w-5 text-jkuat-green" />
                      Biological Description
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed text-base italic">
                      {plant.description}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-jkuat-gray-900 flex items-center gap-2 mb-3">
                      <MapPin className="h-5 w-5 text-jkuat-green" />
                      Distribution & Habitat
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed text-base">
                      {plant.distribution}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-jkuat-gray-900 flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-jkuat-green" />
                      Uses & Importance
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed text-base">
                      {plant.usage}
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>

            {/* Visual Records */}
            <h2 className="text-2xl font-bold text-jkuat-gray-900 mb-4 pt-4">Visual Records</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-video relative rounded-xl overflow-hidden border border-jkuat-gray-200 bg-muted">
                <Image 
                  src="/assets/images/avis.png" 
                  alt="Specimen view 1" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform" 
                />
              </div>
              <div className="aspect-video relative rounded-xl overflow-hidden border border-jkuat-gray-200 bg-muted flex items-center justify-center">
                 <p className="text-jkuat-gray-500 text-sm flex items-center gap-2">
                   <Database className="h-4 w-4" /> Lab Photo Unavailable
                 </p>
              </div>
            </div>
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-6">
            <Card className="border-none shadow-card rounded-xl bg-white dark:bg-slate-900 overflow-hidden">
               <div className="bg-jkuat-green h-2 w-full" />
               <CardHeader>
                 <CardTitle className="text-lg font-bold">Accession Data</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-jkuat-green-light flex items-center justify-center text-jkuat-green">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-jkuat-gray-500">Collected On</p>
                      <p className="font-bold text-jkuat-gray-900">{plant.accessionDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-jkuat-green-light flex items-center justify-center text-jkuat-green">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-jkuat-gray-500">Collected By</p>
                      <p className="font-bold text-jkuat-gray-900">{plant.collector}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-jkuat-green-light flex items-center justify-center text-jkuat-green">
                      <FlaskConical className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-jkuat-gray-500">Department</p>
                      <p className="font-bold text-jkuat-gray-900">{plant.department}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-jkuat-gray-200">
                    <p className="text-xs font-bold uppercase text-jkuat-gray-500 mb-3 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Storage Location
                    </p>
                    <div className="p-4 rounded-xl bg-jkuat-green-light/50 border border-jkuat-green/20 font-mono text-sm font-bold text-jkuat-green-dark">
                      {plant.storageLocation}
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
                    <p className="text-2xl font-black">{plant.conservationStatus}</p>
                  </div>
                  <p className="mt-4 text-jkuat-green-light opacity-80 text-xs leading-relaxed">
                    This status indicates the current research priority level within our institutional bioresources framework.
                  </p>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
