import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export function LandingCta() {
  return (
    <section className="bg-sidebar py-24 relative overflow-hidden">
      {/* Abstract dark green pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary via-sidebar to-sidebar"></div>
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
          Join Our Research Community.
        </h2>
        <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
          Explore JKUAT’s biological collections and collaborate with our team of researchers and students. Register today to contribute to our work.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="h-14 px-8 text-base shadow-lg hover:shadow-xl font-bold bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl w-full sm:w-auto">
              Request Institutional Access
            </Button>
          </Link>
          <Link href="/search">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold border-white text-white hover:bg-white/10 hover:text-white rounded-xl w-full sm:w-auto bg-transparent">
              Search Open Directory <MoveRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
