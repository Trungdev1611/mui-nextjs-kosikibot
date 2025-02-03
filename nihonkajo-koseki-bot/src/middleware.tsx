import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from './constants/roles'
import { getCookieEdge } from './utils/helpers'
import { typeRoute } from './utils/auth'

const ACCESS_CONFIG = {
  [UserRole.SuperAdmin]: {
    allowed: ['/admin'],
    redirect: `/admin/${typeRoute()}/login`
  },
  [UserRole.Vendor]: {
    allowed: ['/vender'],
    redirect: `/vender/${typeRoute()}/login`
  },
  [UserRole.User]: {
    allowed: ['/user'],
    redirect: `/user/${typeRoute()}/login`
  }
}

const PUBLIC_ROUTES = ['/login']

export const config = {
  matcher: [
    "/admin/:path*",
    "/vender/:path*",
    "/user/:path*"
  ]
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  
  if (PUBLIC_ROUTES.some(route => pathname.includes(route))) {
    return NextResponse.next()
  }

  const {token, role} = getCookieEdge(req, 'o_token') || {}
  
  if (!token) {
    const redirectPath = Object.values(ACCESS_CONFIG).find(config => 
      pathname.startsWith(config.allowed[0]))?.redirect
      
    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, req.url))
    }
    return NextResponse.redirect(new URL(`/admin/${typeRoute()}/login`, req.url))
  }

  const userAccess = ACCESS_CONFIG[role as keyof typeof ACCESS_CONFIG]
  if (!userAccess) {
    return NextResponse.redirect(new URL(`/admin/${typeRoute()}/login`, req.url))
  }

  const isAllowed = userAccess.allowed.some(path => pathname.startsWith(path))
  
  if (isAllowed) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(getRedirectUrlWithoutRole(pathname), req.url))
}

const getRedirectUrlWithoutRole = (pathname: string) => {
 const urlRedirectConfig = Object.values(ACCESS_CONFIG).find(config =>
  pathname.startsWith(config.allowed[0]))

 return urlRedirectConfig?.redirect || ''
}