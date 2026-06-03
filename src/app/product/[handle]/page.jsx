import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { getProductByHandle } from "@/services/shopify/products";

export default async function ProductPage({ params }) {
   const { handle } = await params;
   const product = await getProductByHandle(handle);

   if (!product) {
      notFound();
   }

   return <ProductView product={product} />;
}