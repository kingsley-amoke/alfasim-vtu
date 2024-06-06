import { NextRequest, NextResponse } from "next/server";

import { loggedInPaths } from "./lib/shared";
import { serverClient } from "./lib/serverConnection";
import { fetchUser, getLoggedUser } from "./lib/data";

export default async function middleware(req: NextRequest){

const {pathname} = req.nextUrl



const {data:{user}} = await serverClient().auth.getUser()

const userData = await fetchUser(user?.email)

if(!userData) {
    return NextResponse.redirect('https://www.alfasimdata.com.ng/login')
}

const loggedUser = userData[0]


if(user && pathname == '/'){
    return NextResponse.redirect('https://www.alfasimdata.com.ng/dashboard?showDialog=y')
}
if(user && pathname == '/login'){
    return NextResponse.redirect('https://www.alfasimdata.com.ng/dashboard?showDialog=y')
}

if(user && pathname == '/register'){
    return NextResponse.redirect('https://www.alfasimdata.com.ng/dashboard?showDialog=y')
}

if(!user && loggedInPaths.includes(pathname)){
    return NextResponse.redirect('https://www.alfasimdata.com.ng/login')
}

if(!loggedUser?.is_admin && pathname == '/admin'){
    return NextResponse.redirect('https://www.alfasimdata.com.ng/dashboard')
}

}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
}
