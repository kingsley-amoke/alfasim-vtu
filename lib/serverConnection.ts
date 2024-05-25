import { cookies } from "next/headers";

import { createServerClient, type CookieOptions } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const cookieStore = cookies()

export const serverClient = () => {

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  return supabase

    // return createServerClient(supabaseUrl, supabaseKey, {
    //     cookies: {
    //         get(name){
    //             return cookies().get(name)?.value
    //         },
    //         set(name:string, value:string, options: CookieOptions){
    //             try {
    //                 cookies().set({name, value, ...options})
    //             } catch (error) {
    //                 console.log(error)
    //             }
    //         },
    //         remove(name:string, options:CookieOptions){
    //            try {
    //             cookies().set({name, value: '', ...options})
    //            } catch (error) {
    //             console.log(error)
    //            }
    //         }
    //     }
    // })
}