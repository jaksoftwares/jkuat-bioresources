import Papa from 'papaparse'
import * as XLSX from 'xlsx'

export class ReportService {
  /**
   * Universal CSV generator for results
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
    URL.revokeObjectURL(url)
  }

  /**
   * Export to Excel format (.xlsx)
   */
  static exportToExcel(data: any[], sheetName: string = 'Bioresources', filename: string = 'jkuat-export.xlsx') {
    if (!data || data.length === 0) return

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    
    XLSX.writeFile(workbook, filename)
  }

  /**
   * Generate professional PDF specimen label
   */
  static async generateSpecimenLabel(specimen: any) {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()

    doc.setFillColor(240, 240, 240)
    doc.rect(10, 10, 190, 80, 'F')
    doc.setDrawColor(0, 0, 0)
    doc.rect(10, 10, 190, 80, 'D')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('JKUAT BIORESOURCES - SPECIMEN LABEL', 105, 25, { align: 'center' })
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.text(`Scientific Name: ${specimen.scientific_name}`, 20, 40)
    doc.text(`Common Name: ${specimen.common_name || 'N/A'}`, 20, 50)
    doc.text(`Ref Code: ${specimen.herbarium_code || specimen.strain_code || specimen.id}`, 20, 60)
    doc.text(`Date Digitized: ${new Date(specimen.created_at).toLocaleDateString()}`, 20, 70)
    
    if (specimen.characteristics || specimen.habitat_description) {
       doc.setFontSize(10)
       const notes = specimen.characteristics || specimen.habitat_description
       doc.text(`Notes: ${notes}`, 20, 85, { maxWidth: 160 })
    }

    doc.save(`${specimen.scientific_name}_label.pdf`)
  }

  /**
   * Complex research summary PDF
   */
  static async generateResearchSummary(title: string, data: any[]) {
     const { jsPDF } = await import('jspdf')
     // Use jspdf-autotable if possible, but for now standard table
     const doc = new jsPDF()
     
     doc.setFontSize(20)
     doc.text(title, 105, 20, { align: 'center' })
     doc.setFontSize(10)
     doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 30, { align: 'center' })

     // Basic table simulation
     let y = 45
     data.slice(0, 15).forEach((item, index) => {
        doc.text(`${index + 1}. ${item.scientific_name} (${item.family_name || 'N/A'})`, 20, y)
        y += 10
     })

     doc.save('research_summary.pdf')
  }
}
