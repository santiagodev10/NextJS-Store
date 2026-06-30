"use client";

import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useStoreWithQuantity } from "@/hooks/useShoppingCart";
import styles from "./ShoppingCart.module.scss";

const formatPrice = (price) => {
   const value = Number(price);

   if (Number.isNaN(value)) return "N/A";

   return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
   }).format(value);
};

export const ShoppingCart = () => {
   const [isOpen, setIsOpen] = useState(false);
   const cart = useStoreWithQuantity((state) => state.cart);
   const totalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

   return (
      <div className={styles.cartWrapper}>
         <button
            type="button"
            className={styles.cartButton}
            aria-label={`Carrito de compras con ${totalItems} productos`}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            onClick={() => setIsOpen((prev) => !prev)}
         >
            <FiShoppingCart aria-hidden="true" className={styles.icon} />
            <span className={styles.label}>Carrito</span>
            <span className={styles.count} aria-live="polite">
               {totalItems}
            </span>
         </button>

         {isOpen && (
            <div className={styles.cartModal} role="dialog" aria-label="Productos en el carrito">
               <h3 className={styles.modalTitle}>Carrito</h3>

               {cart.length === 0 ? (
                  <p className={styles.emptyText}>No hay productos en el carrito.</p>
               ) : (
                  <ul className={styles.itemsList}>
                     {cart.map((item) => (
                        <li key={item.id} className={styles.item}>
                           <div className={styles.itemInfo}>
                              <span className={styles.itemTitle}>{item.title}</span>
                              <span className={styles.itemMeta}>Cantidad: {item.quantity}</span>
                           </div>
                           <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                        </li>
                     ))}
                  </ul>
               )}

               <button
                  type="button"
                  className={styles.checkoutButton}
                  disabled={cart.length === 0}
               >
                  Comprar
               </button>
            </div>
         )}
      </div>
   );
};
