import Papa from 'papaparse'
import * as XLSX from 'xlsx'

async function loadJkuatLogo(): Promise<string | null> {
  try {
    const response = await fetch('/assets/images/jkuat-logo.jpg')
    const blob = await response.blob()
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

async function addJkuatHeader(doc: import('jspdf').jsPDF, title: string) {
  const pageWidth = doc.internal.pageSize.getWidth()
  doc.setFillColor(0, 79, 46)
  doc.rect(0, 0, pageWidth, 34, 'F')
  const logo = await loadJkuatLogo()
  if (logo) doc.addImage(logo, 'JPEG', 14, 6, 20, 20)
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('JOMO KENYATTA UNIVERSITY OF AGRICULTURE AND TECHNOLOGY', 40, 15)
  doc.setFontSize(10)
  doc.text('JKUAT BIORESOURCES', 40, 23)
  doc.setTextColor(30, 30, 30)
  doc.setFontSize(13)
  doc.text(title, 14, 48)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - 14, 48, { align: 'right' })
  doc.setDrawColor(24, 85, 54)
  doc.line(14, 54, pageWidth - 14, 54)
}

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

    const columns = Object.keys(data[0])
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['JOMO KENYATTA UNIVERSITY OF AGRICULTURE AND TECHNOLOGY'],
      ['JKUAT BIORESOURCES'],
      [sheetName],
      [`Generated: ${new Date().toLocaleString()}`],
      [],
      columns,
      ...data.map(row => columns.map(column => row[column])),
    ])
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: Math.max(columns.length - 1, 0) } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: Math.max(columns.length - 1, 0) } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: Math.max(columns.length - 1, 0) } },
      { s: { r: 3, c: 0 }, e: { r: 3, c: Math.max(columns.length - 1, 0) } },
    ]
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

    await addJkuatHeader(doc, 'Specimen Label')
    doc.setFillColor(240, 240, 240)
    doc.rect(10, 62, 190, 80, 'F')
    doc.setDrawColor(0, 0, 0)
    doc.rect(10, 62, 190, 80, 'D')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('SPECIMEN LABEL', 105, 78, { align: 'center' })
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.text(`Scientific Name: ${specimen.scientific_name}`, 20, 93)
    doc.text(`Common Name: ${specimen.common_name || 'N/A'}`, 20, 103)
    doc.text(`Ref Code: ${specimen.herbarium_code || specimen.strain_code || specimen.id}`, 20, 113)
    doc.text(`Date Digitized: ${new Date(specimen.created_at).toLocaleDateString()}`, 20, 123)
    
    if (specimen.characteristics || specimen.habitat_description) {
       doc.setFontSize(10)
       const notes = specimen.characteristics || specimen.habitat_description
      doc.text(`Notes: ${notes}`, 20, 135, { maxWidth: 160 })
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
     
    await addJkuatHeader(doc, title)

     // Basic table simulation
    let y = 70
     data.slice(0, 15).forEach((item, index) => {
        doc.text(`${index + 1}. ${item.scientific_name} (${item.family_name || 'N/A'})`, 20, y)
        y += 10
     })

     doc.save('research_summary.pdf')
  }
}
