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
import { notFound } from "next/navigation";
import { MicroorganismRepository } from "@/repositories/microorganism.repository";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MicroorganismDetailPage({ params }: PageProps) {
  const { id } = await params
  
  let micro;
  try {
    micro = await MicroorganismRepository.getById(id)
  } catch (error) {
    return notFound()
  }

  if (!micro) return notFound()

  const mainImage = micro.microscopy_images?.[0]?.secure_url || "/assets/images/microorganism.png";

  return (
    <div className="min-h-screen bg-jkuat-gray-50/50 pb-20 animate-in fade-in duration-1000">
      {/* Immersive Header */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image
          src={mainImage}
          alt={micro.scientific_name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jkuat-green-dark via-jkuat-green-dark/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="mx-auto max-w-7xl">
            <Link href="/microorganisms" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Microbial Registry
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Badge className="mb-4 bg-jkuat-gold text-white border-none px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                  Strain Record
                </Badge>
                <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tight mb-2 uppercase">
                  {micro.scientific_name}
                </h1>
                <p className="text-xl md:text-2xl text-jkuat-green-light font-black font-mono tracking-widest leading-none">
                   ID: {micro.strain_code || 'UNASSIGNED'}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md rounded-xl font-bold">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button variant="secondary" className="bg-jkuat-green hover:bg-jkuat-green-dark text-white border-none shadow-xl rounded-xl font-bold px-8">
                  <Download className="mr-2 h-4 w-4" /> Export Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Scientific Record */}
            <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-white">
              <CardHeader className="border-b border-jkuat-gray-100 bg-jkuat-gray-50/50 pb-4">
                <div className="flex items-center gap-2 text-jkuat-green-dark font-black uppercase tracking-widest text-xs">
                  <Beaker className="h-4 w-4" />
                   Physiological Profile
                </div>
              </CardHeader>
              <CardContent className="pt-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-jkuat-gray-400">Opt. Temperature</p>
                    <p className="text-lg font-extrabold text-jkuat-gray-900">{micro.optimum_temperature ? `${micro.optimum_temperature}°C` : '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-jkuat-gray-400">pH Growth Range</p>
                    <p className="text-lg font-extrabold text-jkuat-gray-900">{micro.min_ph} - {micro.max_ph}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-jkuat-gray-400">Biosafety Level</p>
                    <p className="text-lg font-extrabold text-jkuat-gray-900 flex items-center gap-1">
                       <ShieldCheck className="h-4 w-4 text-emerald-600" /> BSL-1
                    </p>
                  </div>
                </div>

                <div className="space-y-10">
                  <section>
                    <h3 className="text-sm font-black text-jkuat-gray-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                      <Microscope className="h-4 w-4 text-jkuat-green" />
                      Biological Summary
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed font-medium">
                      {micro.characteristics || 'No specific characteristics registered for this strain.'}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-sm font-black text-jkuat-gray-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                      <FlaskConical className="h-4 w-4 text-jkuat-green" />
                      Enzymatic Activity & Assay
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed font-medium bg-emerald-50/20 p-6 rounded-2xl border border-emerald-50 italic">
                      {micro.enzymatic_activity || 'Data pending enzymatic assay results.'}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-sm font-black text-jkuat-gray-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                      <FileText className="h-4 w-4 text-jkuat-green" />
                      Experimental Notes
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed font-medium">
                      {micro.experiment_details || 'Institutional research notes not provided.'}
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>

            {/* Visual Records */}
            <h2 className="text-xl font-black text-jkuat-gray-900 tracking-tight flex items-center gap-2 pt-4">
               Visual Findings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {micro.microscopy_images?.length > 0 ? (
                micro.microscopy_images.map((img: any, idx: number) => (
                  <div key={idx} className="aspect-video relative rounded-2xl overflow-hidden border border-jkuat-gray-100 shadow-sm">
                    <Image src={img.secure_url} alt="Microscopy" fill className="object-cover" />
                  </div>
                ))
              ) : (
                 <div className="aspect-video relative rounded-2xl overflow-hidden border border-jkuat-gray-100 bg-jkuat-gray-50 flex items-center justify-center">
                    <p className="text-jkuat-gray-400 font-bold text-xs uppercase tracking-widest">No Visual Micrographs</p>
                 </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
               <div className="bg-jkuat-green h-1.5 w-full" />
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Archival Records</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-50 flex items-center justify-center text-jkuat-green">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-jkuat-gray-400">Stored On</p>
                      <p className="font-bold text-jkuat-gray-900">{micro.date_stored || '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-50 flex items-center justify-center text-jkuat-green">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-jkuat-gray-400">Culture Medium</p>
                      <p className="font-bold text-jkuat-gray-900">{micro.growth_medium || 'Standard Agar'}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-jkuat-gray-100 font-mono">
                    <p className="text-[10px] font-black uppercase text-jkuat-gray-400 mb-3 flex items-center gap-1 font-sans">
                       <MapPin className="h-3 w-3" /> Isolation Source
                    </p>
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-600 leading-relaxed italic">
                      {micro.source_isolated_from || 'Source location unlisted.'}
                    </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-2xl bg-jkuat-green-dark text-white overflow-hidden">
               <CardHeader>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-emerald-300" />
                    <CardTitle className="text-sm font-black uppercase tracking-widest">Stability Profile</CardTitle>
                  </div>
               </CardHeader>
               <CardContent>
                  <div className="p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <p className="text-2xl font-black tracking-tight">{micro.optimum_temperature || '37'}°C Target</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-1">Regulated Incubation</p>
                  </div>
                  <p className="mt-4 text-emerald-100/60 text-xs leading-relaxed italic">
                    Samples in the JKUAT Bioresources repository are maintained under standardized cryopromotion protocols.
                  </p>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
