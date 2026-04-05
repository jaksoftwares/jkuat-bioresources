import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logos/logo-primary.svg"
              alt="JKUAT Bioresources"
              width={240}
              height={60}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Search & Explore</Link>
            <Link href="/plants" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Plants</Link>
            <Link href="/microorganisms" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Microorganisms</Link>
            <Link href="/herbarium" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Herbarium</Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About JKUAT</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5 text-muted-foreground" />
          </Button>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-semibold text-primary">Researcher Login</Button>
            </Link>
            <Link href="/register">
              <Button className="font-semibold shadow-sm rounded-lg">Access Portal</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
