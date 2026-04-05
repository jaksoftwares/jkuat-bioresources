import { Sprout, Microscope, Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "African Indigenous Vegetables",
    description: "Digital catalogs encompassing seed origins, phenotypes, medicinal values, and geographical mapping of plants.",
    icon: Sprout,
    href: "/plants",
    color: "bg-primary text-white",
  },
  {
    title: "Microorganism Collection",
    description: "Detailed genomic and phenotypic records mapping to physical laboratory storage matrices across JKUAT bio-labs.",
    icon: Microscope,
    href: "/microorganisms",
    color: "bg-accent text-white",
  },
  {
    title: "Herbarium Repository",
    description: "High-resolution digital preservation of physical botanical specimens referencing environmental climates and timestamps.",
    icon: Leaf,
    href: "/herbarium",
    color: "bg-secondary-foreground text-white",
  }
];

export function LandingFeatures() {
  return (
    <section className="bg-muted py-24 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center">Core Research Repositories</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            Our infrastructure securely categorizes and exposes diverse bio-data assets to promote cross-institutional research initiatives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <Card key={i} className="group border-none shadow-card hover:shadow-lg transition-all duration-300 rounded-[16px] overflow-hidden">
              <CardHeader className="pb-4">
                <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/50 bg-background/50">
                <Link href={feature.href} className="w-full">
                  <Button variant="ghost" className="w-full justify-between font-semibold group-hover:text-primary">
                    View Catalog
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
