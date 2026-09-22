"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  FileText,
  Microscope,
  Search,
  ShieldCheck,
  Sprout,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const objectives = [
  {
    title: "Enhance Academic Research",
    text: "Provide a diverse, well-documented, and accessible collection of biological resources to support research and innovation in microbiology, biotechnology, plant sciences, environmental sciences, agriculture, and related fields.",
  },
  {
    title: "Quality and Accessibility",
    text: "Ensure that biological resources are properly documented, preserved, and digitally accessible to researchers, educators, students, and other authorized users locally and internationally.",
  },
  {
    title: "Educational Support",
    text: "Provide resources that facilitate teaching, practical learning, training, and scientific inquiry in biological and related sciences.",
  },
  {
    title: "Collaborative Research",
    text: "Foster national and international collaborations among researchers, universities, research institutions, industries, and other stakeholders to promote the sharing and responsible use of biological resources.",
  },
  {
    title: "Sustainable and Ethical Practices",
    text: "Promote responsible collection, conservation, documentation, and utilization of biological resources in accordance with relevant national and international standards.",
  },
];

const collections = [
  {
    title: "Microbial strains",
    description: "Explore documented bacterial, fungal, algal, and other microbial strains held in JKUAT collections.",
    image: "/Thumbnail to bacteria repository.png",
    icon: Microscope,
    href: "/microorganisms",
  },
  {
    title: "African indigenous vegetables",
    description: "Discover plant profiles, uses, growing conditions, and knowledge around African indigenous vegetables.",
    image: "/Thumbnail to AIVs.jpg",
    icon: Sprout,
    href: "/plants",
  },
  {
    title: "Herbarium collections",
    description: "Browse preserved specimens with collection details, habitats, storage references, and visual records.",
    image: "/Thumbnail to herbarium collection.jpeg",
    icon: BookOpen,
    href: "/herbarium",
  },
];

const heroImages = [
  { src: "/Pic 1.JPG", alt: "JKUAT researchers working in a laboratory" },
  { src: "/Pic 2.JPG", alt: "JKUAT biological resource research team" },
];

const resourceGroups = [
  {
    title: "Kenya-specific resources",
    description: "Regulatory, permitting, licensing, and biosafety references for work with biological resources in Kenya.",
    icon: ShieldCheck,
    links: [
      ["Access to Biological Resources and Benefit Sharing Regulations, 2025", "https://new.kenyalaw.org/akn/ke/act/ln/2025/68/eng@2025-03-24"],
      ["NEMA Access Permit Application System", "https://abs.nema.go.ke/"],
      ["NACOSTI Guidelines for Biological Material Transfer Agreements", "https://www.nacosti.go.ke/nacosti/Docs/QUICK%20DOWNLOADS/National%20Guidelines%20for%20the%20Development%20of%20Biological%20Material%20Transfer%20Agreements.pdf"],
      ["NACOSTI Research Licensing Guidelines", "https://research-portal.nacosti.go.ke/researcher/ApplicationGuidelines.html"],
      ["Biosafety Act, 2009 - Cap. 320", "https://new.kenyalaw.org/akn/ke/act/2009/2/eng@2023-12-11"],
      ["Biosafety (Contained Use) Regulations, 2011", "https://new.kenyalaw.org/akn/ke/act/ln/2011/96/eng@2022-12-31"],
      ["Biosafety (Import, Export and Transit) Regulations, 2011", "https://new.kenyalaw.org/akn/ke/act/ln/2011/97/eng@2022-12-31"],
    ],
  },
  {
    title: "Accessing biological resources",
    description: "International frameworks and culture-collection resources for responsible access, benefit sharing, and deposition.",
    icon: BookOpen,
    links: [
      ["Convention on Biological Diversity", "https://www.cbd.int/"],
      ["Nagoya Protocol on Access and Benefit Sharing", "https://www.cbd.int/abs"],
      ["Guide to the Deposit of Microorganisms under the Budapest Treaty", "https://www.wipo.int/en/web/budapest-system/guide/index"],
      ["Access and Benefit Sharing Clearing-House", "https://absch.cbd.int/en/"],
      ["World Data Centre for Microorganisms", "https://www.wdcm.org/"],
      ["World Federation for Culture Collections", "https://wfcc.info/"],
    ],
  },
  {
    title: "Transporting biological resources",
    description: "Good practice and shipping guidance for the safe movement of biological and infectious materials.",
    icon: Truck,
    links: [
      ["Good Microbiological Practices and Procedures (GMPP)", "https://www.who.int/multi-media/details/good-microbiological-practices-and-procedures-(gmpp)-7-transport"],
      ["WHO Guidance on Transport Regulations for Infectious Substances", "https://www.who.int/publications/i/item/9789240019720"],
      ["IATA Infectious Substances Shipping Guidelines", "https://www.iata.org/en/publications/manuals/infectious-substances-shipping-regulations/"],
      ["Association for Biosafety and Biosecurity", "https://absa.org/"],
    ],
  },
  {
    title: "Microbial taxonomy and systematics",
    description: "Authoritative services and communities for identification, nomenclature, classification, and systematics.",
    icon: Microscope,
    links: [
      ["Bergey's International Society for Microbial Systematics", "https://www.bismis.org/"],
      ["BISMiS Live YouTube Channel", "https://www.youtube.com/@BISMiS_"],
      ["Bergey's Manual of Systematics of Archaea and Bacteria", "https://onlinelibrary.wiley.com/doi/book/10.1002/9781118960608"],
      ["EzBioCloud", "https://www.ezbiocloud.net/"],
      ["Genome Taxonomy Database", "https://gtdb.ecogenomic.org/"],
      ["International Committee on Systematics of Prokaryotes", "https://www.the-icsp.org/"],
      ["List of Prokaryotic Names with Standing in Nomenclature", "https://lpsn.dsmz.de/"],
      ["The SeqCode Initiative", "https://www.isme-microbes.org/seqcode-initiative"],
      ["The SeqCode Registry", "https://disc-genomics.uibk.ac.at/seqcode/"],
    ],
  },
];

export function CatalogHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveHero(index => (index + 1) % heroImages.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = searchQuery.trim() ? `/search?q=${encodeURIComponent(searchQuery.trim())}` : "/search";
  };

  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto max-w-[1480px] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[#5f4b68] sm:min-h-[540px]">
          <Image
            src={heroImages[activeHero].src}
            alt={heroImages[activeHero].alt}
            fill
            priority
            sizes="(max-width: 1480px) 100vw, 1480px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#5b4162]/60" />
          <div className="relative z-10 max-w-5xl px-6 text-center text-white sm:px-10">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-white/80">JKUAT Bioresources</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">JKUAT Digital Bioresource Catalog</h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/90 sm:text-lg">
              A comprehensive digital repository of microorganisms, herbarium collections, and African indigenous vegetables designed to catalyse research and innovation.
            </p>
            <form onSubmit={submitSearch} className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 bg-white p-2 shadow-xl sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Search the catalog" className="h-12 border-0 pl-12 text-base shadow-none focus-visible:ring-0" />
              </div>
              <Button type="submit" className="h-12 rounded-none px-8">Search catalog</Button>
            </form>
            <div className="mt-6 flex justify-center gap-2" aria-label="Hero image selector">
              {heroImages.map((image, index) => <button key={image.src} type="button" aria-label={`Show hero image ${index + 1}`} aria-pressed={activeHero === index} onClick={() => setActiveHero(index)} className={`h-2.5 rounded-full transition-all ${activeHero === index ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="max-w-5xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">About the catalog</p>
          <h2 className="border-b border-border pb-4 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">JKUAT Digital Bioresource Catalog</h2>
          <p className="mt-5 max-w-5xl text-base leading-8 text-foreground/80 sm:text-lg">
            The JKUAT Digital Bioresource Catalog is a comprehensive digital repository of microorganisms, herbarium collections, and African indigenous vegetables, designed to catalyse research and innovation. By converting physical biological collections into accessible, structured knowledge, the catalog empowers advances in science, education, and sustainable development. Through enhanced digital access and discovery, it contributes to the conservation and responsible utilization of biodiversity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="border border-primary/20 bg-secondary/70 p-7 shadow-sm sm:p-8">
            <div className="mb-5 flex items-center gap-3"><TargetIcon /><h3 className="text-2xl font-extrabold text-primary">Our mission</h3></div>
            <p className="leading-8 text-foreground/80">To systematically digitize and highlight the biological resources held by JKUAT researchers, facilitating their discovery, access, and exchange to accelerate research, innovation, and scientific collaboration.</p>
          </article>
          <article className="border border-primary/20 bg-secondary/70 p-7 shadow-sm sm:p-8">
            <div className="mb-5 flex items-center gap-3"><EyeIcon /><h3 className="text-2xl font-extrabold text-primary">Our vision</h3></div>
            <p className="leading-8 text-foreground/80">To serve as a premier digital hub for biological resources, advancing research and education in microbial, plant, and allied biological domains; fostering holistic learning, promoting sustainability, and nurturing intellectual curiosity; and contributing meaningfully to the global scientific community.</p>
          </article>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-border pb-4">
            <div><p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">What guides us</p><h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Objectives</h2></div>
            <Sprout className="hidden h-10 w-10 text-primary/40 sm:block" />
          </div>
          <div className="space-y-0 border-y border-border bg-background">
            {objectives.map((objective, index) => (
              <article key={objective.title} className="grid gap-3 border-b border-border px-5 py-6 last:border-b-0 sm:grid-cols-[72px_250px_1fr] sm:items-start sm:gap-5 sm:px-7">
                <span className="text-2xl font-extrabold text-primary/50">{index + 1}.</span>
                <h3 className="font-bold text-primary">{objective.title}</h3>
                <p className="leading-7 text-foreground/75">{objective.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">Explore the catalog</p>
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Research collections</h2>
          </div>
          <p className="max-w-md leading-7 text-foreground/70">Move from discovery to detail across the biological collections curated by JKUAT researchers.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {collections.map(collection => {
            const Icon = collection.icon;
            return <article key={collection.title} className="group overflow-hidden border border-primary/15 bg-background shadow-sm transition-shadow hover:shadow-lg">
              <div className="relative h-56 overflow-hidden">
                <Image src={collection.image} alt={collection.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#174d3b]/25" />
                <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center bg-white text-primary shadow-md"><Icon className="h-5 w-5" /></div>
              </div>
              <div className="flex min-h-64 flex-col p-6">
                <h3 className="text-2xl font-extrabold text-primary">{collection.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-foreground/70">{collection.description}</p>
                <Link href={collection.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                  View collection <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-16">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground/70">Discover, connect, advance</p>
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">Find the biological resource that moves your work forward.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-primary-foreground/80">Search structured records, review collection information, and connect with the knowledge held across JKUAT&apos;s biological resource collections.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href="/search"><Button className="h-12 rounded-none bg-white px-7 text-primary hover:bg-white/90">Search the catalog <Search className="ml-2 h-4 w-4" /></Button></Link>
            <Link href="/about"><Button variant="outline" className="h-12 rounded-none border-white/50 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white">Learn about JKUAT Bioresources</Button></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20" id="resources">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">For microbial research</p>
          <h2 className="border-b border-border pb-4 text-3xl font-extrabold text-primary sm:text-4xl">Services &amp; resources</h2>
          <p className="mt-5 leading-8 text-foreground/75">Explore trusted regulatory, access, transport, and taxonomy resources supporting the responsible use of microbial strains.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {resourceGroups.map(group => {
            const Icon = group.icon;
            return <article key={group.title} className="border border-primary/15 bg-secondary/45 p-6 shadow-sm sm:p-7">
              <div className="mb-5 flex gap-4 border-b border-primary/15 pb-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-white"><Icon className="h-5 w-5" /></div><div><h3 className="text-xl font-extrabold text-primary">{group.title}</h3><p className="mt-1 text-sm leading-6 text-foreground/70">{group.description}</p></div></div>
              <ul className="space-y-2">
                {group.links.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2 text-sm leading-6 text-foreground/80 hover:text-primary"><ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" /><span className="underline-offset-4 group-hover:underline">{label}</span></a></li>)}
              </ul>
            </article>;
          })}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/microorganisms"><Button className="rounded-none">Explore microbial strains <ArrowUpRight className="ml-2 h-4 w-4" /></Button></Link>
          <a href="#resources"><Button variant="outline" className="rounded-none"><FileText className="mr-2 h-4 w-4" /> Browse resources</Button></a>
        </div>
      </section>
    </div>
  );
}

function TargetIcon() {
  return <span className="flex h-10 w-10 items-center justify-center bg-primary text-white"><Sprout className="h-5 w-5" /></span>;
}

function EyeIcon() {
  return <span className="flex h-10 w-10 items-center justify-center bg-primary text-white"><Microscope className="h-5 w-5" /></span>;
}
