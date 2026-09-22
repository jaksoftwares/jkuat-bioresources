'use client';

import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<main className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
			<section className="w-full max-w-2xl border border-border bg-card px-6 py-12 text-center shadow-sm sm:px-12">
				<Image
					src="/assets/images/jkuat-logo.jpg"
					alt="Jomo Kenyatta University of Agriculture and Technology"
					width={72}
					height={72}
					className="mx-auto h-16 w-16 rounded-full object-contain"
				/>
				<div className="mx-auto mt-8 flex h-12 w-12 items-center justify-center bg-secondary text-primary">
					<AlertTriangle className="h-6 w-6" />
				</div>
				<p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-primary">JKUAT Bioresources</p>
				<h1 className="mt-3 text-3xl font-extrabold text-foreground">Something went wrong</h1>
				<p className="mx-auto mt-4 max-w-md leading-7 text-muted-foreground">
					We could not complete that request. Please try again, or return to the catalog and continue browsing.
				</p>
				<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<Button onClick={reset} className="h-11 px-6">
						<RefreshCw className="mr-2 h-4 w-4" /> Try again
					</Button>
					<Button nativeButton={false} render={<Link href="/" />} variant="outline" className="h-11 px-6">
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to home
					</Button>
				</div>
			</section>
		</main>
	);
}
