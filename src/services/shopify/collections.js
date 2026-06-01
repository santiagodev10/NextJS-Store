import { env } from "@/config/env";
import { shopifyUrls } from "./urls";

export const getCollections = async () => {
      try {
         const response = await fetch(shopifyUrls.collections.all, {
               headers: new Headers({
                  "X-Shopify-Access-Token": env.SHOPIFY_TOKEN
               })
         });

         if (!response.ok) {
               throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
         }

         const { smart_collections } = await response.json();
         const transformedCollections = smart_collections.map(collection => ({
            id: collection.id,
            title: collection.title,
            handle: collection.handle,
         }));

         return transformedCollections;
      } catch (error) {
         console.error("Error fetching products:", error);
         throw error;
      }
}

export const getCollectionProducts = async (collectionId) => {
      try {
         const response = await fetch(shopifyUrls.collections.products(collectionId), {
               headers: new Headers({
                  "X-Shopify-Access-Token": env.SHOPIFY_TOKEN
               })
         });

         if (!response.ok) {
               throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
         }

         const { products } = await response.json();
         const transformedProducts = products.map(product => ({
            id: product.id,
            title: product.title,
            handle: product.handle,
            image: product.image ? {
               src: product.image.src,
               alt: product.image.alt || product.title
            } : null,
            price: product.variants?.[0]?.price || null,
            compareAtPrice: product.variants?.[0]?.compare_at_price || null
         }));

         return transformedProducts;
      } catch (error) {
         console.error("Error fetching products:", error);
         throw error;
      }
}