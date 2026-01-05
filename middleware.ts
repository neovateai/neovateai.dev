import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { middleware as nextraMiddleware } from 'nextra/locales'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle .md suffix requests - rewrite to raw API
  if (pathname.endsWith('.md')) {
    // Extract lang and path from URL like /en/docs/overview.md
    const pathWithoutMd = pathname.slice(0, -3) // Remove .md
    const segments = pathWithoutMd.split('/').filter(Boolean)

    if (segments.length >= 2) {
      const lang = segments[0]
      const restPath = segments.slice(1).join('/')
      const url = request.nextUrl.clone()
      url.pathname = `/api/raw/${lang}/${restPath}`
      return NextResponse.rewrite(url)
    }
  }

  // Pass through to Nextra's locale middleware
  return nextraMiddleware(request)
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest|_pagefind|install.sh|config.json|.*\\.tar\\.gz|.*\\.txt).*)'
  ]
}
