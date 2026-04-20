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
  Trees,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HerbariumRepository } from "@/repositories/herbarium.repository";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function HerbariumDetailPage({ params }: PageProps) {
  const { id } = await params
  
  let specimen;
  try {
    specimen = await HerbariumRepository.getById(id)
  } catch (error) {
    return notFound()
  }

  if (!specimen) return notFound()

  const mainImage = specimen.specimen_images?.[0]?.secure_url || "/assets/images/herbarium_collection.png";

  return (
    <div className="min-h-screen bg-jkuat-gray-50/50 pb-20 animate-in fade-in duration-1000">
      {/* Immersive Header */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image
          src={mainImage}
          alt={specimen.scientific_name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jkuat-green-dark via-jkuat-green-dark/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="mx-auto max-w-7xl">
            <Link href="/herbarium" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Herbarium Archive
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Badge className="mb-4 bg-jkuat-gold text-white border-none px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                   Preserved Specimen
                </Badge>
                <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tight mb-2">
                  {specimen.scientific_name}
                </h1>
                <p className="text-xl md:text-2xl text-jkuat-green-light font-black tracking-tight">
                   {specimen.herbarium_code} — Accessioned {new Date(specimen.created_at).getFullYear()}
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
            {/* Herbarium Record Details */}
            <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-white">
              <CardHeader className="border-b border-jkuat-gray-100 bg-jkuat-gray-50/50 pb-4">
                <div className="flex items-center gap-2 text-jkuat-green-dark font-black uppercase tracking-widest text-xs">
                  <Landmark className="h-4 w-4 text-jkuat-gold" />
                   Botanical Archival Record
                </div>
              </CardHeader>
              <CardContent className="pt-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-jkuat-gray-400">Accession No</p>
                    <p className="font-extrabold text-jkuat-gray-900 text-sm uppercase">{specimen.herbarium_code}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-jkuat-gray-400">Common Name</p>
                    <p className="font-extrabold text-jkuat-gray-900">{specimen.common_name || '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-jkuat-gray-400">Status</p>
                    <Badge variant="outline" className="text-jkuat-green border-jkuat-green/20 font-black text-[9px] uppercase tracking-widest">Preserved</Badge>
                  </div>
                </div>

                <div className="space-y-10">
                  <section>
                    <h3 className="text-sm font-black text-jkuat-gray-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                      <BookOpen className="h-4 w-4 text-jkuat-green" />
                      Specimen Description
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed font-medium capitalize">
                      {specimen.habitat_description || 'No habitat description provided for this specimen.'}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-sm font-black text-jkuat-gray-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-jkuat-green" />
                      Collection Locality
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed font-medium bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      Coordinates: {specimen.physical_storage_location || 'Digital archive only.'}
                    </p>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <section>
                        <h3 className="text-sm font-black text-jkuat-gray-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                           <Trees className="h-4 w-4 text-jkuat-green" />
                           Ecological Notes
                        </h3>
                        <p className="text-sm text-jkuat-gray-600 font-medium leading-relaxed italic">
                           {specimen.ecological_notes || '—'}
                        </p>
                     </section>
                     <section>
                        <h3 className="text-sm font-black text-jkuat-gray-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                           <FileText className="h-4 w-4 text-jkuat-green" />
                           Ethnobotanical Use
                        </h3>
                        <p className="text-sm text-jkuat-gray-600 font-medium leading-relaxed italic">
                           {specimen.medicinal_notes || '—'}
                        </p>
                     </section>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specimen Scans */}
            <h2 className="text-xl font-black text-jkuat-gray-900 tracking-tight flex items-center gap-2 pt-4">
               Visual Findings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specimen.specimen_images?.length > 0 ? (
                specimen.specimen_images.map((img: any, idx: number) => (
                  <div key={idx} className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-jkuat-gray-100 shadow-sm group">
                    <Image src={img.secure_url} alt="Herbarium Scan" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                ))
              ) : (
                 <div className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-jkuat-gray-100 bg-jkuat-gray-50 flex items-center justify-center">
                    <p className="text-jkuat-gray-400 font-bold text-xs uppercase tracking-widest italic">No Specimen Scans Available</p>
                 </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
               <div className="bg-jkuat-gold h-1.5 w-full" />
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Curation History</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-jkuat-gold-dark">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-jkuat-gray-400">Collected On</p>
                      <p className="font-bold text-jkuat-gray-900">{specimen.collection_date || '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-jkuat-gold-dark">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-jkuat-gray-400">Institutional Collector</p>
                      <p className="font-bold text-jkuat-gray-900">{specimen.collector_id || 'Institutional Staff'}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-jkuat-gray-100 font-mono">
                    <p className="text-[10px] font-black uppercase text-jkuat-gray-400 mb-3 flex items-center gap-1 font-sans">
                       <MapPin className="h-3 w-3 text-jkuat-gold" /> Archival Location
                    </p>
                    <div className="p-5 rounded-2xl bg-jkuat-gold-light/40 border border-jkuat-gold/10 text-sm font-black text-jkuat-gold-dark">
                      {specimen.physical_storage_location || 'NOT_ASSIGNED'}
                    </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-2xl bg-jkuat-gray-900 text-white overflow-hidden">
               <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-jkuat-gold">Audit Integrity</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                     <ShieldCheck className="w-5 h-5 text-emerald-500" />
                     <span className="text-xs font-bold text-jkuat-gray-300">Verified Accession Record</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed opacity-70">
                    This specimen represents a verified botanical record within the JKUAT Bioresources framework, indexed under the institutional herbarium standards.
                  </p>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
