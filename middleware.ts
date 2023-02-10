import { NextRequest, NextResponse } from 'next/server';
import { supabase } from './lib/subpabaseClient';
import { MyCookies } from './types';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const cookies = request.cookies as MyCookies;
    const refreshToken = cookies.get('my-refresh-token');
    const accessToken = cookies.get('my-access-token');

    if (refreshToken && accessToken) {
      console.log('hoy');
      supabase.auth
        .setSession({
          refresh_token: refreshToken.value,
          access_token: accessToken.value,
        })
        .then(_ => NextResponse.next());
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/'],
};
