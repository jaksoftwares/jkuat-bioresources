"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: any[];
  altBase: string;
  gridClassName?: string;
  imageClassName?: string;
  fallbackText?: string;
}

export default function ImageGallery({
  images,
  altBase,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8",
  imageClassName = "aspect-video",
  fallbackText = "No images",
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className={`relative rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center ${imageClassName}`}>
        <p className="text-gray-400 font-medium text-sm">{fallbackText}</p>
      </div>
    );
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      {/* Grid View */}
      <div className={gridClassName}>
        {images.map((img: any, idx: number) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`block relative rounded-xl overflow-hidden border border-gray-200 hover:border-jkuat-green transition-colors cursor-pointer group ${imageClassName}`}
          >
            <Image
              src={img.secure_url}
              alt={`${altBase} Image ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-10 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4 md:mx-20 flex items-center justify-center">
            <Image
              src={images[selectedIndex].secure_url}
              alt={`${altBase} Image ${selectedIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-10 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-medium text-sm bg-black/50 px-4 py-2 rounded-full tracking-widest">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
