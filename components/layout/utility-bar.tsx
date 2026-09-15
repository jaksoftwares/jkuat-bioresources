import Link from "next/link";
import { LogIn, UserPlus, ShoppingCart, HelpCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function UtilityBar() {
  return (
    <div className="bg-primary text-primary-foreground text-xs font-medium py-1.5 hidden md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8 gap-6">
        <Link href="/pricing" className="hover:text-white/80 transition-colors flex items-center gap-1.5">
          <FileText className="h-3 w-3" />
          Pricing & Fees
        </Link>
        <Link href="/support" className="hover:text-white/80 transition-colors flex items-center gap-1.5">
          <HelpCircle className="h-3 w-3" />
          Training & Support
        </Link>
        <div className="w-px h-3 bg-primary-foreground/30" />
        <Link href="/login" className="hover:text-white/80 transition-colors flex items-center gap-1.5">
          <LogIn className="h-3 w-3" />
          Log in
        </Link>
        <Link href="/register" className="hover:text-white/80 transition-colors flex items-center gap-1.5">
          <UserPlus className="h-3 w-3" />
          Register
        </Link>
        <div className="w-px h-3 bg-primary-foreground/30" />
        <Link href="/cart" className="hover:text-white/80 transition-colors flex items-center gap-1.5 font-bold">
          <ShoppingCart className="h-3 w-3" />
          Cart (0)
        </Link>
      </div>
    </div>
  );
}
