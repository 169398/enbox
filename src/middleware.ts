import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Valid platforms we support
const VALID_PLATFORMS = ['twitter', 'facebook', 'linkedin', 'youtube', 'instagram']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Only run on dashboard routes
  if (pathname.startsWith('/dashboard/')) {
    const platform = pathname.split('/')[2]
    
    // Validate platform
    if (!VALID_PLATFORMS.includes(platform)) {
      return NextResponse.redirect(new URL('/dashboard/twitter', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:platform*'
} 