import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from './lib/env';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isComingSoonEnabled = env.enableComingSoon;

  // If coming soon is enabled and user is not already on coming-soon page, redirect
  if (isComingSoonEnabled && pathname !== '/coming-soon') {
    return NextResponse.rewrite(new URL('/coming-soon', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
