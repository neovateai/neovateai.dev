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
