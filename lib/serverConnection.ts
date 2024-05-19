import { cookies } from "next/headers";

import { createServerClient, CookieOptions } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const serverClient = () => {
    return createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            get(name){
                return cookies().get(name)?.value
            },
            set(name:string, value:string, options: CookieOptions){
                try {
                    return cookies().set({name, value, ...options})
                } catch (error) {
                    console.log(error)
                }
            },
            remove(name:string, options:CookieOptions){
               try {
                return cookies().set({name, value: '', ...options})
               } catch (error) {
                console.log(error)
               }
            }
        }
    })
}