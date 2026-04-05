import { NextResponse } from 'next/server'
import { AnalyticsService } from '@/services/analytics.service'

/**
 * GET /api/analytics/dashboard
 * Summary stats and recent additions
 */
export async function GET() {
  try {
    const [summary, recent] = await Promise.all([
      AnalyticsService.getDashboardSummary(),
      AnalyticsService.getRecentAdditions(6)
    ])

    return NextResponse.json({ summary, recent })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
