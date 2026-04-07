import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  MapPin, 
  User, 
  Database, 
  Info,
  Microscope,
  FileText,
  Clock,
  FlaskConical,
  Beaker,
  ShieldCheck,
  Thermometer,
  Boxes
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MicroorganismDetailPage({ params }: { params: { id: string } }) {
  // Mock data fetching based on the ID
  const strain = {
    id: params.id || "MIC-0012-B",
    taxa: "Bacillus subtilis",
    genus: "Bacillus",
    species: "subtilis",
    type: "Bacteria",
    isolationSource: "Rhizosphere of African Nightshade",
    collectionDate: "22 Mar 2023",
    description: "Bacillus subtilis is a Gram-positive, rod-shaped, and endospore-forming bacterium commonly found in the soil. Within the JKUAT Bioresources framework, this strain was isolated from the rhizosphere of manugu plants, where it is known to exhibit plant-growth-promoting characteristics.",
    characteristics: "Exhibits robust probiotic potential and high resistance to stress through spore formation. Produces antimicrobial peptides.",
    morphology: "Creamy, opaque colonies with slightly irregular margins on Nutrient Agar. Rod-shaped cells in chains.",
    storageTemperature: "-80°C (Glycerol Stock)",
    labLocation: "Laboratory 2, Freezer Shelf 4, Box 12",
    collector: "Dr. A. Mwangi",
    biosafetyLevel: "BSL-1",
    department: "Microbiology Unit",
    images: ["/assets/images/microorganisms.png"]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Immersive Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image
          src="/assets/images/microorganism.png"
          alt={strain.taxa}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <Link href="/microorganisms" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Microbial Registry
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Badge className="mb-4 bg-blue-500 text-white border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {strain.type}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white italic tracking-tight mb-2">
                  {strain.taxa}
                </h1>
                <p className="text-xl md:text-2xl text-blue-400 font-medium font-mono uppercase tracking-widest leading-none">
                   Strain ID: {strain.id}
                </p>
              </div>
              <div className="flex gap-3 pb-1">
                <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button variant="secondary" className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg">
                  <Download className="mr-2 h-4 w-4" /> Export Data
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
            <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-white dark:bg-slate-900">
              <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-800/50 pb-4">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Beaker className="h-5 w-5" />
                  <CardTitle className="text-xl">Scientific Record</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Genus</p>
                    <p className="text-lg font-bold text-foreground italic">{strain.genus}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Species</p>
                    <p className="text-lg font-bold text-foreground italic">{strain.species}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Biosafety</p>
                    <p className="text-lg font-bold text-foreground flex items-center gap-1">
                       <ShieldCheck className="h-4 w-4 text-emerald-500" /> {strain.biosafetyLevel}
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                      <Microscope className="h-5 w-5 text-blue-500" />
                      Biological Findings
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base italic">
                      {strain.description}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      Key Characteristics
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base italic">
                      {strain.characteristics}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                      <FlaskConical className="h-5 w-5 text-blue-500" />
                      Morphology
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base italic">
                      {strain.morphology}
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>

            {/* Visual Records */}
            <h2 className="text-2xl font-bold text-foreground mb-4 pt-4">Visual Findings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-video relative rounded-2xl overflow-hidden border bg-blue-50/50 dark:bg-blue-950/20 flex items-center justify-center">
                 <div className="text-center">
                    <Image 
                      src="/assets/images/lsb-research.png" 
                      alt="Microscopic view" 
                      fill 
                      className="object-cover opacity-80" 
                    />
                    <div className="relative z-10 p-4 bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-bold uppercase tracking-widest">
                       Laboratory Micro-image
                    </div>
                 </div>
              </div>
              <div className="aspect-video relative rounded-2xl overflow-hidden border bg-muted flex items-center justify-center">
                 <p className="text-muted-foreground text-sm flex items-center gap-2 font-mono">
                   <Database className="h-4 w-4" /> REPOSITORY-REF: {strain.id}
                 </p>
              </div>
            </div>
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
               <div className="bg-blue-600 h-2 w-full" />
               <CardHeader>
                 <CardTitle className="text-lg">Laboratory Records</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground">Isolated On</p>
                      <p className="font-bold text-foreground">{strain.collectionDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground">Researcher</p>
                      <p className="font-bold text-foreground">{strain.collector}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
                      <Boxes className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground">Storage Method</p>
                      <p className="font-bold text-foreground">{strain.storageTemperature}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t font-mono">
                    <p className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-1">
                       <MapPin className="h-3 w-3" /> Storage Coordinates
                    </p>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-bold text-blue-600">
                      {strain.labLocation}
                    </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-2xl bg-blue-900 text-white overflow-hidden">
               <CardHeader>
                 <div className="flex items-center gap-2">
                   <Thermometer className="h-5 w-5" />
                   <CardTitle className="text-lg">Storage Info</CardTitle>
                 </div>
               </CardHeader>
               <CardContent>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <p className="text-2xl font-black">{strain.storageTemperature}</p>
                  </div>
                  <p className="mt-4 text-blue-200 text-xs leading-relaxed italic">
                    All samples are maintained under strict temperature control within the Microbiology Unit repository.
                  </p>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
