import { NextRequest, NextResponse } from "next/server";

import { loggedInPaths } from "./lib/shared";
import { serverClient } from "./lib/serverConnection";
import { fetchAllUsers, fetchUser, getLoggedUser } from "./lib/data";
import { useUserStore, useUsersStore } from "./lib/store";

export default async function middleware(req: NextRequest){

const {pathname} = req.nextUrl

const {data:{user}} = await serverClient().auth.getUser()


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
