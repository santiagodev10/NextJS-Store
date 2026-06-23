"use client";

import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import styles from "./ShoppingCart.module.scss";

export const ShoppingCart = () => {
   const [cartCount, setCartCount] = useState(0);

   return (
      <button
         type="button"
         className={styles.cartButton}
         aria-label={`Carrito de compras con ${cartCount} productos`}
      >
         <FiShoppingCart aria-hidden="true" className={styles.icon} />
         <span className={styles.label}>Cart</span>
         <span className={styles.count} aria-live="polite">
            {cartCount}
         </span>
      </button>
   );
};
