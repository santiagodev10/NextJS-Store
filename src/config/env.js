export const env = {
   SHOPIFY_TOKEN: process.env.SHOPIFY_TOKEN || "",
   SHOPIFY_HOSTNAME: process.env.SHOPIFY_HOSTNAME || "",
   CACHE_TOKEN: process.env.CACHE_TOKEN,
   SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:4000"),
   SHOPIFY_GRAPHQL_ENDPOINT: process.env.SHOPIFY_GRAPHQL_ENDPOINT || "",
   SHOPIFY_STOREFRONT_TOKEN: process.env.SHOPIFY_STOREFRONT_TOKEN || "",
   GOOGLE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
   SHOPIFY_WEBHOOK_SECRET: process.env.SHOPIFY_WEBHOOK_SECRET || ""
}