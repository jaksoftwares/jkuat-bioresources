import { Target, Eye, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LandingAbout() {
  return (
    <section className="bg-background py-24 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center">Commitment to Excellence</h2>
          <div className="mt-4 w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission */}
          <Card className="border-border/60 shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground leading-relaxed px-8">
              Aligned with the mission of Jomo Kenyatta University of Agriculture and Technology (JKUAT), our center aims to empower students and researchers with comprehensive resources that promote excellence in academic and scientific pursuits. Our mission is to support innovative research, contribute to scientific knowledge, and provide quality biological resources that meet the highest international standards.
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="border-border/60 shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground leading-relaxed px-8">
              The vision of JKUAT Bioresources is to become a globally recognized culture collection centre that exemplifies the values of JKUAT: fostering holistic education, promoting sustainable practices, and encouraging intellectual curiosity. We envision a future where our centre plays a pivotal role in expanding biological research and education, contributing to the global scientific community.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
