import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { Description } from "@/components/home/Description";
import { MainProducts } from "@/components/home/MainProducts";
import { Loader } from "@/components/shared/Loader";

export const metadata = {
   title: "Inicio",
   description: "Descubre productos destacados, ofertas y novedades en nuestra tienda online.",
   openGraph: {
      title: "Next JS Store",
      description: "Descubre productos destacados, ofertas y novedades en nuestra tienda online.",
      type: "website",
   },
   twitter: {
      card: "summary_large_image",
      title: "Next JS Store",
      description: "Descubre productos destacados, ofertas y novedades en nuestra tienda online.",
   },
};

export default function Home() {
   console.log("Home page rendered");
   return (
      <main>
         <Hero />
         <Description />
         <Suspense fallback={<Loader />}>
         <MainProducts />
         </Suspense>
      </main>
   );
}