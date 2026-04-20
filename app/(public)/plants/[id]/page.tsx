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
  FlaskConical,
  HeartPulse,
  Globe,
  Droplets
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PlantRepository } from "@/repositories/plant.repository";

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
      {/* Immersive Header */}
      <div className="relative h-[50vh] w-full overflow-hidden">
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
            <Link href="/plants" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Registry
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Badge className="mb-4 bg-jkuat-gold text-white border-none px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                  {plant.category || 'Plant Specimen'}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tight mb-2">
                  {plant.scientific_name}
                </h1>
                <p className="text-xl md:text-2xl text-jkuat-green-light font-bold">
                  {plant.common_name || 'No common name registered'}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md font-bold rounded-xl h-12">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button variant="secondary" className="bg-jkuat-green hover:bg-jkuat-green-dark text-white border-none shadow-xl font-bold rounded-xl h-12 px-8">
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
            {/* Scientific Profile */}
            <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-white">
              <CardHeader className="border-b border-jkuat-gray-100 bg-jkuat-gray-50/50 pb-4">
                <div className="flex items-center gap-2 text-jkuat-green-dark font-black uppercase tracking-widest text-xs">
                  <Info className="h-4 w-4" />
                   Scientific Profile
                </div>
              </CardHeader>
              <CardContent className="pt-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-jkuat-gray-400">Family</p>
                    <p className="text-lg font-extrabold text-jkuat-gray-900">{plant.family_name || '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-jkuat-gray-400">Genus</p>
                    <p className="text-lg font-extrabold text-jkuat-gray-900 italic">{plant.genus || '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-jkuat-gray-400">Species</p>
                    <p className="text-lg font-extrabold text-jkuat-gray-900 italic">{plant.species || '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-jkuat-gray-400">Status</p>
                    {plant.is_aiv ? (
                       <Badge className="bg-emerald-600 text-white border-none font-black text-[9px] uppercase tracking-widest">Indigenous</Badge>
                    ) : (
                       <Badge variant="outline" className="text-jkuat-gray-400 border-jkuat-gray-200 font-black text-[9px] uppercase tracking-widest">Standard</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-10">
                  <section>
                    <h3 className="text-sm font-black text-jkuat-gray-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                      <Leaf className="h-4 w-4 text-jkuat-green" />
                      Biological Description
                    </h3>
                    <p className="text-jkuat-gray-700 leading-relaxed font-medium">
                      {plant.description || 'No detailed description available for this record.'}
                    </p>
                  </section>

                  {plant.plant_local_names?.length > 0 && (
                    <section className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <h3 className="text-sm font-black text-jkuat-gray-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                        <Globe className="h-4 w-4 text-jkuat-green" />
                        Ethnobotanical Nomenclature
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {plant.plant_local_names.map((ln: any) => (
                            <div key={ln.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                               <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{ln.language_code}</p>
                               <p className="font-bold text-slate-800">{ln.local_name}</p>
                            </div>
                         ))}
                      </div>
                    </section>
                  )}

                  <section>
                    <h3 className="text-sm font-black text-jkuat-gray-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                      <FileText className="h-4 w-4 text-jkuat-green" />
                      Research Context
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-jkuat-gray-400">Nutritional Value</p>
                          <p className="text-sm font-medium text-jkuat-gray-700">{plant.nutritional_value || 'Data pending analysis.'}</p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-jkuat-gray-400">Medicinal Value</p>
                          <p className="text-sm font-medium text-jkuat-gray-700">{plant.medicinal_value || 'Data pending clinical review.'}</p>
                       </div>
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>

             {/* Recommendations Section */}
             {plant.plant_recommendations?.length > 0 && (
                <div className="space-y-6">
                   <h2 className="text-xl font-black text-jkuat-gray-900 tracking-tight flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-rose-500" /> Clinical & Dietary Guidelines
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {plant.plant_recommendations.map((rec: any) => (
                         <Card key={rec.id} className="border-none shadow-sm bg-emerald-50/50 rounded-2xl">
                            <CardContent className="p-6 space-y-2">
                               <p className="text-xs font-black uppercase tracking-widest text-emerald-800">{rec.use_case}</p>
                               <p className="text-sm font-medium text-emerald-900 leading-relaxed">{rec.recommendation_text}</p>
                            </CardContent>
                         </Card>
                      ))}
                   </div>
                </div>
             )}
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
               <div className="bg-jkuat-green h-1.5 w-full" />
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Collection Metadata</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-jkuat-green-light flex items-center justify-center text-jkuat-green">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-jkuat-gray-400">Added On</p>
                      <p className="font-bold text-jkuat-gray-900">{new Date(plant.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-jkuat-green-light flex items-center justify-center text-jkuat-green">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-jkuat-gray-400">Climate Distribution</p>
                      <p className="font-bold text-jkuat-gray-900">{plant.geographic_distribution?.join(', ') || 'Global'}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-jkuat-gray-100">
                    <p className="text-[10px] font-black uppercase text-jkuat-gray-400 mb-3 flex items-center gap-1">
                      <Droplets className="h-3 w-3" /> Growth Conditions
                    </p>
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs">
                          <span className="font-black text-slate-400 uppercase tracking-widest">Soil</span>
                          <span className="font-bold text-slate-800">{plant.growth_conditions?.soil_type || '—'}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                          <span className="font-black text-slate-400 uppercase tracking-widest">Rainfall</span>
                          <span className="font-bold text-slate-800">{plant.growth_conditions?.rainfall || '—'}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                          <span className="font-black text-slate-400 uppercase tracking-widest">Sun</span>
                          <span className="font-bold text-slate-800">{plant.growth_conditions?.sunlight || '—'}</span>
                       </div>
                    </div>
                  </div>
               </CardContent>
            </Card>

            {plant.cultural_significance && (
               <Card className="border-none shadow-sm rounded-2xl bg-jkuat-gray-900 text-white overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-jkuat-gold">Cultural Significance</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm font-medium leading-relaxed opacity-90 italic">
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
