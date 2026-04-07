import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sprout, 
  Microscope, 
  BookOpen, 
  Database, 
  ShieldCheck, 
  Search, 
  Network,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  const collections = [
    {
      title: "Indigenous Plants",
      description: "Learn about African Indigenous Vegetables (AIVs) including their scientific profiles, where they grow, and their benefits.",
      icon: Sprout,
      image: "/assets/images/indigenous_plants.png",
      color: "bg-emerald-500/10 text-emerald-600",
      link: "/plants"
    },
    {
      title: "Microorganisms",
      description: "Browse our collection of bacterial and fungal samples with detailed records from our campus laboratories.",
      icon: Microscope,
      image: "/assets/images/microorganisms.png",
      color: "bg-blue-500/10 text-blue-600",
      link: "/microorganisms"
    },
    {
      title: "Herbarium Collection",
      description: "View preserved plant specimens including their scientific names, collection dates, and natural habitats.",
      icon: BookOpen,
      image: "/assets/images/herbarium_collection.png",
      color: "bg-amber-500/10 text-amber-600",
      link: "/herbarium"
    },
  ];

  const features = [
    {
      title: "Information Access",
      description: "All research findings from across JKUAT's biological departments are easy to find and explore.",
      icon: Database,
    },
    {
      title: "Sample Location",
      description: "Know exactly where physical samples are kept, from laboratory shelves to specialized cabinets.",
      icon: ShieldCheck,
    },
    {
      title: "Scientific Search",
      description: "Use our search tools to quickly find specific plants, microbes, or herbarium records by name.",
      icon: Search,
    },
    {
      title: "Collaborative Work",
      description: "Share and discover scientific findings with other researchers and students across the university.",
      icon: Network,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden border-b">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/about_hero.png"
            alt="JKUAT Research Laboratory"
            fill
            sizes="100vw"
            className="object-cover opacity-40 dark:opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
              JKUAT Bioresources
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6 leading-tight">
              About JKUAT <br/> <span className="text-primary">Bioresources</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Our platform is the official home for biological research at JKUAT—helping you find and track valuable information about our natural resources.
            </p>
          </div>
        </div>
      </section>

      {/* About the Platform */}
      <section className="py-24 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  JKUAT Bioresources is the official home for biological research findings at our university. We provide the tools for faculty and students to record and explore their scientific work.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl border bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Preserving Research</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We ensure that valuable research information is recorded and kept safe for future scientific study.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 rounded-2xl border bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Sample Tracking</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Easily locate physical samples across our campus laboratories, including fridge shelves and herbarium cabinets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[2.5rem] overflow-hidden border shadow-2xl relative z-10 bg-slate-100">
                <Image 
                  src="/assets/images/laboratory_research.png" 
                  alt="Laboratory Research" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 h-64 w-64 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-8 -left-8 h-64 w-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Collections */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Research Areas</h2>
            <p className="text-lg text-muted-foreground">
              Explore our primary collections and the work being done across different biological fields.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((item, idx) => (
              <Card key={idx} className="border-none shadow-sm bg-background hover:shadow-md transition-all group overflow-hidden rounded-[24px] flex flex-col h-full p-0 gap-0">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader className="pb-4 pt-6">
                  <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-8 flex-grow">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <Link href={item.link}>
                    <Button variant="ghost" className="px-0 group/btn font-bold text-primary hover:bg-transparent h-auto p-0">
                      View Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-bold mb-6">What You Can Do</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                JKUAT Bioresources gives researchers and students the right tools to record and share their scientific findings easily.
              </p>
              <Link href="/register">
                <Button className="h-12 px-8 font-bold rounded-xl shadow-lg shadow-primary/20">
                  Request Access
                </Button>
              </Link>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-12">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/10">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Coordination */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-y">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary/60 mb-12">
            Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center text-center">
            {[
              { name: "Botany Dept.", logo: "/assets/logos/JKUAT-Logo.jpg" },
              { name: "Food Science & Tech", logo: "/assets/logos/JKUAT-Logo.jpg" },
              { name: "Biochemistry", logo: "/assets/logos/JKUAT-Logo.jpg" },
              { name: "Agriculture Ecosystems", logo: "/assets/logos/JKUAT-Logo.jpg" },
              { name: "Genetic Research Lab", logo: "/assets/logos/JKUAT-Logo.jpg" }
            ].map((partner, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md hover:border-primary/20 transition-all group flex flex-col items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    sizes="(max-width: 768px) 48px, 48px"
                    className="object-contain"
                  />
                </div>
                <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-white dark:bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the researchers and staff from the Department of Biological Sciences at JKUAT.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Prof. Jane Doe", role: "Scientific Lead" },
              { name: "Dr. John Smith", role: "Repository Admin" },
              { name: "Ms. Sarah Wanjiku", role: "Herbarium Curator" },
              { name: "Mr. David Kamau", role: "Technical Team" },
            ].map((member, idx) => (
              <div key={idx} className="p-6 rounded-2xl border hover:border-primary/20 transition-all">
                <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center text-primary font-bold text-xl">
                  {member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}
                </div>
                <h3 className="font-bold text-base mb-1">{member.name}</h3>
                <p className="text-primary text-xs font-bold uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
             <Image src="/assets/logos/logo-white.svg" alt="" width={800} height={300} className="scale-150 rotate-12" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Advancing Scientific Research</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-10 text-lg">
            Join our network of researchers and help us preserve Kenya's rich biological heritage for future generations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 font-bold bg-white text-primary hover:bg-slate-100 rounded-xl shadow-xl">
                Get Started
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="h-14 px-10 font-bold border-white/30 text-white hover:bg-white/10 rounded-xl backdrop-blur-sm">
                Explore The Site
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
