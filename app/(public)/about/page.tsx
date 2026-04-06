import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sprout, 
  Microscope, 
  BookOpen, 
  Target, 
  Lightbulb, 
  Globe, 
  ShieldCheck, 
  ChevronRight
} from "lucide-react";

export default function AboutPage() {
  const corePillars = [
    {
      title: "Plants & AIVs",
      description: "Documenting scientific names, growth conditions, and medicinal/nutritional values of African Indigenous Vegetables.",
      icon: Sprout,
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: "Microbial Strains",
      description: "A digital inventory for bacteria and fungi, tracking precise storage across laboratory fridges and partitions.",
      icon: Microscope,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Herbarium Database",
      description: "Digital preservation of JKUAT's physical herbarium specimens, including taxonomic metadata and reference codes.",
      icon: BookOpen,
      color: "bg-amber-500/10 text-amber-600",
    },
  ];

  const objectives = [
    {
      title: "Centralized Access",
      description: "Transitioning research findings from individual student files into a unified institutional repository.",
      icon: ShieldCheck,
    },
    {
      title: "Data Preservation",
      description: "Protecting critical bioresource information from physical decay and misplacement in laboratories.",
      icon: Target,
    },
    {
      title: "Research Visibility",
      description: "Enabling MSc and PhD discoveries to be accessible to the broader scientific community.",
      icon: Globe,
    },
    {
      title: "Inventory Management",
      description: "Efficiently tracking the physical location and characteristics of thousands of specimens.",
      icon: Lightbulb,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-slate-50 dark:bg-[#09090b]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/about_hero.png"
            alt="JKUAT Research"
            fill
            className="object-cover opacity-60 dark:opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#09090b] dark:via-[#09090b]/90" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4 leading-tight">
              Bridging the Gap Between <br/> <span className="text-primary italic">Laboratory & Digital Discovery</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
              JKUAT Bioresources centralizes biological data, ensuring long-term preservation and visibility for researchers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Purpose */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Institutional Purpose</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Valuable discoveries made by JKUAT researchers often remain inaccessible or prone to decay. This platform digitizes and centralizes three core areas of biological research at our university.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-2xl border bg-slate-50/50 dark:bg-slate-900/50">
                  <h3 className="font-bold text-sm mb-1 text-primary">The Challenge</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Physical storage of specimens in fridges and herbarium shelves is vulnerable to loss, decay, and lack of visibility.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border bg-primary/5">
                  <h3 className="font-bold text-sm mb-1 text-primary">The Solution</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A structured digital system capturing scientific names, growth conditions, and precise physical storage hierarchies.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-video rounded-3xl overflow-hidden border shadow-inner bg-slate-50 dark:bg-slate-900 p-8 flex items-center justify-center">
               <blockquote className="text-base md:text-lg font-medium text-primary text-center italic max-w-md">
                  "Transitioning research from individual notebooks to a centralized, institutional digital legacy."
                </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Core Collections */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30 border-y">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-2">Resource Categories</h2>
            <p className="text-sm text-muted-foreground">
              Digitized data points tailored to JKUAT's specialized research modules.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corePillars.map((pillar, idx) => (
              <Card key={idx} className="border shadow-none bg-background hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className={`h-10 w-10 rounded-lg ${pillar.color} flex items-center justify-center mb-1`}>
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  <Link href={`/${pillar.title.toLowerCase().split(' ')[0]}`}>
                    <Button variant="link" size="sm" className="px-0 h-auto font-bold text-primary">
                      View Module Specifications <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives Area */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold mb-4">Strategic Framework</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Our approach focuses on digital stewardship of primary research data collected across campus laboratories.
              </p>
              <div className="p-6 rounded-2xl bg-secondary text-primary border border-primary/10">
                <h3 className="font-bold mb-2">Research Access</h3>
                <p className="text-xs leading-relaxed mb-4">
                  Registered researchers can bulk-import findings and manage physical specimen locations.
                </p>
                <Link href="/register">
                  <Button variant="outline" className="w-full text-xs h-9 font-bold bg-background">
                    Apply for Dataset Access
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {objectives.map((obj, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <obj.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{obj.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {obj.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-2">Platform Administration</h2>
            <p className="text-sm text-muted-foreground">
              Technical and scientific leads managing the institutional data lifecycle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Prof. Jane Doe", role: "Scientific Lead", specialty: "Bioresource Management" },
              { name: "Dr. John Smith", role: "Repository Admin", specialty: "Microbiology Data" },
              { name: "Ms. Sarah Wanjiku", role: "Herbarium Curator", specialty: "Taxonomy & Digitization" },
              { name: "Mr. David Kamau", role: "Technical Team", specialty: "Systems Architecture" },
            ].map((member, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center p-4 rounded-2xl border hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <div className="relative h-20 w-20 mb-4 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl">
                  {member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}
                </div>
                <h3 className="font-bold text-sm mb-0.5">{member.name}</h3>
                <p className="text-primary text-[11px] font-bold uppercase tracking-tight mb-2">{member.role}</p>
                <div className="h-px w-8 bg-border mb-3 group-hover:w-12 transition-all" />
                <p className="text-[10px] text-muted-foreground uppercase font-medium">Expertise: {member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
             <Image src="/assets/logos/logo-white.svg" alt="" width={800} height={300} className="scale-125" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Advancing JKUAT's Scientific Legacy</h2>
          <p className="text-primary-foreground/90 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Contribute to the centralization of our biological discoveries. Join the network of researchers preserving Kenya's heritage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="h-11 px-6 font-bold bg-white text-primary hover:bg-slate-100 rounded-lg">
                Register as Researcher
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="h-11 px-6 font-bold border-white text-white hover:bg-white/10 rounded-lg">
                Explore The Database
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
