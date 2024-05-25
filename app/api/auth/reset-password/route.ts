import { connectToSupabase } from "@/lib/connection";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

export async function POST(req: Request) {
  let { email } = await req.json();

  try {
    console.log("sending");
    const { data, error } =
      await connectToSupabase().auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/reset-password?reset=true",
      });

    if (error) {
      console.log(error);
      return new Response("An error occurred");
    }

    console.log(data);

    return new Response("Reset link sent");
  } catch (error) {
    if(isDynamicServerError(error)){
      throw error
  }
    return new Response("Failed");
  }
}
