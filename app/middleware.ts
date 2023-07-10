import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export async function middleware(request: NextRequest, response: NextResponse) {
  const supabase = createMiddlewareSupabaseClient<Database>({
    req: request,
    res: response,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    if (request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (
      request.nextUrl.pathname === "/auth" ||
      request.nextUrl.pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
