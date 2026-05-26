import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { Description } from "@/components/home/Description";
import { MainProducts } from "@/components/home/MainProducts";
import { Loader } from "@/components/shared/Loader";

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