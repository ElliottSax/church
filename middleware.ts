import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define protected routes
const protectedRoutes = [
  '/admin',
  '/members',
  '/api/admin',
];

// Define admin-only routes
const adminRoutes = [
  '/admin',
  '/api/admin',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // comeuntochris.org is a separate front door onto the same church site --
  // its homepage should land on the succession-history page, not the regular
  // homepage, without duplicating the site under a second deployment.
  const host = request.headers.get("host") || "";
  if (pathname === "/" && (host === "comeuntochris.org" || host === "www.comeuntochris.org")) {
    return NextResponse.rewrite(new URL("/why-community-of-christ", request.url));
  }

  // Check if route is protected
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (isProtected) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Redirect to sign in if not authenticated
    if (!token) {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Check admin role for admin routes
    if (isAdminRoute) {
      const userRole = token.role as string | undefined;
      if (userRole !== 'admin' && userRole !== 'staff') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/members/:path*',
    '/api/admin/:path*',
  ],
};