import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })

  const protectedRoutes = ['/ingredients', '/recipes/new', '/recipes/:path*']
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route.replace(':path*', '')),
  )

  if (isProtected && !token) {
    const url = new URL('/error', request.url)
    url.searchParams.set('message', 'Not enough rights')
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/ingredients/:path*', '/recipes/:path*'],
}
