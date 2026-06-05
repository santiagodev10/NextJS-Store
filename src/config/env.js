export const env = {
   SHOPIFY_TOKEN: process.env.SHOPIFY_TOKEN || "",
   SHOPIFY_HOSTNAME: process.env.SHOPIFY_HOSTNAME || "",
   CACHE_TOKEN: process.env.CACHE_TOKEN,
   SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:4000")
}