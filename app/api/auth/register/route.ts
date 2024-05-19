

import { connectToSupabase } from "@/lib/connection"


export async function POST(req:Request){

    let {email, password} = await req.json()

    try {
        const { data, error } = await connectToSupabase().auth.signUp({
            email: email,
            password: password,
          })

          const userData = JSON.stringify(data)
          const userError = JSON.stringify(error)
       

          const res = error ? userError : userData
        return new Response(res)
    } catch (error) {
        return new Response('Failed')
    }
}