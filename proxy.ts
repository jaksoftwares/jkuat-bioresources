import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

const publicRoutes = [
  '/',
  '/about',
  '/herbarium',
  '/microorganisms',
  '/plants',
  '/privacy',
  '/search',
  '/terms',
]

const publicApiRoutes = [
  '/api/herbarium',
  '/api/microorganisms',
  '/api/plants',
  '/api/search',
]

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some((route) => {
    if (route === '/') return pathname === '/'
    return pathname === route || pathname.startsWith(`${route}/`)
  })
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (matchesRoute(pathname, publicRoutes) || matchesRoute(pathname, publicApiRoutes)) {
    return NextResponse.next()
  }

  return updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
