import { revalidateTag } from "next/cache";
import { env } from "@/config/env";

export async function POST(request) {
   const body = await request.json();
   const { tag, token } = body;
   
   if (!tag || !token) {
      return new Response(JSON.stringify({ error: "Missing tag or token" }), {
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

   revalidateTag(tag);

   return Response.json({ success: true });
}