"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MicroorganismSchema } from "@/features/microorganisms/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImagePlus, UploadCloud, Save, FileText, Beaker, MapPin, Database } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewMicroorganismPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  // 1. Initialize the massive form using the Zod schema from Phase 1
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(MicroorganismSchema),
    defaultValues: {
      scientific_name: "",
      category: "Bacteria",
      taxonomic_information: {},
      details_of_isolation: {},
      growth_related_information: {},
      pathogenicity_information: { biohazard_group: "1" },
    }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard/microorganisms");
    }, 1500);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
       setImages(Array.from(e.target.files));
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Microorganism</h1>
          <p className="text-muted-foreground mt-2">Enter the comprehensive scientific metadata for a new microbial strain.</p>
        </div>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="font-bold">
           <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Record"}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Main Identifier */}
        <Card className="border-primary/20 shadow-sm">
          <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10">
            <CardTitle className="text-lg flex items-center gap-2">
               <FileText className="h-5 w-5 text-primary" /> Primary Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div>
              <label className="text-sm font-bold block mb-1">Scientific Name *</label>
              <Input placeholder="e.g. Bacillus subtilis" className="italic font-medium" {...register("scientific_name")} />
              {errors.scientific_name && <p className="text-xs text-destructive mt-1">{errors.scientific_name.message as string}</p>}
            </div>
            <div>
              <label className="text-sm font-bold block mb-1">Strain Number</label>
              <Input placeholder="e.g. JKUAT-MB-001" className="font-mono" {...register("taxonomic_information.strain_number")} />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Origin & Isolation */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                   <MapPin className="h-5 w-5 text-muted-foreground" /> Origin & Isolation
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium block mb-1">Source of Isolation</label>
                  <Input placeholder="e.g. Soil, Water, Clinical" {...register("details_of_isolation.source_of_isolation")} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Country</label>
                  <Input placeholder="e.g. Kenya" {...register("details_of_isolation.country")} />
                </div>
              </CardContent>
            </Card>

            {/* Growth Conditions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                   <Beaker className="h-5 w-5 text-muted-foreground" /> Cultivation & Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium block mb-1">Growth Medium</label>
                  <Input placeholder="e.g. Nutrient Agar" {...register("growth_related_information.growth_medium_name")} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Optimum Temp (°C)</label>
                  <Input type="number" placeholder="e.g. 37" {...register("growth_related_information.optimum_temperature_celsius", { valueAsNumber: true })} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            
            {/* Media Upload (Addressing the user's specific request) */}
            <Card className="shadow-sm border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                   <ImagePlus className="h-5 w-5 text-primary" /> Media & Images
                </CardTitle>
                <CardDescription>Upload microscopy images or culture plates. These will map to the `images` JSONB array in Supabase.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-background hover:bg-muted/50 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                  <UploadCloud className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm font-bold text-foreground">Click or drag images to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each</p>
                </div>
                
                {images.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-bold uppercase text-muted-foreground">Selected Files:</p>
                    {images.map((file, i) => (
                      <div key={i} className="flex items-center justify-between bg-background border border-border p-2 rounded text-sm">
                         <span className="truncate max-w-[180px]">{file.name}</span>
                         <Badge variant="secondary">{(file.size / 1024).toFixed(1)} KB</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety & CBD */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                   <Database className="h-5 w-5 text-muted-foreground" /> Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium block mb-1">Risk Group</label>
                  <select 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    {...register("pathogenicity_information.biohazard_group")}
                  >
                    <option value="1">Risk Group 1 (Lowest)</option>
                    <option value="2">Risk Group 2</option>
                    <option value="3">Risk Group 3</option>
                    <option value="4">Risk Group 4 (Highest)</option>
                  </select>
                </div>
                <Separator />
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <input type="checkbox" className="mt-1" {...register("cbd_information.pic_taken")} />
                  <div className="space-y-1 leading-none">
                    <label className="text-sm font-medium">CBD / Nagoya Protocol Compliant</label>
                    <p className="text-sm text-muted-foreground">Check if Prior Informed Consent (PIC) was acquired.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
