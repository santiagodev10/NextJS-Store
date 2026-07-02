"use client";

import dynamic from "next/dynamic";

const ShoppingCart = dynamic(
   () => import("./ShoppingCart").then((mod) => mod.ShoppingCart),
   { ssr: false }
);

export { ShoppingCart };
