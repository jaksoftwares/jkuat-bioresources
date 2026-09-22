import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Database, Microscope, Search, ShieldCheck, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

const collections = [
  {
    title: "Indigenous Plants",
    description: "Browse African Indigenous Vegetable records with scientific profiles, growing information, and related uses.",
    image: "/Thumbnail to AIVs.jpg",
    icon: Sprout,
    href: "/plants",
  },
  {
    title: "Microorganisms",
    description: "Browse documented bacterial, fungal, algal, and other microbial strain records from JKUAT collections.",
    image: "/Thumbnail to bacteria repository.png",
    icon: Microscope,
    href: "/microorganisms",
  },
  {
    title: "Herbarium Collection",
    description: "View preserved plant specimens with scientific names, collection details, habitats, and visual records.",
    image: "/Thumbnail to herbarium collection.jpeg",
    icon: BookOpen,
    href: "/herbarium",
  },
];

const features = [
  { title: "Structured records", description: "Browse consistent records for microorganisms, plants, and herbarium specimens in one catalog.", icon: Database },
  { title: "Collection context", description: "Review available storage and collection information where it has been recorded.", icon: ShieldCheck },
  { title: "Catalog search", description: "Search for plants, microbial strains, and herbarium records using available details.", icon: Search },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b py-20 lg:py-32">
        <Image src="/assets/images/about_hero.png" alt="JKUAT biological research laboratory" fill sizes="100vw" className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-background/75" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-8">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-primary">JKUAT Bioresources</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">About JKUAT Bioresources</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">The JKUAT Digital Bioresource Catalog brings together structured records for microorganisms, herbarium collections, and African indigenous vegetables.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="max-w-5xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">About the catalog</p>
          <h2 className="border-b border-border pb-4 text-3xl font-extrabold text-primary sm:text-4xl">A digital catalog for biological resources</h2>
          <p className="mt-5 text-lg leading-8 text-foreground/75">The catalog supports the documentation and discovery of biological resources held by JKUAT researchers. It provides accessible, structured information for research, education, scientific collaboration, and responsible use of biodiversity.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="border border-primary/20 bg-secondary/60 p-7 sm:p-8">
            <h2 className="mb-4 text-2xl font-extrabold text-primary">Our Mission</h2>
            <p className="leading-8 text-foreground/75">To systematically digitize and highlight the biological resources held by JKUAT researchers, facilitating their discovery, access, and exchange to accelerate research, innovation, and scientific collaboration.</p>
          </article>
          <article className="border border-primary/20 bg-secondary/60 p-7 sm:p-8">
            <h2 className="mb-4 text-2xl font-extrabold text-primary">Our Vision</h2>
            <p className="leading-8 text-foreground/75">To serve as a premier digital hub for biological resources, advancing research and education in microbial, plant, and allied biological domains; fostering holistic learning, promoting sustainability, and nurturing intellectual curiosity; and contributing meaningfully to the global scientific community.</p>
          </article>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mb-10 border-b border-border pb-4">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">Explore the catalog</p>
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Core collections</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {collections.map(collection => {
              const Icon = collection.icon;
              return <article key={collection.title} className="group overflow-hidden border border-primary/15 bg-background shadow-sm transition-shadow hover:shadow-lg">
                <div className="relative h-52 overflow-hidden">
                  <Image src={collection.image} alt={collection.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center bg-white text-primary"><Icon className="h-5 w-5" /></div>
                </div>
                <div className="flex min-h-56 flex-col p-6">
                  <h3 className="text-xl font-extrabold text-primary">{collection.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-foreground/70">{collection.description}</p>
                  <Link href={collection.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">View collection <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">How the catalog helps</p>
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">A practical reference for biological collections</h2>
            <p className="mt-5 leading-8 text-foreground/70">Use the catalog to discover records, understand collection context, and move from a broad search to a specific resource.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map(feature => {
              const Icon = feature.icon;
              return <article key={feature.title} className="border border-border bg-secondary/40 p-5"><div className="mb-4 flex h-10 w-10 items-center justify-center bg-primary text-white"><Icon className="h-5 w-5" /></div><h3 className="font-bold text-primary">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-foreground/70">{feature.description}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div><p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground/70">Continue exploring</p><h2 className="text-3xl font-extrabold">Explore the JKUAT Bioresource Catalog</h2><p className="mt-3 max-w-2xl leading-7 text-primary-foreground/80">Search structured collection records and learn more about the biological resources documented through JKUAT.</p></div>
          <Link href="/search"><Button className="h-12 shrink-0 rounded-none bg-white px-7 text-primary hover:bg-white/90">Search the catalog <Search className="ml-2 h-4 w-4" /></Button></Link>
        </div>
      </section>
    </div>
  );
}
