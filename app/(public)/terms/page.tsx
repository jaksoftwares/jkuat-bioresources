import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

const sections = [
  {
    title: "Using the catalog",
    paragraphs: [
      "The JKUAT Digital Bioresource Catalog provides access to structured information about microorganisms, herbarium collections, and African indigenous vegetables. You may browse public records for lawful research, education, reference, and related purposes.",
      "Catalog information should be interpreted with appropriate scientific, institutional, biosafety, access, and benefit-sharing judgment. The presence of a record does not by itself authorize collection, transfer, handling, or use of a biological resource.",
    ],
  },
  {
    title: "Accounts and authorized access",
    paragraphs: [
      "Some catalog functions require an account or institutional authorization. You are responsible for providing accurate information, keeping credentials confidential, and using access only for the purpose for which it was granted.",
      "Do not attempt to access restricted records, administrative functions, storage locations, or another user's account without permission. Access may be suspended or removed where necessary to protect the catalog or its collections.",
    ],
  },
  {
    title: "Research records and attribution",
    paragraphs: [
      "Catalog records may be incomplete, under review, or subject to correction. Verify important information with the responsible collection team and follow applicable institutional and regulatory requirements before relying on it in research or operational decisions.",
      "When using catalog information in publications, reports, teaching materials, or other outputs, provide appropriate attribution and respect any stated restrictions, source information, licenses, and institutional requirements.",
    ],
  },
  {
    title: "User-submitted content",
    paragraphs: [
      "Authorized users must have the right to submit images, documents, descriptions, and other content. Submissions must not knowingly include unlawful material, unnecessary personal information, confidential information, malicious code, or content that violates another person's rights.",
      "By submitting content for catalog use, you authorize JKUAT Bioresources to store, display, preserve, and manage it as part of the relevant collection record, subject to institutional procedures and any agreed restrictions.",
    ],
  },
  {
    title: "External links and resources",
    paragraphs: [
      "The catalog links to external scientific, regulatory, and institutional resources for convenience. JKUAT Bioresources does not control those websites and is not responsible for their content, availability, security, or terms.",
    ],
  },
  {
    title: "Availability and changes",
    paragraphs: [
      "We may update, reorganize, restrict, or temporarily suspend parts of the catalog to maintain records, improve the service, address security concerns, or follow institutional requirements.",
      "These terms may be updated as the catalog develops. Continued use of the service after an update means that you acknowledge the revised terms.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "Questions about these terms or a catalog record can be sent to bioresources@jkuat.ac.ke. For legal, regulatory, biosafety, access, or benefit-sharing decisions, consult the appropriate JKUAT office or competent authority.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:py-20">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="h-4 w-4" /> Back to catalog</Link>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-white"><FileText className="h-6 w-6" /></div>
            <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Legal</p><h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Terms of Use</h1><p className="mt-4 text-muted-foreground">Rules for using the JKUAT Digital Bioresource Catalog.</p></div>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">Last updated: September 23, 2026</p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:py-20">
        <div className="space-y-10">
          {sections.map(section => <section key={section.title} className="border-b border-border pb-8 last:border-b-0"><h2 className="text-2xl font-bold text-primary">{section.title}</h2><div className="mt-4 space-y-4 text-base leading-8 text-foreground/75">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section>)}
        </div>
        <div className="mt-10 border border-primary/20 bg-secondary/50 p-6 text-sm leading-7 text-foreground/75">These terms provide general platform guidance and do not replace JKUAT policy, research approvals, biosafety requirements, access and benefit-sharing rules, or applicable law.</div>
      </section>
    </main>
  );
}
