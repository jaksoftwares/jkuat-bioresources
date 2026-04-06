import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-sidebar mt-auto border-t border-sidebar-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-6">
            <Image
              src="/assets/logos/logo-white.svg"
              alt="JKUAT Bioresources"
              width={200}
              height={50}
              className="h-10 w-auto"
            />
            <p className="text-slate-200/80 text-sm leading-relaxed max-w-xs">
              Jomo Kenyatta University of Agriculture and Technology's official institutional repository for preserving, digitizing, and sharing our rich biological heritage.
            </p>
          </div>
          
          {/* Links Group 1 */}
          <div>
            <h3 className="font-bold text-white mb-6">Collections</h3>
            <ul className="space-y-4">
              <li><Link href="/plants" className="text-sm text-slate-200/80 hover:text-white transition-colors">AIV Plants Repository</Link></li>
              <li><Link href="/microorganisms" className="text-sm text-slate-200/80 hover:text-white transition-colors">Microorganism Strains</Link></li>
              <li><Link href="/herbarium" className="text-sm text-slate-200/80 hover:text-white transition-colors">Herbarium Database</Link></li>
              <li><Link href="/search" className="text-sm text-slate-200/80 hover:text-white transition-colors">Global Search</Link></li>
            </ul>
          </div>
          
          {/* Links Group 2 */}
          <div>
            <h3 className="font-bold text-white mb-6">Institution</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-slate-200/80 hover:text-white transition-colors">About The Project</Link></li>
              <li><a href="https://jkuat.ac.ke" target="_blank" rel="noreferrer" className="text-sm text-slate-200/80 hover:text-white transition-colors">JKUAT Main Website</a></li>
              <li><Link href="/researchers" className="text-sm text-slate-200/80 hover:text-white transition-colors">Researcher Directory</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-200/80 hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>
          
          {/* Contact / Legal */}
          <div>
            <h3 className="font-bold text-white mb-6">Reach Us</h3>
            <ul className="space-y-4 text-sm text-slate-200/80">
              <li>P.O. Box 62000 - 00200</li>
              <li>Nairobi, Kenya</li>
              <li>Juja Main Campus</li>
              <li>bioresources@jkuat.ac.ke</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-sidebar-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-200/80">
            &copy; {new Date().getFullYear()} Jomo Kenyatta University of Agriculture and Technology. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-slate-200/80 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-slate-200/80 hover:text-white">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
