import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import { adsfile, loggedOutPaths } from "./lib/shared";

export default async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (pathname == adsfile) {
    const adsFileUrl = new NextURL(adsfile, origin);

    return NextResponse.redirect(adsFileUrl);
  }

  if (!user) {
    if (!loggedOutPaths.includes(pathname)) {
      const loginUrl = new NextURL("/login", origin);

      return NextResponse.redirect(loginUrl);
    }
  }

  if (user) {
    if (loggedOutPaths.includes(pathname)) {
      const dashboardUrl = new NextURL("/dashboard", origin);

      return NextResponse.redirect(dashboardUrl);
    }
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
