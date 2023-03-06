import { NextRequest, NextResponse } from 'next/server';
import { MyCookies } from './types';
import { supabase } from './lib/subpabaseClient';

export async function middleware(request: NextRequest) {
  // const cookies = request.cookies as MyCookies;
  // const refreshToken = cookies.get('my-refresh-token');
  // const accessToken = cookies.get('my-access-token');

  if (
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname === '/auth'
  ) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   console.log(refreshToken);
  //   console.log(accessToken);
  //   if (refreshToken && accessToken) {
  //     supabase.auth
  //       .setSession({
  //         refresh_token: refreshToken.value,
  //         access_token: accessToken.value,
  //       })
  //       .then(_ => NextResponse.next());
  //   } else {
  //     return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  //   }
  // }
}

export const config = {
  matcher: ['/', '/auth'],
};
