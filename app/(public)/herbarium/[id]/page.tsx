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
  BookOpen,
  FileText,
  Trees
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HerbariumRepository } from "@/repositories/herbarium.repository";
import ImageGallery from "@/components/public/image-gallery";

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
            <Link href="/herbarium" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-bold">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Herbarium
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                  {specimen.scientific_name}
                </h1>
                <p className="text-xl md:text-2xl text-jkuat-green-light font-bold">
                   {specimen.herbarium_code}
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
              <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
                <div className="flex items-center gap-2 text-jkuat-green-dark font-bold text-sm">
                  <BookOpen className="h-4 w-4 text-jkuat-gold" />
                   Record Details
                </div>
              </CardHeader>
              <CardContent className="pt-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">Code</p>
                    <p className="font-bold text-gray-900 text-sm uppercase">{specimen.herbarium_code}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">Common Name</p>
                    <p className="font-bold text-gray-900">{specimen.common_name || '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">State</p>
                    <Badge variant="outline" className="text-gray-600 border-gray-200 font-bold text-[10px]">Preserved</Badge>
                  </div>
                </div>

                <div className="space-y-10">
                  <section>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-jkuat-green" />
                      Habitat
                    </h3>
                    <p className="text-gray-700 capitalize">
                      {specimen.habitat_description || 'None provided.'}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-jkuat-green" />
                      Location
                    </h3>
                    <p className="text-gray-700">
                      {specimen.physical_storage_location || 'Not listed.'}
                    </p>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <section>
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                           <Trees className="h-4 w-4 text-jkuat-green" />
                           Ecological Notes
                        </h3>
                        <p className="text-sm text-gray-600">
                           {specimen.ecological_notes || '—'}
                        </p>
                     </section>
                     <section>
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                           <FileText className="h-4 w-4 text-jkuat-green" />
                           Medicinal Notes
                        </h3>
                        <p className="text-sm text-gray-600">
                           {specimen.medicinal_notes || '—'}
                        </p>
                     </section>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-xl font-bold text-gray-900 pt-4 pb-2">
               Images
            </h2>
            <ImageGallery 
               images={specimen.specimen_images} 
               altBase={specimen.scientific_name} 
               imageClassName="aspect-[3/4]"
            />
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-bold text-gray-900">Collection Information</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Collection Date</p>
                      <p className="font-bold text-gray-900">{specimen.collection_date || '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Collector</p>
                      <p className="font-bold text-gray-900">{specimen.collector_id || '—'}</p>
                    </div>
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
