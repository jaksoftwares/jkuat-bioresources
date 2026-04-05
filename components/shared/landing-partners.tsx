export function LandingPartners() {
  return (
    <section className="bg-background py-16 border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">
          Operated in coordination with core academic departments
        </p>
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Using text representations as placeholders for institutional partner logos */}
          <div className="text-xl font-extrabold text-foreground tracking-tight">Botany Dept.</div>
          <div className="text-xl font-extrabold text-foreground tracking-tight">Food Science & Tech</div>
          <div className="text-xl font-extrabold text-foreground tracking-tight">Biochemistry</div>
          <div className="text-xl font-extrabold text-foreground tracking-tight">Agriculture Ecosystems</div>
          <div className="text-xl font-extrabold text-foreground tracking-tight">Genetic Research Lab</div>
        </div>
      </div>
    </section>
  );
}
