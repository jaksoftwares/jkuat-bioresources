import { Sprout, Microscope, Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Indigenous Plants",
    description: "Learn about African Indigenous Vegetables (AIVs) including their scientific profiles, where they grow, and their benefits.",
    icon: Sprout,
    image: "/assets/images/indigenous_plants.png",
    href: "/plants",
    color: "bg-primary text-white",
  },
  {
    title: "Microorganisms",
    description: "Explore our collection of bacterial and fungal samples with detailed scientific records from JKUAT laboratories.",
    icon: Microscope,
    image: "/assets/images/microorganisms.png",
    href: "/microorganisms",
    color: "bg-accent text-white",
  },
  {
    title: "Herbarium Collection",
    description: "View preserved plant specimens including scientific names, collection dates, and natural habitats.",
    icon: Leaf,
    image: "/assets/images/herbarium_collection.png",
    href: "/herbarium",
    color: "bg-secondary-foreground text-white",
  }
];

export function LandingFeatures() {
  return (
    <section className="bg-muted py-24 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center">Research Areas</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            Explore the biological collections and scientific studies conducted at Jomo Kenyatta University.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <Card key={i} className="group border-none shadow-card hover:shadow-lg transition-all duration-300 rounded-[24px] overflow-hidden flex flex-col h-full bg-card p-0 gap-0">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <CardHeader className="pb-2 pt-6">
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/50 bg-background/50 mt-auto">
                <Link href={feature.href} className="w-full">
                  <Button variant="ghost" className="w-full justify-between font-bold group-hover:text-primary p-0 h-auto hover:bg-transparent">
                    View Collection
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
