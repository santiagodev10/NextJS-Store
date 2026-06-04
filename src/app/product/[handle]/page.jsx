import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { getProductByHandle } from "@/services/shopify/products";

export default async function ProductPage({ params, searchParams }) {
   const { id } = await searchParams;
   const { handle } = await params;
   const product = await getProductByHandle(handle);

   console.log("ProductPage searchParams:", id); // Agrega este log para verificar los parámetros de búsqueda recibidos
   console.log("ProductPage params:", handle); // Agrega este log para verificar los parámetros recibidos

   if (!id) {
      redirect("/");
   }

   if (!product) {
      notFound();
   }

   if (String(product.id) !== String(id)) {
      console.warn(`Product ID mismatch: expected ${id}, but got ${product.id}`);
      notFound();
   }

   return <ProductView product={product} />;
}