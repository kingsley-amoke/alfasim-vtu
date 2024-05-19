
import { serverClient } from "@/lib/serverConnection"




export async function GET(){
    const { error } = await serverClient().auth.signOut()

    if(!error){
        
        return new Response('logged out')
    }else{
        
        return new Response('An error occurred')
    }

}

