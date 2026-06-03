import { revalidatePath } from "next/cache";
import { env } from "@/config/env";

export async function POST(request) {
   const body = await request.json();
   const { path, token } = body;
   
   if (!path || !token) {
      return new Response(JSON.stringify({ error: "Missing path or token" }), {
         status: 400,
         headers: {
            "Content-Type": "application/json",
         },
      });
   }

   if (token !== env.CACHE_TOKEN) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
         status: 403,
         headers: {
            "Content-Type": "application/json",
         },
      });
   }

   revalidatePath(path);

   return Response.json({ success: true });
}