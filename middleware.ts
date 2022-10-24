import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has('user');
  // If the user is not logged in, log em in
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // If they are going to /login at this point, send them to home page instead
  if (isLoggedIn && request.nextUrl.href.includes('login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // otherwise, continue life as normal
  return NextResponse.next();
}
