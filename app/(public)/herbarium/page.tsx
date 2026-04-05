import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Filter, MapPin } from "lucide-react";
import Image from "next/image";

const mockHerbarium = [
  { id: "HERB-99-881", taxa: "Prunus africana", location: "Mt. Kenya Forest", date: "12 Oct 1999", collector: "Dr. Omondi" },
  { id: "HERB-02-145", taxa: "Warburgia ugandensis", location: "Kakamega Forest", date: "05 Mar 2002", collector: "Prof. Njuguna" },
  { id: "HERB-15-022", taxa: "Vitex keniensis", location: "Aberdare Ranges", date: "18 Jun 2015", collector: "Research Team A" },
];

export default function HerbariumPage() {
  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className="bg-sidebar py-16 border-b border-sidebar-border relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
            <BookOpen className="mr-2 h-3 w-3" /> Historical Archive
          </Badge>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Herbarium Repository</h1>
          <p className="text-white/80 text-lg mt-4 max-w-2xl">
            High-resolution digital preservation of physical botanical specimens referencing environmental climates, dates, and precision geo-tagging.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between items-center mb-8 md:flex-row gap-4 bg-muted/40 p-4 rounded-xl border border-border">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search preserved specimens..." className="pl-10 border-border bg-card shadow-sm" />
            </div>
            <Button variant="outline" className="w-full md:w-auto border-border bg-card">
              <Filter className="mr-2 h-4 w-4" /> Filter by Region
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockHerbarium.map((specimen, i) => (
              <div key={i} className="group bg-card border border-border rounded-xl overflow-hidden shadow-card hover:border-primary/30 transition-all cursor-pointer">
                {/* Image Placeholder */}
                <div className="h-48 bg-muted border-b border-border relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs font-mono">
                      {specimen.id}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold italic text-foreground mb-3">{specimen.taxa}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {specimen.location}
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 mt-2">
                      <span>Date: {specimen.date}</span>
                      <span className="font-medium">{specimen.collector}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
