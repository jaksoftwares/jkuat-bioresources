import { createClient } from '@/lib/supabase/server'
import { PlantRepository } from '@/repositories/plant.repository'
import { MicroorganismRepository } from '@/repositories/microorganism.repository'

export class ImportService {
  private static async getClient() {
    return await createClient()
  }

  static async logImport(fileName: string, type: 'plant' | 'microorganism' | 'herbarium', count: number) {
    const supabase = await this.getClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('import_logs')
      .insert([{
        file_name: fileName,
        resource_type: type,
        imported_by: user?.id,
        record_count: count,
        status: 'completed'
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  /**
   * Process an array of plant records from CSV/Excel
   */
  static async processPlantImport(records: any[]) {
    let successCount = 0
    for (const record of records) {
      try {
        await PlantRepository.create(record)
        successCount++
      } catch (err) {
        console.error('Error importing record:', record, err)
      }
    }
    return successCount
  }

  /**
   * Process an array of microorganism records
   */
  static async processMicroorganismImport(records: any[]) {
    let successCount = 0
    for (const record of records) {
      try {
        await MicroorganismRepository.create(record)
        successCount++
      } catch (err) {
        console.error('Error importing record:', record, err)
      }
    }
    return successCount
  }
}
