"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Search, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UtilityBar } from "./utility-bar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/search", label: "Catalogue Search" },
    { href: "/microorganisms", label: "Microbial Strains" },
    { href: "/plants", label: "Plant Resources" },
    { href: "/herbarium", label: "Herbarium" },
    { href: "/services", label: "Services" },
    { href: "/deposits", label: "Deposits" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <div className="flex flex-col w-full">
      <UtilityBar />
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 lg:gap-12 w-full justify-between lg:justify-start">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/assets/logos/logo-primary.svg"
                alt="JKUAT Bioresources"
                width={260}
                height={70}
                className="h-10 w-auto sm:h-12"
                priority
              />
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8 h-24 flex-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative h-full flex items-center text-[15px] font-semibold transition-colors hover:text-primary tracking-wide",
                      isActive ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-1 w-full bg-primary rounded-t-sm" />
                    )}
                  </Link>
                );
              })}
            </nav>
            
            <div className="hidden lg:flex shrink-0">
              <Button nativeButton={false} render={<Link href="/search" />} size="icon" variant="ghost" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors h-12 w-12">
                 <Search className="h-5 w-5" />
                 <span className="sr-only">Search Catalogue</span>
              </Button>
            </div>
          </div>

          <div className="flex items-center lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                    <Menu className="h-7 w-7" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                }
              />
              <SheetContent side="right" className="flex w-full max-w-sm flex-col p-0">
                <div className="flex flex-col h-full bg-background">
                  <SheetHeader className="p-6 border-b border-border text-left">
                    <Image
                      src="/assets/logos/logo-primary.svg"
                      alt="JKUAT Bioresources"
                      width={180}
                      height={50}
                      className="h-8 w-auto"
                    />
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto py-6">
                    <nav className="px-4 space-y-2">
                      <p className="px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-4">Menu</p>
                      {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center justify-between gap-3 px-4 py-4 rounded-xl transition-all duration-200 group border border-transparent",
                              isActive ? "bg-primary/5 border-primary/20" : "hover:bg-secondary/50 hover:border-border"
                            )}
                          >
                            <span className={cn(
                              "text-base font-semibold",
                              isActive ? "text-primary" : "text-foreground/80 group-hover:text-foreground"
                            )}>{link.label}</span>
                            <ChevronRight className={cn(
                               "h-4 w-4 transition-transform group-hover:translate-x-1",
                               isActive ? "text-primary" : "text-muted-foreground/40"
                            )} />
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                  
                  <div className="p-6 border-t border-border bg-secondary/20">
                     <div className="grid grid-cols-2 gap-3 mb-4">
                        <Link href="/login" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-center py-2.5 rounded-lg border border-border bg-background hover:bg-secondary transition-colors">
                           Log in
                        </Link>
                        <Link href="/register" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-center py-2.5 rounded-lg border border-transparent bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                           Register
                        </Link>
                     </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
}
