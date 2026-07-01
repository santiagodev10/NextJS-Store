"use client";

import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
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
   const removeFromCart = useStoreWithQuantity((state) => state.removeFromCart);
   const setItemQuantity = useStoreWithQuantity((state) => state.setItemQuantity);
   const totalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

   const handleDecrease = (itemId, currentQuantity) => {
      setItemQuantity(itemId, Number(currentQuantity) - 1);
   };

   const handleIncrease = (itemId, currentQuantity) => {
      setItemQuantity(itemId, Number(currentQuantity) + 1);
   };

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
                              <div className={styles.itemControls}>
                                 <button
                                    type="button"
                                    className={styles.quantityButton}
                                    aria-label={`Disminuir cantidad de ${item.title}`}
                                    onClick={() => handleDecrease(item.id, item.quantity)}
                                 >
                                    -
                                 </button>
                                 <span className={styles.itemMeta}>Cantidad: {item.quantity}</span>
                                 <button
                                    type="button"
                                    className={styles.quantityButton}
                                    aria-label={`Aumentar cantidad de ${item.title}`}
                                    onClick={() => handleIncrease(item.id, item.quantity)}
                                 >
                                    +
                                 </button>
                              </div>
                           </div>
                           <div className={styles.itemActions}>
                              <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                              <button
                                 type="button"
                                 className={styles.removeButton}
                                 aria-label={`Eliminar ${item.title} del carrito`}
                                 onClick={() => removeFromCart(item.id)}
                              >
                                 <FiTrash2 aria-hidden="true" />
                              </button>
                           </div>
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
