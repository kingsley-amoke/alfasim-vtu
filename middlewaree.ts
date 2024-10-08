import { NextRequest, NextResponse } from "next/server";

import { loggedInPaths } from "./lib/shared";
import { serverClient } from "./lib/serverConnection";
import { fetchUser } from "./lib/data";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export default async function middleware(request: NextRequest) {
  const home = process.env.NEXT_PUBLIC_HOME as string;
  // "https://www.alfasimdata.com.ng";

  const { pathname } = request.nextUrl;

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

  
  // if (!user) 
  // {
  //   return NextResponse.redirect(`${home}/login`);

  // }

  // return NextResponse.redirect(`${home}`);
  // return NextResponse.redirect(`${home}/dashboard?showDialog=y`);

  // if (!user && loggedInPaths.includes(pathname)) {
  //   return NextResponse.redirect(`${home}/login`);
  // }
  
  // else{
  //   return NextResponse.redirect(`${home}`);

  // if (user && pathname == "/") {
  //   return NextResponse.redirect(`${home}/dashboard?showDialog=y`);
  // }
  // if (user && pathname == "/login") {
  //   return NextResponse.redirect(`${home}/dashboard?showDialog=y`);
  // }

  // if (user && pathname == "/register") {
  //   return NextResponse.redirect(`${home}/dashboard?showDialog=y`);
  // }

  

  // if (user && pathname == "/admin") {
  //    const userData = await fetchUser(user?.email);
  //   return NextResponse.redirect(`${home}/dashboard`);
  // }
  // }
  
  
 
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
