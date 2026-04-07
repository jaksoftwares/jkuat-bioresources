import Image from "next/image";

export function LandingPartners() {
  const partners = [
    { name: "Botany Dept.", logo: "/assets/logos/JKUAT-Logo.jpg" },
    { name: "Food Science & Tech", logo: "/assets/logos/JKUAT-Logo.jpg" },
    { name: "Biochemistry", logo: "/assets/logos/JKUAT-Logo.jpg" },
    { name: "Agriculture Ecosystems", logo: "/assets/logos/JKUAT-Logo.jpg" },
    { name: "Genetic Research Lab", logo: "/assets/logos/JKUAT-Logo.jpg" },
    { name: "Molecular Biology", logo: "/assets/logos/JKUAT-Logo.jpg" },
    { name: "Microbiology Lab", logo: "/assets/logos/JKUAT-Logo.jpg" },
    { name: "Environmental Science", logo: "/assets/logos/JKUAT-Logo.jpg" },
  ];

  return (
    <section className="bg-muted/30 py-12 border-y border-border/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60">
          Partners
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 items-center py-4">
          {[...partners, ...partners].map((partner, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-background px-6 py-3 rounded-xl border shadow-sm hover:border-primary/30 transition-all group shrink-0">
              <div className="relative h-10 w-10 overflow-hidden">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="(max-width: 768px) 40px, 40px"
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-foreground/80 group-hover:text-primary transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
