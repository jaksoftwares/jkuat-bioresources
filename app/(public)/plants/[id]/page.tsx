import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  MapPin, 
  Info,
  Leaf,
  FileText,
  Clock,
  HeartPulse,
  Globe,
  Droplets
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PlantRepository } from "@/repositories/plant.repository";
import ImageGallery from "@/components/public/image-gallery";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PlantDetailPage({ params }: PageProps) {
  const { id } = await params
  
  let plant;
  try {
    plant = await PlantRepository.getById(id)
  } catch (error) {
    return notFound()
  }

  if (!plant) return notFound()

  const mainImage = plant.images?.[0]?.secure_url || "/assets/images/indigenous_plants.png";

  return (
    <div className="min-h-screen bg-jkuat-gray-50/50 pb-20 animate-in fade-in duration-1000">
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image
          src={mainImage}
          alt={plant.scientific_name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jkuat-green-dark via-jkuat-green-dark/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="mx-auto max-w-7xl">
            <Link href="/plants" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-bold">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Plants
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                  {plant.scientific_name}
                </h1>
                <p className="text-xl md:text-2xl text-jkuat-green-light font-bold">
                  {plant.common_name || 'No common name'}
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
                  <Info className="h-4 w-4" />
                   Profile
                </div>
              </CardHeader>
              <CardContent className="pt-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">Family</p>
                    <p className="text-lg font-bold text-gray-900">{plant.family_name || '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">Genus</p>
                    <p className="text-lg font-bold text-gray-900">{plant.genus || '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">Species</p>
                    <p className="text-lg font-bold text-gray-900">{plant.species || '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">Status</p>
                    {plant.is_aiv ? (
                       <Badge className="bg-emerald-600 text-white border-none font-bold text-[10px]">Indigenous</Badge>
                    ) : (
                       <Badge variant="outline" className="text-gray-500 border-gray-200 font-bold text-[10px]">Standard</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-10">
                  <section>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
                      <Leaf className="h-4 w-4 text-jkuat-green" />
                      Description
                    </h3>
                    <p className="text-gray-700">
                      {plant.description || 'None provided.'}
                    </p>
                  </section>

                  {plant.plant_local_names?.length > 0 && (
                    <section className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                        <Globe className="h-4 w-4 text-jkuat-green" />
                        Local Names
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                         {plant.plant_local_names.map((ln: any) => (
                            <div key={ln.id} className="bg-white p-3 rounded-lg border border-gray-200">
                               <p className="text-xs font-bold text-gray-400 mb-1 uppercase">{ln.language_code}</p>
                               <p className="font-bold text-gray-800">{ln.local_name}</p>
                            </div>
                         ))}
                      </div>
                    </section>
                  )}

                  <section>
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                      <FileText className="h-4 w-4 text-jkuat-green" />
                      Uses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <p className="text-xs font-bold text-gray-500 uppercase">Nutritional</p>
                          <p className="text-sm text-gray-700">{plant.nutritional_value || 'None provided.'}</p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-xs font-bold text-gray-500 uppercase">Medicinal</p>
                          <p className="text-sm text-gray-700">{plant.medicinal_value || 'None provided.'}</p>
                       </div>
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>

             {/* Images */}
            <h2 className="text-xl font-bold text-gray-900 pt-4 pb-2">
               Images
            </h2>
            <ImageGallery 
               images={plant.images} 
               altBase={plant.scientific_name} 
               imageClassName="aspect-video"
            />

             {plant.plant_recommendations?.length > 0 && (
                <div className="space-y-4">
                   <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 pt-2">
                      <HeartPulse className="w-5 h-5 text-rose-500" /> Recommendations
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {plant.plant_recommendations.map((rec: any) => (
                         <Card key={rec.id} className="border-none shadow-sm bg-emerald-50 rounded-xl">
                            <CardContent className="p-5 space-y-2">
                               <p className="text-xs font-bold text-emerald-700 uppercase">{rec.use_case}</p>
                               <p className="text-sm text-emerald-900">{rec.recommendation_text}</p>
                            </CardContent>
                         </Card>
                      ))}
                   </div>
                </div>
             )}
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-bold text-gray-900">Information</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Added On</p>
                      <p className="font-bold text-gray-900">{new Date(plant.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Distribution</p>
                      <p className="font-bold text-gray-900">{plant.geographic_distribution?.join(', ') || '—'}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-4 flex items-center gap-1">
                      <Droplets className="h-3 w-3" /> Growth Conditions
                    </p>
                    <div className="space-y-3">
                       <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-500">Soil</span>
                          <span className="font-bold text-gray-800">{plant.growth_conditions?.soil_type || '—'}</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-500">Rainfall</span>
                          <span className="font-bold text-gray-800">{plant.growth_conditions?.rainfall || '—'}</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-500">Sun</span>
                          <span className="font-bold text-gray-800">{plant.growth_conditions?.sunlight || '—'}</span>
                       </div>
                    </div>
                  </div>
               </CardContent>
            </Card>

            {plant.cultural_significance && (
               <Card className="border-none shadow-sm rounded-2xl bg-gray-900 text-white">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold text-gray-200">Cultural Significance</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-gray-300">
                        "{plant.cultural_significance}"
                     </p>
                  </CardContent>
               </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
