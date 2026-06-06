import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { getProductByHandle } from "@/services/shopify/products";

const buildSeoDescription = (description) => {
   if (!description) return "Descubre este producto de nuestra tienda online.";

   const plainText = description
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

   if (!plainText) return "Descubre este producto de nuestra tienda online.";

   return plainText.length > 160 ? `${plainText.slice(0, 157).trim()}...` : plainText;
};

export async function generateMetadata({ params }) {
   const { handle } = await params;
   const product = await getProductByHandle(handle);

   if (!product) {
      return {
         title: "Producto no encontrado",
         description: "No se encontró el producto solicitado en la tienda.",
      };
   }

   const seoDescription = buildSeoDescription(product.description);

   return {
      title: product.title,
      description: seoDescription,
      alternates: {
         canonical: `/product/${product.handle}`,
      },
      openGraph: {
         title: product.title,
         description: seoDescription,
         type: "website",
         images: product.image
            ? [
                  {
                     url: product.image.src,
                     alt: product.image.alt || product.title,
                  },
               ]
            : [],
      },
      twitter: {
         card: product.image ? "summary_large_image" : "summary",
         title: product.title,
         description: seoDescription,
         images: product.image ? [product.image.src] : [],
      },
   };
}

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