import Link from "next/link";

type PublicDataUnavailableProps = {
  collection: string;
  backHref?: string;
  backLabel?: string;
};

export function PublicDataUnavailable({
  collection,
  backHref,
  backLabel,
}: PublicDataUnavailableProps) {
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <p role="status">{collection} are temporarily unavailable. Please try again shortly.</p>
      {backHref && backLabel && (
        <Link href={backHref} className="mt-2 inline-block font-medium underline">
          {backLabel}
        </Link>
      )}
    </div>
  );
}
