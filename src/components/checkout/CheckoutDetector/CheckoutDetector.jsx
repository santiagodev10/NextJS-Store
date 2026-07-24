"use client";

import { useEffect, useState } from "react";
import { useStoreWithQuantity } from "@/hooks/useShoppingCart";

export const CheckoutDetector = () => {
   const [showSuccess, setShowSuccess] = useState(false);
   const [orderCount, setOrderCount] = useState(0);
   const clearCart = useStoreWithQuantity((state) => state.clearCart);

   useEffect(() => {
      const checkoutPending = sessionStorage.getItem("checkoutPending");

      if (!checkoutPending) return;

      const verifyOrder = async () => {
         try {
            const response = await fetch("/api/orders/recent");
            const data = await response.json();

            if (data.hasNewOrders) {
               clearCart();
               setOrderCount(data.orders.length);
               setShowSuccess(true);

               sessionStorage.removeItem("checkoutPending");

               setTimeout(() => {
                  setShowSuccess(false);
               }, 8000);
            } else {
               sessionStorage.removeItem("checkoutPending");
            }
         } catch (error) {
            console.error("Error verifying order:", error);
            sessionStorage.removeItem("checkoutPending");
         }
      };

      const timer = setTimeout(verifyOrder, 1500);

      return () => clearTimeout(timer);
   }, [clearCart]);

   if (!showSuccess) return null;

   return (
      <div
         role="alert"
         style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.9))",
            color: "#fff",
            padding: "1rem 1.5rem",
            borderRadius: "0.75rem",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            zIndex: 9999,
            fontSize: "1.4rem",
            fontFamily: "Roboto, sans-serif",
            maxWidth: "360rem",
         }}
      >
         <strong style={{ display: "block", marginBottom: "0.25rem" }}>
            Orden confirmada
         </strong>
         <span style={{ opacity: 0.9 }}>
            {orderCount > 1
               ? `${orderCount} órdenes procesadas exitosamente.`
               : `Tu orden fue procesada exitosamente.`}
         </span>
      </div>
   );
};
