import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MicroorganismRepository } from "@/repositories/microorganism.repository";
import { TaxonomicInformation, GrowthRelatedInformation, DetailsOfIsolation, PathogenicityInformation, IdentificationInformation, CBDInformation } from "@/features/microorganisms/types";
import ImageGallery from "@/components/public/image-gallery";
import MicroorganismExportActions from "@/components/public/microorganism-export-actions";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MicroorganismDetailPage({ params }: PageProps) {
  const { id } = await params
  
  let micro;
  try {
    micro = await MicroorganismRepository.getById(id)
  } catch {
    return notFound()
  }

  if (!micro) return notFound()

  // Cast JSONB fields
  const taxInfo = (micro.taxonomic_information || {}) as TaxonomicInformation;
  const growthInfo = (micro.growth_related_information || {}) as GrowthRelatedInformation;
  const isolationInfo = (micro.details_of_isolation || {}) as DetailsOfIsolation;
  const pathInfo = (micro.pathogenicity_information || {}) as PathogenicityInformation;
  const identInfo = (micro.identification_information || {}) as IdentificationInformation;
  const cbdInfo = (micro.cbd_information || {}) as CBDInformation;

  const strainNo = taxInfo.strain_number || micro.id.substring(0, 8);
  const fullName = `${taxInfo.genus || 'Unknown'} ${taxInfo.species || ''}`.trim();
  const nagoyaProtocolText = cbdInfo.pic_taken === true
    ? `PIC Issued by ${cbdInfo.pic_issuing_authority || 'Authority'}`
    : "There are NO known Nagoya Protocol restrictions for this strain.";

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Section */}
      <div className="bg-secondary border-b border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/microorganisms" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm font-semibold">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalogue
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="font-mono bg-background text-foreground border-border">
                  {strainNo}
                </Badge>
                {taxInfo.is_type_strain && (
                  <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-none">
                    Type Strain
                  </Badge>
                )}
                {pathInfo.biohazard_group && (
                  <Badge variant="destructive" className="font-mono flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Risk Group {pathInfo.biohazard_group}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight italic mb-2">
                {fullName}
              </h1>
              <p className="text-muted-foreground font-medium">
                Type of Organism: <strong className="text-foreground">{taxInfo.type_of_organism || 'Unknown'}</strong>
              </p>
            </div>
            
            <MicroorganismExportActions record={micro as Record<string, unknown>} title={`${fullName} - ${strainNo}`} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content Area (DSMZ Style Tables) */}
          <div className="lg:col-span-3 space-y-10">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border/60">Taxonomy & Designation</h2>
              <div className="bg-card border border-border/60 rounded-lg overflow-hidden shadow-sm text-sm">
                <div className="grid grid-cols-3 p-3 border-b border-border/40">
                  <div className="font-semibold text-muted-foreground">Genus</div>
                  <div className="col-span-2 text-foreground font-medium italic">{taxInfo.genus || '—'}</div>
                </div>
                <div className="grid grid-cols-3 p-3 border-b border-border/40 bg-muted/20">
                  <div className="font-semibold text-muted-foreground">Species</div>
                  <div className="col-span-2 text-foreground font-medium italic">{taxInfo.species || '—'}</div>
                </div>
                <div className="grid grid-cols-3 p-3 border-b border-border/40">
                  <div className="font-semibold text-muted-foreground">Strain Number</div>
                  <div className="col-span-2 text-foreground font-medium font-mono">{strainNo}</div>
                </div>
                <div className="grid grid-cols-3 p-3 border-b border-border/40 bg-muted/20">
                  <div className="font-semibold text-muted-foreground">Type Strain</div>
                  <div className="col-span-2 text-foreground font-medium">{taxInfo.is_type_strain ? "Yes" : "No"}</div>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <div className="font-semibold text-muted-foreground">NCBI 16S Accession</div>
                  <div className="col-span-2 text-foreground font-medium">
                    {taxInfo.ncbi_16s_accession_number ? (
                      <a href={`https://www.ncbi.nlm.nih.gov/nuccore/${taxInfo.ncbi_16s_accession_number}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                        {taxInfo.ncbi_16s_accession_number} <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : '—'}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border/60">Origin & Isolation</h2>
              <div className="bg-card border border-border/60 rounded-lg overflow-hidden shadow-sm text-sm">
                <div className="grid grid-cols-3 p-3 border-b border-border/40">
                  <div className="font-semibold text-muted-foreground">Source of Isolation</div>
                  <div className="col-span-2 text-foreground font-medium">{isolationInfo.source_of_isolation || '—'}</div>
                </div>
                <div className="grid grid-cols-3 p-3 border-b border-border/40 bg-muted/20">
                  <div className="font-semibold text-muted-foreground">Country</div>
                  <div className="col-span-2 text-foreground font-medium">{isolationInfo.country || '—'}</div>
                </div>
                <div className="grid grid-cols-3 p-3 border-b border-border/40">
                  <div className="font-semibold text-muted-foreground">Geographic Coordinates</div>
                  <div className="col-span-2 text-foreground font-medium font-mono">{isolationInfo.gps_coordinates || '—'}</div>
                </div>
                <div className="grid grid-cols-3 p-3 border-b border-border/40">
                  <div className="font-semibold text-muted-foreground">Nagoya Protocol / CBD</div>
                  <div className="col-span-2 text-foreground font-medium">
                    {nagoyaProtocolText}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border/60">Cultivation Conditions</h2>
              <div className="bg-card border border-border/60 rounded-lg overflow-hidden shadow-sm text-sm">
                <div className="grid grid-cols-3 p-3 border-b border-border/40">
                  <div className="font-semibold text-muted-foreground">Growth Medium</div>
                  <div className="col-span-2 text-foreground font-medium">{growthInfo.growth_medium_name || '—'}</div>
                </div>
                <div className="grid grid-cols-3 p-3 border-b border-border/40 bg-muted/20">
                  <div className="font-semibold text-muted-foreground">Optimum Temperature</div>
                  <div className="col-span-2 text-foreground font-medium">{growthInfo.optimum_temperature_celsius ? `${growthInfo.optimum_temperature_celsius} °C` : '—'}</div>
                </div>
                <div className="grid grid-cols-3 p-3 border-b border-border/40">
                  <div className="font-semibold text-muted-foreground">pH Range (Optimum)</div>
                  <div className="col-span-2 text-foreground font-medium">
                    {growthInfo.ph_range ? growthInfo.ph_range : '—'} 
                    {growthInfo.optimum_ph ? ` (Optimum: ${growthInfo.optimum_ph})` : ''}
                  </div>
                </div>
                <div className="grid grid-cols-3 p-3 border-b border-border/40 bg-muted/20">
                  <div className="font-semibold text-muted-foreground">Oxygen Requirement</div>
                  <div className="col-span-2 text-foreground font-medium">{growthInfo.oxygen_requirement || '—'}</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border/60">Microscopy & Media Images</h2>
              <div className="bg-card border border-border/60 rounded-lg p-6 shadow-sm">
                <ImageGallery
                  images={micro.media?.images || []}
                  altBase={`${fullName} microscopy`}
                  gridClassName="grid grid-cols-1 gap-6 md:grid-cols-2"
                  imageClassName="aspect-[4/3]"
                />
              </div>
            </section>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-muted/40 border border-border/60 shadow-sm rounded-lg p-5">
              <h3 className="font-bold text-foreground mb-4 pb-2 border-b border-border/40 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" /> Safety Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Risk Group</span>
                  <span className="font-bold text-destructive">RG-{pathInfo.biohazard_group || '1'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Human Pathogen</span>
                  <span className="font-bold text-foreground">{pathInfo.pathogenic_to_human ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Plant Pathogen</span>
                  <span className="font-bold text-foreground">{pathInfo.pathogenic_to_plant ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            {identInfo.identified_by && (
              <div className="bg-card border border-border/60 shadow-sm rounded-lg p-5">
                <h3 className="font-bold text-foreground mb-3 pb-2 border-b border-border/40">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Identified by: <strong className="text-foreground">{identInfo.identified_by}</strong><br/>
                  {identInfo.identification_date && <span>Date: {identInfo.identification_date}</span>}
                </p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
