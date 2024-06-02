import { NextRequest, NextResponse } from "next/server";

import { loggedInPaths } from "./lib/shared";
import { serverClient } from "./lib/serverConnection";
import { fetchUser, getLoggedUser } from "./lib/data";

export default async function middleware(req: NextRequest){

const {pathname} = req.nextUrl



const data = await serverClient().auth.getUser()

const loggedUser = await fetchUser(data.data.user?.email)




if(data.data.user && pathname == '/'){
    return NextResponse.redirect('https://alfasimdata.com.ng/dashboard?showDialog=y')
}
if(data.data.user && pathname == '/login'){
    return NextResponse.redirect('https://alfasimdata.com.ng/dashboard?showDialog=y')
}

if(data.data.user && pathname == '/register'){
    return NextResponse.redirect('https://alfasimdata.com.ng/dashboard?showDialog=y')
}

if(!data.data.user && loggedInPaths.includes(pathname)){
    return NextResponse.redirect('https://alfasimdata.com.ng/login')
}

if(loggedUser && !loggedUser[0].is_admin && pathname == '/admin'){
    return NextResponse.redirect('https://alfasimdata.com.ng/dashboard')
}

}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
}
