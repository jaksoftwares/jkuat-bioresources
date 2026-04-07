import { ArrowRight, Dna, Database, Beaker, Globe2 } from "lucide-react";

const steps = [
  {
    id: "01",
    name: "Field Collection",
    description: "Our researchers collect plant and microbial samples directly from their natural environments.",
    icon: Beaker,
  },
  {
    id: "02",
    name: "Laboratory Study",
    description: "Samples are carefully studied in JKUAT labs to identify their scientific characteristics.",
    icon: Dna,
  },
  {
    id: "03",
    name: "Information Records",
    description: "Detailed findings are recorded and stored to ensure the safety and longevity of the research.",
    icon: Database,
  },
  {
    id: "04",
    name: "Scientific Access",
    description: "Research results are shared with the scientific community and the public for further study.",
    icon: Globe2,
  },
];

export function LandingWorkflow() {
  return (
    <section className="bg-background py-24 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-left">
              Our Research <br />
              <span className="text-primary">Process</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every sample at JKUAT Bioresources follows a strict scientific process to ensure the accuracy and reliability of our work.
            </p>
            <div className="mt-8 flex items-center text-sm font-semibold text-primary">
              <a href="/about" className="hover:underline flex items-center">
                Learn more about our work
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 relative">
                  {index !== steps.length - 1 && (
                    <div className="absolute left-[28px] top-[60px] w-[2px] h-[calc(100%-24px)] bg-primary/10"></div>
                  )}
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-secondary shadow-sm">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center">
                      <span className="text-muted-foreground/50 font-mono text-sm mr-3">{step.id}</span>
                      {step.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
