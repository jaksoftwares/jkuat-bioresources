import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  MapPin, 
  Database, 
  Microscope,
  FileText,
  Clock,
  FlaskConical,
  Beaker,
  ShieldCheck,
  Thermometer
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MicroorganismRepository } from "@/repositories/microorganism.repository";
import ImageGallery from "@/components/public/image-gallery";

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
            <Link href="/microorganisms" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-bold">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Microorganisms
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                  {micro.scientific_name}
                </h1>
                <p className="text-xl md:text-2xl text-jkuat-green-light font-bold font-mono">
                   ID: {micro.strain_code || 'N/A'}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md rounded-xl font-bold">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button variant="secondary" className="bg-jkuat-green hover:bg-jkuat-green-dark text-white border-none shadow-xl rounded-xl font-bold px-8">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-white">
              <CardHeader className="border-b border-jkuat-gray-100 bg-jkuat-gray-50/50 pb-4">
                <div className="flex items-center gap-2 text-jkuat-green-dark font-bold text-sm">
                  <Beaker className="h-4 w-4" />
                   Profile
                </div>
              </CardHeader>
              <CardContent className="pt-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">Opt. Temperature</p>
                    <p className="text-lg font-bold text-gray-900">{micro.optimum_temperature ? `${micro.optimum_temperature}°C` : '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">pH Range</p>
                    <p className="text-lg font-bold text-gray-900">{micro.min_ph || '-'} to {micro.max_ph || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">Biosafety Level</p>
                    <p className="text-lg font-bold text-gray-900 flex items-center gap-1">
                       <ShieldCheck className="h-4 w-4 text-emerald-600" /> BSL-1
                    </p>
                  </div>
                </div>

                <div className="space-y-10">
                  <section>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <Microscope className="h-4 w-4 text-jkuat-green" />
                      Characteristics
                    </h3>
                    <p className="text-gray-700">
                      {micro.characteristics || 'None provided.'}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <FlaskConical className="h-4 w-4 text-jkuat-green" />
                      Enzymatic Activity
                    </h3>
                    <p className="text-gray-700">
                      {micro.enzymatic_activity || 'None provided.'}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-jkuat-green" />
                      Notes
                    </h3>
                    <p className="text-gray-700">
                      {micro.experiment_details || 'None provided.'}
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-xl font-bold text-gray-900 pt-4 pb-2">
               Images
            </h2>
            <ImageGallery 
               images={micro.microscopy_images} 
               altBase={micro.scientific_name} 
               imageClassName="aspect-video"
            />
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-bold text-gray-900">Storage Information</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Date Stored</p>
                      <p className="font-bold text-gray-900">{micro.date_stored || '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Growth Medium</p>
                      <p className="font-bold text-gray-900">{micro.growth_medium || '—'}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
                       <MapPin className="h-3 w-3" /> Isolation Source
                    </p>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm font-medium text-gray-700">
                      {micro.source_isolated_from || '—'}
                    </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-2xl bg-gray-900 text-white overflow-hidden">
               <CardHeader>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-gray-300" />
                    <CardTitle className="text-sm font-bold">Storage Temperature</CardTitle>
                  </div>
               </CardHeader>
               <CardContent>
                  <div className="p-5 rounded-xl bg-white/10 border border-white/20">
                    <p className="text-2xl font-bold">{micro.optimum_temperature || '—'}°C Target</p>
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
