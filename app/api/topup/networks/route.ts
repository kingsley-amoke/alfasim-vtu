export async function GET() {
  const data = {
    name: "smoq",
  };
  return new Response(JSON.stringify(data));
}
