"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Search, Sprout, Microscope, BookOpen, Info, ChevronRight, LogIn, UserPlus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/search", label: "Search & Explore", icon: Search },
    { href: "/plants", label: "Plants & Flora", icon: Sprout },
    { href: "/microorganisms", label: "Microorganisms", icon: Microscope },
    { href: "/herbarium", label: "Herbarium Collection", icon: BookOpen },
    { href: "/about", label: "About JKUAT", icon: Info },
  ];

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
              className="h-8 w-auto sm:h-10"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10">
                  <Menu className="h-6 w-6 text-foreground" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              }
            />
            <SheetContent side="right" className="flex w-full sm:max-w-sm flex-col p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="p-6 border-b text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src="/assets/logos/logo-primary.svg"
                      alt="JKUAT"
                      width={120}
                      height={30}
                      className="h-6 w-auto"
                    />
                  </div>
                  <SheetTitle className="text-lg font-semibold text-foreground">Bioresources Portal</SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground">
                    Access JKUAT's biological resource database and research tools.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6">
                  <nav className="px-4 space-y-2">
                    <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">Navigation</p>
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between gap-3 px-3 py-3 rounded-xl hover:bg-secondary/80 group transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{link.label}</span>
                          </div>
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="p-6 border-t bg-secondary/30">
                  <div className="space-y-3">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2 h-11 border-primary/20 hover:bg-primary/5 hover:text-primary text-primary font-medium">
                        <LogIn className="h-4 w-4" />
                        Researcher Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-start gap-2 h-11 shadow-sm font-medium">
                        <UserPlus className="h-4 w-4" />
                        Access Portal
                      </Button>
                    </Link>
                  </div>
                  <p className="mt-4 text-center text-[10px] text-muted-foreground">
                    © {new Date().getFullYear()} JKUAT Bioresources Department
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-semibold text-primary hover:bg-primary/5">
                Researcher Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="font-semibold shadow-sm rounded-lg px-6">
                Access Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
