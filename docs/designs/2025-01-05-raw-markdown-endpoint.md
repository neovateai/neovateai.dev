# Raw Markdown Endpoint (.md suffix)

## Overview

Add support for requesting raw MDX source by appending `.md` to any doc URL.

- `/en/docs/output-style` → HTML rendered page
- `/en/docs/output-style.md` → Raw MDX source as `text/plain`

## Design Decisions

| Decision | Choice |
|----------|--------|
| Source | Raw `.mdx` file from `content/` directory |
| Content-Type | `text/plain; charset=utf-8` |
| Approach | Middleware + API Route (page.tsx approach doesn't work in Next.js App Router) |
| Static generation | Dynamic via API route |

## Implementation

> **Note:** The original design proposed enhancing `page.tsx`, but Next.js App Router page components cannot return `Response` objects - they must return React elements. The implementation uses middleware + API route instead.

### 1. API Route

**File:** `app/api/raw/[lang]/[...path]/route.ts`

```typescript
import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

type RouteParams = {
  params: Promise<{
    lang: string
    path: string[]
  }>
}

export async function GET(request: Request, { params }: RouteParams) {
  const { lang, path: segments } = await params
  const filePath = path.join(process.cwd(), 'content', lang, ...segments) + '.mdx'

  try {
    const content = await readFile(filePath, 'utf-8')
    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  } catch {
    return new NextResponse('Not Found', { status: 404 })
  }
}
```

### 2. Middleware

**File:** `middleware.ts`

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { middleware as nextraMiddleware } from 'nextra/locales'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle .md suffix requests - rewrite to raw API
  if (pathname.endsWith('.md')) {
    const pathWithoutMd = pathname.slice(0, -3)
    const segments = pathWithoutMd.split('/').filter(Boolean)

    if (segments.length >= 2) {
      const lang = segments[0]
      const restPath = segments.slice(1).join('/')
      const url = request.nextUrl.clone()
      url.pathname = `/api/raw/${lang}/${restPath}`
      return NextResponse.rewrite(url)
    }
  }

  return nextraMiddleware(request)
}
```

## Dependencies

- `fs/promises` - readFile
- `path` - path.join
- `next/server` - NextResponse

## Edge Cases

- Return 404 if source `.mdx` file doesn't exist
- Nested paths: `/en/docs/foo/bar.md` → `content/en/docs/foo/bar.mdx`
