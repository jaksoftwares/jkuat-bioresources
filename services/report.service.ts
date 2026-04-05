import Papa from 'papaparse'

export class ReportService {
  /**
   * Universal CSV generator for results
   * @param data Array of objects to export
   * @param filename Desired filename
   */
  static exportToCSV(data: any[], filename: string = 'jkuat-export.csv') {
    if (!data || data.length === 0) return
    
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  /**
   * PDF header and format definitions
   * (Helper for generating specimen labels or research summaries)
   */
  static async generateSpecimenLabel(specimen: any) {
    // Dynamically import jspdf to avoid issues with SSR
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text('JKUAT BIORESOURCES - SPECIMEN LABEL', 20, 20)
    
    doc.setFontSize(14)
    doc.text(`Scientific Name: ${specimen.scientific_name}`, 20, 40)
    doc.text(`Common Name: ${specimen.common_name || 'N/A'}`, 20, 50)
    doc.text(`Code: ${specimen.herbarium_code || specimen.strain_code || specimen.id}`, 20, 60)
    doc.text(`Date: ${new Date(specimen.created_at).toLocaleDateString()}`, 20, 70)
    
    if (specimen.characteristics) {
       doc.setFontSize(10)
       doc.text(`Notes: ${specimen.characteristics}`, 20, 90, { maxWidth: 160 })
    }

    doc.save(`${specimen.scientific_name}_label.pdf`)
  }
}
