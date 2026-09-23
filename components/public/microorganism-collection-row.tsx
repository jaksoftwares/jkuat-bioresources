"use client";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { TaxonomicInformation, PathogenicityInformation, DetailsOfIsolation } from "@/features/microorganisms/types";

type StrainRecord = {
  id: string;
  taxonomic_information?: TaxonomicInformation;
  details_of_isolation?: DetailsOfIsolation;
  pathogenicity_information?: PathogenicityInformation;
};

export function MicroorganismCollectionRow({ strain }: { strain: StrainRecord }) {
  const router = useRouter();
  const taxInfo = strain.taxonomic_information;
  const isoInfo = strain.details_of_isolation;
  const pathInfo = strain.pathogenicity_information;

  const openDetails = () => router.push(`/microorganisms/${strain.id}`);

  return (
    <TableRow
      className="group cursor-pointer transition-colors hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:outline-none"
      role="link"
      tabIndex={0}
      onClick={openDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDetails();
        }
      }}
      aria-label={`View details for ${taxInfo?.genus || "microbial"} ${taxInfo?.species || "strain"}`}
    >
      <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
        {taxInfo?.strain_number || strain.id.substring(0, 8)}
      </TableCell>
      <TableCell className="text-sm whitespace-normal">
        {taxInfo?.type_of_organism || "Unknown"}
      </TableCell>
      <TableCell className="whitespace-normal">
        <span className="italic font-semibold text-foreground group-hover:text-primary transition-colors">
          {taxInfo?.genus} {taxInfo?.species}
        </span>
        {taxInfo?.is_type_strain && (
          <Badge variant="outline" className="ml-2 text-[10px] uppercase tracking-wider py-0 px-1.5 border-primary/30 text-primary">
            Type Strain
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground whitespace-normal">
        {taxInfo?.ncbi_16s_accession_number || "N/A"}
      </TableCell>
      <TableCell className="text-center">
        <Badge variant={pathInfo?.biohazard_group === "1" ? "secondary" : "destructive"} className="font-mono shadow-none">
          RG-{pathInfo?.biohazard_group || "1"}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <span className="inline-flex h-8 items-center px-2 text-sm text-primary group-hover:underline">
          Details <ChevronRight className="ml-1 h-3 w-3" />
        </span>
      </TableCell>
    </TableRow>
  );
}