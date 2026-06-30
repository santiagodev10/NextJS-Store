"use client";

import { FiShoppingCart } from "react-icons/fi";
import { useStoreWithQuantity } from "@/hooks/useShoppingCart";
import styles from "./ShoppingCart.module.scss";

export const ShoppingCart = () => {
   const cart = useStoreWithQuantity((state) => state.cart);
   const totalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

   return (
      <button
         type="button"
         className={styles.cartButton}
         aria-label={`Carrito de compras con ${totalItems} productos`}
      >
         <FiShoppingCart aria-hidden="true" className={styles.icon} />
         <span className={styles.label}>Cart</span>
         <span className={styles.count} aria-live="polite">
            {totalItems}
         </span>
      </button>
   );
};
