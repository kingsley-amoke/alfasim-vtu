import { NextRequest, NextResponse } from "next/server";

import { loggedInPaths } from "./lib/shared";
import { serverClient } from "./lib/serverConnection";

export default async function middleware(req: NextRequest){

const {pathname} = req.nextUrl



const user = await serverClient().auth.getUser()



if(user.data.user !== null && pathname == '/'){
    return NextResponse.redirect('https://alfasimdata.vercel.app/dashboard?showDialog=y')
}
if(user.data.user !== null && pathname == '/login'){
    return NextResponse.redirect('https://alfasimdata.vercel.app/dashboard?showDialog=y')
}

if(user.data.user !== null && pathname == '/register'){
    return NextResponse.redirect('https://alfasimdata.vercel.app/dashboard?showDialog=y')
}

if(user.data.user === null && loggedInPaths.includes(pathname)){
    return NextResponse.redirect('https://alfasimdata.vercel.app/login')
}

    
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
}
