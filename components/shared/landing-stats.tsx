import { Database, Network, Building2, FlaskConical } from "lucide-react";

export function LandingStats() {
  const stats = [
    { name: "Digital Records", value: "14,000+", icon: Database },
    { name: "Active Researchers", value: "350+", icon: Network },
    { name: "Partner Laboratories", value: "12", icon: FlaskConical },
    { name: "Global Citations", value: "2,100+", icon: Building2 },
  ];

  return (
    <section className="bg-primary/5 border-y border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary shadow-sm">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <p className="text-4xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
              <p className="mt-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
