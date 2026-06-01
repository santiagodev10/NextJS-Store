import { env } from "@/config/env";
import { shopifyUrls } from "./urls";

export const getProducts = async () => {
      try {
         const response = await fetch(shopifyUrls.products.all, {
            headers: new Headers({
               "X-Shopify-Access-Token": env.SHOPIFY_TOKEN
            })
         });

         if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
         }

         const data = await response.json();
         return Array.isArray(data.products) ? data.products : [];
      } catch (error) {
         console.error("Error fetching products:", error);
         throw error;
      }
}