import { env } from "@/config/env";
import { shopifyUrls } from "./urls";

const normalizeProduct = (product) => {
      const totalQuantity = Array.isArray(product.variants)
         ? product.variants.reduce((acc, variant) => acc + Number(variant.inventory_quantity || 0), 0)
         : 0;

      const tags = typeof product.tags === "string"
         ? product.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
         : [];

      return {
         id: product.id,
         title: product.title,
         description: product.body_html || product.description || "",
         price: product.variants?.[0]?.price || 0,
         image: product.image
            ? {
                  src: product.image.src,
                  alt: product.image.alt || product.title,
            }
            : null,
         quantity: totalQuantity,
         handle: product.handle,
         tags,
      };
};

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
            return Array.isArray(data.products) ? data.products.map(normalizeProduct) : [];
      } catch (error) {
         console.error("Error fetching products:", error);
         throw error;
      }
};

export const getProductByHandle = async (handle) => {
   if (!handle) return null;

   const products = await getProducts();
   return products.find((product) => product.handle === handle) || null;
};

export const getMainProducts = async () => {
   const response = await fetch(shopifyUrls.products.mainProducts, {
      headers: new Headers({
         'X-Shopify-Access-Token': env.SHOPIFY_TOKEN
      }),
      cache: "force-cache",
      next: {
         tags: ["main-products"]
      }
   });

   const {products} = await response.json()

   return products
}