

import { connectToSupabase } from "@/lib/connection"
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context"


export async function POST(req:Request){

    let {email, password} = await req.json()

    try {
        const { data, error } = await connectToSupabase().auth.signInWithPassword({
            email: email,
            password: password,
          })

          const userData = JSON.stringify(data)
          const userError = JSON.stringify(error)

         
          const res = error ? userError : userData
        return new Response(res)
    } catch (error) {
        
        if(isDynamicServerError(error)){
            throw error
        }

        return new Response('Failed')
    }
}