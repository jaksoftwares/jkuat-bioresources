import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<main className="flex min-h-[70vh] items-center justify-center bg-background px-6 py-20">
			<section className="w-full max-w-2xl border border-border bg-card px-6 py-12 text-center shadow-sm sm:px-12">
				<Image
					src="/assets/images/jkuat-logo.jpg"
					alt="Jomo Kenyatta University of Agriculture and Technology"
					width={72}
					height={72}
					className="mx-auto h-16 w-16 rounded-full object-contain"
				/>
				<p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-primary">JKUAT Bioresources</p>
				<p className="mt-5 text-7xl font-extrabold tracking-tight text-primary/20">404</p>
				<h1 className="mt-3 text-3xl font-extrabold text-foreground">Page not found</h1>
				<p className="mx-auto mt-4 max-w-md leading-7 text-muted-foreground">
					The page or resource you requested could not be found. It may have moved, or the address may be incomplete.
				</p>
				<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<Button nativeButton={false} render={<Link href="/" />} className="h-11 px-6">
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to home
					</Button>
					<Button nativeButton={false} render={<Link href="/search" />} variant="outline" className="h-11 px-6">
						<Search className="mr-2 h-4 w-4" /> Search catalog
					</Button>
				</div>
			</section>
		</main>
	);
}
