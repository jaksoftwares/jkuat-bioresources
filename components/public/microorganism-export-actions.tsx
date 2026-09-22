'use client'

import { FileSpreadsheet, FileText, Printer } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { Button } from '@/components/ui/button'

type ExportValue = unknown

type ExportRecord = Record<string, ExportValue>

interface MicroorganismExportActionsProps {
  record: ExportRecord
  title: string
}

function formatLabel(value: string) {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, character => character.toUpperCase())
}

function formatValue(value: ExportValue): string {
  if (value === null || value === undefined || value === '') return '-'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (Array.isArray(value)) return value.map(item => formatValue(item)).join('; ')
  if (typeof value === 'object') return Object.entries(value as ExportRecord).map(([key, item]) => `${formatLabel(key)}: ${formatValue(item)}`).join(' | ')
  return String(value)
}

function flattenRecord(record: ExportRecord, prefix = ''): Array<[string, string]> {
  return Object.entries(record).flatMap(([key, value]) => {
    const label = prefix ? `${prefix} - ${formatLabel(key)}` : formatLabel(key)
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return flattenRecord(value as ExportRecord, label)
    }
    return [[label, formatValue(value)]]
  })
}

function safeFilename(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'microorganism'
}

async function loadJkuatLogo() {
  const response = await fetch('/assets/images/jkuat-logo.jpg')
  const blob = await response.blob()
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export default function MicroorganismExportActions({ record, title }: MicroorganismExportActionsProps) {
  const filename = safeFilename(title)

  const printDetails = () => window.print()

  const downloadExcel = () => {
    const rows = flattenRecord(record).map(([field, value]) => [field, value])
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['JOMO KENYATTA UNIVERSITY OF AGRICULTURE AND TECHNOLOGY'],
      ['JKUAT BIORESOURCES'],
      ['Microorganism Record'],
      [`Generated: ${new Date().toLocaleString()}`],
      [],
      ['Field', 'Value'],
      ...rows,
    ])
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } },
      { s: { r: 3, c: 0 }, e: { r: 3, c: 1 } },
    ]
    worksheet['!cols'] = [{ wch: 42 }, { wch: 100 }]
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Microorganism')
    XLSX.writeFile(workbook, `${filename}.xlsx`)
  }

  const downloadPdf = async () => {
    const document = new jsPDF({ unit: 'mm', format: 'a4' })
    const rows = flattenRecord(record)
    const pageWidth = document.internal.pageSize.getWidth()

    document.setFillColor(0, 79, 46)
    document.rect(0, 0, pageWidth, 36, 'F')
    document.setFontSize(16)
    document.setTextColor(255, 255, 255)
    document.text('JOMO KENYATTA UNIVERSITY OF AGRICULTURE AND TECHNOLOGY', 38, 15)
    document.setFontSize(11)
    document.text('JKUAT BIORESOURCES', 38, 24)
    document.setFontSize(12)
    document.setTextColor(30, 30, 30)
    document.text(title, 14, 48)
    document.setFontSize(9)
    document.setTextColor(100, 100, 100)
    document.text('Official microorganism record', 14, 55)
    document.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - 14, 55, { align: 'right' })
    document.setDrawColor(24, 85, 54)
    document.line(14, 60, pageWidth - 14, 60)

    try {
      document.addImage(await loadJkuatLogo(), 'JPEG', 14, 7, 18, 18)
    } catch {
      // The document remains usable if the logo asset cannot be loaded.
    }

    autoTable(document, {
      startY: 66,
      head: [['Field', 'Value']],
      body: rows,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 3, overflow: 'linebreak' },
      headStyles: { fillColor: [24, 85, 54] },
      columnStyles: { 0: { cellWidth: 58 }, 1: { cellWidth: 124 } },
      didDrawPage: ({ pageNumber }) => {
        document.setFontSize(8)
        document.setTextColor(100, 100, 100)
        document.text(`JKUAT Bioresources | Official record | Page ${pageNumber}`, 14, document.internal.pageSize.getHeight() - 10)
      },
    })

    document.save(`${filename}.pdf`)
  }

  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <Button variant="outline" onClick={printDetails} className="bg-background shadow-sm rounded-md font-semibold">
        <Printer className="mr-2 h-4 w-4" /> Print
      </Button>
      <Button variant="outline" onClick={downloadPdf} className="bg-background shadow-sm rounded-md font-semibold">
        <FileText className="mr-2 h-4 w-4" /> PDF
      </Button>
      <Button onClick={downloadExcel} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm rounded-md font-semibold">
        <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
      </Button>
    </div>
  )
}
