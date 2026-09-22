import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const sections = [
  {
    title: "Information we collect",
    paragraphs: [
      "The catalog may collect information needed to provide its public and authenticated services. This can include account details such as your name, email address, staff or researcher information, and activity associated with catalog administration.",
      "When you browse public records, the platform may receive ordinary technical information such as browser, device, and request details needed to operate and protect the service.",
    ],
  },
  {
    title: "How information is used",
    paragraphs: [
      "Information is used to provide catalog access, manage authenticated accounts, maintain biological resource records, support research workflows, communicate about the service, and protect the platform from misuse.",
      "We do not present the catalog as a substitute for institutional research, biosafety, access, or benefit-sharing approvals.",
    ],
  },
  {
    title: "Catalog records and uploaded content",
    paragraphs: [
      "Authorized users may add biological resource descriptions, images, documents, and related metadata. Users should only submit content they are authorized to share and should avoid including unnecessary personal or confidential information in public-facing records.",
      "Records may be reviewed, corrected, restricted, or removed by authorized JKUAT administrators in accordance with institutional procedures.",
    ],
  },
  {
    title: "Sharing and service providers",
    paragraphs: [
      "The catalog may rely on trusted infrastructure and service providers to host data, authenticate users, store media, and maintain the application. Access is limited to what is needed for those services and their security.",
      "Public catalog records and links to external resources may be visible to visitors. External websites have their own privacy practices and terms, which should be reviewed before use.",
    ],
  },
  {
    title: "Security and retention",
    paragraphs: [
      "We use reasonable technical and organizational measures to protect catalog information. No online service can guarantee absolute security, so users should protect their credentials and report suspected unauthorized access promptly.",
      "Information is retained only as long as needed for the catalog, institutional records, legal obligations, security, and legitimate research administration requirements.",
    ],
  },
  {
    title: "Your questions and requests",
    paragraphs: [
      "For questions about personal information, account access, or a catalog record, contact the JKUAT Bioresources team through bioresources@jkuat.ac.ke. Requests may require identity or authorization checks before action is taken.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:py-20">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="h-4 w-4" /> Back to catalog</Link>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-white"><ShieldCheck className="h-6 w-6" /></div>
            <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Legal</p><h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Privacy Policy</h1><p className="mt-4 text-muted-foreground">How JKUAT Bioresources handles information used by the digital catalog.</p></div>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">Last updated: September 23, 2026</p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:py-20">
        <div className="space-y-10">
          {sections.map(section => <section key={section.title} className="border-b border-border pb-8 last:border-b-0"><h2 className="text-2xl font-bold text-primary">{section.title}</h2><div className="mt-4 space-y-4 text-base leading-8 text-foreground/75">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section>)}
        </div>
        <div className="mt-10 border border-primary/20 bg-secondary/50 p-6 text-sm leading-7 text-foreground/75">This page provides general information about the catalog&apos;s data practices. Institutional policies and applicable law may provide additional rights or requirements.</div>
      </section>
    </main>
  );
}
