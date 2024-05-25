import { cookies } from "next/headers";

import { createServerClient, type CookieOptions } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const serverClient = () => {
  const cookieStore = cookies();
  //   const supabase = createServerClient(
  //     supabaseUrl,
  //     supabaseKey,
  //     {
  //       cookies: {
  //         get(name: string) {
  //           return cookieStore.get(name)?.value
  //         },
  //       },
  //     }
  //   )

  //   return supabase

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: "", ...options });
      },
    },
  });
};
