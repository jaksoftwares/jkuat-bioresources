"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/assets/images/hero_main.png",
  "/assets/images/lab-research.png",
  "/assets/images/microorganism.png",
  "/assets/images/herbarium.png",
  "/assets/images/indigenous_plants.png",
  "/assets/images/research-lab.png",
];

export function LandingHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-2 pb-4 min-h-[350px] lg:min-h-[70vh] flex items-center bg-background">
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt="JKUAT Bioresources"
              fill
              className="object-cover"
              priority
              quality={100}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent dark:from-[#09090b]/80 dark:via-[#09090b]/40 dark:to-transparent" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left py-20 flex flex-col justify-center min-h-full">
        <div className="space-y-10 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05]"
          >
            <span className="text-primary">JKUAT Bioresources</span> Research
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed"
          >
            Explore our collections of indigenous vegetables, microorganisms, and herbarium specimens from across Jomo Kenyatta University.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-6 pt-4"
          >
            <Link href="/search">
              <Button size="lg" className="h-14 px-10 font-bold shadow-2xl rounded-xl group text-lg">
                <Search className="mr-3 h-5 w-5" />
                Explore Collections
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="h-14 px-10 font-bold border-primary/40 text-primary hover:bg-primary/5 rounded-xl text-lg">
                Researcher Login
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

