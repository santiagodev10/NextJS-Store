"use client"; // Los componentes de error deben ser Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
   useEffect(() => {
      console.error("Error in MainProducts component:", error);
   }, [error]);
   
   return (
         <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>🥲</h1>
            <p style={{ fontSize: "20px" }}>Something went wrong!</p>
            <button onClick={() => reset()} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
                  Try again
            </button>
         </div>
      );
}