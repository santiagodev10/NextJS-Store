import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Version minima correcta: mantiene la misma API y corrige el estado inconsistente.
export const useStore = create((set) => ({
   cart: [],
   addToCart: (cartItem) => set((state) => ({ cart: [...state.cart, cartItem] })),
   removeFromCart: (itemId) => set((state) => ({ cart: state.cart.filter((item) => item.id !== itemId) })),
   clearCart: () => set({ cart: [] }),
}));

// Version con cantidades por producto (misma idea de store, con reglas de negocio).
export const useStoreWithQuantity = create(
   persist(
      (set) => ({
         cart: [],
         cartFeedbackTick: 0,
         addToCart: (cartItem) =>
            set((state) => {
               const existingItem = state.cart.find((item) => item.id === cartItem.id);

               if (!existingItem) {
                  return {
                     cart: [...state.cart, { ...cartItem, quantity: cartItem.quantity ?? 1 }],
                     cartFeedbackTick: state.cartFeedbackTick + 1,
                  };
               }

               return {
                  cart: state.cart.map((item) =>
                     item.id === cartItem.id
                        ? { ...item, quantity: item.quantity + (cartItem.quantity ?? 1) }
                        : item
                  ),
                  cartFeedbackTick: state.cartFeedbackTick + 1,
               };
            }),
         setItemQuantity: (itemId, quantity) =>
            set((state) => ({
               cart: state.cart
                  .map((item) => (item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item))
                  .filter((item) => item.quantity > 0),
            })),
         removeFromCart: (itemId) => set((state) => ({ cart: state.cart.filter((item) => item.id !== itemId) })),
         clearCart: () => set({ cart: [] }),
      }),
      {
         name: 'shopping-cart',
         storage: createJSONStorage(() => localStorage),
         partialize: (state) => ({ cart: state.cart }),
      }
   )
);