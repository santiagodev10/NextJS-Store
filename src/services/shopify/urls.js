import { env } from "@/config/env";

export const shopifyUrls = {
   products: {
      "all": `${env.SHOPIFY_HOSTNAME}/admin/api/2025-04/products.json`,
      mainProducts: `${env.SHOPIFY_HOSTNAME}/admin/api/2025-04/collections/514059993377/products.json`
   },
   collections: {
      "all": `${env.SHOPIFY_HOSTNAME}/admin/api/2025-04/smart_collections.json`,
      // Para obtener los productos de una colección específica, se necesita el ID de la colección
      "products": (collectionId) => `${env.SHOPIFY_HOSTNAME}/admin/api/2025-04/collections/${collectionId}/products.json`
   }
}