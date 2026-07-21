import styles from "./loading.module.scss";

export default function OrdersInfoLoading() {
   return (
      <div className={styles.container} aria-busy="true" aria-live="polite">
         <div className={styles.headerSkeleton}>
            <div className={styles.line} />
            <div className={styles.lineShort} />
         </div>

         <div className={styles.ordersList}>
            {Array.from({ length: 3 }).map((_, index) => (
               <div key={index} className={styles.orderSkeleton}>
                  <div className={styles.orderHeader}>
                     <div className={styles.lineMedium} />
                     <div className={styles.lineShort} />
                  </div>
                  <div className={styles.orderBody}>
                     <div className={styles.line} />
                     <div className={styles.lineMedium} />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
