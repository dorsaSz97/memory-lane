import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth')) {
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
  matcher: ['/auth'],
};
