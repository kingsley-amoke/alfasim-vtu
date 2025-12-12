import { serverClient } from "@/lib/serverConnection";

export async function GET() {
  const client = await serverClient();
  const { error } = await client.auth.signOut();

  if (!error) {
    return new Response("logged out");
  } else {
    return new Response("An error occurred");
  }
}
