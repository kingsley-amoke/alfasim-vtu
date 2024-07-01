import { NextRequest, NextResponse } from "next/server";

import { loggedInPaths } from "./lib/shared";
import { serverClient } from "./lib/serverConnection";
import { fetchUser} from "./lib/data";
import { createServerClient, type CookieOptions  } from "@supabase/ssr";

export default async function middleware(request: NextRequest){

const {pathname} = request.nextUrl

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
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    },
  );

const {data:{user}} = await supabase.auth.getUser();

// const {data:{user}} = await serverClient().auth.getUser()


const userData = await fetchUser(user?.email)


if(!userData) {
    return NextResponse.redirect('https://www.alfasimdata.com.ng/login')
}

const loggedUser = userData[0]


if(loggedUser && pathname == '/'){
    return NextResponse.redirect('https://www.alfasimdata.com.ng/dashboard?showDialog=y')
}
if(loggedUser && pathname == '/login'){
    return NextResponse.redirect('https://www.alfasimdata.com.ng/dashboard?showDialog=y')
}

if(loggedUser && pathname == '/register'){
    return NextResponse.redirect('https://www.alfasimdata.com.ng/dashboard?showDialog=y')
}

if(!loggedUser && loggedInPaths.includes(pathname)){
    return NextResponse.redirect('https://www.alfasimdata.com.ng/login')
}

if(!loggedUser?.is_admin && pathname == '/admin'){
    return NextResponse.redirect('https://www.alfasimdata.com.ng/dashboard')
}

}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
}
